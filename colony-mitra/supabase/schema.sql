-- =====================================================================
--  कॉलोनी मित्र (Colony Mitra) · अभिराज डिजिटल
--  Supabase database setup — paste this whole file into
--  Supabase Dashboard → SQL Editor → New query → Run.
--  Safe to run again: every statement is idempotent.
--
--  Version 2: committee (admin) and resident roles with house-level privacy.
--  * A resident can read only their own house's private records
--    (house, tenants, payments, dues, complaints, messages) plus colony-wide
--    public information (notices, polls, committee, services, CCTV, gallery, fees).
--  * Only अध्यक्ष / सचिव (or the app owner) can add, change or remove admins.
--  * Every change to the members list is written to member_audit.
-- =====================================================================

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------
-- 1. Tables
-- ---------------------------------------------------------------------

-- One row per colony / society that uses the app.
create table if not exists public.colonies (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  plan        text not null default 'trial',
  paid_until  date,
  active      boolean not null default true,
  created_at  timestamptz not null default now()
);
-- Short code a new resident types to send a join request.
alter table public.colonies add column if not exists code text not null default upper(substr(md5(gen_random_uuid()::text), 1, 6));
create unique index if not exists colonies_code on public.colonies(code);

-- Who may log in to which colony. A person is matched by the phone number
-- (last 10 digits) or e-mail they verify with OTP.
create table if not exists public.members (
  id          uuid primary key default gen_random_uuid(),
  colony_id   uuid not null references public.colonies(id) on delete cascade,
  name        text not null default '',
  phone10     text not null default '',
  email       text not null default '',
  role        text not null default 'resident' check (role in ('admin','resident')),
  house       text not null default '',
  created_at  timestamptz not null default now(),
  constraint members_has_login check (phone10 <> '' or email <> ''),
  constraint members_phone_fmt check (phone10 = '' or phone10 ~ '^[0-9]{10}$')
);
-- Committee post (अध्यक्ष, सचिव, कोषाध्यक्ष …), the house document this person belongs to,
-- and a switch to stop access at once (lost phone, left the colony).
alter table public.members add column if not exists post     text    not null default '';
alter table public.members add column if not exists house_id text    not null default '';
alter table public.members add column if not exists blocked  boolean not null default false;
create unique index if not exists members_colony_phone on public.members(colony_id, phone10) where phone10 <> '';
create unique index if not exists members_colony_email on public.members(colony_id, lower(email)) where email <> '';
create index if not exists members_phone on public.members(phone10);

-- App owners (Abhiraj Digital). They can create colonies and act as admin in all of them.
create table if not exists public.platform_admins (
  user_id     uuid primary key references auth.users(id) on delete cascade,
  created_at  timestamptz not null default now()
);

-- Every record of a colony (houses, payments, complaints, notices, polls …)
-- is a JSON document addressed by (colony, collection, id).
create table if not exists public.docs (
  colony_id   uuid not null references public.colonies(id) on delete cascade,
  collection  text not null check (collection ~ '^[a-z]{2,20}$'),
  id          text not null check (char_length(id) between 1 and 120),
  data        jsonb not null default '{}'::jsonb check (jsonb_typeof(data) = 'object'),
  created_by  uuid default auth.uid(),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  primary key (colony_id, collection, id)
);
-- The house a private record belongs to. Set by the server (trigger docs_scope), never by the app.
alter table public.docs add column if not exists house_id text not null default '';
create index if not exists docs_house on public.docs(colony_id, house_id) where house_id <> '';
alter table public.docs replica identity full;

-- Record of every change to the members list (who added / removed / changed whom).
create table if not exists public.member_audit (
  id          bigint generated always as identity primary key,
  colony_id   uuid not null references public.colonies(id) on delete cascade,
  at          timestamptz not null default now(),
  actor       uuid,
  actor_label text not null default '',
  action      text not null,
  member_name text not null default '',
  member_login text not null default '',
  old_role    text not null default '',
  new_role    text not null default '',
  old_post    text not null default '',
  new_post    text not null default '',
  blocked     boolean
);
create index if not exists member_audit_colony on public.member_audit(colony_id, at desc);

