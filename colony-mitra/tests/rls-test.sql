-- Colony Mitra · database privacy tests. Run on a throwaway Postgres after
-- supabase-stub.sql and schema.sql:  psql -v ON_ERROR_STOP=1 -f rls-test.sql
-- Every result line starts with PASS or FAIL.

-- ---------- helpers (run as the test superuser) ----------
create or replace function t_err(q text, name text) returns text language plpgsql as $$
begin execute q; return 'FAIL ' || name || ' (was allowed)';
exception when others then return 'PASS ' || name || ' [' || left(sqlerrm, 60) || ']'; end $$;
create or replace function t_ok(q text, name text) returns text language plpgsql as $$
begin execute q; return 'PASS ' || name;
exception when others then return 'FAIL ' || name || ' [' || sqlerrm || ']'; end $$;
create or replace function t_is(cond boolean, name text) returns text language sql as $$
  select case when coalesce(cond, false) then 'PASS ' else 'FAIL ' end || name $$;
grant execute on function t_err(text,text), t_ok(text,text), t_is(boolean,text) to authenticated;

-- ---------- test data ----------
insert into auth.users(id) values
 ('00000000-0000-0000-0000-00000000000a'), ('00000000-0000-0000-0000-0000000000a1'),
 ('00000000-0000-0000-0000-0000000000a3'), ('00000000-0000-0000-0000-0000000000b1'),
 ('00000000-0000-0000-0000-0000000000b2'), ('00000000-0000-0000-0000-0000000000c9'),
 ('00000000-0000-0000-0000-0000000000d5');
insert into public.platform_admins(user_id) values ('00000000-0000-0000-0000-00000000000a');
insert into public.colonies(id, name, code) values ('11111111-1111-1111-1111-111111111111', 'लक्ष्मण विहार', 'LV1234');
insert into public.members(colony_id, name, phone10, role, post, house, house_id, blocked) values
 ('11111111-1111-1111-1111-111111111111', 'अध्यक्ष जी',   '9999900001', 'admin',    'अध्यक्ष',   'A-1', 'h0', false),
 ('11111111-1111-1111-1111-111111111111', 'कोषाध्यक्ष जी', '9999900003', 'admin',    'कोषाध्यक्ष', '',    '',   false),
 ('11111111-1111-1111-1111-111111111111', 'निवासी एक',    '9999900002', 'resident', '',         'A-12', 'h1', false),
 ('11111111-1111-1111-1111-111111111111', 'निवासी दो',    '9999900004', 'resident', '',         'B-3',  'h2', false),
 ('11111111-1111-1111-1111-111111111111', 'रोका गया',     '9999900005', 'resident', '',         'A-12', 'h1', true);
insert into public.docs(colony_id, collection, id, data, created_by) values
 ('11111111-1111-1111-1111-111111111111','config','main','{"name":"लक्ष्मण विहार","charge":500,"openBal":1000}',null),
 ('11111111-1111-1111-1111-111111111111','houses','h1','{"no":"A-12","owner":"निवासी एक","ownerPhone":"9999900002"}',null),
 ('11111111-1111-1111-1111-111111111111','houses','h2','{"no":"B-3","owner":"निवासी दो","ownerPhone":"9999900004"}',null),
 ('11111111-1111-1111-1111-111111111111','payments','h1_2026-09','{"house":"h1","month":"2026-09","amount":500}',null),
 ('11111111-1111-1111-1111-111111111111','payments','h2_2026-09','{"house":"h2","month":"2026-09","amount":500}',null),
 ('11111111-1111-1111-1111-111111111111','tenants','t1','{"house":"h1","name":"किराएदार एक","aadhaarLast4":"1111","verified":true}','00000000-0000-0000-0000-0000000000b1'),
 ('11111111-1111-1111-1111-111111111111','tenants','t2','{"house":"h2","name":"किराएदार दो","aadhaarLast4":"2222"}','00000000-0000-0000-0000-0000000000b2'),
 ('11111111-1111-1111-1111-111111111111','complaints','c1','{"houseId":"h1","house":"A-12","title":"स्ट्रीट लाइट","status":"new"}','00000000-0000-0000-0000-0000000000b1'),
 ('11111111-1111-1111-1111-111111111111','complaints','c2','{"houseId":"h2","house":"B-3","title":"नाली","status":"new"}','00000000-0000-0000-0000-0000000000b2'),
 ('11111111-1111-1111-1111-111111111111','vehicles','v1','{"house":"h1","number":"CG04AB1111"}',null),
 ('11111111-1111-1111-1111-111111111111','vehicles','v2','{"house":"h2","number":"CG04AB2222"}',null),
 ('11111111-1111-1111-1111-111111111111','notices','n1','{"title":"आम सभा"}',null),
 ('11111111-1111-1111-1111-111111111111','expenses','e1','{"kind":"out","amount":300,"cat":"सफाई कर्मचारी","title":"सफाई"}',null),
 ('11111111-1111-1111-1111-111111111111','inbox','i0','{"house":"","title":"सबके लिए"}',null),
 ('11111111-1111-1111-1111-111111111111','inbox','i1','{"house":"h1","title":"A-12 का बकाया"}',null),
 ('11111111-1111-1111-1111-111111111111','inbox','i2','{"house":"h2","title":"B-3 का बकाया"}',null),
 ('11111111-1111-1111-1111-111111111111','fees','f1','{"title":"नवरात्रि गरबा","amount":501}',null),
 ('11111111-1111-1111-1111-111111111111','feepay','f1_h1','{"fee":"f1","house":"h1","amount":501}',null),
 ('11111111-1111-1111-1111-111111111111','feepay','f1_h2','{"fee":"f1","house":"h2","amount":501}',null);
