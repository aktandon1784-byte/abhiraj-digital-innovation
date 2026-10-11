-- =====================================================================
--  कॉलोनी मित्र (Colony Mitra) · अभिराज डिजिटल
--  Supabase database setup — paste this whole file into
--  Supabase Dashboard → SQL Editor → New query → Run.
--  Safe to run again: every statement is idempotent.
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
alter table public.docs replica identity full;

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

-- 'admin', 'resident' or null for the signed-in person in colony c.
create or replace function public.cs_role(c uuid) returns text
language sql stable security definer set search_path = public as $$
  select case
    when auth.uid() is null then null
    when public.cs_is_platform_admin() then 'admin'
    else (
      select m.role from public.members m
      where m.colony_id = c
        and ((m.phone10 <> '' and m.phone10 = public.cs_phone10())
          or (m.email  <> '' and lower(m.email) = public.cs_email()))
      order by (m.role = 'admin') desc
      limit 1)
  end
$$;

-- Same as cs_role, for a storage path like '<colony-uuid>/photo.jpg'.
create or replace function public.cs_role_path(p text) returns text
language plpgsql stable security definer set search_path = public as $$
begin
  return public.cs_role(split_part(p, '/', 1)::uuid);
exception when others then
  return null;
end $$;

-- Colonies the signed-in person belongs to (used right after login).
create or replace function public.my_colonies()
returns table (colony_id uuid, name text, role text, house text, member_name text, active boolean)
language sql stable security definer set search_path = public as $$
  select c.id, c.name, public.cs_role(c.id),
         coalesce(m.house,''), coalesce(m.name,''), c.active
  from public.colonies c
  left join lateral (
    select * from public.members m
    where m.colony_id = c.id
      and ((m.phone10 <> '' and m.phone10 = public.cs_phone10())
        or (m.email  <> '' and lower(m.email) = public.cs_email()))
    order by (m.role = 'admin') desc limit 1) m on true
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

-- App owner creates a colony together with its first committee admin.
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
  insert into public.members(colony_id, name, phone10, email, role)
    values (cid, coalesce(p_admin_name,''), ph, lower(coalesce(trim(p_admin_email),'')), 'admin');
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

create or replace function public.docs_touch() returns trigger
language plpgsql as $$
begin new.updated_at := now(); return new; end $$;
drop trigger if exists docs_touch on public.docs;
create trigger docs_touch before update on public.docs for each row execute function public.docs_touch();

-- Never leave a colony without an admin.
create or replace function public.members_keep_admin() returns trigger
language plpgsql security definer set search_path = public as $$
declare cid uuid;
begin
  cid := coalesce(old.colony_id, new.colony_id);
  if not exists (select 1 from public.colonies where id = cid) then return null; end if;
  if not exists (select 1 from public.members where colony_id = cid and role = 'admin') then
    raise exception 'कॉलोनी में कम से कम एक एडमिन होना ज़रूरी है' using errcode = 'P0001';
  end if;
  return null;
end $$;
drop trigger if exists members_keep_admin on public.members;
create constraint trigger members_keep_admin after update or delete on public.members
  deferrable initially deferred for each row execute function public.members_keep_admin();

-- ---------------------------------------------------------------------
-- 3. Row level security
-- ---------------------------------------------------------------------
alter table public.colonies        enable row level security;
alter table public.members         enable row level security;
alter table public.platform_admins enable row level security;
alter table public.docs            enable row level security;

drop policy if exists colonies_read   on public.colonies;
drop policy if exists colonies_update on public.colonies;
drop policy if exists colonies_owner  on public.colonies;
create policy colonies_read   on public.colonies for select to authenticated using (public.cs_role(id) is not null);
create policy colonies_update on public.colonies for update to authenticated using (public.cs_role(id) = 'admin') with check (public.cs_role(id) = 'admin');
create policy colonies_owner  on public.colonies for all    to authenticated using (public.cs_is_platform_admin()) with check (public.cs_is_platform_admin());

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

-- Collections a resident may add to, and per-person vote collections.
create or replace function public.cs_resident_insert(col text) returns boolean
language sql immutable as $$ select col in ('complaints','payclaims') $$;
create or replace function public.cs_own_doc(col text, doc_id text) returns boolean
language sql stable as $$ select col in ('pollvotes','svcvotes','compvotes') and doc_id = auth.uid()::text $$;

drop policy if exists docs_read   on public.docs;
drop policy if exists docs_insert on public.docs;
drop policy if exists docs_update on public.docs;
drop policy if exists docs_delete on public.docs;
create policy docs_read on public.docs for select to authenticated
  using (public.cs_role(colony_id) is not null);
create policy docs_insert on public.docs for insert to authenticated with check (
  public.cs_role(colony_id) = 'admin'
  or (public.cs_role(colony_id) is not null
      and (public.cs_own_doc(collection, id)
           or (public.cs_resident_insert(collection) and created_by = auth.uid()))));
create policy docs_update on public.docs for update to authenticated
  using (public.cs_role(colony_id) = 'admin' or (public.cs_role(colony_id) is not null and public.cs_own_doc(collection, id)))
  with check (public.cs_role(colony_id) = 'admin' or (public.cs_role(colony_id) is not null and public.cs_own_doc(collection, id)));
create policy docs_delete on public.docs for delete to authenticated
  using (public.cs_role(colony_id) = 'admin' or (public.cs_role(colony_id) is not null and public.cs_own_doc(collection, id)));

-- ---------------------------------------------------------------------
-- 4. Privileges
-- ---------------------------------------------------------------------
revoke all on public.colonies, public.members, public.platform_admins, public.docs from anon;
grant select, insert, update, delete on public.colonies, public.members, public.docs to authenticated;
grant select on public.platform_admins to authenticated;
revoke execute on function public.claim_platform_admin(), public.create_colony(text,text,text,text),
  public.my_colonies(), public.cs_has_owner(), public.doc_patch(uuid,text,text,jsonb) from anon, public;
grant execute on function public.cs_role(uuid), public.cs_role_path(text), public.cs_is_platform_admin(),
  public.my_colonies(), public.cs_has_owner(), public.claim_platform_admin(),
  public.create_colony(text,text,text,text), public.doc_patch(uuid,text,text,jsonb),
  public.cs_phone10(), public.cs_email(), public.cs_resident_insert(text), public.cs_own_doc(text,text) to authenticated;

-- ---------------------------------------------------------------------
-- 5. Live updates (Realtime)
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
-- 6. Photo storage (private bucket, folder per colony)
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('colony', 'colony', false, 5242880, array['image/jpeg','image/png','image/webp','image/gif'])
on conflict (id) do nothing;

drop policy if exists colony_files_read   on storage.objects;
drop policy if exists colony_files_insert on storage.objects;
drop policy if exists colony_files_update on storage.objects;
drop policy if exists colony_files_delete on storage.objects;
create policy colony_files_read   on storage.objects for select to authenticated
  using (bucket_id = 'colony' and public.cs_role_path(name) is not null);
create policy colony_files_insert on storage.objects for insert to authenticated
  with check (bucket_id = 'colony' and public.cs_role_path(name) = 'admin');
create policy colony_files_update on storage.objects for update to authenticated
  using (bucket_id = 'colony' and public.cs_role_path(name) = 'admin');
create policy colony_files_delete on storage.objects for delete to authenticated
  using (bucket_id = 'colony' and public.cs_role_path(name) = 'admin');

-- Done. Next: create the app owner from inside the app (first login → "मैं इस ऐप का मालिक हूँ").