-- A person whose number is not in the colony yet can ask to join; the committee approves.
create table if not exists public.join_requests (
  id          uuid primary key default gen_random_uuid(),
  colony_id   uuid not null references public.colonies(id) on delete cascade,
  user_id     uuid not null default auth.uid(),
  name        text not null default '',
  house       text not null default '',
  note        text not null default '',
  phone10     text not null default '',
  email       text not null default '',
  status      text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at  timestamptz not null default now(),
  unique (colony_id, user_id)
);

-- ---------------------------------------------------------------------
-- 2. Helper functions
-- ---------------------------------------------------------------------

create or replace function public.cs_phone10() returns text
language sql stable as $$
  select right(regexp_replace(coalesce(auth.jwt()->>'phone',''), '\D', '', 'g'), 10)
$$;

create or replace function public.cs_email() returns text
language sql stable as $$
  select lower(coalesce(auth.jwt()->>'email',''))
$$;

create or replace function public.cs_is_platform_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.platform_admins where user_id = auth.uid())
$$;

-- The signed-in person's (not blocked) member row in a colony; admin rows first.
create or replace function public.cs_me(c uuid) returns public.members
language sql stable security definer set search_path = public as $$
  select m.* from public.members m
  where m.colony_id = c and not m.blocked
    and ((m.phone10 <> '' and m.phone10 = public.cs_phone10())
      or (m.email  <> '' and lower(m.email) = public.cs_email()))
  order by (m.role = 'admin') desc, (m.house_id <> '') desc
  limit 1
$$;

create or replace function public.cs_role(c uuid) returns text
language sql stable security definer set search_path = public as $$
  select case
    when auth.uid() is null then null
    when public.cs_is_platform_admin() then 'admin'
    else (select (public.cs_me(c)).role)
  end
$$;

-- The house document id the signed-in person belongs to ('' if none).
create or replace function public.cs_my_house(c uuid) returns text
language sql stable security definer set search_path = public as $$
  select coalesce((select (public.cs_me(c)).house_id), '')
$$;