insert into storage.objects(bucket_id, name) values
 ('colony','11111111-1111-1111-1111-111111111111/gallery1.jpg'),
 ('colony','11111111-1111-1111-1111-111111111111/h/h1/tenant1.jpg'),
 ('colony','11111111-1111-1111-1111-111111111111/h/h2/tenant2.jpg');

select t_is((select house_id from docs where id='t1')='h1', 'server sets house_id from data.house');
select t_is((select house_id from docs where id='c1')='h1', 'server sets complaint house_id from houseId');
select t_is((select house_id from docs where id='h2')='h2', 'house doc house_id = its id');
select t_is((select house_id from docs where id='i0')='', 'broadcast message has no house');

-- ======================= Resident 1 (house h1) =======================
begin;
set local role authenticated;
set local request.jwt.claims = '{"sub":"00000000-0000-0000-0000-0000000000b1","phone":"919999900002"}';
select t_is(public.cs_role('11111111-1111-1111-1111-111111111111')='resident', 'R1 role = resident');
select t_is((select count(*) from docs where collection='houses')=1 and exists(select 1 from docs where id='h1'), 'R1 sees only own house');
select t_is((select count(*) from docs where collection='payments')=1, 'R1 sees only own payments');
select t_is((select count(*) from docs where collection='tenants')=1 and exists(select 1 from docs where id='t1'), 'R1 sees only own tenants');
select t_is((select count(*) from docs where collection='complaints')=1, 'R1 sees only own complaints');
select t_is((select count(*) from docs where collection='vehicles')=1, 'R1 sees only own vehicles');
select t_is((select count(*) from docs where collection='inbox')=2 and not exists(select 1 from docs where id='i2'), 'R1 sees broadcast + own messages only');
select t_is((select count(*) from docs where collection='feepay')=1, 'R1 sees only own fee payments');
select t_is((select count(*) from docs where collection='expenses')=0, 'R1 cannot read the cash book');
select t_is((select count(*) from docs where collection in ('notices','fees','config'))=3, 'R1 sees notices, fees, config');
select t_is((select count(*) from members)=1, 'R1 sees only own member row');
select t_is((select count(*) from member_audit)=0, 'R1 cannot read admin audit log');
select t_is((public.colony_summary('11111111-1111-1111-1111-111111111111')->>'fund')::numeric = 1000+1000+1002-300, 'R1 gets fund total only (1000+1000+1002-300)');
select t_is((select code from public.my_colonies())='', 'R1 is not shown the colony join code');
select t_err($q$insert into docs(colony_id,collection,id,data) values ('11111111-1111-1111-1111-111111111111','complaints','cx','{"houseId":"h2","title":"x"}')$q$, 'R1 cannot file a complaint as house h2');
select t_ok($q$insert into docs(colony_id,collection,id,data) values ('11111111-1111-1111-1111-111111111111','complaints','c3','{"houseId":"h1","title":"कचरा गाड़ी नहीं आई","status":"done","reply":"हल"}')$q$, 'R1 files own complaint');
select t_is((select data->>'status' from docs where id='c3')='new' and (select data->>'reply' from docs where id='c3')='', 'R1 cannot set complaint status/reply');
select t_err($q$insert into docs(colony_id,collection,id,data) values ('11111111-1111-1111-1111-111111111111','payclaims','px','{"house":"h2","amount":500}')$q$, 'R1 cannot claim payment for h2');
select t_ok($q$insert into docs(colony_id,collection,id,data) values ('11111111-1111-1111-1111-111111111111','payclaims','p1','{"house":"h1","amount":500,"status":"approved"}')$q$, 'R1 sends payment claim for own house');
select t_is((select data->>'status' from docs where id='p1')='pending', 'R1 claim forced to pending');
select t_ok($q$insert into docs(colony_id,collection,id,data) values ('11111111-1111-1111-1111-111111111111','tenants','t3','{"house":"h1","name":"नया किराएदार","verified":true,"verifiedBy":"me"}')$q$, 'R1 adds tenant to own house');
select t_is((select data->>'verified' from docs where id='t3')='false' and (select data ? 'verifiedBy' from docs where id='t3') = false, 'R1 cannot mark own tenant verified');
select t_ok($q$select doc_patch('11111111-1111-1111-1111-111111111111','tenants','t1','{"status":"active","updated":"2026-10-11","verified":false}')$q$, 'R1 saves tenant without changing details');
select t_is((select data->>'verified' from docs where id='t1')='true', 'unchanged details keep committee verification');
select t_ok($q$select doc_patch('11111111-1111-1111-1111-111111111111','tenants','t1','{"phone":"9876543210","verified":true}')$q$, 'R1 edits own tenant details');
select t_is((select data->>'verified' from docs where id='t1')='false' and (select data->>'reverify' from docs where id='t1')='true' and (select data->>'phone' from docs where id='t1')='9876543210', 'changed details need a fresh committee check');
select t_err($q$select doc_patch('11111111-1111-1111-1111-111111111111','tenants','t2','{"name":"x"}')$q$, 'R1 cannot edit h2 tenant');
select t_err($q$select doc_patch('11111111-1111-1111-1111-111111111111','tenants','t1','{"house":"h2"}')$q$, 'R1 cannot move tenant to h2');
select t_err($q$select doc_patch('11111111-1111-1111-1111-111111111111','houses','h1','{"owner":"hack"}')$q$, 'R1 cannot edit house record directly');
select t_ok($q$select my_house_update('11111111-1111-1111-1111-111111111111','{"family":"पत्नी, 2 बच्चे","members":4,"owner":"hack","no":"Z-9"}')$q$, 'R1 updates own family details');
select t_is((select data->>'family' from docs where id='h1')='पत्नी, 2 बच्चे' and (select data->>'owner' from docs where id='h1')='निवासी एक' and (select data->>'no' from docs where id='h1')='A-12', 'my_house_update changes only family fields');
select t_err($q$insert into docs(colony_id,collection,id,data) values ('11111111-1111-1111-1111-111111111111','notices','nx','{"title":"x"}')$q$, 'R1 cannot post a notice');
select t_err($q$insert into docs(colony_id,collection,id,data) values ('11111111-1111-1111-1111-111111111111','inbox','ix','{"house":"","title":"x"}')$q$, 'R1 cannot send messages');
delete from docs where id in ('h1_2026-09','h2_2026-09','e1','n1');
select t_is((select count(*) from docs where id in ('h1_2026-09','n1'))=2, 'R1 cannot delete payments or notices');
select t_err($q$insert into members(colony_id,name,phone10,role) values ('11111111-1111-1111-1111-111111111111','x','9000000001','admin')$q$, 'R1 cannot add members');
select t_err($q$insert into members(colony_id,name,phone10,role) values ('11111111-1111-1111-1111-111111111111','x','9000000001','resident')$q$, 'R1 cannot add resident members');
update members set role='admin' where phone10='9999900002';
select t_is(public.cs_role('11111111-1111-1111-1111-111111111111')='resident', 'R1 still resident after update attempt');
select t_ok($q$insert into storage.objects(bucket_id,name) values ('colony','11111111-1111-1111-1111-111111111111/h/h1/new.jpg')$q$, 'R1 uploads to own house folder');
select t_err($q$insert into storage.objects(bucket_id,name) values ('colony','11111111-1111-1111-1111-111111111111/h/h2/new.jpg')$q$, 'R1 cannot upload to h2 folder');
select t_err($q$insert into storage.objects(bucket_id,name) values ('colony','11111111-1111-1111-1111-111111111111/gallery2.jpg')$q$, 'R1 cannot upload colony-wide photo');
select t_is((select count(*) from storage.objects where name like '%/h/h2/%')=0, 'R1 cannot see h2 files');
select t_is((select count(*) from storage.objects where name like '%gallery1.jpg')=1, 'R1 sees gallery photo');
select t_err($q$select request_join('LV1234','x','A-12')$q$, 'R1 cannot re-join own colony');
commit;

