/* कॉलोनी मित्र — offline demo / test backend.
   Same interface and the same access rules as the Supabase backend (colony-mitra/supabase/schema.sql):
   a resident receives only their own house's private records; only अध्यक्ष / सचिव manage admins. */
(function () {
  const KEY = 'cs-demo-v3', SKEY = 'cs-demo-session';
  const ls = { get(k) { try { return localStorage.getItem(k) } catch (_) { return null } }, set(k, v) { try { localStorage.setItem(k, v) } catch (_) {} }, del(k) { try { localStorage.removeItem(k) } catch (_) {} } };
  const clone = x => JSON.parse(JSON.stringify(x));
  const SEED = window.CS_DEMO_SEED || { colonies: [], members: [], docs: {}, owners: [], files: {} };
  let D; try { D = JSON.parse(ls.get(KEY)) } catch (_) {}
  if (!D) D = clone(SEED);
  D.meta = D.meta || {}; D.audit = D.audit || []; D.joins = D.joins || []; D.files = D.files || {};
  const save = () => { try { ls.set(KEY, JSON.stringify(D)) } catch (_) {} };
  const listeners = new Set();
  const notify = (cid, c) => setTimeout(() => listeners.forEach(l => l.cid === cid && l.fn(c)), 30);
  let session = null; try { session = JSON.parse(ls.get(SKEY)) } catch (_) {}
  const deny = () => { throw { code: '42501', message: 'new row violates row-level security policy' } };
  const rule = m => { throw { code: 'P0001', message: m } };
  const uidFor = k => 'u-' + Array.from(k).reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7).toString(16);
  const p10 = v => String(v || '').replace(/\D/g, '').slice(-10);
  const me = () => session && session.user;
  const isOwner = () => !!me() && D.owners.includes(me().id);
  const CHIEF = ['अध्यक्ष', 'सचिव'];
  const PUBLIC = ['config', 'notices', 'polls', 'pollvotes', 'services', 'svcvotes', 'committee', 'cameras', 'cctvlog', 'gallery', 'fees'];
  const HOUSE = ['houses', 'payments', 'payclaims', 'complaints', 'vehicles', 'tenants', 'feepay', 'inbox'];
  const ADMIN_ONLY_KEYS = ['verified', 'verifiedBy', 'verifiedAt', 'adminNote', 'reverify'];

  const matches = m => { const u = me(); if (!u) return false; const ph = p10(u.phone), em = String(u.email || '').toLowerCase(); return (m.phone10 && m.phone10 === ph) || (m.email && m.email.toLowerCase() === em) };
  function memberOf(cid) {
    const ms = D.members.filter(m => m.colony_id === cid && !m.blocked && matches(m));
    ms.sort((a, b) => (b.role === 'admin') - (a.role === 'admin') || (!!b.house_id) - (!!a.house_id));
    return ms[0] || null;
  }
  function role(cid) { if (!me()) return null; if (isOwner()) return 'admin'; const m = memberOf(cid); return m ? m.role : null }
  const myHouse = cid => (memberOf(cid) || {}).house_id || '';
  function isChief(cid) {
    if (isOwner()) return true; if (role(cid) !== 'admin') return false;
    const m = memberOf(cid);
    return CHIEF.includes(m && m.post) || !D.members.some(x => x.colony_id === cid && x.role === 'admin' && !x.blocked && CHIEF.includes(x.post));
  }
  const own = (c, id) => ['pollvotes', 'svcvotes', 'compvotes'].includes(c) && me() && id === me().id;
  const coll = (cid, c) => ((D.docs[cid] = D.docs[cid] || {})[c] = D.docs[cid][c] || {});
  const metaOf = (cid, c, id) => (((D.meta[cid] = D.meta[cid] || {})[c] = D.meta[cid][c] || {})[id] = D.meta[cid][c][id] || {});
  function houseOf(c, id, data) {
    if (c === 'houses') return id;
    if (!HOUSE.includes(c)) return '';
    return String(data.houseId || '') || (c === 'complaints' ? '' : String(data.house || ''));
  }
  function canRead(cid, c, id, data) {
    const r = role(cid); if (r === 'admin') return true; if (r !== 'resident') return false;
    if (PUBLIC.includes(c)) return true;
    const h = houseOf(c, id, data);
    if (c === 'inbox' && h === '') return true;
    if (HOUSE.includes(c) && h && h === myHouse(cid)) return true;
    const m = ((D.meta[cid] || {})[c] || {})[id];
    return !!m && m.by === me().id && ['complaints', 'payclaims', 'tenants'].includes(c);
  }
  function canInsert(cid, c, id, data) {
    const r = role(cid); if (r === 'admin') return true; if (r !== 'resident') return false;
    if (own(c, id)) return true;
    const h = houseOf(c, id, data), mh = myHouse(cid);
    if (c === 'complaints') return h === '' || h === mh;
    if (c === 'payclaims' || c === 'tenants') return h !== '' && h === mh;
    return false;
  }
  function canWrite(cid, c, id, data) {
    const r = role(cid); if (r === 'admin') return true; if (r !== 'resident') return false;
    if (own(c, id)) return true;
    const h = houseOf(c, id, data);
    return c === 'tenants' && h !== '' && h === myHouse(cid);
  }
  const stable = x => JSON.stringify(Object.keys(x).sort().reduce((o, k) => (o[k] = x[k], o), {}));
  function strip(x, keys) { const y = { ...x }; keys.forEach(k => delete y[k]); return y }
  /* the same as the server trigger docs_scope: residents cannot set committee-only fields */
  function scope(cid, c, data, old) {
    if (role(cid) === 'admin') return data;
    if (!old && c === 'complaints') return { ...data, status: 'new', reply: '' };
    if (!old && c === 'payclaims') return { ...data, status: 'pending', by: me().id };
    if (c === 'tenants') {
      if (!old) return { ...strip(data, ADMIN_ONLY_KEYS), verified: false };
      const cmp = x => stable(strip(x, [...ADMIN_ONLY_KEYS, 'status', 'leftOn', 'updated']));
      const changed = cmp(data) !== cmp(old);
      const out = { ...strip(data, ADMIN_ONLY_KEYS), verified: changed ? false : !!old.verified };
      const rv = changed && old.verified ? true : old.reverify; if (rv !== undefined) out.reverify = rv;
      ['verifiedBy', 'verifiedAt', 'adminNote'].forEach(k => { if (old[k] !== undefined) out[k] = old[k] });
      return out;
    }
    return data;
  }
  function audit(cid, action, m, old) {
    const a = memberOf(cid);
    const label = isOwner() ? 'ऐप मालिक' : a ? (a.name || a.phone10) + (a.post ? ' (' + a.post + ')' : '') : '';
    D.audit.unshift({ colony_id: cid, at: new Date().toISOString(), actor: me() && me().id, actor_label: label, action, member_name: (m || old).name || '', member_login: (m || old).phone10 || (m || old).email || '',
      old_role: old ? old.role : '', new_role: m ? m.role : '', old_post: old ? old.post || '' : '', new_post: m ? m.post || '' : '', blocked: m ? !!m.blocked : null });
  }
  const liveAdmins = cid => D.members.filter(x => x.colony_id === cid && x.role === 'admin' && !x.blocked).length;
  function guard(cid, touchesAdmin) { if (touchesAdmin && !isChief(cid)) rule('सिर्फ़ अध्यक्ष या सचिव ही कमेटी (एडमिन) सदस्य जोड़, बदल या हटा सकते हैं।') }
  function fileOk(path, write) {
    const parts = String(path).split('/'), cid = parts[0], r = role(cid);
    if (!r) return false; if (r === 'admin') return true;
    if (parts[1] === 'h') return !!parts[2] && parts[2] === myHouse(cid);
    return !write;
  }
  const num = v => { const n = Number(v); return Number.isFinite(n) ? n : 0 };
  let pending = null;
  window.__csDemoReset = () => { ls.del(KEY); ls.del(SKEY); location.reload() };
  window.CS_BACKEND = {
    kind: 'demo',
    auth: {
      async session() { return session ? { user: session.user } : null },
      async sendOtp(t) { await new Promise(r => setTimeout(r, 150)); pending = t },
      async verifyOtp(t) {
        await new Promise(r => setTimeout(r, 150));
        if (String(t.token) !== '123456') throw { message: 'Token has expired or is invalid' };
        const key = t.phone ? '91' + t.phone : t.email;
        session = { user: { id: uidFor(key), phone: t.phone ? '91' + t.phone : '', email: t.email || '' } };
        ls.set(SKEY, JSON.stringify(session)); return { user: session.user };
      },
      async signOut() { session = null; ls.del(SKEY) }
    },
    async rpc(fn, a) {
      a = a || {};
      if (fn === 'my_colonies') return D.colonies.filter(c => role(c.id)).map(c => {
        const m = memberOf(c.id) || {};
        return { colony_id: c.id, name: c.name, role: role(c.id), house: m.house || '', member_name: m.name || '', active: c.active, post: m.post || '', house_id: m.house_id || '', code: role(c.id) === 'admin' ? c.code || '' : '' };
      });
      if (fn === 'cs_is_platform_admin') return isOwner();
      if (fn === 'cs_has_owner') return D.owners.length > 0;
      if (fn === 'claim_platform_admin') { if (D.owners.length) return false; D.owners.push(me().id); save(); return true }
      if (fn === 'create_colony') {
        if (!isOwner()) throw { message: 'only the app owner can create colonies' };
        const id = 'c-' + Date.now().toString(36);
        D.colonies.push({ id, name: a.p_name, plan: 'trial', paid_until: null, active: true, code: Math.random().toString(36).slice(2, 8).toUpperCase() });
        const m = { id: 'm-' + Date.now().toString(36), colony_id: id, name: a.p_admin_name || '', phone10: p10(a.p_admin_phone), email: (a.p_admin_email || '').toLowerCase(), role: 'admin', post: 'अध्यक्ष', house: '', house_id: '', blocked: false };
        D.members.push(m); audit(id, 'insert', m, null);
        coll(id, 'config').main = { name: a.p_name, charge: 500, start: new Date().toISOString().slice(0, 7), dueDay: 10, lateFee: 0, contacts: [] };
        save(); return id;
      }
      if (fn === 'doc_patch') {
        const cid = a.p_colony, c = a.p_collection, id = a.p_id, col = coll(cid, c), old = col[id];
        const nf = () => { throw { code: '42501', message: 'document not found or not allowed' } };
        if (!old || !canRead(cid, c, id, old) || !canWrite(cid, c, id, old)) nf();
        const merged = { ...old, ...clone(a.p_patch) };
        if (!canWrite(cid, c, id, merged)) deny();
        col[id] = scope(cid, c, merged, old); save(); notify(cid, c); return clone(col[id]);
      }
      if (fn === 'my_house_update') {
        const cid = a.p_colony; if (!role(cid)) deny();
        const h = myHouse(cid); if (!h) rule('आपका नंबर अभी किसी घर से नहीं जुड़ा है। कमेटी से कहें कि वे आपको आपके घर से जोड़ें।');
        const col = coll(cid, 'houses'); if (!col[h]) deny();
        const clean = {}; ['family', 'members', 'occ', 'altPhone', 'email', 'emergency', 'about'].forEach(k => { if (a.p_patch && k in a.p_patch) clean[k] = a.p_patch[k] });
        col[h] = { ...col[h], ...clean }; save(); notify(cid, 'houses'); return clone(col[h]);
      }
      if (fn === 'colony_summary') {
        const cid = a.p_colony; if (!role(cid)) deny();
        const docs = D.docs[cid] || {}, sum = (c, f) => Object.values(docs[c] || {}).filter(f || (() => true)).reduce((s, x) => s + num(x.amount), 0);
        const ob = num(((docs.config || {}).main || {}).openBal), mt = sum('payments'), fe = sum('feepay'), oi = sum('expenses', x => x.kind === 'in'), sp = sum('expenses', x => x.kind !== 'in');
        const byCat = {}; Object.values(docs.expenses || {}).filter(x => x.kind !== 'in').forEach(x => { const k = x.cat || 'अन्य'; byCat[k] = (byCat[k] || 0) + num(x.amount) });
        return { openBal: ob, maint: mt, fees: fe, otherIn: oi, spent: sp, fund: ob + mt + fe + oi - sp, byCat, houses: Object.keys(docs.houses || {}).length };
      }
      if (fn === 'request_join') {
        if (!me()) throw { message: 'login required' };
        const c = D.colonies.find(x => x.code && x.code === String(a.p_code || '').trim().toUpperCase() && x.active);
        if (!c) rule('यह कॉलोनी कोड सही नहीं है। कमेटी से सही कोड पूछें।');
        if (role(c.id)) rule('आप इस कॉलोनी में पहले से जुड़े हैं।');
        if (!String(a.p_name || '').trim() || !String(a.p_house || '').trim()) rule('नाम और मकान नंबर लिखें।');
        D.joins = D.joins.filter(j => !(j.colony_id === c.id && j.user_id === me().id));
        D.joins.push({ id: 'j-' + Math.random().toString(36).slice(2, 10), colony_id: c.id, user_id: me().id, name: a.p_name.trim(), house: a.p_house.trim(), note: a.p_note || '', phone10: p10(me().phone), email: me().email || '', status: 'pending', created_at: new Date().toISOString() });
        save(); return c.name;
      }
      throw { message: 'unknown rpc ' + fn };
    },
    colonies: {
      async all() { return isOwner() ? clone(D.colonies) : clone(D.colonies.filter(c => role(c.id))) },
      async update(id, p) { if (!isOwner()) deny(); Object.assign(D.colonies.find(c => c.id === id), p); save(); return [] }
    },
    members: {
      async list(cid) { const r = role(cid); if (r === 'admin') return clone(D.members.filter(m => m.colony_id === cid)); return clone(D.members.filter(m => m.colony_id === cid && matches(m))) },
      async add(row) {
        if (role(row.colony_id) !== 'admin') deny();
        guard(row.colony_id, row.role === 'admin');
        if (row.phone10 && D.members.some(m => m.colony_id === row.colony_id && m.phone10 === row.phone10)) throw { code: '23505', message: 'duplicate' };
        const m = { id: 'm-' + Math.random().toString(36).slice(2, 10), house: '', house_id: '', email: '', post: '', blocked: false, ...row };
        D.members.push(m); audit(row.colony_id, 'insert', m, null); save(); return [];
      },
      async addMany(rows) { for (const r of rows) await this.add(r); return [] },
      async update(id, p) {
        const m = D.members.find(x => x.id === id); if (!m || role(m.colony_id) !== 'admin') deny();
        guard(m.colony_id, m.role === 'admin' || p.role === 'admin');
        const before = { ...m }; Object.assign(m, p);
        if (!liveAdmins(m.colony_id)) { Object.keys(m).forEach(k => delete m[k]); Object.assign(m, before); rule('कॉलोनी में कम से कम एक एडमिन होना ज़रूरी है') }
        audit(m.colony_id, 'update', m, before); save(); return [];
      },
      async remove(id) {
        const m = D.members.find(x => x.id === id); if (!m || role(m.colony_id) !== 'admin') deny();
        guard(m.colony_id, m.role === 'admin');
        if (m.role === 'admin' && !m.blocked && liveAdmins(m.colony_id) === 1) rule('कॉलोनी में कम से कम एक एडमिन होना ज़रूरी है');
        D.members = D.members.filter(x => x.id !== id); audit(m.colony_id, 'delete', null, m); save(); return [];
      },
      async audit(cid) { if (role(cid) !== 'admin') return []; return clone(D.audit.filter(a => a.colony_id === cid).slice(0, 60)) }
    },
    joins: {
      async list(cid) { if (role(cid) !== 'admin') return []; return clone(D.joins.filter(j => j.colony_id === cid && j.status === 'pending')) },
      async set(id, status) { const j = D.joins.find(x => x.id === id); if (!j || role(j.colony_id) !== 'admin') deny(); j.status = status; save(); return [] }
    },
    docs: {
      async listAll(cid) { if (!role(cid)) return []; const out = []; for (const [c, m] of Object.entries(D.docs[cid] || {})) for (const [id, data] of Object.entries(m)) if (canRead(cid, c, id, data)) out.push({ collection: c, id, data: clone(data) }); return out },
      async listColl(cid, c) { if (!role(cid)) return []; return Object.entries((D.docs[cid] || {})[c] || {}).filter(([id, data]) => canRead(cid, c, id, data)).map(([id, data]) => ({ id, data: clone(data) })) },
      async upsert(cid, c, id, data) {
        const col = coll(cid, c), old = col[id];
        if (old) { if (!canWrite(cid, c, id, old) || !canWrite(cid, c, id, data)) deny() } else if (!canInsert(cid, c, id, data)) deny();
        col[id] = scope(cid, c, clone(data), old); if (!old) metaOf(cid, c, id).by = me().id; save(); notify(cid, c);
      },
      async insert(cid, c, id, data) {
        if (!canInsert(cid, c, id, data)) deny();
        const col = coll(cid, c); if (col[id]) throw { code: '23505', message: 'duplicate' };
        col[id] = scope(cid, c, clone(data), null); metaOf(cid, c, id).by = me().id; save(); notify(cid, c);
      },
      async patch(cid, c, id, p) { return window.CS_BACKEND.rpc('doc_patch', { p_colony: cid, p_collection: c, p_id: id, p_patch: p }) },
      async del(cid, c, id) { const col = coll(cid, c), old = col[id]; if (!old || !canWrite(cid, c, id, old)) return; delete col[id]; save(); notify(cid, c) },
      subscribe(cid, fn) { const l = { cid, fn }; listeners.add(l); return () => listeners.delete(l) }
    },
    files: {
      async upload(cid, blob, house) {
        const path = cid + '/' + (house ? 'h/' + house + '/' : '') + Date.now() + '-' + Math.random().toString(36).slice(2, 8) + '.jpg';
        if (!fileOk(path, true)) deny();
        const url = await new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = rej; r.readAsDataURL(blob) });
        D.files[path] = url; save(); return { id: path };
      },
      async remove(path) { if (!fileOk(path, true)) deny(); delete D.files[path]; save() },
      async urls(paths) { const m = {}; paths.forEach(p => { if (D.files[p] && fileOk(p, false)) m[p] = D.files[p] }); return m }
    },
    async fn() { throw { message: 'डेमो में WhatsApp API नहीं चलता' } }
  };
})();