-- May the signed-in person add / change / remove admins in this colony?
-- App owner, or an admin whose post is अध्यक्ष or सचिव. If no admin of the colony
-- holds one of those posts yet, any admin may (so a colony can set itself up).
create or replace function public.cs_is_chief(c uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select auth.uid() is not null and (
    public.cs_is_platform_admin()
    or (public.cs_role(c) = 'admin' and (
          (select (public.cs_me(c)).post) in ('अध्यक्ष','सचिव')
          or not exists (select 1 from public.members m
                         where m.colony_id = c and m.role = 'admin' and not m.blocked
                           and m.post in ('अध्यक्ष','सचिव'))))
  )
$$;

-- May the signed-in person publish the colony's account statements (monthly / yearly)?
-- App owner, or an admin whose post is अध्यक्ष or कोषाध्यक्ष (any admin if nobody holds those posts yet).
create or replace function public.cs_can_publish(c uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select auth.uid() is not null and (
    public.cs_is_platform_admin()
    or (public.cs_role(c) = 'admin' and (
          (select (public.cs_me(c)).post) in ('अध्यक्ष','कोषाध्यक्ष')
          or not exists (select 1 from public.members m
                         where m.colony_id = c and m.role = 'admin' and not m.blocked
                           and m.post in ('अध्यक्ष','कोषाध्यक्ष'))))
  )
$$;

-- Collections every member of the colony may read.
create or replace function public.cs_public_coll(col text) returns boolean
language sql immutable as $$
  select col in ('config','notices','polls','pollvotes','services','svcvotes','committee',
                 'cameras','cctvlog','gallery','fees','reports')
$$;

-- Collections whose records belong to one house (readable by that house and the committee).
create or replace function public.cs_house_coll(col text) returns boolean
language sql immutable as $$
  select col in ('houses','payments','payclaims','complaints','vehicles','tenants','feepay','inbox')
$$;

-- Kept for older app versions: collections a resident may add to, and per-person vote collections.
create or replace function public.cs_resident_insert(col text) returns boolean
language sql immutable as $$ select col in ('complaints','payclaims','tenants') $$;
create or replace function public.cs_own_doc(col text, doc_id text) returns boolean
language sql stable as $$ select col in ('pollvotes','svcvotes','compvotes') and doc_id = auth.uid()::text $$;

-- Can the signed-in person read this document?
create or replace function public.cs_can_read(c uuid, col text, hid text, owner uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select case public.cs_role(c)
    when 'admin' then true
    when 'resident' then
      public.cs_public_coll(col)
      or (col = 'inbox' and hid = '')
      or (public.cs_house_coll(col) and hid <> '' and hid = public.cs_my_house(c))
      or (owner = auth.uid() and col in ('complaints','payclaims','tenants'))
    else false
  end
$$;

-- Storage: '<colony>/<file>' is colony-wide (committee uploads),
-- '<colony>/h/<house>/<file>' belongs to that house (the house and the committee).
create or replace function public.cs_file_ok(p text, w boolean) returns boolean
language plpgsql stable security definer set search_path = public as $$
declare c uuid; r text;
begin
  c := split_part(p, '/', 1)::uuid;
  r := public.cs_role(c);
  if r is null then return false; end if;
  if r = 'admin' then return true; end if;
  if split_part(p, '/', 2) = 'h' then
    return split_part(p, '/', 3) <> '' and split_part(p, '/', 3) = public.cs_my_house(c);
  end if;
  return not w;
exception when others then
  return false;
end $$;

-- Same as cs_role, for a storage path like '<colony-uuid>/photo.jpg' (older app versions).
create or replace function public.cs_role_path(p text) returns text
language plpgsql stable security definer set search_path = public as $$
begin
  return public.cs_role(split_part(p, '/', 1)::uuid);
exception when others then
  return null;
end $$;

-- Colonies the signed-in person belongs to (used right after login).
drop function if exists public.my_colonies();
create function public.my_colonies()
returns table (colony_id uuid, name text, role text, house text, member_name text, active boolean,
               post text, house_id text, code text)
language sql stable security definer set search_path = public as $$
  select c.id, c.name, public.cs_role(c.id),
         coalesce(m.house,''), coalesce(m.name,''), c.active,
         coalesce(m.post,''), coalesce(m.house_id,''),
         case when public.cs_role(c.id) = 'admin' then c.code else '' end
  from public.colonies c
  left join lateral (select * from public.cs_me(c.id) x where x.id is not null) m on true
  where public.cs_role(c.id) is not null
  order by c.name
$$;

-- Has anybody claimed the app-owner role yet?
create or replace function public.cs_has_owner() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.platform_admins)
$$;

-- First person to call this (right after setup) becomes the app owner.
create or replace function public.claim_platform_admin() returns boolean
language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null then raise exception 'login required'; end if;
  if exists (select 1 from public.platform_admins) then return false; end if;
  insert into public.platform_admins(user_id) values (auth.uid());
  return true;
end $$;

-- App owner creates a colony together with its first committee admin (अध्यक्ष).
create or replace function public.create_colony(
  p_name text, p_admin_name text, p_admin_phone text, p_admin_email text default '')
returns uuid
language plpgsql security definer set search_path = public as $$
declare cid uuid; ph text;
begin
  if not public.cs_is_platform_admin() then raise exception 'only the app owner can create colonies'; end if;
  ph := right(regexp_replace(coalesce(p_admin_phone,''), '\D', '', 'g'), 10);
  if coalesce(trim(p_name),'') = '' then raise exception 'colony name required'; end if;
  if ph = '' and coalesce(trim(p_admin_email),'') = '' then raise exception 'admin phone or email required'; end if;
  insert into public.colonies(name) values (trim(p_name)) returning id into cid;
  insert into public.members(colony_id, name, phone10, email, role, post)
    values (cid, coalesce(p_admin_name,''), ph, lower(coalesce(trim(p_admin_email),'')), 'admin', 'अध्यक्ष');
  insert into public.docs(colony_id, collection, id, data)
    values (cid, 'config', 'main', jsonb_build_object(
      'name', trim(p_name), 'charge', 500, 'start', to_char(now(), 'YYYY-MM'),
      'dueDay', 10, 'lateFee', 0, 'contacts', '[]'::jsonb));
  return cid;
end $$;

-- Shallow-merge fields into an existing document (RLS still applies).
create or replace function public.doc_patch(p_colony uuid, p_collection text, p_id text, p_patch jsonb)
returns jsonb
language plpgsql security invoker set search_path = public as $$
declare out jsonb;
begin
  update public.docs set data = data || p_patch, updated_at = now()
   where colony_id = p_colony and collection = p_collection and id = p_id
  returning data into out;
  if out is null then raise exception 'document not found or not allowed' using errcode = '42501'; end if;
  return out;
end $$;

-- A resident updates the family part of their own house record. Only these fields can change;
-- house number, owner, phone and maintenance settings stay with the committee.
create or replace function public.my_house_update(p_colony uuid, p_patch jsonb)
returns jsonb
language plpgsql security definer set search_path = public as $$
declare h text; clean jsonb; out jsonb;
begin
  if public.cs_role(p_colony) is null then raise exception 'not a member' using errcode = '42501'; end if;
  h := public.cs_my_house(p_colony);
  if h = '' then raise exception 'आपका नंबर अभी किसी घर से नहीं जुड़ा है। कमेटी से कहें कि वे आपको आपके घर से जोड़ें।' using errcode = 'P0001'; end if;
  select coalesce(jsonb_object_agg(key, value), '{}'::jsonb) into clean
    from jsonb_each(coalesce(p_patch, '{}'::jsonb))
   where key in ('family','members','occ','altPhone','email','emergency','about');
  update public.docs set data = data || clean, updated_at = now()
   where colony_id = p_colony and collection = 'houses' and id = h
  returning data into out;
  if out is null then raise exception 'house not found' using errcode = '42501'; end if;
  return out;
end $$;

-- Colony fund totals for every member (no house names or per-house amounts).
create or replace function public.colony_summary(p_colony uuid)
returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare cfg jsonb; ob numeric; mt numeric; fi numeric; oi numeric; sp numeric; bycat jsonb; hs int;
begin
  if public.cs_role(p_colony) is null then raise exception 'not a member' using errcode = '42501'; end if;
  select coalesce(data, '{}'::jsonb) into cfg from public.docs where colony_id = p_colony and collection = 'config' and id = 'main';
  ob := case when coalesce(cfg->>'openBal','') ~ '^-?[0-9]+(\.[0-9]+)?$' then (cfg->>'openBal')::numeric else 0 end;
  select coalesce(sum(case when data->>'amount' ~ '^[0-9]+(\.[0-9]+)?$' then (data->>'amount')::numeric else 0 end), 0)
    into mt from public.docs where colony_id = p_colony and collection = 'payments';
  select coalesce(sum(case when data->>'amount' ~ '^[0-9]+(\.[0-9]+)?$' then (data->>'amount')::numeric else 0 end), 0)
    into fi from public.docs where colony_id = p_colony and collection = 'feepay';
  select coalesce(sum(case when data->>'amount' ~ '^[0-9]+(\.[0-9]+)?$' then (data->>'amount')::numeric else 0 end), 0)
    into oi from public.docs where colony_id = p_colony and collection = 'expenses' and data->>'kind' = 'in';
  select coalesce(sum(case when data->>'amount' ~ '^[0-9]+(\.[0-9]+)?$' then (data->>'amount')::numeric else 0 end), 0)
    into sp from public.docs where colony_id = p_colony and collection = 'expenses' and coalesce(data->>'kind','') <> 'in';
  select coalesce(jsonb_object_agg(cat, amt), '{}'::jsonb) into bycat from (
    select coalesce(nullif(data->>'cat',''), 'अन्य') cat,
           sum(case when data->>'amount' ~ '^[0-9]+(\.[0-9]+)?$' then (data->>'amount')::numeric else 0 end) amt
      from public.docs where colony_id = p_colony and collection = 'expenses' and coalesce(data->>'kind','') <> 'in'
     group by 1) t;
  select count(*) into hs from public.docs where colony_id = p_colony and collection = 'houses';
  return jsonb_build_object('openBal', ob, 'maint', mt, 'fees', fi, 'otherIn', oi, 'spent', sp,
                            'fund', ob + mt + fi + oi - sp, 'byCat', bycat, 'houses', hs);
end $$;

-- A person not yet in the colony asks to join by the colony code.
create or replace function public.request_join(p_code text, p_name text, p_house text, p_note text default '')
returns text
language plpgsql security definer set search_path = public as $$
declare c public.colonies;
begin
  if auth.uid() is null then raise exception 'login required'; end if;
  select * into c from public.colonies where code = upper(trim(coalesce(p_code,''))) and active;
  if c.id is null then raise exception 'यह कॉलोनी कोड सही नहीं है। कमेटी से सही कोड पूछें।' using errcode = 'P0001'; end if;
  if public.cs_role(c.id) is not null then raise exception 'आप इस कॉलोनी में पहले से जुड़े हैं।' using errcode = 'P0001'; end if;
  if coalesce(trim(p_name),'') = '' or coalesce(trim(p_house),'') = '' then raise exception 'नाम और मकान नंबर लिखें।' using errcode = 'P0001'; end if;
  insert into public.join_requests(colony_id, user_id, name, house, note, phone10, email, status)
  values (c.id, auth.uid(), left(trim(p_name), 80), left(trim(p_house), 20), left(coalesce(p_note,''), 300),
          public.cs_phone10(), public.cs_email(), 'pending')
  on conflict (colony_id, user_id) do update
    set name = excluded.name, house = excluded.house, note = excluded.note, status = 'pending', created_at = now();
  return c.name;
end $$;

create or replace function public.docs_touch() returns trigger
language plpgsql as $$
begin new.updated_at := now(); return new; end $$;
drop trigger if exists docs_touch on public.docs;
create trigger docs_touch before update on public.docs for each row execute function public.docs_touch();

-- Decide on the server which house a record belongs to, who created it, and keep the
-- committee-only fields out of residents' hands.
create or replace function public.docs_scope() returns trigger
language plpgsql security definer set search_path = public as $$
declare admin boolean; changed boolean;
begin
  new.house_id := case
    when new.collection = 'houses' then new.id
    when public.cs_house_coll(new.collection)
      then coalesce(nullif(new.data->>'houseId',''), case when new.collection = 'complaints' then '' else new.data->>'house' end, '')
    else '' end;
  if tg_op = 'INSERT' then
    new.created_by := coalesce(auth.uid(), new.created_by);
  else
    new.created_by := old.created_by;
  end if;
  admin := auth.uid() is null or public.cs_role(new.colony_id) = 'admin';
  if not admin then
    if tg_op = 'INSERT' and new.collection = 'complaints' then
      new.data := new.data || jsonb_build_object('status', 'new', 'reply', '');
    elsif tg_op = 'INSERT' and new.collection = 'payclaims' then
      new.data := new.data || jsonb_build_object('status', 'pending', 'by', auth.uid()::text);
    elsif new.collection = 'tenants' then
      if tg_op = 'INSERT' then
        new.data := (new.data - 'verified' - 'verifiedBy' - 'verifiedAt' - 'adminNote')
                    || jsonb_build_object('verified', false);
      else
        -- Committee fields stay as they were. If the resident changed the tenant's details
        -- (not just "left the house"), the committee has to check them again.
        changed := (new.data - 'verified' - 'verifiedBy' - 'verifiedAt' - 'adminNote' - 'reverify'
                             - 'status' - 'leftOn' - 'updated')
          is distinct from (old.data - 'verified' - 'verifiedBy' - 'verifiedAt' - 'adminNote' - 'reverify'
                             - 'status' - 'leftOn' - 'updated');
        new.data := (new.data - 'verified' - 'verifiedBy' - 'verifiedAt' - 'adminNote' - 'reverify')
                    || jsonb_strip_nulls(jsonb_build_object(
                         'verified', case when changed then 'false'::jsonb else coalesce(old.data->'verified', 'false'::jsonb) end,
                         'reverify', case when changed and coalesce((old.data->>'verified')::boolean, false) then 'true'::jsonb
                                          else old.data->'reverify' end,
                         'verifiedBy', old.data->'verifiedBy', 'verifiedAt', old.data->'verifiedAt',
                         'adminNote', old.data->'adminNote'));
      end if;
    end if;
  end if;
  return new;
end $$;
-- Published account statements: only अध्यक्ष / कोषाध्यक्ष (or the app owner) may add, change or remove them.
create or replace function public.docs_reports_guard() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if coalesce(new.collection, old.collection) = 'reports' and auth.uid() is not null
     and not public.cs_can_publish(coalesce(new.colony_id, old.colony_id)) then
    raise exception 'हिसाब सिर्फ़ अध्यक्ष या कोषाध्यक्ष प्रकाशित कर सकते हैं।' using errcode = 'P0001';
  end if;
  return coalesce(new, old);
end $$;
drop trigger if exists docs_reports_guard on public.docs;
create trigger docs_reports_guard before insert or update or delete on public.docs
  for each row execute function public.docs_reports_guard();

drop trigger if exists docs_scope on public.docs;
create trigger docs_scope before insert or update on public.docs for each row execute function public.docs_scope();

-- Never leave a colony without an admin.
create or replace function public.members_keep_admin() returns trigger
language plpgsql security definer set search_path = public as $$
declare cid uuid;
begin
  cid := coalesce(old.colony_id, new.colony_id);
  if not exists (select 1 from public.colonies where id = cid) then return null; end if;
  if not exists (select 1 from public.members where colony_id = cid and role = 'admin' and not blocked) then
    raise exception 'कॉलोनी में कम से कम एक एडमिन होना ज़रूरी है' using errcode = 'P0001';
  end if;
  return null;
end $$;
drop trigger if exists members_keep_admin on public.members;
create constraint trigger members_keep_admin after update or delete on public.members
  deferrable initially deferred for each row execute function public.members_keep_admin();

-- Only अध्यक्ष / सचिव / app owner may add, change or remove a committee (admin) login.
create or replace function public.members_guard() returns trigger
language plpgsql security definer set search_path = public as $$
declare cid uuid; touches boolean;
begin
  if auth.uid() is null or public.cs_is_platform_admin() then return coalesce(new, old); end if;
  cid := coalesce(new.colony_id, old.colony_id);
  touches := (tg_op <> 'INSERT' and old.role = 'admin') or (tg_op <> 'DELETE' and new.role = 'admin');
  if touches and not public.cs_is_chief(cid) then
    raise exception 'सिर्फ़ अध्यक्ष या सचिव ही कमेटी (एडमिन) सदस्य जोड़, बदल या हटा सकते हैं।' using errcode = 'P0001';
  end if;
  if tg_op = 'UPDATE' and new.colony_id <> old.colony_id then
    raise exception 'सदस्य की कॉलोनी नहीं बदली जा सकती।' using errcode = 'P0001';
  end if;
  return coalesce(new, old);
end $$;
drop trigger if exists members_guard on public.members;
create trigger members_guard before insert or update or delete on public.members
  for each row execute function public.members_guard();

-- Write every change of the members list to member_audit.
create or replace function public.members_audit() returns trigger
language plpgsql security definer set search_path = public as $$
declare r public.members; lbl text;
begin
  r := coalesce(new, old);
  if not exists (select 1 from public.colonies where id = r.colony_id) then return null; end if;
  lbl := case when public.cs_is_platform_admin() then 'ऐप मालिक' else '' end;
  if lbl = '' then
    select coalesce(nullif(m.name,''), m.phone10, m.email) || case when m.post <> '' then ' (' || m.post || ')' else '' end
      into lbl from public.cs_me(r.colony_id) m where m.id is not null;
  end if;
  if lbl is null or lbl = '' then lbl := coalesce(nullif(public.cs_phone10(),''), public.cs_email(), 'सिस्टम'); end if;
  if tg_op = 'UPDATE' and old.role = new.role and old.post = new.post and old.blocked = new.blocked
     and old.name = new.name and old.phone10 = new.phone10 and old.email = new.email
     and old.house = new.house and old.house_id = new.house_id then
    return null;
  end if;
  insert into public.member_audit(colony_id, actor, actor_label, action, member_name, member_login,
                                  old_role, new_role, old_post, new_post, blocked)
  values (r.colony_id, auth.uid(), lbl, lower(tg_op), r.name, coalesce(nullif(r.phone10,''), r.email),
          case when tg_op = 'INSERT' then '' else old.role end,
          case when tg_op = 'DELETE' then '' else new.role end,
          case when tg_op = 'INSERT' then '' else old.post end,
          case when tg_op = 'DELETE' then '' else new.post end,
          case when tg_op = 'DELETE' then null else new.blocked end);
  return null;
end $$;
drop trigger if exists members_audit on public.members;
create trigger members_audit after insert or update or delete on public.members
  for each row execute function public.members_audit();

-- ---------------------------------------------------------------------
-- 3. Row level security
-- ---------------------------------------------------------------------
alter table public.colonies        enable row level security;
alter table public.members         enable row level security;
alter table public.platform_admins enable row level security;
alter table public.docs            enable row level security;
alter table public.member_audit    enable row level security;
alter table public.join_requests   enable row level security;

drop policy if exists colonies_read   on public.colonies;
drop policy if exists colonies_update on public.colonies;
drop policy if exists colonies_owner  on public.colonies;
create policy colonies_read   on public.colonies for select to authenticated using (public.cs_role(id) is not null);
create policy colonies_owner  on public.colonies for all    to authenticated using (public.cs_is_platform_admin()) with check (public.cs_is_platform_admin());
-- (Committee admins cannot change plan / paid_until / active; only the app owner can.)

drop policy if exists members_read  on public.members;
drop policy if exists members_write on public.members;
create policy members_read on public.members for select to authenticated using (
  public.cs_role(colony_id) = 'admin'
  or (phone10 <> '' and phone10 = public.cs_phone10())
  or (email <> '' and lower(email) = public.cs_email()));
create policy members_write on public.members for all to authenticated
  using (public.cs_role(colony_id) = 'admin') with check (public.cs_role(colony_id) = 'admin');

drop policy if exists platform_admins_self on public.platform_admins;
create policy platform_admins_self on public.platform_admins for select to authenticated using (user_id = auth.uid());

drop policy if exists member_audit_read on public.member_audit;
create policy member_audit_read on public.member_audit for select to authenticated
  using (public.cs_role(colony_id) = 'admin');

drop policy if exists join_requests_read  on public.join_requests;
drop policy if exists join_requests_admin on public.join_requests;
create policy join_requests_read  on public.join_requests for select to authenticated
  using (user_id = auth.uid() or public.cs_role(colony_id) = 'admin');
create policy join_requests_admin on public.join_requests for update to authenticated
  using (public.cs_role(colony_id) = 'admin') with check (public.cs_role(colony_id) = 'admin');
drop policy if exists join_requests_del on public.join_requests;
create policy join_requests_del on public.join_requests for delete to authenticated
  using (public.cs_role(colony_id) = 'admin');

drop policy if exists docs_read   on public.docs;
drop policy if exists docs_insert on public.docs;
drop policy if exists docs_update on public.docs;
drop policy if exists docs_delete on public.docs;
create policy docs_read on public.docs for select to authenticated
  using (public.cs_can_read(colony_id, collection, house_id, created_by));
create policy docs_insert on public.docs for insert to authenticated with check (
  public.cs_role(colony_id) = 'admin'
  or (public.cs_role(colony_id) = 'resident' and (
        public.cs_own_doc(collection, id)
     or (collection = 'complaints' and house_id in ('', public.cs_my_house(colony_id)))
     or (collection in ('payclaims','tenants') and house_id <> '' and house_id = public.cs_my_house(colony_id)))));
create policy docs_update on public.docs for update to authenticated
  using (public.cs_role(colony_id) = 'admin'
     or (public.cs_role(colony_id) = 'resident' and (public.cs_own_doc(collection, id)
         or (collection = 'tenants' and house_id <> '' and house_id = public.cs_my_house(colony_id)))))
  with check (public.cs_role(colony_id) = 'admin'
     or (public.cs_role(colony_id) = 'resident' and (public.cs_own_doc(collection, id)
         or (collection = 'tenants' and house_id <> '' and house_id = public.cs_my_house(colony_id)))));
create policy docs_delete on public.docs for delete to authenticated
  using (public.cs_role(colony_id) = 'admin'
     or (public.cs_role(colony_id) = 'resident' and (public.cs_own_doc(collection, id)
         or (collection = 'tenants' and house_id <> '' and house_id = public.cs_my_house(colony_id)))));

-- ---------------------------------------------------------------------
-- 4. Privileges
-- ---------------------------------------------------------------------
revoke all on public.colonies, public.members, public.platform_admins, public.docs,
  public.member_audit, public.join_requests from anon;
grant select, insert, update, delete on public.colonies, public.members, public.docs to authenticated;
grant select on public.platform_admins, public.member_audit to authenticated;
grant select, update, delete on public.join_requests to authenticated;
revoke execute on function public.claim_platform_admin(), public.create_colony(text,text,text,text),
  public.my_colonies(), public.cs_has_owner(), public.doc_patch(uuid,text,text,jsonb),
  public.my_house_update(uuid,jsonb), public.colony_summary(uuid), public.request_join(text,text,text,text)
  from anon, public;
grant execute on function public.cs_role(uuid), public.cs_role_path(text), public.cs_is_platform_admin(),
  public.cs_me(uuid), public.cs_my_house(uuid), public.cs_is_chief(uuid), public.cs_can_publish(uuid), public.cs_can_read(uuid,text,text,uuid),
  public.cs_file_ok(text,boolean), public.cs_public_coll(text), public.cs_house_coll(text),
  public.my_colonies(), public.cs_has_owner(), public.claim_platform_admin(),
  public.create_colony(text,text,text,text), public.doc_patch(uuid,text,text,jsonb),
  public.my_house_update(uuid,jsonb), public.colony_summary(uuid), public.request_join(text,text,text,text),
  public.cs_phone10(), public.cs_email(), public.cs_resident_insert(text), public.cs_own_doc(text,text) to authenticated;

-- ---------------------------------------------------------------------
-- 5. Live updates (Realtime) — Supabase applies the same read rules to live updates.
-- ---------------------------------------------------------------------
do $$
begin
  if not exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    create publication supabase_realtime;
  end if;
  if not exists (select 1 from pg_publication_tables
                 where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'docs') then
    alter publication supabase_realtime add table public.docs;
  end if;
end $$;

-- ---------------------------------------------------------------------
-- 6. Photo storage (private bucket)
--    <colony>/<file>            colony-wide photos (gallery, bills, committee): members read, committee writes
--    <colony>/h/<house>/<file>  a house's own photos (tenant photo, Aadhaar copy, ID, complaint photo):
--                               only that house and the committee
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('colony', 'colony', false, 5242880, array['image/jpeg','image/png','image/webp','image/gif'])
on conflict (id) do nothing;

drop policy if exists colony_files_read   on storage.objects;
drop policy if exists colony_files_insert on storage.objects;
drop policy if exists colony_files_update on storage.objects;
drop policy if exists colony_files_delete on storage.objects;
create policy colony_files_read   on storage.objects for select to authenticated
  using (bucket_id = 'colony' and public.cs_file_ok(name, false));
create policy colony_files_insert on storage.objects for insert to authenticated
  with check (bucket_id = 'colony' and public.cs_file_ok(name, true));
create policy colony_files_update on storage.objects for update to authenticated
  using (bucket_id = 'colony' and public.cs_file_ok(name, true));
create policy colony_files_delete on storage.objects for delete to authenticated
  using (bucket_id = 'colony' and public.cs_file_ok(name, true));

-- Done. Next: create the app owner from inside the app (first login → "मैं इस ऐप का मालिक हूँ").