-- ======================= Treasurer: admin, not अध्यक्ष/सचिव =======================
begin;
set local role authenticated;
set local request.jwt.claims = '{"sub":"00000000-0000-0000-0000-0000000000a3","phone":"919999900003"}';
select t_is(public.cs_role('11111111-1111-1111-1111-111111111111')='admin', 'T role = admin');
select t_is(not public.cs_is_chief('11111111-1111-1111-1111-111111111111'), 'T is not chief');
select t_is((select count(*) from docs where collection='tenants')=3 and (select count(*) from docs where collection='houses')=2, 'T sees all houses and tenants');
select t_is((select count(*) from members)=5, 'T sees all members');
select t_ok($q$insert into members(colony_id,name,phone10,role,house,house_id) values ('11111111-1111-1111-1111-111111111111','नया निवासी','9999900006','resident','C-1','')$q$, 'T adds a resident');
select t_err($q$insert into members(colony_id,name,phone10,role) values ('11111111-1111-1111-1111-111111111111','नया एडमिन','9999900007','admin')$q$, 'T cannot add an admin');
select t_err($q$update members set role='admin' where phone10='9999900002'$q$, 'T cannot promote resident to admin');
select t_err($q$delete from members where phone10='9999900001'$q$, 'T cannot remove अध्यक्ष');
select t_err($q$update members set post='अध्यक्ष' where phone10='9999900003'$q$, 'T cannot make self अध्यक्ष');
select t_ok($q$select doc_patch('11111111-1111-1111-1111-111111111111','tenants','t2','{"verified":true,"verifiedBy":"कोषाध्यक्ष जी"}')$q$, 'T verifies a tenant');
select t_is((select data->>'verified' from docs where id='t2')='true', 'tenant verification saved for admin');
select t_ok($q$select doc_patch('11111111-1111-1111-1111-111111111111','complaints','c3','{"status":"work","reply":"कल ठीक होगा"}')$q$, 'T updates complaint status');
select t_is((select count(*) from member_audit)>=1, 'T reads audit log');
select t_ok($q$insert into docs(colony_id,collection,id,data) values ('11111111-1111-1111-1111-111111111111','reports','month_2026-09','{"label":"सितंबर 2026","closing":1700}')$q$, 'कोषाध्यक्ष publishes a statement');
update colonies set plan='large', paid_until='2099-01-01';
commit;
select t_is((select plan from colonies)='trial', 'committee cannot change own plan / paid_until');

-- ======================= अध्यक्ष (chief) =======================
begin;
set local role authenticated;
set local request.jwt.claims = '{"sub":"00000000-0000-0000-0000-0000000000a1","phone":"919999900001"}';
select t_is(public.cs_is_chief('11111111-1111-1111-1111-111111111111'), 'A is chief');
select t_ok($q$insert into members(colony_id,name,phone10,role,post) values ('11111111-1111-1111-1111-111111111111','सचिव जी','9999900008','admin','सचिव')$q$, 'A adds सचिव as admin');
select t_ok($q$update members set blocked=true where phone10='9999900004'$q$, 'A blocks resident 2');
select t_is((select code from public.my_colonies())='LV1234', 'admin sees the join code');
commit;
begin;
set local role authenticated;
set local request.jwt.claims = '{"sub":"00000000-0000-0000-0000-0000000000a1","phone":"919999900008"}';
select t_is(public.cs_role('11111111-1111-1111-1111-111111111111')='admin', 'new सचिव is admin');
select t_err($q$insert into docs(colony_id,collection,id,data) values ('11111111-1111-1111-1111-111111111111','reports','year_x','{}')$q$, 'सचिव cannot publish statements');
select t_err($q$delete from docs where collection='reports'$q$ || '; select 1/(select count(*)-1 from docs where collection=''reports'')', 'सचिव cannot delete statements');
commit;
begin;
set local role authenticated;
set local request.jwt.claims = '{"sub":"00000000-0000-0000-0000-0000000000b1","phone":"919999900002"}';
select t_is((select count(*) from docs where collection='reports')=1, 'resident can read published statement');
select t_err($q$insert into docs(colony_id,collection,id,data) values ('11111111-1111-1111-1111-111111111111','reports','fake','{}')$q$, 'resident cannot publish statements');
commit;
select t_is((select count(*) from member_audit where new_role='admin' and new_post='सचिव' and actor_label like 'अध्यक्ष जी%')=1, 'audit records who added the admin');
select t_is((select count(*) from member_audit where blocked = true and member_login='9999900004')=1, 'audit records blocking');

-- ======================= Blocked resident 2 =======================
begin;
set local role authenticated;
set local request.jwt.claims = '{"sub":"00000000-0000-0000-0000-0000000000b2","phone":"919999900004"}';
select t_is(public.cs_role('11111111-1111-1111-1111-111111111111') is null, 'blocked member has no role');
select t_is((select count(*) from docs)=0, 'blocked member reads nothing');
commit;

-- ======================= Outsider =======================
begin;
set local role authenticated;
set local request.jwt.claims = '{"sub":"00000000-0000-0000-0000-0000000000c9","phone":"919999900009"}';
select t_is((select count(*) from docs)=0 and (select count(*) from members)=0 and (select count(*) from colonies)=0, 'outsider reads nothing');
select t_err($q$select request_join('WRONG1','x','A-1')$q$, 'outsider: wrong code rejected');
select t_ok($q$select request_join('lv1234','नया परिवार','D-4','अभी शिफ़्ट हुए')$q$, 'outsider sends join request with code');
select t_is((select count(*) from join_requests)=1, 'outsider sees own request');
select t_err($q$insert into join_requests(colony_id,name) values ('11111111-1111-1111-1111-111111111111','x')$q$, 'outsider cannot insert requests directly');
commit;
begin;
set local role authenticated;
set local request.jwt.claims = '{"sub":"00000000-0000-0000-0000-0000000000b1","phone":"919999900002"}';
select t_is((select count(*) from join_requests)=0, 'resident cannot see join requests');
commit;
begin;
set local role authenticated;
set local request.jwt.claims = '{"sub":"00000000-0000-0000-0000-0000000000a3","phone":"919999900003"}';
select t_is((select count(*) from join_requests where status='pending')=1, 'committee sees join request');
select t_ok($q$update join_requests set status='approved'$q$, 'committee approves request');
commit;

-- ======================= App owner =======================
begin;
set local role authenticated;
set local request.jwt.claims = '{"sub":"00000000-0000-0000-0000-00000000000a","phone":"919000000000"}';
select t_ok($q$select create_colony('दूसरी कॉलोनी','नए अध्यक्ष','9888800001')$q$, 'owner creates a colony');
select t_is((select post from members where phone10='9888800001')='अध्यक्ष', 'first admin of new colony is अध्यक्ष');
select t_ok($q$update colonies set plan='large' where name='दूसरी कॉलोनी'$q$, 'owner changes plan');
commit;

-- keep-admin rule
begin;
set local role authenticated;
set local request.jwt.claims = '{"sub":"00000000-0000-0000-0000-00000000000a","phone":"919000000000"}';
select t_err($q$delete from members where phone10='9888800001'; set constraints all immediate$q$, 'colony cannot lose its last admin');
commit;
