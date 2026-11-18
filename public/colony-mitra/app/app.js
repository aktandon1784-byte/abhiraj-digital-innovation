/* =====================================================================
   कॉलोनी मित्र · अभिराज डिजिटल
   Part 1: backend (Supabase), live document store, login and colony picker.
   Part 2 (below): the colony screens.
   ===================================================================== */
'use strict';
const CFG = Object.assign({
  SUPABASE_URL: '', SUPABASE_ANON_KEY: '', APP_NAME: 'कॉलोनी मित्र', COMPANY: 'अभिराज डिजिटल',
  SUPPORT_WHATSAPP: '', SUPPORT_PHONE: '', LOGIN_METHODS: ['phone_sms', 'email'], WHATSAPP_API: false, OTP_LENGTH: 6
}, window.CS_CONFIG || {});
const PIX = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
const LS = {
  get(k) { try { return localStorage.getItem(k) } catch (_) { return null } },
  set(k, v) { try { localStorage.setItem(k, v) } catch (_) {} },
  del(k) { try { localStorage.removeItem(k) } catch (_) {} }
};
function newId() { return (crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2)).replace(/-/g, '').slice(0, 20) }
function phone10(v) { return String(v || '').replace(/\D/g, '').slice(-10) }
function mapErr(e) {
  if (!e) return { code: 'unknown', message: '' };
  if (['invalid_argument', 'rule', 'amt', 'opts', '23505', '23514'].includes(e.code)) return e;
  if (e.code === '42501' || /row-level security|not allowed|permission/i.test(e.message || '')) return { code: 'invalid_argument', message: e.message };
  if (e.code === 'P0001') return { code: 'rule', message: e.message };
  return { code: e.code || 'unknown', message: e.message || String(e) };
}

/* ---------- Supabase backend ---------- */
function makeSupabaseBackend() {
  if (!CFG.SUPABASE_URL || !CFG.SUPABASE_ANON_KEY || !window.supabase || /YOUR-PROJECT|YOUR-ANON/.test(CFG.SUPABASE_URL + CFG.SUPABASE_ANON_KEY)) return null;
  const sb = window.supabase.createClient(CFG.SUPABASE_URL, CFG.SUPABASE_ANON_KEY, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false, storageKey: 'colony-mitra-auth' }
  });
  const chk = r => { if (r.error) throw mapErr(r.error); return r.data };
  return {
    kind: 'supabase',
    auth: {
      async session() { const { data } = await sb.auth.getSession(); return data.session ? { user: data.session.user } : null },
      async sendOtp({ phone, email, channel }) {
        const r = phone ? await sb.auth.signInWithOtp({ phone: '+91' + phone, options: { channel: channel || 'sms' } })
          : await sb.auth.signInWithOtp({ email, options: { shouldCreateUser: true } });
        if (r.error) throw r.error;
      },
      async verifyOtp({ phone, email, token }) {
        const r = phone ? await sb.auth.verifyOtp({ phone: '+91' + phone, token, type: 'sms' })
          : await sb.auth.verifyOtp({ email, token, type: 'email' });
        if (r.error) throw r.error;
        return { user: r.data.user };
      },
      async signOut() { await sb.auth.signOut() }
    },
    async rpc(fn, args) { return chk(await sb.rpc(fn, args || {})) },
    colonies: {
      async all() { return chk(await sb.from('colonies').select('*').order('name')) },
      async update(id, patch) { return chk(await sb.from('colonies').update(patch).eq('id', id).select()) }
    },
    members: {
      async list(cid) { return chk(await sb.from('members').select('*').eq('colony_id', cid).order('name')) },
      async add(row) { return chk(await sb.from('members').insert(row).select()) },
      async addMany(rows) { if (!rows.length) return []; return chk(await sb.from('members').insert(rows).select()) },
      async update(id, patch) { return chk(await sb.from('members').update(patch).eq('id', id).select()) },
      async remove(id) { return chk(await sb.from('members').delete().eq('id', id)) }
    },
    docs: {
      async listAll(cid) {
        let out = [], from = 0;
        for (;;) {
          const rows = chk(await sb.from('docs').select('collection,id,data').eq('colony_id', cid).order('collection').order('id').range(from, from + 999));
          out = out.concat(rows); if (rows.length < 1000) break; from += 1000;
        }
        return out;
      },
      async listColl(cid, c) { return chk(await sb.from('docs').select('id,data').eq('colony_id', cid).eq('collection', c).limit(5000)) },
      async upsert(cid, c, id, data) { chk(await sb.from('docs').upsert({ colony_id: cid, collection: c, id, data }, { onConflict: 'colony_id,collection,id' })) },
      async insert(cid, c, id, data) { chk(await sb.from('docs').insert({ colony_id: cid, collection: c, id, data })) },
      async patch(cid, c, id, p) { return chk(await sb.rpc('doc_patch', { p_colony: cid, p_collection: c, p_id: id, p_patch: p })) },
      async del(cid, c, id) { chk(await sb.from('docs').delete().match({ colony_id: cid, collection: c, id })) },
      subscribe(cid, onChange) {
        const ch = sb.channel('docs-' + cid)
          .on('postgres_changes', { event: '*', schema: 'public', table: 'docs', filter: 'colony_id=eq.' + cid }, p => {
            const r = (p.new && p.new.collection) ? p.new : p.old;
            if (r && r.colony_id && r.colony_id !== cid) return;
            onChange(r && r.collection ? r.collection : null);
          }).subscribe();
        return () => { try { sb.removeChannel(ch) } catch (_) {} };
      }
    },
    files: {
      async upload(cid, blob) {
        const ext = (blob.type || 'image/jpeg').split('/')[1].replace('jpeg', 'jpg');
        const path = cid + '/' + Date.now() + '-' + newId().slice(0, 8) + '.' + ext;
        chk(await sb.storage.from('colony').upload(path, blob, { contentType: blob.type || 'image/jpeg', upsert: false }));
        return { id: path };
      },
      async remove(path) { chk(await sb.storage.from('colony').remove([path])) },
      async urls(paths) {
        const r = chk(await sb.storage.from('colony').createSignedUrls(paths, 3600));
        const m = {}; r.forEach(x => { if (x.signedUrl) m[x.path] = x.signedUrl }); return m;
      }
    },
    async fn(name, body) { const r = await sb.functions.invoke(name, { body }); if (r.error) throw r.error; return r.data }
  };
}
const B = window.CS_BACKEND || makeSupabaseBackend();

/* ---------- live document store (doc / collection / onSnapshot) ---------- */
function makeDb(cid) {
  const cache = {}, L = {}, DL = {};
  let loaded = false, timers = {};
  const snapDocs = c => [...(cache[c] || new Map())].map(([id, d]) => ({ id, exists: true, data: () => d }));
  function emit(c) {
    if (!loaded) return;
    const docs = snapDocs(c);
    (L[c] || new Set()).forEach(f => f({ docs, size: docs.length, empty: !docs.length }));
    for (const k in DL) if (k.startsWith(c + '/')) {
      const id = k.slice(c.length + 1), d = (cache[c] || new Map()).get(id);
      DL[k].forEach(f => f({ id, exists: d !== undefined, data: () => d }));
    }
  }
  const allColls = () => [...new Set([...Object.keys(cache), ...Object.keys(L), ...Object.keys(DL).map(k => k.split('/')[0])])];
  async function refreshAll() {
    const rows = await B.docs.listAll(cid), by = {};
    rows.forEach(r => (by[r.collection] = by[r.collection] || new Map()).set(r.id, r.data));
    allColls().concat(Object.keys(by)).forEach(c => { cache[c] = by[c] || new Map() });
    loaded = true; allColls().forEach(emit);
  }
  async function refresh(c) {
    if (!c) return refreshAll();
    const rows = await B.docs.listColl(cid, c); cache[c] = new Map(rows.map(r => [r.id, r.data])); emit(c);
  }
  const soon = c => { clearTimeout(timers[c || '*']); timers[c || '*'] = setTimeout(() => refresh(c).catch(console.warn), 250) };
  const local = (c, id, d) => { cache[c] = cache[c] || new Map(); if (d === undefined) cache[c].delete(id); else cache[c].set(id, d); emit(c) };
  const wrap = async p => { try { return await p } catch (e) { throw mapErr(e) } };
  function doc(path) {
    const i = path.indexOf('/'), c = path.slice(0, i), id = path.slice(i + 1);
    return {
      id, path,
      async get() { const d = (cache[c] || new Map()).get(id); return { id, exists: d !== undefined, data: () => d } },
      async set(v) { const d = JSON.parse(JSON.stringify(v)); await wrap(B.docs.upsert(cid, c, id, d)); local(c, id, d) },
      async update(v) { const d = await wrap(B.docs.patch(cid, c, id, JSON.parse(JSON.stringify(v)))); local(c, id, d || { ...((cache[c] || new Map()).get(id) || {}), ...v }) },
      async delete() { await wrap(B.docs.del(cid, c, id)); local(c, id, undefined) },
      onSnapshot(fn) { (DL[path] = DL[path] || new Set()).add(fn); if (loaded) { const d = (cache[c] || new Map()).get(id); fn({ id, exists: d !== undefined, data: () => d }) } return () => DL[path].delete(fn) },
      collection() { throw new Error('nested collections not supported') }
    };
  }
  function collection(c) {
    return {
      path: c,
      doc: id => doc(c + '/' + (id || newId())),
      async add(v) { const id = newId(), d = JSON.parse(JSON.stringify(v)); await wrap(B.docs.insert(cid, c, id, d)); local(c, id, d); return doc(c + '/' + id) },
      onSnapshot(fn) { (L[c] = L[c] || new Set()).add(fn); if (loaded) { const docs = snapDocs(c); fn({ docs, size: docs.length, empty: !docs.length }) } return () => L[c].delete(fn) }
    };
  }
  let unsub = null, poll = null;
  const onVis = () => { if (document.visibilityState === 'visible') refreshAll().catch(console.warn) };
  return {
    doc, collection,
    async start() { await refreshAll(); unsub = B.docs.subscribe(cid, soon); poll = setInterval(() => refreshAll().catch(console.warn), 90000); document.addEventListener('visibilitychange', onVis) },
    stop() { unsub && unsub(); clearInterval(poll); document.removeEventListener('visibilitychange', onVis) }
  };
}

/* ---------- private photos: <img data-img="path"> gets a signed URL ---------- */
const IMG = { cache: {}, pending: new Set(), t: null };
function hydrateImgs() {
  const els = [...document.querySelectorAll('img[data-img]')];
  const need = [];
  els.forEach(el => {
    const p = el.getAttribute('data-img'); if (!p) return;
    const c = IMG.cache[p];
    if (c && c.exp > Date.now()) { if (el.src !== c.url) el.src = c.url } else if (!IMG.pending.has(p)) need.push(p);
  });
  if (!need.length || !B || !B.files) return;
  need.forEach(p => IMG.pending.add(p));
  B.files.urls(need).then(m => {
    need.forEach(p => { IMG.pending.delete(p); if (m[p]) IMG.cache[p] = { url: m[p], exp: Date.now() + 50 * 60 * 1000 } });
    document.querySelectorAll('img[data-img]').forEach(el => { const c = IMG.cache[el.getAttribute('data-img')]; if (c && el.src !== c.url) el.src = c.url });
  }).catch(e => { need.forEach(p => IMG.pending.delete(p)); console.warn(e) });
}
new MutationObserver(() => { clearTimeout(IMG.t); IMG.t = setTimeout(hydrateImgs, 30) }).observe(document.documentElement, { childList: true, subtree: true });

/* ---------- install as app (PWA) ---------- */
let installEvt = null;
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); installEvt = e });
if ('serviceWorker' in navigator && location.protocol === 'https:' && !window.CS_BACKEND) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(console.warn));
}
function isStandalone() { return window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true }
async function doInstall() {
  if (installEvt) { installEvt.prompt(); try { await installEvt.userChoice } catch (_) {} installEvt = null; return true }
  return false;
}

/* ---------- screens: login, colony picker, app owner ---------- */
const $ = s => document.querySelector(s);
const AUTH = $('#auth');
function showAuth(html) { document.body.classList.add('locked'); AUTH.hidden = false; AUTH.querySelector('.acard').innerHTML = html }
function hideAuth() { document.body.classList.remove('locked'); AUTH.hidden = true }
function otpErr(e) {
  const m = String((e && (e.message || e.msg)) || e || '').toLowerCase();
  if (/rate|too many|security purposes|seconds/.test(m)) return 'बहुत जल्दी-जल्दी OTP माँगा गया। 1 मिनट रुककर फिर कोशिश करें।';
  if (/expired|invalid|token/.test(m)) return 'OTP गलत है या उसका समय निकल गया। सही OTP डालें या नया OTP मँगाएँ।';
  if (/provider|sms|twilio|not enabled|unsupported/.test(m)) return 'OTP भेजने की सेवा अभी चालू नहीं है। ऐप चलाने वाले (अभिराज डिजिटल) से संपर्क करें।';
  if (/fetch|network|failed to/.test(m)) return 'इंटरनेट से जुड़ नहीं पाए। नेटवर्क जाँचकर फिर कोशिश करें।';
  return 'कुछ गड़बड़ हुई: ' + (e && e.message ? e.message : 'फिर कोशिश करें।');
}
function supportLine() {
  const w = CFG.SUPPORT_WHATSAPP ? `<a class="btn sm ghost" style="--tc:#1f9d55" href="https://wa.me/${esc(CFG.SUPPORT_WHATSAPP)}" target="_blank" rel="noopener">💬 WhatsApp पर मदद</a>` : '';
  const p = CFG.SUPPORT_PHONE ? `<span class="muted num">📞 ${esc(CFG.SUPPORT_PHONE)}</span>` : '';
  return w || p ? `<div class="actions" style="justify-content:center;align-items:center">${w}${p}</div>` : '';
}

function loginScreen(msg) {
  const methods = CFG.LOGIN_METHODS || [];
  const hasPhone = methods.some(m => m.startsWith('phone')), hasEmail = methods.includes('email');
  const mode = LS.get('cs-login-mode') === 'email' && hasEmail ? 'email' : (hasPhone ? 'phone' : 'email');
  showAuth(`
    <h2 class="atitle">लॉगिन करें</h2>
    <p class="muted" style="margin:0 0 14px">अपना वही मोबाइल नंबर या ईमेल डालें जो कमेटी ने ऐप में जोड़ा है।</p>
    ${CFG.DEMO?'<div class="banner" style="margin:0 0 14px;display:block">🧪 <b>डेमो:</b> कमेटी के लिए <b class="num">99999 00001</b>, निवासी के लिए <b class="num">99999 00002</b>। OTP हमेशा <b class="num">123456</b>।</div>':''}
    ${hasPhone && hasEmail ? `<div class="seg" id="lmode" style="margin-bottom:14px"><button data-v="phone" aria-pressed="${mode === 'phone'}">📱 मोबाइल नंबर</button><button data-v="email" aria-pressed="${mode === 'email'}">✉️ ईमेल</button></div>` : ''}
    <form id="lform" class="aform">
      <div class="f" ${mode === 'phone' ? '' : 'hidden'} id="lphone"><label for="lph">मोबाइल नंबर</label><div class="phonein"><span>+91</span><input id="lph" type="tel" inputmode="numeric" autocomplete="tel-national" maxlength="14" placeholder="98765 43210"></div></div>
      ${methods.includes('phone_sms') && methods.includes('phone_whatsapp') ? `<div class="f" ${mode === 'phone' ? '' : 'hidden'} id="lchan"><label>OTP कहाँ मँगाएँ</label><div class="seg"><button type="button" data-c="sms" aria-pressed="true">💬 SMS</button><button type="button" data-c="whatsapp" aria-pressed="false">🟢 WhatsApp</button></div></div>` : ''}
      <div class="f" ${mode === 'email' ? '' : 'hidden'} id="lemail"><label for="lem">ईमेल</label><input id="lem" type="email" autocomplete="email" placeholder="aapka@gmail.com"></div>
      <div class="err" id="lerr">${msg ? esc(msg) : ''}</div>
      <button class="btn big" type="submit" id="lbtn">OTP भेजें</button>
    </form>
    ${supportLine()}`);
  let cur = mode, chan = methods.includes('phone_sms') ? 'sms' : 'whatsapp';
  const seg = $('#lmode');
  if (seg) seg.onclick = e => {
    const b = e.target.closest('[data-v]'); if (!b) return; cur = b.dataset.v; LS.set('cs-login-mode', cur);
    seg.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x === b));
    $('#lphone').hidden = cur !== 'phone'; $('#lemail').hidden = cur !== 'email'; const lc = $('#lchan'); if (lc) lc.hidden = cur !== 'phone';
  };
  const lc = $('#lchan');
  if (lc) lc.onclick = e => { const b = e.target.closest('[data-c]'); if (!b) return; chan = b.dataset.c; lc.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x === b)) };
  $('#lform').onsubmit = async e => {
    e.preventDefault();
    const er = $('#lerr'), btn = $('#lbtn'); er.textContent = '';
    let target;
    if (cur === 'phone') { const p = phone10($('#lph').value); if (p.length !== 10) { er.textContent = 'पूरा 10 अंकों का मोबाइल नंबर डालें।'; return } target = { phone: p, channel: chan } }
    else { const m = $('#lem').value.trim().toLowerCase(); if (!/^\S+@\S+\.\S+$/.test(m)) { er.textContent = 'सही ईमेल डालें।'; return } target = { email: m } }
    btn.disabled = true; btn.textContent = 'OTP भेजा जा रहा है…';
    try { await B.auth.sendOtp(target); otpScreen(target) } catch (x) { er.textContent = otpErr(x); btn.disabled = false; btn.textContent = 'OTP भेजें' }
  };
}

function otpScreen(target) {
  const where = target.phone ? `+91 ${target.phone.slice(0, 5)} ${target.phone.slice(5)}${target.channel === 'whatsapp' ? ' (WhatsApp)' : ''}` : target.email;
  const n = Number(CFG.OTP_LENGTH) || 6;
  showAuth(`
    <h2 class="atitle">OTP डालें</h2>
    <p class="muted" style="margin:0 0 14px"><b>${esc(where)}</b> पर ${n} अंकों का OTP भेजा गया है।</p>
    <form id="oform" class="aform">
      <div class="f"><label for="otp">OTP</label><input id="otp" class="otp" type="text" inputmode="numeric" autocomplete="one-time-code" maxlength="${n}" placeholder="${'•'.repeat(n)}"></div>
      <div class="err" id="oerr"></div>
      <button class="btn big" type="submit" id="obtn">लॉगिन करें</button>
      <div class="actions" style="justify-content:space-between"><button type="button" class="btn sm ghost" id="back">← नंबर बदलें</button><button type="button" class="btn sm ghost" id="resend" disabled>फिर से भेजें (30)</button></div>
    </form>`);
  const otp = $('#otp'); otp.focus();
  otp.oninput = () => { otp.value = otp.value.replace(/\D/g, '').slice(0, n); if (otp.value.length === n) $('#oform').requestSubmit() };
  let left = 30; const rs = $('#resend');
  const tick = setInterval(() => { left--; if (left <= 0) { clearInterval(tick); rs.disabled = false; rs.textContent = 'फिर से भेजें' } else rs.textContent = `फिर से भेजें (${left})` }, 1000);
  rs.onclick = async () => { rs.disabled = true; try { await B.auth.sendOtp(target); $('#oerr').textContent = ''; left = 30; rs.textContent = 'फिर से भेजें (30)'; const t2 = setInterval(() => { left--; if (left <= 0) { clearInterval(t2); rs.disabled = false; rs.textContent = 'फिर से भेजें' } else rs.textContent = `फिर से भेजें (${left})` }, 1000) } catch (x) { $('#oerr').textContent = otpErr(x); rs.disabled = false } };
  $('#back').onclick = () => { clearInterval(tick); loginScreen() };
  $('#oform').onsubmit = async e => {
    e.preventDefault();
    const er = $('#oerr'), btn = $('#obtn'), t = otp.value.trim();
    if (t.length < 4) { er.textContent = 'OTP पूरा डालें।'; return }
    btn.disabled = true; btn.textContent = 'जाँच हो रही है…';
    try { const s = await B.auth.verifyOtp({ ...target, token: t }); clearInterval(tick); ME = s.user; await afterLogin() }
    catch (x) { er.textContent = otpErr(x); btn.disabled = false; btn.textContent = 'लॉगिन करें' }
  };
}

async function afterLogin() {
  showAuth(`<div class="empty" style="border:0">लोड हो रहा है…</div>`);
  let list = [];
  try { list = await B.rpc('my_colonies'); isOwner = await B.rpc('cs_is_platform_admin') } catch (e) { console.warn(e); return loginScreen('डेटा लोड नहीं हुआ। इंटरनेट जाँचकर फिर लॉगिन करें।') }
  MYCOL = list || [];
  if (!MYCOL.length) {
    if (isOwner) return ownerScreen();
    let hasOwner = true; try { hasOwner = await B.rpc('cs_has_owner') } catch (_) {}
    return showAuth(`
      <h2 class="atitle">आपका नंबर किसी कॉलोनी में नहीं जुड़ा है</h2>
      <p class="muted">आपने <b>${esc(meLabel())}</b> से लॉगिन किया है। अपनी कॉलोनी की कमेटी से कहें कि वे यह नंबर ऐप के <b>एडमिन → लॉगिन वाले सदस्य</b> में जोड़ दें। फिर दोबारा लॉगिन करें।</p>
      ${hasOwner ? '' : `<div class="banner" style="margin:12px 0"><span>ऐप अभी नया है और इसका कोई मालिक नहीं बना है। अगर आप <b>${esc(CFG.COMPANY)}</b> हैं, तो नीचे दबाएँ।</span><button class="btn sm" id="claim">मैं इस ऐप का मालिक हूँ</button></div>`}
      <div class="actions"><button class="btn ghost" id="lo">दूसरे नंबर से लॉगिन करें</button></div>${supportLine()}`)
      , $('#lo').onclick = logout,
      $('#claim') && ($('#claim').onclick = async () => { try { if (await B.rpc('claim_platform_admin')) { isOwner = true; ownerScreen() } else alertBox('ऐप का मालिक पहले ही बन चुका है।') } catch (e) { alertBox(errMsg(mapErr(e))) } });
  }
  const last = LS.get('cs-colony');
  if (MYCOL.length === 1 || MYCOL.some(c => c.colony_id === last)) return openColony((MYCOL.find(c => c.colony_id === last) || MYCOL[0]).colony_id);
  pickScreen();
}
function meLabel() { if (!ME) return ''; const p = phone10(ME.phone); return p ? '+91 ' + p : (ME.email || '') }
function pickScreen() {
  showAuth(`<h2 class="atitle">कॉलोनी चुनें</h2><div class="list">${MYCOL.map(c => `<button class="pick" data-c="${c.colony_id}"><b>${esc(c.name)}</b><span class="pill ${c.role === 'admin' ? 'p-mar' : 'p-acc'}">${c.role === 'admin' ? '👑 एडमिन' : '🏠 निवासी'}</span></button>`).join('')}</div>
    <div class="actions">${isOwner ? '<button class="btn ghost" id="own">👑 ऐप मालिक पैनल</button>' : ''}<button class="btn ghost" id="lo">लॉगआउट</button></div>`);
  AUTH.querySelectorAll('[data-c]').forEach(b => b.onclick = () => openColony(b.dataset.c));
  $('#lo').onclick = logout; if ($('#own')) $('#own').onclick = ownerScreen;
}

async function ownerScreen() {
  showAuth(`<div class="empty" style="border:0">लोड हो रहा है…</div>`);
  let cols = []; try { cols = await B.colonies.all() } catch (e) { console.warn(e) }
  showAuth(`
    <h2 class="atitle">👑 ऐप मालिक पैनल</h2>
    <p class="muted" style="margin:0 0 12px">यहाँ से नई कॉलोनी जोड़ें, उसका प्लान देखें और उसे खोलें।</p>
    <div class="list">${cols.length ? cols.map(c => `<div class="card"><div class="row" style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;align-items:center">
      <div><b>${esc(c.name)}</b><div class="muted" style="font-size:13.5px">प्लान: ${esc(c.plan || '—')}${c.paid_until ? ' · ' + dFmt(c.paid_until) + ' तक' : ''}</div></div>
      <span class="pill ${c.active ? 'p-ok' : 'p-bad'}">${c.active ? 'चालू' : 'बंद'}</span></div>
      <div class="actions"><button class="btn sm" data-open="${c.id}">खोलें</button><button class="btn sm ghost" data-plan="${c.id}">प्लान / भुगतान</button></div></div>`).join('') : '<div class="empty">अभी कोई कॉलोनी नहीं है। नीचे पहली कॉलोनी बनाएँ।</div>'}</div>
    <h3 style="margin-top:20px">+ नई कॉलोनी जोड़ें</h3>
    <form id="ncol" class="aform">
      <div class="f"><label for="nc1">कॉलोनी का नाम</label><input id="nc1" required placeholder="जैसे लक्ष्मण विहार"></div>
      <div class="f"><label for="nc2">पहले एडमिन का नाम (अध्यक्ष / सचिव)</label><input id="nc2" placeholder="जैसे रमेश शर्मा"></div>
      <div class="f"><label for="nc3">एडमिन का मोबाइल नंबर</label><input id="nc3" type="tel" inputmode="numeric" placeholder="10 अंक"></div>
      <div class="f"><label for="nc4">या एडमिन का ईमेल (वैकल्पिक)</label><input id="nc4" type="email"></div>
      <div class="err" id="ncerr"></div><button class="btn" type="submit">कॉलोनी बनाएँ</button>
    </form>
    <div class="actions" style="margin-top:16px">${MYCOL.length ? '<button class="btn ghost" id="back">← अपनी कॉलोनी पर जाएँ</button>' : ''}<button class="btn ghost" id="lo">लॉगआउट</button></div>`);
  AUTH.querySelectorAll('[data-open]').forEach(b => b.onclick = () => openColony(b.dataset.open, true));
  AUTH.querySelectorAll('[data-plan]').forEach(b => b.onclick = () => {
    const c = cols.find(x => x.id === b.dataset.plan);
    openForm('प्लान / भुगतान · ' + esc(c.name), [{ k: 'plan', label: 'प्लान', type: 'select', options: [['trial', 'मुफ़्त ट्रायल'], ['small', 'छोटी (₹999)'], ['medium', 'मध्यम (₹1,999)'], ['large', 'बड़ी (₹2,999)'], ['custom', 'कस्टम']] },
      { k: 'paid_until', label: 'भुगतान किस तारीख तक', type: 'date' }, { k: 'active', label: 'कॉलोनी चालू है', type: 'check' }], c,
      async v => { await B.colonies.update(c.id, { plan: v.plan, paid_until: v.paid_until || null, active: v.active }); setTimeout(ownerScreen, 50) });
  });
  $('#lo').onclick = logout; if ($('#back')) $('#back').onclick = () => MYCOL.length > 1 ? pickScreen() : openColony(MYCOL[0].colony_id);
  $('#ncol').onsubmit = async e => {
    e.preventDefault(); const er = $('#ncerr');
    const ph = phone10($('#nc3').value), em = $('#nc4').value.trim();
    if (ph.length !== 10 && !em) { er.textContent = 'एडमिन का 10 अंकों का मोबाइल नंबर या ईमेल डालें।'; return }
    try { await B.rpc('create_colony', { p_name: $('#nc1').value.trim(), p_admin_name: $('#nc2').value.trim(), p_admin_phone: ph, p_admin_email: em }); try { MYCOL = await B.rpc('my_colonies') } catch (_) {} ownerScreen() }
    catch (x) { er.textContent = errMsg(mapErr(x)) }
  };
}

async function openColony(cid, viaOwner) {
  showAuth(`<div class="empty" style="border:0">कॉलोनी का डेटा लोड हो रहा है…</div>`);
  try { if (!MYCOL.some(c => c.colony_id === cid)) MYCOL = await B.rpc('my_colonies') } catch (_) {}
  const info = MYCOL.find(c => c.colony_id === cid) || (viaOwner ? { colony_id: cid, name: '', role: 'admin', house: '', member_name: '', active: true } : null);
  if (!info) return afterLogin();
  if (info.active === false && !isOwner) return showAuth(`<h2 class="atitle">${esc(info.name)}</h2><p class="muted">इस कॉलोनी का प्लान अभी बंद है। कमेटी से कहें कि वे ${esc(CFG.COMPANY)} से संपर्क करें।</p>${supportLine()}<div class="actions"><button class="btn ghost" id="lo">लॉगआउट</button></div>`), $('#lo').onclick = logout;
  if (db && db.stop) db.stop();
  COLONY = cid; MEM = info; isAdmin = info.role === 'admin'; uid = ME && ME.id;
  LS.set('cs-colony', cid);
  assets = isAdmin ? { upload: blob => B.files.upload(cid, blob), delete: path => B.files.remove(path) } : null;
  resetState();
  db = makeDb(cid);
  try { await db.start() } catch (e) { console.warn(e); return showAuth(`<h2 class="atitle">डेटा लोड नहीं हुआ</h2><p class="muted">${esc(errMsg(mapErr(e)))}</p><div class="actions"><button class="btn" id="re">फिर कोशिश करें</button><button class="btn ghost" id="lo">लॉगआउट</button></div>`), $('#re').onclick = () => openColony(cid, viaOwner), $('#lo').onclick = logout }
  if (isAdmin) loadMembers();
  startColony();
  hideAuth();
}
async function loadMembers() { try { S.members = await B.members.list(COLONY) } catch (e) { console.warn(e); S.members = [] } renderBody() }
async function logout() { try { if (db && db.stop) db.stop() } catch (_) {} try { await B.auth.signOut() } catch (_) {} ME = null; MYCOL = []; MEM = null; isAdmin = false; isOwner = false; LS.del('cs-colony'); document.getElementById('main').innerHTML = ''; document.getElementById('tabs').innerHTML = ''; loginScreen() }

function alertBox(msg) { dlg.innerHTML = `<div class="dbody"><p style="margin:0">${msg}</p><div class="dfoot"><button class="btn" data-close>ठीक है</button></div></div>`; dlg.showModal() }

function userMenu() {
  const others = MYCOL.filter(c => c.colony_id !== COLONY);
  dlg.innerHTML = `<div class="dbody"><h3>${esc(MEM.member_name || meLabel())}</h3>
    <p class="muted" style="margin:0">${esc(meLabel())} · ${isAdmin ? '👑 कमेटी / एडमिन' : '🏠 निवासी'}${MEM.house ? ' · मकान ' + esc(MEM.house) : ''}</p>
    <div class="list">
      ${!isStandalone() ? '<button class="btn ghost" id="um-inst">📲 फ़ोन में ऐप इंस्टॉल करें</button>' : ''}
      ${others.length ? '<button class="btn ghost" id="um-sw">🔁 दूसरी कॉलोनी खोलें</button>' : ''}
      ${isOwner ? '<button class="btn ghost" id="um-own">👑 ऐप मालिक पैनल</button>' : ''}
      ${CFG.SUPPORT_WHATSAPP ? `<a class="btn ghost" style="text-align:center;text-decoration:none" href="https://wa.me/${esc(CFG.SUPPORT_WHATSAPP)}" target="_blank" rel="noopener">💬 ${esc(CFG.COMPANY)} से मदद</a>` : ''}
      ${window.__csDemoReset?'<button class="btn ghost" id="um-reset">🔄 डेमो शुरू से</button>':''}
      <button class="btn danger" id="um-lo">लॉगआउट</button>
    </div><div class="err" id="ferr"></div><div class="dfoot"><button class="btn" data-close>बंद करें</button></div></div>`;
  const q = s => dlg.querySelector(s);
  if (q('#um-inst')) q('#um-inst').onclick = async () => { if (!(await doInstall())) q('#ferr').innerHTML = '<span style="color:var(--ink)"><b>एंड्रॉयड (Chrome):</b> ऊपर ⋮ मेन्यू → “ऐप इंस्टॉल करें” या “होम स्क्रीन पर जोड़ें”।<br><b>iPhone (Safari):</b> नीचे शेयर बटन ⬆️ → “Add to Home Screen”।</span>' };
  if (q('#um-sw')) q('#um-sw').onclick = () => { dlg.close(); pickScreen() };
  if (q('#um-own')) q('#um-own').onclick = () => { dlg.close(); ownerScreen() };
  q('#um-lo').onclick = () => { dlg.close(); logout() };
  if (q('#um-reset')) q('#um-reset').onclick = () => window.__csDemoReset();
  dlg.showModal();
}

async function boot() {
  if (!B) {
    showAuth(`<h2 class="atitle">ऐप अभी सेट नहीं हुआ है</h2><p class="muted">ऐप चलाने वाले को <code>app/config.js</code> फ़ाइल में Supabase का URL और key भरनी है। पूरा तरीका “सेटअप गाइड” में है।</p>`);
    return;
  }
  try { const s = await B.auth.session(); if (s) { ME = s.user; return afterLogin() } } catch (e) { console.warn(e) }
  loginScreen();
}

const TABS=[['home','होम','🏠','कॉलोनी की ताज़ा जानकारी एक नज़र में'],['houses','घर व निवासी','🏘️','हर घर के मालिक और किराएदार की जानकारी'],['parking','पार्किंग','🚗','गाड़ियों का रजिस्टर, मालिक की खोज और पार्किंग के नियम'],
  ['cctv','CCTV / सुरक्षा','📹','कैमरों की स्थिति, रिकॉर्डिंग और फुटेज देखने का अनुरोध'],['maint','मेंटेनेंस','💰',()=>`हर महीने 1 से ${DD()} तारीख तक · ${rs(S.cfg.charge)} प्रति घर`],['comp','शिकायत / सुझाव','📣','अपनी शिकायत या सुझाव दर्ज करें, कमेटी जवाब देगी'],['acct','हिसाब-किताब','📒','कॉलोनी फंड में कितना आया, कितना खर्च हुआ'],
  ['polls','पोल / वोटिंग','🗳️','कॉलोनी के फ़ैसलों पर अपनी राय दें'],['gallery','फोटो गैलरी','📷','कॉलोनी के कार्यक्रमों की यादें'],['svc','सेवाएँ','🧰','प्लंबर, इलेक्ट्रीशियन, कामवाली, दूध वाला: भरोसेमंद लोगों के नंबर'],['team','कमेटी सदस्य','🤝','कॉलोनी की कमेटी: कौन किस पद पर है और किससे किस काम के लिए बात करें'],['admin','एडमिन','👑','सिर्फ़ कमेटी के लिए: ज़रूरी काम, सेटिंग्स और जानकारी']];
function visTabs(){return TABS.filter(t=>t[0]!=='admin'||isAdmin)}
const OCC={self:'मालिक स्वयं रहते हैं',rent:'किराए पर',vacant:'खाली'};
const CATS=['पार्किंग','सफाई','पानी','बिजली / स्ट्रीट लाइट','सुरक्षा','सड़क / नाली','पार्क','अन्य'];
const STAT={new:['नई','p-warn'],work:['काम चल रहा है','p-info'],done:['हल हो गई','p-ok']};
const MODES=['नकद','UPI','चेक','बैंक ट्रांसफर'];
const EXCATS=['सफाई कर्मचारी','चौकीदार','बिजली बिल','पानी / मोटर','मरम्मत','CCTV','कार्यक्रम / त्योहार','स्टेशनरी / प्रिंट','अन्य'];
const SVC=[['प्लंबर','🔧'],['इलेक्ट्रीशियन','💡'],['कामवाली / मेड','🧹'],['दूध वाला','🥛'],['सब्ज़ी / फल वाला','🥬'],['प्रेस / धोबी','👕'],['कारपेंटर','🪚'],['पेंटर','🎨'],['AC / RO / फ्रिज मरम्मत','❄️'],['गैस सिलेंडर','🔥'],['अख़बार वाला','📰'],['कचरा गाड़ी','🗑️'],['ड्राइवर','🚘'],['डॉक्टर / दवाई','🩺'],['ट्यूशन टीचर','📚'],['मोबाइल / TV मरम्मत','📱'],['अन्य','🧰']];
function svcIcon(c){return (SVC.find(x=>x[0]===c)||SVC[SVC.length-1])[1]}
const POSTS=['अध्यक्ष','उपाध्यक्ष','सचिव','सह-सचिव','कोषाध्यक्ष','सदस्य','सलाहकार'];
function postRank(p){const i=POSTS.indexOf(p);return i<0?99:i}
function initials(n){return String(n||'?').replace(/\(.*?\)/g,'').trim().split(/\s+/).slice(0,2).map(w=>[...w][0]||'').join('')}
const CAMST={ok:['चालू','p-ok','🟢'],bad:['खराब','p-bad','🔴'],off:['बंद / हटाया गया','p-warn','⚪']};
const LOGK={check:'जाँच की',service:'सर्विस / सफ़ाई',repair:'मरम्मत',footage:'फुटेज देखी गई',other:'अन्य'};
const INCATS=['दान / चंदा','जुर्माना / लेट फीस','किराया (पार्क / हॉल)','कार्यक्रम का चंदा','ब्याज','अन्य आय'];
/* cash book: opening balance + maintenance (one row per month of payment date) + other income − expenses */
function isIn(e){return e.kind==='in'}
function sumA(a){return a.reduce((s,x)=>s+Number(x.amount||0),0)}
function fund(){return Number(S.cfg.openBal||0)+sumA(S.payList)+sumA(S.exp.filter(isIn))-sumA(S.exp.filter(e=>!isIn(e)))}
function bookRows(){
  const rows=S.exp.map(e=>({date:e.date||'',title:e.title,cat:e.cat,inc:isIn(e)?Number(e.amount||0):0,out:isIn(e)?0:Number(e.amount||0),e}));
  const bym={};S.payList.forEach(p=>{const m=String(p.date||p.month).slice(0,7);(bym[m]=bym[m]||[]).push(p)});
  Object.entries(bym).forEach(([m,ps])=>{const last=ps.map(p=>p.date||m+'-01').sort().pop();rows.push({date:last,title:`मेंटेनेंस वसूली · ${mLong(m)}`,cat:`${ps.length} भुगतान`,inc:sumA(ps),out:0,maint:true,m})});
  rows.sort((a,b)=>a.date.localeCompare(b.date)||(a.maint?-1:1));
  let bal=Number(S.cfg.openBal||0);rows.forEach(r=>{bal+=r.inc-r.out;r.bal=bal});return rows}
const S={cfg:{name:'लक्ष्मण विहार',charge:500,start:'2026-04',contacts:[]},houses:[],pay:{},payList:[],comp:[],notices:[],exp:[],polls:[],pv:{},photos:[],veh:[],svc:[],sv:{},team:[],cams:[],clog:[],cv:{},claims:[],members:[]};
const S0=JSON.stringify(S);
function resetState(){Object.assign(S,JSON.parse(S0));tab='home'}
const VT={car:['कार','🚗'],bike:['बाइक / स्कूटी','🏍️'],other:['अन्य','🚙']};
const PARK=['घर के अंदर','घर के सामने','गली में','पार्किंग एरिया में'];
const DEFAULT_RULES='1. अपनी गाड़ी अपने घर के अंदर या ठीक सामने ही खड़ी करें।\n2. किसी के गेट, मोड़ या गली के बीच में गाड़ी न खड़ी करें।\n3. मेहमानों की गाड़ी पार्क / खाली जगह के पास तय जगह पर लगवाएँ।\n4. रात में गली में डबल पार्किंग न करें, एम्बुलेंस का रास्ता खुला रहे।\n5. नई गाड़ी खरीदें तो कमेटी को नंबर बताएँ ताकि रजिस्टर में जुड़ जाए।';
let assets=null,db=null,isAdmin=false,uid=null,tab='home',status='loading',ME=null,MYCOL=[],COLONY=null,MEM=null,isOwner=false;
const F={q:'',occ:'all',view:'month',month:curMonth(),cstat:'all',ckind:'all',mq:'',am:'all',ak:'all',album:'all',vq:'',sq:'',scat:'all'};
function normV(v){return String(v||'').toUpperCase().replace(/[^A-Z0-9]/g,'')}
function vehOf(hid){return S.veh.filter(v=>v.house===hid)}

function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function curMonth(){const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')}
function today(){const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function rs(n){return '₹'+Number(n||0).toLocaleString('en-IN')}
function mName(m){const [y,mo]=m.split('-').map(Number);return new Date(y,mo-1,1).toLocaleDateString('hi-IN',{month:'short',year:'numeric'})}
function mLong(m){const [y,mo]=m.split('-').map(Number);return new Date(y,mo-1,1).toLocaleDateString('hi-IN',{month:'long',year:'numeric'})}
function dFmt(d){if(!d)return '';const [y,m,dd]=d.split('-').map(Number);return new Date(y,m-1,dd).toLocaleDateString('hi-IN',{day:'numeric',month:'short',year:'numeric'})}
function months(a,b){const out=[];if(!a||!b||a>b)return out;let [y,m]=a.split('-').map(Number);const [by,bm]=b.split('-').map(Number);while(y<by||(y===by&&m<=bm)){out.push(y+'-'+String(m).padStart(2,'0'));m++;if(m>12){m=1;y++}}return out}
function addM(m,k){let [y,mo]=m.split('-').map(Number);mo+=k;while(mo<1){mo+=12;y--}while(mo>12){mo-=12;y++}return y+'-'+String(mo).padStart(2,'0')}
function hStart(h){return h.chargeFrom&&h.chargeFrom>S.cfg.start?h.chargeFrom:S.cfg.start}
function DD(){return Math.min(28,Math.max(1,Number(S.cfg.dueDay||10)))}
function FEE(){return Number(S.cfg.lateFee||0)}
function deadline(m){return m+'-'+String(DD()).padStart(2,'0')}
function overdue(m){return today()>deadline(m)}
function isLate(p){return !!(p&&p.date&&p.date>deadline(p.month))}
function daysLeft(){return DD()-new Date().getDate()}
/* overdue months only: the current month counts once its deadline has passed */
function dueMonths(h){return months(hStart(h),curMonth()).filter(m=>!S.pay[h.id+'_'+m]&&overdue(m))}
function pendingNow(h){const m=curMonth();return m>=hStart(h)&&!S.pay[h.id+'_'+m]&&!overdue(m)}
function dueAmt(h){return dueMonths(h).length*(Number(S.cfg.charge||0)+FEE())}
function lateCount(h){return S.payList.filter(p=>p.house===h.id&&isLate(p)).length}
function ruleLine(){return `हर महीने की 1 से ${DD()} तारीख तक मेंटेनेंस जमा करना ज़रूरी है।${FEE()?` ${DD()} तारीख के बाद ${rs(FEE())} लेट फीस लगेगी।`:''}`}
function sortHouses(a){return [...a].sort((x,y)=>String(x.no).localeCompare(String(y.no),'en',{numeric:true}))}
function houseById(id){return S.houses.find(h=>h.id===id)}
function hasExamples(){return [S.houses,S.payList,S.comp,S.notices,S.exp,S.polls,S.photos,S.veh,S.svc,S.team,S.clog].some(a=>a.some(d=>d.example))}

/* ---------- start a colony (after login) ---------- */
function startColony(){
  const r=document.getElementById('role');r.textContent=isAdmin?'👑 कमेटी / एडमिन':'🏠 निवासी';r.classList.toggle('admin',isAdmin);
  status='ready';
  const err=e=>{console.warn(e);};
  db.doc('config/main').onSnapshot(s=>{if(s.exists)S.cfg={...S.cfg,...s.data()};document.getElementById('cname').textContent=S.cfg.name||MEM.name||CFG.APP_NAME;renderBody()},err);
  db.collection('houses').onSnapshot(q=>{S.houses=sortHouses(q.docs.map(d=>({id:d.id,...d.data()})));renderBody()},err);
  db.collection('payments').onSnapshot(q=>{S.payList=q.docs.map(d=>({id:d.id,...d.data()}));S.pay={};S.payList.forEach(p=>S.pay[p.house+'_'+p.month]=p);renderBody()},err);
  db.collection('complaints').onSnapshot(q=>{S.comp=q.docs.map(d=>({id:d.id,...d.data()})).sort((a,b)=>String(b.date).localeCompare(String(a.date)));renderBody()},err);
  db.collection('notices').onSnapshot(q=>{S.notices=q.docs.map(d=>({id:d.id,...d.data()})).sort((a,b)=>String(b.date).localeCompare(String(a.date)));renderBody()},err);
  db.collection('expenses').onSnapshot(q=>{S.exp=q.docs.map(d=>({id:d.id,...d.data()})).sort((a,b)=>String(b.date).localeCompare(String(a.date)));renderBody()},err);
  db.collection('polls').onSnapshot(q=>{S.polls=q.docs.map(d=>({id:d.id,...d.data()})).sort((a,b)=>String(b.date).localeCompare(String(a.date)));renderBody()},err);
  db.collection('pollvotes').onSnapshot(q=>{S.pv={};q.docs.forEach(d=>S.pv[d.id]=d.data());renderBody()},err);
  db.collection('vehicles').onSnapshot(q=>{S.veh=q.docs.map(d=>({id:d.id,...d.data()})).sort((a,b)=>String(a.houseNo).localeCompare(String(b.houseNo),'en',{numeric:true}));renderBody()},err);
  db.collection('services').onSnapshot(q=>{S.svc=q.docs.map(d=>({id:d.id,...d.data()}));renderBody()},err);
  db.collection('svcvotes').onSnapshot(q=>{S.sv={};q.docs.forEach(d=>S.sv[d.id]=d.data());renderBody()},err);
  db.collection('committee').onSnapshot(q=>{S.team=q.docs.map(d=>({id:d.id,...d.data()})).sort((a,b)=>postRank(a.post)-postRank(b.post)||String(a.name).localeCompare(String(b.name)));renderBody()},err);
  db.collection('cameras').onSnapshot(q=>{S.cams=q.docs.map(d=>({id:d.id,...d.data()})).sort((a,b)=>String(a.name).localeCompare(String(b.name),'hi',{numeric:true}));renderBody()},err);
  db.collection('cctvlog').onSnapshot(q=>{S.clog=q.docs.map(d=>({id:d.id,...d.data()})).sort((a,b)=>String(b.date).localeCompare(String(a.date)));renderBody()},err);
  db.collection('gallery').onSnapshot(q=>{S.photos=q.docs.map(d=>({id:d.id,...d.data()})).sort((a,b)=>String(b.date).localeCompare(String(a.date)));renderBody()},err);
  db.collection('compvotes').onSnapshot(q=>{S.cv={};q.docs.forEach(d=>S.cv[d.id]=d.data());renderBody()},err);
  db.collection('payclaims').onSnapshot(q=>{S.claims=q.docs.map(d=>({id:d.id,...d.data()})).sort((a,b)=>String(b.date).localeCompare(String(a.date)));renderBody()},err);
  renderAll();
}

/* ---------- tabs ---------- */
function renderTabs(){
  if(!visTabs().some(t=>t[0]===tab))tab='home';
  document.getElementById('tabs').innerHTML=visTabs().map(([k,l,i])=>`<button role="tab" class="${k==='admin'?'admin':''}" style="--tc:var(--t-${k})" aria-selected="${k===tab}" data-tab="${k}"><span class="i" aria-hidden="true">${i}</span>${l}</button>`).join('');
  const sel=document.querySelector('#tabs [aria-selected="true"]');if(sel&&sel.scrollIntoView)try{sel.scrollIntoView({block:'nearest',inline:'nearest'})}catch(_){}
}
document.getElementById('tabs').addEventListener('click',e=>{const b=e.target.closest('[data-tab]');if(!b)return;tab=b.dataset.tab;try{localStorage.setItem('lv-tab',tab)}catch(_){}renderAll();window.scrollTo({top:0})});
try{const t=localStorage.getItem('lv-tab');if(t&&TABS.some(x=>x[0]===t))tab=t}catch(_){}
document.getElementById('today').textContent='🙏 नमस्ते · '+new Date().toLocaleDateString('hi-IN',{weekday:'long',day:'numeric',month:'long',year:'numeric'});

function renderAll(){renderTabs();const m=document.getElementById('main');
  if(status==='nodb'){m.innerHTML=`<div class="empty" style="margin-top:24px">कॉलोनी का डेटा देखने के लिए लॉगिन करें।</div>`;return}
  if(status==='loading')return;
  m.style.setProperty('--tc','var(--t-'+tab+')');dlg.style.setProperty('--tc','var(--t-'+tab+')');
  m.innerHTML=`<div class="sechead"><div class="ico" aria-hidden="true">${T()[2]}</div><div style="min-width:0"><h2>${T()[1]}</h2><p id="secdesc">${secDesc()}</p></div></div>`+SHELL[tab]()+'<div id="body"></div>';bindShell();renderBody()}
function T(){return TABS.find(t=>t[0]===tab)||TABS[0]}
function secDesc(){const d=T()[3];return typeof d==='function'?d():d}
function renderBody(){if(status!=='ready')return;const b=document.getElementById('body');if(!b)return;b.innerHTML=BODY[tab]();const sd=document.getElementById('secdesc');if(sd)sd.textContent=secDesc()}

/* ---------- shells (toolbars that keep focus) ---------- */
const SHELL={
  home:()=>'',
  houses:()=>`<div class="toolbar">
    <input class="grow" id="q" type="search" placeholder="मकान नंबर, मालिक या किराएदार का नाम खोजें" value="${esc(F.q)}">
    <select id="occ" style="width:auto"><option value="all">सभी घर</option>${Object.entries(OCC).map(([k,v])=>`<option value="${k}" ${F.occ===k?'selected':''}>${v}</option>`).join('')}</select>
    ${isAdmin?'<button class="btn" data-act="addHouse">+ नया घर जोड़ें</button>':''}</div>`,
  admin:()=>'',
  cctv:()=>`<div class="toolbar"><button class="btn ghost" data-act="footReq">🎞️ फुटेज देखने का अनुरोध</button><button class="btn ghost" data-act="camFault">⚠️ कैमरा खराब है? बताएँ</button><span class="grow"></span>
    ${isAdmin?'<button class="btn ghost" data-act="cctvCfg">रिकॉर्डिंग की जानकारी</button><button class="btn ghost" data-act="addLog">+ सर्विस / जाँच दर्ज करें</button><button class="btn" data-act="addCam">+ कैमरा जोड़ें</button>':''}</div>`,
  team:()=>isAdmin?`<div class="toolbar"><span class="grow"></span><button class="btn ghost" data-act="setTerm">कार्यकाल बदलें</button><button class="btn" data-act="addMem">+ सदस्य जोड़ें</button></div>`:'',
  svc:()=>{const used=SVC.filter(([c])=>S.svc.some(x=>x.cat===c));return `<div class="toolbar">
    <input class="grow" id="sq" type="search" placeholder="नाम, काम या नंबर से खोजें" value="${esc(F.sq)}">
    ${isAdmin?'<button class="btn" data-act="addSvc">+ सेवा देने वाला जोड़ें</button>':''}</div>
    ${used.length?`<div class="chips" id="scat"><button data-v="all" aria-pressed="${F.scat==='all'}">सभी</button>${used.map(([c,i])=>`<button data-v="${esc(c)}" aria-pressed="${F.scat===c}">${i} ${esc(c)}</button>`).join('')}</div>`:''}`},
  parking:()=>`<div class="toolbar">
    <input class="grow" id="vq" type="search" placeholder="गाड़ी नंबर से मालिक खोजें, जैसे 1234 या MP09AB" value="${esc(F.vq)}">
    <button class="btn ghost" data-act="parkComp">गलत पार्किंग की शिकायत</button>
    ${isAdmin?'<button class="btn" data-act="addVeh">+ गाड़ी जोड़ें</button>':''}</div>`,
  maint:()=>`<div class="toolbar">
    <div class="seg" id="mview">${[['month','महीने की सूची'],['ledger','खाता (6 महीने)'],['due','बकाया सूची']].map(([k,l])=>`<button data-v="${k}" aria-pressed="${F.view===k}">${l}</button>`).join('')}</div>
    <input id="mon" type="month" value="${F.month}" style="width:auto" ${F.view==='due'?'hidden':''}>
    <span class="grow"></span>${S.cfg.upiId?'<button class="btn" data-act="payOnline">💳 ऑनलाइन मेंटेनेंस जमा करें</button>':(isAdmin?'<button class="btn ghost" data-act="settings">💳 UPI ID जोड़ें (ऑनलाइन भुगतान)</button>':'')}</div>`,
  comp:()=>`<div class="toolbar">
    <div class="seg" id="ckind">${[['all','सभी'],['complaint','शिकायतें'],['suggestion','सुझाव']].map(([k,l])=>`<button data-v="${k}" aria-pressed="${F.ckind===k}">${l}</button>`).join('')}</div>
    <select id="cstat" style="width:auto"><option value="all">हर स्थिति</option>${Object.entries(STAT).map(([k,v])=>`<option value="${k}" ${F.cstat===k?'selected':''}>${v[0]}</option>`).join('')}</select>
    <button class="btn" data-act="addComp">+ शिकायत / सुझाव दर्ज करें</button></div>`,
  acct:()=>{const ms=[...new Set(bookRows().map(r=>r.date.slice(0,7)).filter(Boolean))].sort().reverse();
    return `<div class="toolbar">
    <div class="seg" id="akind">${[['all','सभी एंट्री'],['in','आय (+)'],['out','खर्च (−)']].map(([k,l])=>`<button data-v="${k}" aria-pressed="${F.ak===k}">${l}</button>`).join('')}</div>
    <select id="amon" style="width:auto"><option value="all">सभी महीने</option>${ms.map(m=>`<option value="${m}" ${F.am===m?'selected':''}>${mLong(m)}</option>`).join('')}</select>
    <span class="grow"></span>
    ${isAdmin?'<button class="btn" style="--tc:var(--ok);--tc-ink:var(--surface)" data-act="addInc">+ आय जोड़ें</button><button class="btn" style="--tc:var(--bad);--tc-ink:var(--surface)" data-act="addExp">− खर्च जोड़ें</button>':''}</div>`},
  polls:()=>`<div class="toolbar"><p class="muted grow" style="margin:0;font-size:14px">हर व्यक्ति हर पोल में एक वोट दे सकता है। पोल बंद होने तक वोट बदला जा सकता है।</p>${isAdmin?'<button class="btn" data-act="addPoll">+ नया पोल बनाएँ</button>':''}</div>`,
  gallery:()=>{const al=[...new Set(S.photos.map(p=>p.album).filter(Boolean))];return `<div class="toolbar"><select id="album" style="width:auto"><option value="all">सभी एल्बम</option>${al.map(a=>`<option ${F.album===a?'selected':''}>${esc(a)}</option>`).join('')}</select><span class="grow"></span>${assets?'<button class="btn" data-act="addPhotos">+ फोटो जोड़ें</button>':''}</div>`}
};
document.getElementById('main').addEventListener('input',e=>{if(e.target.id==='mq'){F.mq=e.target.value;const pos=e.target.selectionStart;renderBody();const n=document.getElementById('mq');if(n){n.focus();try{n.setSelectionRange(pos,pos)}catch(_){}}}});
function bindShell(){
  const q=document.getElementById('q');if(q)q.addEventListener('input',()=>{F.q=q.value;renderBody()});
  const o=document.getElementById('occ');if(o)o.addEventListener('change',()=>{F.occ=o.value;renderBody()});
  const mv=document.getElementById('mview');if(mv)mv.addEventListener('click',e=>{const b=e.target.closest('[data-v]');if(!b)return;F.view=b.dataset.v;renderAll()});
  const mon=document.getElementById('mon');if(mon)mon.addEventListener('change',()=>{if(mon.value){F.month=mon.value;renderBody()}});
  const ck=document.getElementById('ckind');if(ck)ck.addEventListener('click',e=>{const b=e.target.closest('[data-v]');if(!b)return;F.ckind=b.dataset.v;ck.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));renderBody()});
  const ak=document.getElementById('akind');if(ak)ak.addEventListener('click',e=>{const b=e.target.closest('[data-v]');if(!b)return;F.ak=b.dataset.v;ak.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));renderBody()});
  const amn=document.getElementById('amon');if(amn)amn.addEventListener('change',()=>{F.am=amn.value;renderBody()});
  const sq=document.getElementById('sq');if(sq)sq.addEventListener('input',()=>{F.sq=sq.value;renderBody()});
  const sc=document.getElementById('scat');if(sc)sc.addEventListener('click',e=>{const b=e.target.closest('[data-v]');if(!b)return;F.scat=b.dataset.v;sc.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));renderBody()});
  const vq=document.getElementById('vq');if(vq)vq.addEventListener('input',()=>{F.vq=vq.value;renderBody()});
  const al=document.getElementById('album');if(al)al.addEventListener('change',()=>{F.album=al.value;renderBody()});
  const cs=document.getElementById('cstat');if(cs)cs.addEventListener('change',()=>{F.cstat=cs.value;renderBody()});
}

/* ---------- bodies ---------- */
const BODY={
home(){
  const cm=curMonth(),H=S.houses;
  const rent=H.filter(h=>h.occ==='rent').length,vac=H.filter(h=>h.occ==='vacant').length;
  const paid=H.filter(h=>S.pay[h.id+'_'+cm]).length;
  const dueTotal=H.reduce((s,h)=>s+dueAmt(h),0);const pend=H.filter(pendingNow).length,dl=daysLeft();
  const open=S.comp.filter(c=>c.status!=='done').length;
  const coll=S.payList.reduce((s,p)=>s+Number(p.amount||0),0),spent=S.exp.reduce((s,e)=>s+Number(e.amount||0),0);
  const win=dl>=0?`<b>${mLong(cm)} का मेंटेनेंस जमा करने का समय चल रहा है।</b> आख़िरी तारीख ${DD()} ${mLong(cm)} है${dl===0?', यानी <b>आज</b>।':`, यानी ${dl} दिन बाकी हैं।`} ${pend?pend+' घरों का अभी बाकी है।':''}`
    :`<b>${mLong(cm)} की आख़िरी तारीख (${DD()}) निकल चुकी है।</b> ${H.filter(h=>dueMonths(h).includes(cm)).length} घरों का इस महीने का मेंटेनेंस देरी से बकाया है।`;
  const myH=MEM&&MEM.house?S.houses.find(h=>String(h.no).replace(/\s/g,'').toLowerCase()===String(MEM.house).replace(/\s/g,'').toLowerCase()):null;
  const myCard=myH?(()=>{const d=dueMonths(myH),p=S.pay[myH.id+'_'+cm];return `<section class="panel" style="margin-top:16px;border:1.5px solid var(--tc)"><div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;align-items:center"><div><div class="muted" style="font-size:13.5px">आपका घर</div><div class="hno">${esc(myH.no)}</div></div>
    <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center">${p?`<span class="pill p-ok">✓ ${mLong(cm)} जमा</span><button class="btn sm ghost" data-act="receipt" data-id="${myH.id}" data-m="${cm}">रसीद</button>`:`<span class="pill ${d.length?'p-bad':'p-warn'}">${d.length?d.length+' महीने बकाया · '+rs(dueAmt(myH)):mLong(cm)+' का बाकी · '+DD()+' तारीख तक'}</span>`}
    ${(!p||d.length)&&S.cfg.upiId?`<button class="btn sm" data-act="payOnline" data-id="${myH.id}">💳 अभी जमा करें</button>`:''}</div></div></section>`})():'';
  return `${exBanner()}${myCard}
  <div class="deadline ${dl>=0?'':'late'}"><div class="cal"><small>हर महीने</small><b>1–${DD()}</b><small>तारीख</small></div><div style="min-width:0"><div>${win}</div><div class="muted" style="font-size:14px;margin-top:2px">${ruleLine()}</div></div></div>
  <div class="stats">
    <div class="stat"><b>${H.length}</b><span>कुल घर</span></div>
    <div class="stat"><b>${rent}</b><span>किराए पर · ${vac} खाली</span></div>
    <div class="stat ${paid===H.length&&H.length?'ok':''}"><b>${paid}/${H.length}</b><span>${mLong(cm)} का मेंटेनेंस जमा</span></div>
    <div class="stat bad"><b>${rs(dueTotal)}</b><span>कुल बकाया (आख़िरी तारीख के बाद)</span></div>
    <div class="stat"><b>${open}</b><span>खुली शिकायतें</span></div>
    <div class="stat"><b>${S.polls.filter(p=>p.open).length}</b><span>चल रहे पोल</span></div>
    ${S.cams.length?`<div class="stat ${S.cams.some(c=>c.status==='bad')?'bad':'ok'}"><b>${S.cams.filter(c=>c.status==='ok').length}/${S.cams.length}</b><span>📹 CCTV चालू</span></div>`:''}
    <div class="stat ${fund()>=0?'ok':'bad'}"><b>${rs(fund())}</b><span>फंड में बची रकम</span></div>
  </div>
  <div class="grid2" style="margin-top:20px">
    <section class="panel"><div class="row" style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;align-items:center"><h2 style="margin:0">सूचना बोर्ड</h2>${isAdmin?'<button class="btn sm" data-act="addNotice">+ सूचना</button>':''}</div>
      <div style="margin-top:14px">${S.notices.length?S.notices.map(n=>`<div class="notice"><div class="row" style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap"><h3>${esc(n.title)}</h3><span class="muted" style="font-size:13px">${dFmt(n.date)}</span></div><p>${esc(n.body)}</p>${isAdmin?`<button class="btn sm danger" style="margin-top:6px" data-act="delNotice" data-id="${n.id}">हटाएँ</button>`:''}</div>`).join(''):'<div class="empty">अभी कोई सूचना नहीं है।</div>'}</div></section>
    <section class="panel"><div class="row" style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;align-items:center"><h2 style="margin:0">ज़रूरी संपर्क</h2>${isAdmin?'<button class="btn sm ghost" data-act="settings">सेटिंग्स</button>':''}</div>
      <div class="contacts" style="margin-top:14px">${(S.cfg.contacts||[]).length?S.cfg.contacts.map(c=>`<div><span><b>${esc(c.name)}</b> <span class="muted">· ${esc(c.role)}</span></span><span class="num">${esc(c.phone)}</span></div>`).join(''):'<div class="empty">संपर्क नंबर अभी नहीं जोड़े गए।</div>'}</div>
      <p class="muted" style="font-size:14px;margin:14px 0 0">मासिक मेंटेनेंस: <b class="num">${rs(S.cfg.charge)}</b> प्रति घर · ${mLong(S.cfg.start)} से लागू · हर महीने 1 से ${DD()} तारीख तक${FEE()?' · लेट फीस '+rs(FEE()):''}</p></section>
  </div>`;
},
houses(){
  const q=F.q.trim().toLowerCase();
  const list=S.houses.filter(h=>(F.occ==='all'||h.occ===F.occ)&&(!q||[h.no,h.owner,h.tenant].some(v=>String(v||'').toLowerCase().includes(q))));
  if(!S.houses.length)return `<div class="empty">अभी कोई घर नहीं जोड़ा गया। ${isAdmin?'ऊपर “नया घर जोड़ें” दबाकर पहला घर दर्ज करें।':'कमेटी जल्द ही घरों की जानकारी जोड़ेगी।'}</div>`;
  if(!list.length)return `<div class="empty">इस खोज से कोई घर नहीं मिला।</div>`;
  return `<p class="muted" style="margin:0 0 10px;font-size:14px">${list.length} घर</p><div class="list">${list.map(h=>{
    const d=dueMonths(h).length;
    return `<article class="card"><div class="row"><div><div class="hno">${esc(h.no)}</div><div class="muted" style="font-size:14px">${esc(h.owner)}${h.example?' · <span class="pill p-mar">उदाहरण</span>':''}</div></div>
      <div style="display:flex;gap:6px;flex-wrap:wrap"><span class="pill ${h.occ==='rent'?'p-info':h.occ==='vacant'?'p-warn':'p-acc'}">${OCC[h.occ]||'—'}</span><span class="pill ${d?'p-bad':pendingNow(h)?'p-warn':'p-ok'}">${d?d+' महीने बकाया':pendingNow(h)?'इस महीने का बाकी':'मेंटेनेंस पूरा'}</span>${lateCount(h)>=2?`<span class="pill p-mar">${lateCount(h)} बार देर से दिया</span>`:''}</div></div>
      <div class="kv">
        <div><span>मालिक का मोबाइल: </span><span class="num">${esc(h.ownerPhone||'—')}</span></div>
        <div><span>सदस्य: </span>${esc(h.members||'—')}</div>
        ${h.occ==='rent'?`<div><span>किराएदार: </span>${esc(h.tenant||'—')}</div><div><span>किराएदार मोबाइल: </span><span class="num">${esc(h.tenantPhone||'—')}</span></div><div><span>कब से: </span>${dFmt(h.tenantSince)||'—'}</div><div><span>पुलिस वेरिफिकेशन: </span>${h.police?'<span class="pill p-ok">हो गया</span>':'<span class="pill p-bad">नहीं हुआ</span>'}</div>`:''}
        <div><span>गाड़ियाँ: </span>${vehOf(h.id).length?vehOf(h.id).map(v=>(VT[v.type]?.[1]||'')+' '+esc(v.number)).join(', '):esc(h.vehicle||'—')}</div>
      </div>
      ${isAdmin?`<div class="actions"><button class="btn sm ghost" data-act="editHouse" data-id="${h.id}">बदलें</button><button class="btn sm danger" data-act="delHouse" data-id="${h.id}">हटाएँ</button></div>`:''}
    </article>`}).join('')}</div>`;
},
cctv(){
  const C=S.cams,ok=C.filter(c=>c.status==='ok').length,bad=C.filter(c=>c.status==='bad');
  const last=S.clog.find(l=>l.kind==='service'||l.kind==='repair'||l.kind==='check');const cost=S.clog.reduce((s,l)=>s+Number(l.cost||0),0);
  const reqs=S.comp.filter(c=>c.cctv&&c.status!=='done');const camName=id=>(C.find(c=>c.id===id)||{}).name||'सभी कैमरे';
  const g=S.cfg;
  return `${bad.length?`<div class="banner" style="background:var(--bad-soft)"><span>🔴 <b>${bad.map(c=>esc(c.name)).join(', ')}</b> अभी खराब ${bad.length>1?'हैं':'है'}। ${isAdmin?'मरम्मत करवाकर स्थिति “चालू” करें।':'कमेटी को इसकी जानकारी है।'}</span></div>`:''}
  <div class="stats" style="margin-top:${bad.length?'16px':'0'}">
    <div class="stat"><b>${C.length}</b><span>कुल कैमरे</span></div>
    <div class="stat ok"><b>${ok}</b><span>🟢 चालू</span></div>
    <div class="stat ${bad.length?'bad':''}"><b>${bad.length}</b><span>🔴 खराब</span></div>
    <div class="stat"><b style="font-size:19px">${last?dFmt(last.date):'—'}</b><span>आख़िरी जाँच / सर्विस</span></div>
    <div class="stat"><b>${rs(cost)}</b><span>अब तक रखरखाव का खर्च</span></div>
  </div>
  <h2>कैमरे</h2>
  ${C.length?`<div class="memgrid">${C.map(c=>{const st=CAMST[c.status]||CAMST.ok;return `<article class="card cam ${c.status==='bad'?'isbad':''}">
    <div style="display:flex;justify-content:space-between;gap:8px;align-items:flex-start"><div style="display:flex;gap:12px;align-items:center;min-width:0"><div class="sico" aria-hidden="true">📹</div><div style="min-width:0"><h3 style="margin:0;font-size:19px">${esc(c.name)}</h3><div class="muted" style="font-size:14px">📍 ${c.place?esc(c.place):'<i>जगह अभी नहीं लिखी</i>'}</div></div></div><span class="pill ${st[1]}" style="font-size:14px">${st[2]} ${st[0]}</span></div>
    <div class="kv" style="grid-template-columns:1fr">${c.brand?`<div><span>कंपनी / मॉडल: </span>${esc(c.brand)}</div>`:''}${c.since?`<div><span>कब लगा: </span>${dFmt(c.since)}</div>`:''}${c.lastCheck?`<div><span>आख़िरी बार जाँचा: </span>${dFmt(c.lastCheck)}</div>`:''}${c.note?`<div><span>नोट: </span>${esc(c.note)}</div>`:''}</div>
    ${isAdmin?`<div class="actions">${c.status!=='ok'?`<button class="btn sm" style="--tc:var(--ok);--tc-ink:var(--surface)" data-act="camSt" data-id="${c.id}" data-m="ok">🟢 चालू है</button>`:''}${c.status!=='bad'?`<button class="btn sm" style="--tc:var(--bad);--tc-ink:var(--surface)" data-act="camSt" data-id="${c.id}" data-m="bad">🔴 खराब है</button>`:''}<button class="btn sm ghost" data-act="editCam" data-id="${c.id}">बदलें</button><button class="btn sm danger" data-act="delCam" data-id="${c.id}">हटाएँ</button></div>`:''}
  </article>`}).join('')}</div>`:`<div class="empty">अभी कोई कैमरा दर्ज नहीं है। ${isAdmin?'“कैमरा जोड़ें” से कैमरे की जगह लिखें।':''}</div>`}
  <div class="grid2" style="margin-top:20px">
    <section class="panel"><h2 style="margin:0">रिकॉर्डिंग और फुटेज</h2>
      <div class="contacts" style="margin-top:12px">
        <div><span class="muted">रिकॉर्डिंग (DVR) कहाँ रखी है</span><b>${esc(g.cctvWhere||'—')}</b></div>
        <div><span class="muted">रिकॉर्डिंग किसके पास</span><b>${esc(g.cctvKeeper||'—')}</b></div>
        <div><span class="muted">संपर्क नंबर</span><b class="num">${esc(g.cctvPhone||'—')}</b></div>
        <div><span class="muted">रिकॉर्डिंग कितने दिन सुरक्षित रहती है</span><b>${g.cctvDays?esc(g.cctvDays)+' दिन':'—'}</b></div>
      </div>
      <p style="white-space:pre-wrap;margin:12px 0 0;font-size:14.5px">${esc(g.cctvRule||'फुटेज देखने के नियम:\n1. फुटेज सिर्फ़ चोरी, झगड़े, दुर्घटना या गलत पार्किंग जैसी ज़रूरत पर दिखाई जाएगी।\n2. पहले यहाँ “फुटेज देखने का अनुरोध” भरें।\n3. फुटेज कमेटी सदस्य की मौजूदगी में ही दिखाई जाएगी, किसी को कॉपी नहीं दी जाएगी (पुलिस को छोड़कर)।')}</p></section>
    <section class="panel"><h2 style="margin:0">फुटेज के अनुरोध</h2>
      ${reqs.length?`<div class="contacts" style="margin-top:12px">${reqs.map(r=>`<div><span style="min-width:0"><b>${esc(r.title.replace(/^CCTV फुटेज: /,''))}</b><br><span class="muted" style="font-size:13.5px">मकान ${esc(r.house)} · ${esc(r.name)} · ${dFmt(r.date)}</span></span><span class="pill ${(STAT[r.status]||STAT.new)[1]}">${(STAT[r.status]||STAT.new)[0]}</span></div>`).join('')}</div><p class="muted" style="font-size:13.5px;margin:10px 0 0">कमेटी इनका जवाब “शिकायत / सुझाव” टैब में देती है।</p>`:'<div class="empty" style="margin-top:12px">अभी कोई अनुरोध बाकी नहीं है।</div>'}</section>
  </div>
  <h2>जाँच, सर्विस और मरम्मत का रिकॉर्ड</h2>
  ${S.clog.length?`<div class="scroll"><table><thead><tr><th>तारीख</th><th>काम</th><th>कैमरा</th><th>विवरण</th><th class="r">खर्च</th>${isAdmin?'<th></th>':''}</tr></thead><tbody>${S.clog.map(l=>`<tr><td>${dFmt(l.date)}</td><td><span class="pill p-info">${esc(LOGK[l.kind]||l.kind)}</span></td><td>${esc(camName(l.cam))}</td><td style="white-space:normal;min-width:160px">${esc(l.text||'')}${l.example?' <span class="pill p-mar">उदाहरण</span>':''}</td><td class="r num">${l.cost?rs(l.cost):'—'}</td>${isAdmin?`<td><button class="btn sm danger" data-act="delLog" data-id="${l.id}">हटाएँ</button></td>`:''}</tr>`).join('')}</tbody></table></div>`
  :`<div class="empty">अभी कोई रिकॉर्ड नहीं है। ${isAdmin?'हर महीने कैमरे जाँचकर “सर्विस / जाँच दर्ज करें” से लिखें।':''}</div>`}`;
},
team(){
  const t=S.cfg.termFrom||S.cfg.termTo?`<div class="deadline" style="margin-top:${isAdmin?'0':'16px'};border-left-color:var(--tc)"><div class="cal" style="background:color-mix(in srgb,var(--tc) 14%,var(--surface))"><small>कार्यकाल</small><b style="font-size:18px">${esc(S.cfg.termFrom||'')}${S.cfg.termTo?'–'+esc(S.cfg.termTo):''}</b></div><div><b>वर्तमान कमेटी</b> · ${S.team.length} सदस्य${S.cfg.termNote?`<div class="muted" style="font-size:14px">${esc(S.cfg.termNote)}</div>`:''}</div></div>`:'';
  if(!S.team.length)return `${t}<div class="empty" style="margin-top:16px">अभी कमेटी सदस्यों की जानकारी नहीं जोड़ी गई। ${isAdmin?'“सदस्य जोड़ें” दबाकर अध्यक्ष, सचिव और कोषाध्यक्ष के नाम डालें।':''}</div>`;
  const lead=S.team.filter(m=>postRank(m.post)<=4),rest=S.team.filter(m=>postRank(m.post)>4);
  const card=m=>`<article class="card mem ${postRank(m.post)===0?'chief':''}">
    <div class="av">${m.photo?`<img src="${PIX}" data-img="${esc(m.photo)}" alt="${esc(m.name)}">`:`<span>${esc(initials(m.name))}</span>`}</div>
    <div style="min-width:0;flex:1;display:grid;gap:6px">
      <div><span class="post">${postRank(m.post)===0?'👑 ':''}${esc(m.post)}</span>${m.example?' <span class="pill p-mar">उदाहरण</span>':''}</div>
      <h3 style="margin:0;font-size:19px">${esc(m.name)}</h3>
      <div class="muted" style="font-size:14px">${m.house?'मकान '+esc(m.house):''}${m.house&&m.since?' · ':''}${m.since?esc(m.since)+' से':''}</div>
      ${m.duty?`<div style="font-size:14.5px"><span class="muted">ज़िम्मेदारी: </span>${esc(m.duty)}</div>`:''}
      ${m.phone?`<div class="phone" style="font-size:16px"><span class="num">📞 ${esc(m.phone)}</span><button class="btn sm ghost" data-act="copyPhone" data-id="${esc(m.phone)}">कॉपी करें</button></div>`:''}
      ${isAdmin?`<div class="actions" style="margin-top:0"><button class="btn sm ghost" data-act="editMem" data-id="${m.id}">बदलें</button><button class="btn sm danger" data-act="delMem" data-id="${m.id}">हटाएँ</button></div>`:''}
    </div></article>`;
  return `${t}${exBanner()}
  ${lead.length?`<h2>पदाधिकारी</h2><div class="memgrid">${lead.map(card).join('')}</div>`:''}
  ${rest.length?`<h2>सदस्य और सलाहकार</h2><div class="memgrid">${rest.map(card).join('')}</div>`:''}
  <h2>किस काम के लिए किससे बात करें</h2>
  <div class="scroll"><table><thead><tr><th>काम</th><th>किससे बात करें</th></tr></thead><tbody>
    ${[['मेंटेनेंस जमा करना, रसीद, हिसाब','कोषाध्यक्ष'],['शिकायत, सूचना, आम सभा','सचिव'],['बड़े फ़ैसले, विवाद, पार्किंग की समस्या','अध्यक्ष'],['नए किराएदार की जानकारी, पुलिस वेरिफिकेशन','सचिव']].map(([w,p])=>{const m=S.team.find(x=>x.post===p);return `<tr><td style="white-space:normal">${w}</td><td>${m?`<b>${esc(m.name)}</b> <span class="muted">(${p})</span>${m.phone?' · <span class="num">'+esc(m.phone)+'</span>':''}`:`<span class="muted">${p}</span>`}</td></tr>`}).join('')}
  </tbody></table></div>`;
},
svc(){
  const likes=id=>Object.values(S.sv).filter(v=>v&&v[id]).length;
  const q=F.sq.trim().toLowerCase();
  const list=S.svc.filter(x=>(F.scat==='all'||x.cat===F.scat)&&(!q||[x.name,x.cat,x.phone,x.note,x.area].some(v=>String(v||'').toLowerCase().includes(q)))).sort((a,b)=>likes(b.id)-likes(a.id)||String(a.cat).localeCompare(String(b.cat)));
  if(!S.svc.length)return `<div class="empty">अभी कोई सेवा देने वाला नहीं जोड़ा गया। ${isAdmin?'“सेवा देने वाला जोड़ें” दबाकर प्लंबर, इलेक्ट्रीशियन या दूध वाले का नंबर डालें।':'कमेटी जल्द ही भरोसेमंद लोगों के नंबर जोड़ेगी। आप किसी को सुझाना चाहें तो “शिकायत / सुझाव” में लिखें।'}</div>`;
  if(!list.length)return `<div class="empty">इस खोज से कोई नहीं मिला।</div>`;
  return `${exBanner()}<div class="svcgrid" style="margin-top:${hasExamples()?'14px':'0'}">${list.map(x=>{const n=likes(x.id),mine=uid&&S.sv[uid]&&S.sv[uid][x.id];
    return `<article class="card svc"><div style="display:flex;gap:12px;align-items:flex-start"><div class="sico" aria-hidden="true">${svcIcon(x.cat)}</div><div style="min-width:0;flex:1">
      <h3 style="margin:0">${esc(x.name)}</h3><div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:3px"><span class="pill" style="background:color-mix(in srgb,var(--tc) 14%,var(--surface));color:var(--tc)">${esc(x.cat)}</span>${x.verified?'<span class="pill p-ok">✓ पहचान जाँची गई</span>':''}${x.example?'<span class="pill p-mar">उदाहरण</span>':''}</div></div></div>
      <div class="phone"><span class="num">📞 ${esc(x.phone||'—')}</span>${x.phone?`<button class="btn sm ghost" data-act="copyPhone" data-id="${esc(x.phone)}">कॉपी करें</button>`:''}</div>
      <div class="kv" style="grid-template-columns:1fr">${x.timing?`<div><span>समय: </span>${esc(x.timing)}</div>`:''}${x.rate?`<div><span>रेट: </span>${esc(x.rate)}</div>`:''}${x.area?`<div><span>कहाँ से: </span>${esc(x.area)}</div>`:''}${x.note?`<div><span>नोट: </span>${esc(x.note)}</div>`:''}</div>
      <div class="actions" style="align-items:center">${uid?`<button class="btn sm ${mine?'':'ghost'}" data-act="likeSvc" data-id="${x.id}" aria-pressed="${!!mine}">👍 ${mine?'आपको पसंद है':'अच्छा काम'}</button>`:''}<span class="muted" style="font-size:13.5px">${n?(n===1?'1 व्यक्ति':n+' लोगों')+' ने पसंद किया':''}</span></div>
      ${isAdmin?`<div class="actions" style="margin-top:0;justify-content:flex-end"><button class="btn sm ghost" data-act="editSvc" data-id="${x.id}">बदलें</button><button class="btn sm danger" data-act="delSvc" data-id="${x.id}">हटाएँ</button></div>`:''}</article>`}).join('')}</div>`;
},
admin(){
  if(!isAdmin)return '<div class="empty">यह टैब सिर्फ़ कमेटी के लिए है।</div>';
  const cm=curMonth(),pend=S.houses.filter(h=>m0(h)).length,od=S.houses.filter(h=>dueMonths(h).length).length,open=S.comp.filter(c=>c.status!=='done').length,unver=S.houses.filter(h=>h.occ==='rent'&&!h.police).length;
  function m0(h){return cm>=hStart(h)&&!S.pay[h.id+'_'+cm]}
  const q=(t,e,l,d,act,extra='')=>`<button style="--tc:var(--t-${t})" data-act="${act}" ${extra}><span class="e">${e}</span><b>${l}</b><span class="muted" style="font-size:13px">${d}</span></button>`;
  return `${exBanner()}
  <h2>जल्दी के काम</h2>
  <div class="quick">
    ${q('houses','🏘️','नया घर जोड़ें','मालिक और किराएदार','addHouse')}
    ${q('parking','🚗','गाड़ी जोड़ें','कार या बाइक का नंबर','addVeh')}
    ${q('maint','💰','मेंटेनेंस जमा करें','इस महीने की सूची खोलें','goto','data-id="maint" data-m="month"')}
    ${q('maint','⏰','बकाया सूची','याद दिलाने के संदेश भेजें','goto','data-id="maint" data-m="due"')}
    ${q('home','📢','नई सूचना','सूचना बोर्ड पर डालें','addNotice')}
    ${q('acct','➕','आय जोड़ें','दान, जुर्माना, किराया','addInc')}
    ${q('acct','➖','खर्च जोड़ें','फंड से हुआ भुगतान','addExp')}
    ${q('polls','🗳️','नया पोल','निवासियों की राय लें','addPoll')}
    ${assets?q('gallery','📷','फोटो जोड़ें','कार्यक्रम की फोटो','addPhotos'):''}
    ${q('svc','🧰','सेवा देने वाला','प्लंबर, कामवाली, दूध वाला','addSvc')}
    ${q('cctv','📹','CCTV जाँच दर्ज करें','सर्विस, मरम्मत, जाँच','addLog')}
    ${q('team','🤝','कमेटी सदस्य','पद, नंबर और फोटो','addMem')}
    ${q('admin','⚙️','सेटिंग्स','रकम, तारीख, संपर्क','settings')}
  </div>
  <h2>ध्यान देने वाली बातें</h2>
  <div class="stats" style="margin-top:0">
    <div class="stat" style="--tc:var(--t-maint)"><b>${pend}</b><span>घरों का ${mLong(cm)} का मेंटेनेंस बाकी</span></div>
    <div class="stat bad" style="--tc:var(--bad)"><b>${od}</b><span>घर जिनका पैसा देरी से बकाया है</span></div>
    <div class="stat" style="--tc:var(--t-comp)"><b>${open}</b><span>शिकायतें जिनका जवाब देना है</span></div>
    <div class="stat" style="--tc:var(--t-houses)"><b>${unver}</b><span>किराएदार बिना पुलिस वेरिफिकेशन</span></div>
  </div>
  <div class="grid2" style="margin-top:20px">
    <section class="panel"><div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;align-items:center"><h2 style="margin:0">कॉलोनी की सेटिंग्स</h2><button class="btn sm" data-act="settings">बदलें</button></div>
      <div class="contacts" style="margin-top:12px">
        <div><span class="muted">कॉलोनी का नाम</span><b>${esc(S.cfg.name)}</b></div>
        <div><span class="muted">मासिक मेंटेनेंस</span><b class="num">${rs(S.cfg.charge)}</b></div>
        <div><span class="muted">जमा करने की तारीख</span><b>हर महीने 1 से ${DD()}</b></div>
        <div><span class="muted">लेट फीस</span><b class="num">${FEE()?rs(FEE()):'नहीं'}</b></div>
        <div><span class="muted">मेंटेनेंस कब से</span><b>${mLong(S.cfg.start)}</b></div>
        <div><span class="muted">ज़रूरी संपर्क</span><b>${(S.cfg.contacts||[]).length} नंबर</b></div>
        <div><span class="muted">UPI ID (ऑनलाइन भुगतान)</span><b>${esc(S.cfg.upiId||'—')}</b></div>
      </div></section>
    <section class="panel"><h2 style="margin:0">ऐप में लॉगिन</h2>
      <p style="margin:12px 0 0">जिन लोगों का मोबाइल नंबर या ईमेल नीचे <b>“लॉगिन वाले सदस्य”</b> में जुड़ा है, सिर्फ़ वही OTP से लॉगिन करके ऐप खोल सकते हैं।</p>
      <ul style="margin:10px 0 0;padding-left:20px;display:grid;gap:4px"><li><b>👑 एडमिन:</b> सब कुछ जोड़ और बदल सकते हैं।</li><li><b>🏠 निवासी:</b> सब देख सकते हैं, शिकायत, वोट और भुगतान की सूचना भेज सकते हैं।</li></ul>
      ${isOwner?'<button class="btn sm ghost" style="margin-top:12px" data-act="ownerPanel">👑 ऐप मालिक पैनल (सभी कॉलोनियाँ)</button>':''}</section>
  </div>
  <div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;align-items:center;margin-top:28px"><h2 style="margin:0">लॉगिन वाले सदस्य <span class="muted" style="font-family:var(--body);font-size:15px">· ${S.members.length}</span></h2>
    <span class="actions" style="margin:0"><button class="btn sm ghost" data-act="bulkMem">🏘️ घरों के नंबर से सबको जोड़ें</button><button class="btn sm" data-act="addLogin">+ सदस्य जोड़ें</button></span></div>
  <div class="toolbar"><input class="grow" id="mq" type="search" placeholder="नाम, नंबर या मकान से खोजें" value="${esc(F.mq||'')}"></div>
  ${S.members.length?`<div class="scroll"><table><thead><tr><th>नाम</th><th>मोबाइल / ईमेल</th><th>मकान</th><th>भूमिका</th><th></th></tr></thead><tbody>${S.members.filter(m=>{const q=(F.mq||'').trim().toLowerCase();return !q||[m.name,m.phone10,m.email,m.house].some(v=>String(v||'').toLowerCase().includes(q))}).map(m=>`<tr><td>${esc(m.name||'—')}</td><td class="num">${m.phone10?esc(m.phone10):''}${m.email?'<div class="muted" style="font-size:13px">'+esc(m.email)+'</div>':''}</td><td>${esc(m.house||'—')}</td><td><span class="pill ${m.role==='admin'?'p-mar':'p-acc'}">${m.role==='admin'?'👑 एडमिन':'🏠 निवासी'}</span></td><td><button class="btn sm ghost" data-act="editLogin" data-id="${m.id}">बदलें</button> <button class="btn sm danger" data-act="delLogin" data-id="${m.id}">हटाएँ</button></td></tr>`).join('')}</tbody></table></div>`:'<div class="empty">अभी कोई सदस्य नहीं जुड़ा। “घरों के नंबर से सबको जोड़ें” दबाएँ या एक-एक करके जोड़ें।</div>'}`;
},
parking(){
  const V=S.veh,cars=V.filter(v=>v.type==='car'),bikes=V.filter(v=>v.type==='bike'),out=V.filter(v=>v.parkAt==='गली में').length;
  const multi=S.houses.map(h=>({h,c:vehOf(h.id).filter(v=>v.type==='car').length})).filter(x=>x.c>=2).sort((a,b)=>b.c-a.c);
  const q=normV(F.vq);let res='';
  if(q){const m=V.filter(v=>normV(v.number).includes(q));
    res=`<h2 style="margin-top:4px">खोज का नतीजा</h2>${m.length?`<div class="list">${m.map(v=>{const h=houseById(v.house)||{};return `<div class="card"><div class="row"><div><div class="hno">${VT[v.type]?.[1]||''} ${esc(v.number)}</div><div class="muted" style="font-size:14px">${esc(VT[v.type]?.[0]||'')}${v.model?' · '+esc(v.model):''}</div></div><span class="pill p-acc">मकान ${esc(h.no||v.houseNo)}</span></div>
      <div class="kv"><div><span>मालिक: </span>${esc(h.owner||'—')}</div><div><span>मालिक का मोबाइल: </span><span class="num">${esc(h.ownerPhone||'—')}</span></div>${h.occ==='rent'?`<div><span>किराएदार: </span>${esc(h.tenant||'—')}</div><div><span>किराएदार मोबाइल: </span><span class="num">${esc(h.tenantPhone||'—')}</span></div>`:''}<div><span>आम तौर पर खड़ी होती है: </span>${esc(v.parkAt||'—')}</div></div></div>`}).join('')}</div>`
      :`<div class="empty">यह गाड़ी कॉलोनी के रजिस्टर में नहीं है। हो सकता है यह किसी मेहमान या बाहर वाले की हो।</div>`}`}
  return `${exBanner()}${res}
  <div class="stats" style="margin-top:${q?'20px':'0'}"><div class="stat"><b>${cars.length}</b><span>🚗 कुल कारें</span></div><div class="stat"><b>${bikes.length}</b><span>🏍️ कुल बाइक / स्कूटी</span></div><div class="stat ${out?'bad':''}"><b>${out}</b><span>गाड़ियाँ गली में खड़ी होती हैं</span></div><div class="stat"><b>${S.comp.filter(c=>c.cat==='पार्किंग'&&c.status!=='done').length}</b><span>खुली पार्किंग शिकायतें</span></div></div>
  <div class="grid2" style="margin-top:20px">
    <section class="panel"><div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;align-items:center"><h2 style="margin:0">पार्किंग के नियम</h2>${isAdmin?'<button class="btn sm ghost" data-act="editRules">नियम बदलें</button>':''}</div>
      <p style="white-space:pre-wrap;margin:12px 0 0">${esc(S.cfg.parkRules||DEFAULT_RULES)}</p></section>
    <section class="panel"><h2 style="margin:0">जिन घरों में 2 या ज़्यादा कारें हैं</h2>
      ${multi.length?`<div class="contacts" style="margin-top:12px">${multi.map(({h,c})=>`<div><span><b>${esc(h.no)}</b> <span class="muted">· ${esc(h.owner)}</span></span><span class="pill p-warn">${c} कारें</span></div>`).join('')}</div><p class="muted" style="font-size:13.5px;margin:10px 0 0">पार्किंग की जगह तय करते समय इन घरों से बात करना मददगार रहेगा।</p>`:'<div class="empty" style="margin-top:12px">किसी घर में 2 से ज़्यादा कारें दर्ज नहीं हैं।</div>'}</section>
  </div>
  <h2>गाड़ियों का रजिस्टर</h2>
  ${V.length?`<div class="scroll"><table><thead><tr><th>मकान</th><th>गाड़ी</th><th>नंबर</th><th>मॉडल / रंग</th><th>कहाँ खड़ी होती है</th>${isAdmin?'<th></th>':''}</tr></thead><tbody>${V.map(v=>`<tr><td><b>${esc((houseById(v.house)||{}).no||v.houseNo)}</b></td><td>${VT[v.type]?.[1]||''} ${esc(VT[v.type]?.[0]||'')}</td><td class="num"><b>${esc(v.number)}</b>${v.example?' <span class="pill p-mar">उदाहरण</span>':''}</td><td>${esc(v.model||'—')}</td><td>${v.parkAt==='गली में'?`<span class="pill p-bad">${esc(v.parkAt)}</span>`:esc(v.parkAt||'—')}</td>${isAdmin?`<td><button class="btn sm ghost" data-act="editVeh" data-id="${v.id}">बदलें</button> <button class="btn sm danger" data-act="delVeh" data-id="${v.id}">हटाएँ</button></td>`:''}</tr>`).join('')}</tbody></table></div>`
  :`<div class="empty">अभी कोई गाड़ी दर्ज नहीं है। ${isAdmin?'“गाड़ी जोड़ें” से हर घर की कार और बाइक के नंबर दर्ज करें।':''}</div>`}`;
},
maint(){return claimsBox()+maintMain()}
};
function claimsBox(){
  const pend=S.claims.filter(c=>c.status==='pending');
  if(isAdmin){
    if(!pend.length)return '';
    return `<section class="panel" style="margin-bottom:16px;border:1.5px solid var(--tc)"><h2 style="margin:0">🔔 भुगतान की पुष्टि बाकी <span class="pill p-warn">${pend.length}</span></h2><p class="muted" style="margin:4px 0 10px;font-size:14px">निवासियों ने UPI से भुगतान करके सूचना भेजी है। बैंक / UPI ऐप में पैसा आया है या नहीं, जाँचकर पुष्टि करें।</p>
    <div class="list">${pend.map(c=>`<div class="card"><div class="row" style="align-items:center"><div><b>मकान ${esc(c.houseNo)}</b> · ${mLong(c.month)} · <b class="num">${rs(c.amount)}</b><div class="muted" style="font-size:13.5px">UTR / रेफ़रेंस: <b class="num">${esc(c.ref||'—')}</b> · ${dFmt(c.date)} · ${esc(c.name||'')}</div></div>
      <span class="actions" style="margin:0"><button class="btn sm" style="--tc:var(--ok);--tc-ink:var(--surface)" data-act="claimOk" data-id="${c.id}">✓ पैसा आ गया, पुष्टि करें</button><button class="btn sm danger" data-act="claimNo" data-id="${c.id}">✗ नहीं आया</button></span></div></div>`).join('')}</div></section>`;
  }
  const mine=S.claims.filter(c=>c.by===uid).slice(0,5);
  if(!mine.length)return '';
  const st={pending:['पुष्टि बाकी','p-warn'],approved:['✓ पुष्टि हो गई','p-ok'],rejected:['✗ पैसा नहीं मिला, कमेटी से बात करें','p-bad']};
  return `<section class="panel" style="margin-bottom:16px"><h2 style="margin:0;font-size:20px">आपकी भेजी भुगतान सूचनाएँ</h2><div class="contacts" style="margin-top:10px">${mine.map(c=>`<div><span>मकान ${esc(c.houseNo)} · ${mLong(c.month)} · <b class="num">${rs(c.amount)}</b></span><span class="pill ${(st[c.status]||st.pending)[1]}">${(st[c.status]||st.pending)[0]}</span></div>`).join('')}</div></section>`;
}
function maintMain(){
  if(!S.houses.length)return `<div class="empty">पहले “घर व निवासी” में घर जोड़ें, फिर यहाँ मेंटेनेंस दर्ज होगा।</div>`;
  const ch=Number(S.cfg.charge||0);
  if(F.view==='month'){
    const m=F.month,act=S.houses.filter(h=>m>=hStart(h)),paid=act.filter(h=>S.pay[h.id+'_'+m]),late=paid.filter(h=>isLate(S.pay[h.id+'_'+m])).length,od=overdue(m);
    const sum=paid.reduce((s,h)=>s+Number(S.pay[h.id+'_'+m].amount||0),0);
    return `<p style="margin:0 0 12px">${mLong(m)} की आख़िरी तारीख: <b>${dFmt(deadline(m))}</b> ${od?'<span class="pill p-bad">निकल चुकी है</span>':'<span class="pill p-warn">अभी समय है</span>'}</p>
    <div class="stats" style="margin-top:0"><div class="stat ok"><b>${paid.length-late}</b><span>समय पर जमा (${DD()} तारीख तक)</span></div><div class="stat"><b style="color:var(--marigold)">${late}</b><span>देर से जमा</span></div><div class="stat ${od?'bad':''}"><b>${act.length-paid.length}</b><span>${od?'देरी से बकाया':'अभी बाकी'}</span></div><div class="stat"><b>${rs(sum)}</b><span>इस महीने की वसूली</span></div></div>
    <div class="list" style="margin-top:14px">${S.houses.map(h=>{const p=S.pay[h.id+'_'+m];const before=m<hStart(h);
      return `<div class="card"><div class="row" style="align-items:center"><div><span class="hno" style="font-size:19px">${esc(h.no)}</span> <span class="muted">· ${esc(h.owner)}</span></div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center">${p?`<span class="pill ${isLate(p)?'p-mar':'p-ok'}">✓ ${isLate(p)?'देर से जमा · '+dFmt(p.date):'समय पर जमा'} · ${rs(p.amount)} · ${esc(p.mode)}</span><button class="btn sm ghost" data-act="receipt" data-id="${h.id}" data-m="${m}">रसीद</button>${isAdmin?`<button class="btn sm danger" data-act="unpay" data-id="${h.id}" data-m="${m}">रद्द करें</button>`:''}`:before?`<span class="pill p-acc">लागू नहीं</span>`:(overdue(m)?`<span class="pill p-bad">✗ देरी से बकाया · ${rs(ch+FEE())}</span>`:`<span class="pill p-warn">बाकी · ${dFmt(deadline(m))} तक</span>`)+`${isAdmin?`<button class="btn sm" data-act="pay" data-id="${h.id}" data-m="${m}">जमा दर्ज करें</button>`:''}`}</div></div></div>`}).join('')}</div>`;
  }
  if(F.view==='ledger'){
    const ms=months(addM(F.month,-5),F.month);
    return `<p class="muted" style="margin:0 0 10px;font-size:14px">✓ हरा = समय पर जमा · ✓ पीला = देर से जमा · ✗ = बकाया · … = अभी समय है · – = लागू नहीं। ${isAdmin?'खाने पर दबाकर जमा दर्ज करें या रसीद देखें।':'खाने पर दबाकर रसीद देखें।'}</p>
    <div class="scroll"><table><thead><tr><th>मकान</th><th>मालिक</th>${ms.map(m=>`<th class="c">${mName(m)}</th>`).join('')}<th class="r">कुल बकाया</th></tr></thead><tbody>
    ${S.houses.map(h=>{const d=dueMonths(h).length;return `<tr><td><b>${esc(h.no)}</b></td><td>${esc(h.owner)}</td>${ms.map(m=>{const p=S.pay[h.id+'_'+m];if(m<hStart(h))return '<td class="c"><span class="dot x">–</span></td>';
      const cls=p?(isLate(p)?'l':'y'):(overdue(m)?'n':'w');
      return `<td class="c"><span class="dot ${cls}" role="button" tabindex="0" style="cursor:pointer" data-act="${p?'receipt':(isAdmin?'pay':'')}" data-id="${h.id}" data-m="${m}" aria-label="${esc(h.no)} ${mName(m)} ${p?(isLate(p)?'देर से जमा':'समय पर जमा'):(overdue(m)?'बकाया':'अभी समय है')}">${p?'✓':overdue(m)?'✗':'…'}</span></td>`}).join('')}<td class="r num" style="color:${d?'var(--bad)':'var(--ok)'}">${d?rs(dueAmt(h)):'—'}</td></tr>`}).join('')}
    </tbody></table></div>`;
  }
  const rows=S.houses.map(h=>({h,d:dueMonths(h)})).filter(x=>x.d.length).sort((a,b)=>b.d.length-a.d.length);
  if(!rows.length)return `<div class="empty">बहुत बढ़िया! किसी भी घर का मेंटेनेंस बकाया नहीं है।</div>`;
  const tot=rows.reduce((s,x)=>s+dueAmt(x.h),0);
  return `<p class="muted" style="margin:0 0 6px;font-size:14px">${ruleLine()} इस सूची में सिर्फ़ वे महीने हैं जिनकी आख़िरी तारीख निकल चुकी है${FEE()?', और हर महीने के साथ लेट फीस जुड़ी है':''}।</p><p style="margin:0 0 10px">${rows.length} घरों पर कुल <b class="num" style="color:var(--bad)">${rs(tot)}</b> बकाया है।</p>
  <div class="scroll"><table><thead><tr><th>मकान</th><th>मालिक</th><th>मोबाइल</th><th class="r">महीने</th><th class="r">रकम</th><th>कब से</th><th class="r">कितनी बार देर से दिया</th><th></th></tr></thead><tbody>
  ${rows.map(({h,d})=>`<tr><td><b>${esc(h.no)}</b></td><td>${esc(h.owner)}</td><td class="num">${esc(h.ownerPhone||'—')}</td><td class="r num">${d.length}</td><td class="r num" style="color:var(--bad)">${rs(dueAmt(h))}</td><td>${mName(d[0])}</td><td class="r num">${lateCount(h)||'—'}</td><td><button class="btn sm ghost" data-act="remind" data-id="${h.id}">याद दिलाएँ</button></td></tr>`).join('')}
  </tbody></table></div>`;
}
Object.assign(BODY,{
comp(){
  const list=S.comp.filter(c=>(F.ckind==='all'||c.kind===F.ckind)&&(F.cstat==='all'||c.status===F.cstat));
  if(!S.comp.length)return `<div class="empty">अभी कोई शिकायत या सुझाव दर्ज नहीं है। ऊपर के बटन से पहली शिकायत दर्ज करें।</div>`;
  if(!list.length)return `<div class="empty">इस फ़िल्टर में कुछ नहीं मिला।</div>`;
  return `<div class="list">${list.map(c=>{const st=STAT[c.status]||STAT.new;const v=Object.values(S.cv).filter(x=>x&&x[c.id]).length;const mine=uid&&S.cv[uid]&&S.cv[uid][c.id];
    return `<article class="card"><div class="row"><div style="min-width:0"><div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:4px"><span class="pill ${c.kind==='suggestion'?'p-mar':'p-acc'}">${c.kind==='suggestion'?'सुझाव':'शिकायत'}</span><span class="pill p-info" style="background:var(--bg);color:var(--muted)">${esc(c.cat)}</span>${c.example?'<span class="pill p-mar">उदाहरण</span>':''}</div>
      <h3>${esc(c.title)}</h3></div><span class="pill ${st[1]}">${st[0]}</span></div>
      <p style="margin:6px 0;white-space:pre-wrap">${esc(c.text)}</p>
      <div class="muted" style="font-size:13.5px">मकान ${esc(c.house||'—')} · ${esc(c.name||'')} · ${dFmt(c.date)}</div>
      ${c.vnum?(()=>{const v=S.veh.find(x=>normV(x.number)===normV(c.vnum)||(normV(c.vnum).length>=4&&normV(x.number).endsWith(normV(c.vnum))));const h=v&&houseById(v.house);return `<div style="margin-top:6px;font-size:14px">गाड़ी <b>${esc(c.vnum)}</b>: ${h?`मकान <b>${esc(h.no)}</b> (${esc(h.owner)})${isAdmin&&h.ownerPhone?' · <span class="num">'+esc(h.ownerPhone)+'</span>':''}`:'<span class="muted">रजिस्टर में नहीं मिली, शायद बाहर की गाड़ी है</span>'}</div>`})():''}
      ${c.reply?`<div class="notice" style="margin:10px 0 0"><b style="font-size:14px">कमेटी का जवाब</b><p>${esc(c.reply)}</p></div>`:''}
      <div class="actions">${uid?`<button class="btn sm ${mine?'':'ghost'}" data-act="vote" data-id="${c.id}" aria-pressed="${!!mine}">👍 सहमत ${v?'· '+v:''}</button>`:(v?`<span class="votes muted">👍 ${v} लोग सहमत</span>`:'')}
      ${isAdmin?`<button class="btn sm ghost" data-act="handleComp" data-id="${c.id}">स्थिति / जवाब</button><button class="btn sm danger" data-act="delComp" data-id="${c.id}">हटाएँ</button>`:''}</div></article>`}).join('')}</div>`;
},
acct(){
  const ob=Number(S.cfg.openBal||0),mt=sumA(S.payList),oi=sumA(S.exp.filter(isIn)),sp=sumA(S.exp.filter(e=>!isIn(e))),bal=ob+mt+oi-sp;
  const all=bookRows(),rows=all.filter(r=>(F.am==='all'||r.date.startsWith(F.am))&&(F.ak==='all'||(F.ak==='in'?r.inc>0:r.out>0)));
  const fIn=rows.reduce((s,r)=>s+r.inc,0),fOut=rows.reduce((s,r)=>s+r.out,0);
  const outs=S.exp.filter(e=>!isIn(e)&&(F.am==='all'||String(e.date).startsWith(F.am)));const byCat={};outs.forEach(e=>byCat[e.cat]=(byCat[e.cat]||0)+Number(e.amount||0));const ct=sumA(outs);
  const mset=[...new Set(all.map(r=>r.date.slice(0,7)).filter(Boolean))].sort();let run=ob;
  const msum=mset.map(m=>{const r=all.filter(x=>x.date.startsWith(m));const mi=r.filter(x=>x.maint).reduce((s,x)=>s+x.inc,0),o=r.filter(x=>!x.maint).reduce((s,x)=>s+x.inc,0),x=r.reduce((s,y)=>s+y.out,0);run+=mi+o-x;return {m,mi,o,x,net:mi+o-x,run}}).reverse();
  const act=r=>r.maint?`<button class="btn sm ghost" data-act="goto" data-id="maint" data-m="month">देखें</button>`:`${r.e.bill?`<button class="btn sm ghost" data-act="viewBill" data-id="${r.e.id}">🧾 बिल</button> `:''}${isAdmin?`<button class="btn sm ghost" data-act="editExp" data-id="${r.e.id}">बदलें</button> <button class="btn sm danger" data-act="delExp" data-id="${r.e.id}">हटाएँ</button>`:''}`;
  return `${exBanner()}
  <div class="stats" style="margin-top:${hasExamples()?'16px':'0'}">
    <div class="stat"><b>${rs(ob)}</b><span>शुरुआती बचत${isAdmin?' · <a href="#" data-act="setOpen" style="color:var(--tc)">बदलें</a>':''}</span></div>
    <div class="stat ok"><b>+${rs(mt)}</b><span>मेंटेनेंस से आय</span></div>
    <div class="stat ok"><b>+${rs(oi)}</b><span>दूसरी आय (दान, जुर्माना…)</span></div>
    <div class="stat bad"><b>−${rs(sp)}</b><span>कुल खर्च</span></div>
    <div class="stat ${bal>=0?'ok':'bad'}" style="--tc:${bal>=0?'var(--ok)':'var(--bad)'}"><b>${rs(bal)}</b><span>अभी फंड में बची रकम</span></div>
  </div>
  <p class="muted num" style="font-size:14px;margin:10px 0 0">हिसाब: ${rs(ob)} + ${rs(mt)} + ${rs(oi)} − ${rs(sp)} = <b style="color:var(--ink)">${rs(bal)}</b></p>

  <h2>रोकड़ बही (हर एंट्री के बाद बची रकम)</h2>
  ${rows.length?`<div class="scroll"><table><thead><tr><th>तारीख</th><th>विवरण</th><th>श्रेणी</th><th class="r">आय (+)</th><th class="r">खर्च (−)</th><th class="r">बाकी रकम</th><th></th></tr></thead><tbody>
    ${[...rows].reverse().map(r=>`<tr><td>${dFmt(r.date)}</td><td style="white-space:normal;min-width:180px">${esc(r.title)}${r.e&&r.e.example?' <span class="pill p-mar">उदाहरण</span>':''}${r.e&&r.e.note?`<div class="muted" style="font-size:13px">${esc(r.e.note)}</div>`:''}</td><td><span class="pill ${r.inc?'p-ok':'p-bad'}">${esc(r.cat)}</span></td>
      <td class="r num" style="color:var(--ok)">${r.inc?'+'+rs(r.inc):''}</td><td class="r num" style="color:var(--bad)">${r.out?'−'+rs(r.out):''}</td><td class="r num"><b>${rs(r.bal)}</b></td><td>${act(r)}</td></tr>`).join('')}
    <tr><td colspan="3"><b>${F.am==='all'?'कुल':mLong(F.am)+' का कुल'}</b> <span class="muted">(${rows.length} एंट्री)</span></td><td class="r num" style="color:var(--ok)"><b>+${rs(fIn)}</b></td><td class="r num" style="color:var(--bad)"><b>−${rs(fOut)}</b></td><td class="r num"><b>${fIn-fOut>=0?'+':'−'}${rs(Math.abs(fIn-fOut))}</b></td><td></td></tr>
    ${F.am==='all'&&F.ak==='all'?`<tr><td colspan="5" class="muted">शुरुआती बचत</td><td class="r num">${rs(ob)}</td><td></td></tr>`:''}
  </tbody></table></div>`:`<div class="empty">इस फ़िल्टर में कोई एंट्री नहीं है। ${isAdmin?'ऊपर “+ आय जोड़ें” या “− खर्च जोड़ें” से एंट्री करें।':''}</div>`}

  ${msum.length?`<h2>महीने के हिसाब से</h2><div class="scroll"><table><thead><tr><th>महीना</th><th class="r">मेंटेनेंस</th><th class="r">दूसरी आय</th><th class="r">खर्च</th><th class="r">उस महीने बचत</th><th class="r">महीने के अंत में फंड</th></tr></thead><tbody>
    ${msum.map(x=>`<tr><td><b>${mLong(x.m)}</b></td><td class="r num" style="color:var(--ok)">${rs(x.mi)}</td><td class="r num" style="color:var(--ok)">${rs(x.o)}</td><td class="r num" style="color:var(--bad)">${rs(x.x)}</td><td class="r num"><span class="pill ${x.net>=0?'p-ok':'p-bad'}">${x.net>=0?'+':'−'}${rs(Math.abs(x.net))}</span></td><td class="r num"><b>${rs(x.run)}</b></td></tr>`).join('')}
  </tbody></table></div>`:''}

  ${Object.keys(byCat).length?`<h2>खर्च किस पर हुआ${F.am==='all'?'':' · '+mLong(F.am)}</h2><div class="panel">${Object.entries(byCat).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`<div style="display:flex;justify-content:space-between;gap:12px;padding:4px 0"><span>${esc(k)}</span><span class="num">${rs(v)} <span class="muted" style="font-size:13px">(${Math.round(v*100/ct)}%)</span></span></div><div style="height:7px;border-radius:4px;background:var(--bg);margin-bottom:6px"><div style="height:7px;border-radius:4px;background:var(--tc);width:${v*100/ct}%"></div></div>`).join('')}</div>`:''}`;
},
polls(){
  if(!S.polls.length)return `<div class="empty">अभी कोई पोल नहीं है। ${isAdmin?'ऊपर “नया पोल बनाएँ” से कॉलोनी की राय लें, जैसे “क्या CCTV लगवाना चाहिए?”':''}</div>`;
  return `${exBanner()}<div class="list" style="margin-top:12px">${S.polls.map(p=>{const tally=p.options.map(()=>0);let total=0;
    Object.values(S.pv).forEach(v=>{const i=v&&v[p.id];if(Number.isInteger(i)&&i>=0&&i<tally.length){tally[i]++;total++}});
    const mine=uid&&S.pv[uid]?S.pv[uid][p.id]:undefined;const max=Math.max(...tally);
    return `<article class="card"><div class="row"><div style="min-width:0"><h3 style="font-size:19px">${esc(p.q)}</h3><div class="muted" style="font-size:13.5px">${dFmt(p.date)} · ${total} वोट${p.example?' · <span class="pill p-mar">उदाहरण</span>':''}</div></div><span class="pill ${p.open?'p-ok':'p-warn'}">${p.open?'वोटिंग चालू':'वोटिंग बंद'}</span></div>
    ${p.note?`<p style="margin:8px 0 0;white-space:pre-wrap">${esc(p.note)}</p>`:''}
    <div style="display:grid;gap:8px;margin-top:12px">${p.options.map((o,i)=>{const pc=total?Math.round(tally[i]*100/total):0;const me=mine===i;
      return `<div><div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;align-items:center"><span>${esc(o)} ${me?'<span class="pill p-acc">आपका वोट</span>':''}${!p.open&&total&&tally[i]===max?' <span class="pill p-ok">सबसे ज़्यादा</span>':''}</span>
      <span style="display:flex;gap:8px;align-items:center"><span class="num muted" style="font-size:14px">${tally[i]} · ${pc}%</span>${p.open&&uid?`<button class="btn sm ${me?'':'ghost'}" data-act="votePoll" data-id="${p.id}" data-m="${i}" aria-pressed="${me}">${me?'✓ चुना':'वोट दें'}</button>`:''}</span></div>
      <div style="height:8px;border-radius:4px;background:var(--bg);margin-top:4px"><div style="height:8px;border-radius:4px;background:${me?'var(--accent)':'var(--marigold)'};width:${pc}%"></div></div></div>`}).join('')}</div>
    ${!uid&&p.open?'<p class="muted" style="font-size:13.5px;margin:10px 0 0">वोट देने के लिए लॉगिन करें।</p>':''}
    ${isAdmin?`<div class="actions"><button class="btn sm ghost" data-act="togglePoll" data-id="${p.id}">${p.open?'वोटिंग बंद करें':'वोटिंग फिर चालू करें'}</button><button class="btn sm danger" data-act="delPoll" data-id="${p.id}">हटाएँ</button></div>`:''}</article>`}).join('')}</div>`;
},
gallery(){
  const list=S.photos.filter(p=>F.album==='all'||p.album===F.album);
  if(!S.photos.length)return `<div class="empty">अभी कोई फोटो नहीं है। ${assets?'ऊपर “फोटो जोड़ें” दबाकर होली, दिवाली या 15 अगस्त जैसे कार्यक्रमों की फोटो डालें।':'कमेटी जल्द ही कार्यक्रमों की फोटो डालेगी।'}</div>`;
  const groups={};list.forEach(p=>{(groups[p.album||'अन्य']=groups[p.album||'अन्य']||[]).push(p)});
  return Object.entries(groups).map(([a,ps])=>`<h2 style="margin-top:8px">${esc(a)} <span class="muted" style="font-family:var(--body);font-size:15px">· ${ps.length} फोटो</span></h2>
  <div class="photos">${ps.map(p=>`<button class="ph" data-act="viewPhoto" data-id="${p.id}" aria-label="${esc(p.caption||a)}"><img loading="lazy" src="${PIX}" data-img="${esc(p.asset)}" alt="${esc(p.caption||a)}">${p.caption?`<span>${esc(p.caption)}</span>`:''}</button>`).join('')}</div>`).join('');
}
});
function exBanner(){return hasExamples()?`<div class="banner"><span>अभी पेज पर <b>उदाहरण</b> वाला डेटा दिख रहा है। असली घर जोड़ने से पहले इसे हटा दें।</span>${isAdmin?'<button class="btn sm" data-act="clearEx">उदाहरण डेटा हटाएँ</button>':''}</div>`:''}

/* ---------- dialog helpers ---------- */
const dlg=document.getElementById('dlg');
function field(f,v){const id='f_'+f.k;v=v??f.def??'';
  if(f.type==='select')return `<div class="f"><label for="${id}">${f.label}</label><select id="${id}" name="${f.k}">${f.options.map(o=>{const [val,l]=Array.isArray(o)?o:[o,o];return `<option value="${esc(val)}" ${String(v)===String(val)?'selected':''}>${esc(l)}</option>`}).join('')}</select></div>`;
  if(f.type==='textarea')return `<div class="f"><label for="${id}">${f.label}</label><textarea id="${id}" name="${f.k}" placeholder="${esc(f.ph||'')}" ${f.req?'required':''}>${esc(v)}</textarea></div>`;
  if(f.type==='file')return `<div class="f"><label for="${id}">${f.label}</label><input id="${id}" name="${f.k}" type="file" accept="image/*" multiple ${f.req?'required':''}></div>`;
  if(f.type==='check')return `<div class="f check"><label><input type="checkbox" id="${id}" name="${f.k}" ${v?'checked':''}> ${f.label}</label></div>`;
  return `<div class="f" ${f.show?`data-show="${f.show}"`:''}><label for="${id}">${f.label}</label><input id="${id}" name="${f.k}" type="${f.type||'text'}" value="${esc(v)}" placeholder="${esc(f.ph||'')}" ${f.req?'required':''} ${f.type==='number'?'min="0" step="1" inputmode="numeric"':''}></div>`}
function openForm(title,fields,vals,onSave,extra){
  dlg.innerHTML=`<form id="frm"><h3>${title}</h3>${extra||''}${fields.map(f=>field(f,vals?.[f.k])).join('')}<div class="err" id="ferr"></div><div class="dfoot"><button type="button" class="btn ghost" data-close>रद्द करें</button><button class="btn" type="submit">सेव करें</button></div></form>`;
  const frm=dlg.querySelector('#frm');
  frm.addEventListener('submit',async e=>{e.preventDefault();const out={};fields.forEach(f=>{const el=frm.elements[f.k];out[f.k]=f.type==='file'?Array.from(el.files||[]):f.type==='check'?el.checked:f.type==='number'?Number(el.value||0):el.value.trim()});
    const btn=frm.querySelector('[type=submit]');btn.disabled=true;btn.textContent='सेव हो रहा है…';
    try{await onSave(out,btn);dlg.close()}catch(err){btn.disabled=false;btn.textContent='सेव करें';document.getElementById('ferr').textContent=errMsg(err)}});
  dlg.showModal();
}
function confirmBox(msg,yes,onYes){
  dlg.innerHTML=`<div class="dbody"><h3>पक्का?</h3><p style="margin:0">${msg}</p><div class="err" id="ferr"></div><div class="dfoot"><button class="btn ghost" data-close>नहीं</button><button class="btn danger" id="yes">${yes}</button></div></div>`;
  dlg.querySelector('#yes').onclick=async()=>{try{await onYes();dlg.close()}catch(err){document.getElementById('ferr').textContent=errMsg(err)}};
  dlg.showModal();
}
function errMsg(e){if(e&&e.code==='rule')return e.message;if(e&&e.code==='23505')return 'यह मोबाइल नंबर या ईमेल पहले से जुड़ा है।';if(e&&e.code==='23514')return 'मोबाइल नंबर 10 अंकों का होना चाहिए।';if(e&&e.code==='amt')return 'रकम 0 से ज़्यादा लिखें।';if(e&&e.code==='opts')return 'कम से कम दो विकल्प लिखें, हर लाइन में एक।';if(e&&(e.code==='too_large'||e.code==='quota_exceeded'||e.code==='unsupported_type'))return 'फोटो अपलोड नहीं हुई: '+(e.code==='unsupported_type'?'यह फ़ाइल फोटो नहीं है या इसका फ़ॉर्मेट नहीं चलता।':'फोटो बहुत बड़ी है या जगह भर गई है।');if(e&&e.code==='invalid_argument')return 'यह बदलाव सेव नहीं हुआ। शायद आपके पास इसकी अनुमति नहीं है।';if(e&&e.code==='quota_exceeded')return 'डेटा की सीमा पूरी हो गई है। कुछ पुराने रिकॉर्ड हटाकर फिर कोशिश करें।';return 'सेव नहीं हो पाया। इंटरनेट जाँचकर फिर कोशिश करें।'}
dlg.addEventListener('click',e=>{if(e.target.closest('[data-close]'))dlg.close();if(e.target===dlg)dlg.close()});

const HOUSE_F=[
  {k:'no',label:'मकान नंबर',req:true,ph:'जैसे A-12'},{k:'owner',label:'मालिक का नाम',req:true},{k:'ownerPhone',label:'मालिक का मोबाइल',type:'tel'},
  {k:'occ',label:'घर में कौन रहता है',type:'select',options:Object.entries(OCC)},
  {k:'tenant',label:'किराएदार का नाम (अगर किराए पर है)'},{k:'tenantPhone',label:'किराएदार का मोबाइल',type:'tel'},{k:'tenantSince',label:'किराएदार कब आए',type:'date'},
  {k:'police',label:'किराएदार का पुलिस वेरिफिकेशन हो गया',type:'check'},
  {k:'members',label:'परिवार में कितने लोग',type:'number'},
  {k:'chargeFrom',label:'मेंटेनेंस किस महीने से लागू (खाली छोड़ें तो कॉलोनी की शुरुआत से)',type:'month'}];

/* ---------- actions ---------- */
async function act(a,id,m){
  const ch=Number(S.cfg.charge||0);
  if(a==='addHouse')openForm('नया घर जोड़ें',HOUSE_F,{occ:'self'},async v=>{await db.collection('houses').add({...v,example:false})});
  if(a==='editHouse'){const h=houseById(id);openForm('घर की जानकारी बदलें · '+esc(h.no),HOUSE_F,h,async v=>{await db.doc('houses/'+id).update(v)})}
  if(a==='delHouse'){const h=houseById(id);confirmBox(`मकान <b>${esc(h.no)}</b> (${esc(h.owner)}) की जानकारी हटा दी जाएगी। इसके पुराने भुगतान रिकॉर्ड हिसाब में बने रहेंगे।`,'हाँ, हटाएँ',()=>db.doc('houses/'+id).delete())}
  if(a==='pay'){const h=houseById(id);openForm(`मेंटेनेंस जमा · ${esc(h.no)} · ${mLong(m)}`,[
      {k:'amount',label:overdue(m)&&FEE()?`रकम (₹) · ${rs(ch)} + ${rs(FEE())} लेट फीस`:'रकम (₹)',type:'number',def:ch+(overdue(m)?FEE():0),req:true},{k:'date',label:'जमा करने की तारीख',type:'date',def:today(),req:true},
      {k:'mode',label:'भुगतान का तरीका',type:'select',options:MODES},{k:'note',label:'नोट (जैसे UPI ट्रांज़ैक्शन नंबर)'}],null,
    async v=>{await db.doc('payments/'+id+'_'+m).set({...v,house:id,houseNo:h.no,month:m,receipt:'LV/'+m.replace('-','')+'/'+String(h.no).replace(/\s+/g,''),example:false})},`<p class="muted" style="margin:0">${esc(h.owner)} · आख़िरी तारीख ${dFmt(deadline(m))}${overdue(m)?' (निकल चुकी है)':''}</p>`)}
  if(a==='unpay'){const h=houseById(id);confirmBox(`${esc(h.no)} का ${mLong(m)} का भुगतान रिकॉर्ड हटाकर उसे फिर से बकाया दिखाया जाएगा।`,'हाँ, रद्द करें',()=>db.doc('payments/'+id+'_'+m).delete())}
  if(a==='receipt'){const h=houseById(id),p=S.pay[id+'_'+m];if(!p)return;
    const txt=`${S.cfg.name} कॉलोनी\nमेंटेनेंस रसीद ${p.receipt}\nमकान: ${h.no} (${h.owner})\nमहीना: ${mLong(m)}\nरकम: ${rs(p.amount)} (${p.mode})\nतारीख: ${dFmt(p.date)}\nधन्यवाद!`;
    const ph=String(h.ownerPhone||'').replace(/\D/g,'').slice(-10);
    dlg.innerHTML=`<div class="dbody"><div class="receipt"><div class="t">${esc(S.cfg.name)} कॉलोनी</div><p class="muted" style="text-align:center;margin:0 0 10px">मेंटेनेंस रसीद</p>
      <table><tr><td class="muted">रसीद नंबर</td><td><b>${esc(p.receipt)}</b></td></tr><tr><td class="muted">मकान</td><td>${esc(h.no)} · ${esc(h.owner)}</td></tr><tr><td class="muted">महीना</td><td>${mLong(m)}</td></tr><tr><td class="muted">रकम</td><td><b>${rs(p.amount)}</b> · ${esc(p.mode)}</td></tr><tr><td class="muted">तारीख</td><td>${dFmt(p.date)}</td></tr>${p.note?`<tr><td class="muted">नोट</td><td>${esc(p.note)}</td></tr>`:''}</table></div>
      <div class="err" id="ferr" style="color:var(--ok)"></div>
      <div class="dfoot">${ph.length===10?`<a class="btn ghost" style="text-decoration:none" target="_blank" rel="noopener" href="https://wa.me/91${ph}?text=${encodeURIComponent(txt)}">WhatsApp पर भेजें</a>`:''}${waApiBtn(ph)}<button class="btn ghost" id="cp">रसीद कॉपी करें</button><button class="btn" data-close>बंद करें</button></div></div>`;
    dlg.querySelector('#cp').onclick=()=>copyText(txt);bindWaApi(ph,'receipt',[h.owner,S.cfg.name,h.no,mLong(m),rs(p.amount),p.receipt]);dlg.showModal()}
  if(a==='remind'){const h=houseById(id),d=dueMonths(h);if(!d.length)return;
    const txt=`नमस्ते ${h.owner} जी,\n${S.cfg.name} कॉलोनी की ओर से याद दिलाना है कि मकान ${h.no} का ${d.length} महीने (${mName(d[0])} से) का मेंटेनेंस ${rs(dueAmt(h))} बकाया है${FEE()?' (लेट फीस सहित)':''}। कृपया जल्द जमा करें।\nनियम: ${ruleLine()}\nधन्यवाद।`;
    const ph=String(h.ownerPhone||'').replace(/\D/g,'').slice(-10);
    dlg.innerHTML=`<div class="dbody"><h3>याद दिलाने का संदेश</h3><div class="receipt" style="white-space:pre-wrap">${esc(txt)}</div><div class="err" id="ferr" style="color:var(--ok)"></div><div class="dfoot">${ph.length===10?`<a class="btn ghost" style="text-decoration:none" target="_blank" rel="noopener" href="https://wa.me/91${ph}?text=${encodeURIComponent(txt)}">WhatsApp पर भेजें</a>`:''}${waApiBtn(ph)}<button class="btn ghost" id="cp">कॉपी करें</button><button class="btn" data-close>बंद करें</button></div></div>`;
    dlg.querySelector('#cp').onclick=()=>copyText(txt);bindWaApi(ph,'reminder',[h.owner,S.cfg.name,h.no,String(d.length),rs(dueAmt(h)),String(DD())]);dlg.showModal()}
  if(a==='addComp')openForm('शिकायत या सुझाव दर्ज करें',[
      {k:'kind',label:'यह क्या है',type:'select',options:[['complaint','शिकायत'],['suggestion','सुझाव']]},{k:'cat',label:'विषय',type:'select',options:CATS},
      {k:'title',label:'छोटा शीर्षक',req:true,ph:'जैसे गली नंबर 3 की लाइट खराब'},{k:'text',label:'पूरी जानकारी',type:'textarea',req:true},
      {k:'house',label:'आपका मकान नंबर',req:true},{k:'name',label:'आपका नाम',req:true}],null,
    async v=>{await db.collection('complaints').add({...v,status:'new',reply:'',date:today(),votes:{},example:false})});
  if(a==='handleComp'){const c=S.comp.find(x=>x.id===id);openForm('स्थिति और जवाब · '+esc(c.title),[
      {k:'status',label:'स्थिति',type:'select',options:Object.entries(STAT).map(([k,v])=>[k,v[0]])},{k:'reply',label:'कमेटी का जवाब (सबको दिखेगा)',type:'textarea'}],c,
    async v=>{await db.doc('complaints/'+id).update(v)})}
  if(a==='delComp')confirmBox('यह शिकायत / सुझाव हमेशा के लिए हट जाएगा।','हाँ, हटाएँ',()=>db.doc('complaints/'+id).delete());
  if(a==='vote'){if(!uid)return;const cur={...(S.cv[uid]||{})};cur[id]=!cur[id];try{await db.doc('compvotes/'+uid).set(cur)}catch(e){console.warn(e)}}
  if(a==='addNotice')openForm('नई सूचना',[{k:'title',label:'शीर्षक',req:true,ph:'जैसे रविवार को आम सभा'},{k:'body',label:'विवरण',type:'textarea',req:true},{k:'date',label:'तारीख',type:'date',def:today()}],null,
    async v=>{await db.collection('notices').add({...v,example:false})});
  if(a==='delNotice')confirmBox('यह सूचना हटा दी जाएगी।','हाँ, हटाएँ',()=>db.doc('notices/'+id).delete());
  if(a==='addExp'||a==='addInc'||a==='editExp'){const e=a==='editExp'?S.exp.find(x=>x.id===id):null;if(a==='editExp'&&!e)return;
    const inc=e?isIn(e):a==='addInc';
    const fl=[{k:'title',label:'विवरण',req:true,ph:inc?'जैसे दिवाली कार्यक्रम के लिए श्री शर्मा जी का दान':'जैसे अक्टूबर की सफाई कर्मचारी की तनख्वाह'},
      {k:'cat',label:'श्रेणी',type:'select',options:inc?INCATS:EXCATS},{k:'amount',label:'रकम (₹)',type:'number',req:true},{k:'date',label:'तारीख',type:'date',def:today(),req:true},
      {k:'mode',label:inc?'पैसा कैसे आया':'भुगतान कैसे किया',type:'select',options:MODES},{k:'note',label:inc?'किससे मिला / नोट (वैकल्पिक)':'किसे दिया / बिल नंबर (वैकल्पिक)'}];
    if(assets)fl.push({k:'files',label:e&&e.bill?'नई बिल / रसीद की फोटो (पुरानी बदलनी हो तो)':'बिल / रसीद की फोटो (वैकल्पिक)',type:'file'});
    openForm((e?'एंट्री बदलें':inc?'आय जोड़ें (+)':'खर्च जोड़ें (−)'),fl,e,
    async(v,btn)=>{const files=v.files||[];delete v.files;if(!(v.amount>0))throw {code:'amt'};
      if(files[0]&&assets){btn.textContent='फोटो अपलोड हो रही है…';const r=await assets.upload(await shrink(files[0]));v.bill=r.id}
      if(e)await db.doc('expenses/'+id).update(v);else await db.collection('expenses').add({...v,kind:inc?'in':'out',example:false})},
    `<p style="margin:0" class="pill ${inc?'p-ok':'p-bad'}">${inc?'फंड में पैसा आएगा (+)':'फंड से पैसा जाएगा (−)'}</p>`)}
  if(a==='delExp'){const e=S.exp.find(x=>x.id===id);if(!e)return;confirmBox(`<b>${esc(e.title)}</b> (${isIn(e)?'+':'−'}${rs(e.amount)}) हिसाब से हटा दी जाएगी और बची रकम उसी हिसाब से बदल जाएगी।`,'हाँ, हटाएँ',async()=>{await db.doc('expenses/'+id).delete();if(e.bill&&assets)try{await assets.delete(e.bill)}catch(_){}})}
  if(a==='viewBill'){const e=S.exp.find(x=>x.id===id);if(!e||!e.bill)return;
    dlg.innerHTML=`<div class="dbody"><h3>${esc(e.title)}</h3><img src="${PIX}" data-img="${esc(e.bill)}" alt="बिल की फोटो" style="width:100%;border-radius:8px;max-height:65vh;object-fit:contain;background:var(--bg)"><p class="muted" style="margin:0">${dFmt(e.date)} · ${isIn(e)?'+':'−'}${rs(e.amount)}</p><div class="dfoot"><button class="btn" data-close>बंद करें</button></div></div>`;dlg.showModal()}
  if(a==='setOpen')openForm('शुरुआती बचत',[{k:'openBal',label:'वेबसाइट शुरू करने से पहले फंड में कितना पैसा था (₹)',type:'number'}],{openBal:Number(S.cfg.openBal||0)},
    async v=>{await db.doc('config/main').set({...S.cfg,openBal:v.openBal||0})});
  if(a==='settings'){const c=S.cfg;openForm('कॉलोनी सेटिंग्स',[
      {k:'name',label:'कॉलोनी का नाम',req:true},{k:'charge',label:'मासिक मेंटेनेंस प्रति घर (₹)',type:'number',req:true},{k:'start',label:'मेंटेनेंस किस महीने से शुरू हुआ',type:'month',req:true},{k:'dueDay',label:'हर महीने किस तारीख तक जमा करना है (1 से 28)',type:'number',req:true},{k:'lateFee',label:'आख़िरी तारीख के बाद लेट फीस (₹, न लगानी हो तो 0)',type:'number'},
      {k:'upiId',label:'कॉलोनी फंड का UPI ID (ऑनलाइन भुगतान के लिए)',ph:'जैसे laxmanvihar@sbi'},{k:'payeeName',label:'UPI खाते का नाम',ph:'जैसे लक्ष्मण विहार कल्याण समिति'},
      {k:'contacts',label:'ज़रूरी संपर्क (हर लाइन में: नाम | पद | नंबर)',type:'textarea',ph:'रमेश शर्मा | अध्यक्ष | 98xxxxxxxx'}],
    {...c,dueDay:DD(),lateFee:FEE(),contacts:(c.contacts||[]).map(x=>[x.name,x.role,x.phone].join(' | ')).join('\n')},
    async v=>{const contacts=v.contacts.split('\n').map(l=>l.split('|').map(s=>s.trim())).filter(p=>p[0]).map(([name,role,phone])=>({name,role:role||'',phone:phone||''}));
      await db.doc('config/main').set({...S.cfg,name:v.name,charge:v.charge,start:v.start,dueDay:Math.min(28,Math.max(1,v.dueDay||10)),lateFee:v.lateFee||0,upiId:v.upiId.replace(/\s/g,''),payeeName:v.payeeName,contacts})})}
  if(a==='addCam'||a==='editCam'){const c=a==='editCam'?S.cams.find(x=>x.id===id):{name:'कैमरा '+(S.cams.length+1),status:'ok'};if(!c)return;
    openForm(a==='editCam'?'कैमरे की जानकारी बदलें':'कैमरा जोड़ें',[{k:'name',label:'कैमरे का नाम',req:true,ph:'जैसे कैमरा 1'},{k:'place',label:'कहाँ लगा है',req:true,ph:'जैसे मुख्य गेट, पार्क के पास'},
      {k:'status',label:'स्थिति',type:'select',options:Object.entries(CAMST).map(([k,v])=>[k,v[2]+' '+v[0]])},{k:'brand',label:'कंपनी / मॉडल (वैकल्पिक)',ph:'जैसे CP Plus 2MP'},{k:'since',label:'कब लगा (वैकल्पिक)',type:'date'},{k:'lastCheck',label:'आख़िरी बार कब जाँचा',type:'date'},{k:'note',label:'नोट (वैकल्पिक)',ph:'जैसे रात में भी साफ़ दिखता है'}],c,
    async v=>{if(a==='editCam')await db.doc('cameras/'+id).update(v);else await db.collection('cameras').add({...v,example:false})})}
  if(a==='camSt'){try{await db.doc('cameras/'+id).update({status:m,lastCheck:today()})}catch(e){console.warn(e)}return}
  if(a==='delCam'){const c=S.cams.find(x=>x.id===id);confirmBox(`<b>${esc(c.name)}</b> (${esc(c.place||'')}) सूची से हटा दिया जाएगा।`,'हाँ, हटाएँ',()=>db.doc('cameras/'+id).delete())}
  if(a==='cctvCfg')openForm('रिकॉर्डिंग की जानकारी',[{k:'cctvWhere',label:'रिकॉर्डिंग (DVR) कहाँ रखी है',ph:'जैसे अध्यक्ष जी के घर, A-1'},{k:'cctvKeeper',label:'रिकॉर्डिंग किसके पास',ph:'जैसे रमेश शर्मा (अध्यक्ष)'},{k:'cctvPhone',label:'संपर्क नंबर',type:'tel'},{k:'cctvDays',label:'रिकॉर्डिंग कितने दिन सुरक्षित रहती है',type:'number'},{k:'cctvRule',label:'फुटेज देखने के नियम',type:'textarea'}],S.cfg,
    async v=>{await db.doc('config/main').set({...S.cfg,...v})});
  if(a==='addLog')openForm('सर्विस / जाँच दर्ज करें',[{k:'kind',label:'क्या काम हुआ',type:'select',options:Object.entries(LOGK)},{k:'cam',label:'कौन सा कैमरा',type:'select',options:[['all','सभी कैमरे'],...S.cams.map(c=>[c.id,c.name+(c.place?' · '+c.place:'')])]},
      {k:'date',label:'तारीख',type:'date',def:today(),req:true},{k:'text',label:'विवरण',ph:'जैसे लेंस साफ़ किया, तार बदला, DVR की हार्ड डिस्क बदली'},{k:'cost',label:'खर्च (₹, न हुआ हो तो 0)',type:'number'},{k:'toAcct',label:'यह खर्च “हिसाब-किताब” में भी जोड़ें',type:'check',def:true}],null,
    async v=>{const toAcct=v.toAcct;delete v.toAcct;await db.collection('cctvlog').add({...v,example:false});
      const ids=v.cam==='all'?S.cams.map(c=>c.id):[v.cam];for(const cid of ids){const c=S.cams.find(x=>x.id===cid);if(c&&(!c.lastCheck||c.lastCheck<v.date))await db.doc('cameras/'+cid).update({lastCheck:v.date})}
      if(toAcct&&v.cost>0)await db.collection('expenses').add({kind:'out',title:'CCTV '+(LOGK[v.kind]||'')+(v.text?': '+v.text:''),cat:'CCTV',amount:v.cost,date:v.date,mode:'नकद',note:'',example:false})});
  if(a==='delLog')confirmBox('यह रिकॉर्ड हटा दिया जाएगा। (हिसाब-किताब में जुड़ा खर्च वहाँ से अलग हटाना होगा।)','हाँ, हटाएँ',()=>db.doc('cctvlog/'+id).delete());
  if(a==='footReq')openForm('🎞️ फुटेज देखने का अनुरोध',[{k:'when',label:'किस दिन और लगभग किस समय की फुटेज',req:true,ph:'जैसे 8 अक्टूबर, रात 10 से 11 बजे'},{k:'cam',label:'कौन सा कैमरा',type:'select',options:[['all','पता नहीं / सभी'],...S.cams.map(c=>[c.id,c.name+(c.place?' · '+c.place:'')])]},
      {k:'why',label:'क्यों देखनी है',type:'textarea',req:true,ph:'जैसे घर के बाहर से साइकिल चोरी हुई'},{k:'house',label:'आपका मकान नंबर',req:true},{k:'name',label:'आपका नाम',req:true}],null,
    async v=>{const cn=v.cam==='all'?'':' · '+((S.cams.find(c=>c.id===v.cam)||{}).name||'');await db.collection('complaints').add({kind:'complaint',cat:'सुरक्षा',cctv:true,title:'CCTV फुटेज: '+v.when+cn,text:v.why,house:v.house,name:v.name,status:'new',reply:'',date:today(),votes:{},example:false})},
    `<p class="muted" style="margin:0;font-size:14px">अनुरोध कमेटी को जाएगा। फुटेज कमेटी सदस्य की मौजूदगी में दिखाई जाएगी।</p>`);
  if(a==='camFault')openForm('⚠️ कैमरा खराब होने की सूचना',[{k:'cam',label:'कौन सा कैमरा',type:'select',options:[['all','पता नहीं'],...S.cams.map(c=>[c.id,c.name+(c.place?' · '+c.place:'')])]},{k:'text',label:'क्या दिक्कत है',type:'textarea',req:true,ph:'जैसे कैमरे की लाइट बंद है, कैमरा मुड़ गया है'},{k:'house',label:'आपका मकान नंबर',req:true},{k:'name',label:'आपका नाम',req:true}],null,
    async v=>{const cn=v.cam==='all'?'CCTV कैमरा':((S.cams.find(c=>c.id===v.cam)||{}).name||'CCTV कैमरा');await db.collection('complaints').add({kind:'complaint',cat:'सुरक्षा',title:cn+' खराब लग रहा है',text:v.text,house:v.house,name:v.name,status:'new',reply:'',date:today(),votes:{},example:false})});
  if(a==='addMem'||a==='editMem'){const x=a==='editMem'?S.team.find(y=>y.id===id):{post:'सदस्य'};if(!x)return;
    const fl=[{k:'name',label:'नाम',req:true},{k:'post',label:'पद',type:'select',options:POSTS},{k:'house',label:'मकान नंबर',ph:'जैसे A-12'},{k:'phone',label:'मोबाइल नंबर',type:'tel'},
      {k:'duty',label:'ज़िम्मेदारी (वैकल्पिक)',ph:'जैसे मेंटेनेंस वसूली और बैंक का काम'},{k:'since',label:'कब से इस पद पर (वैकल्पिक)',ph:'जैसे अप्रैल 2025'}];
    if(assets)fl.push({k:'files',label:x.photo?'नई फोटो (बदलनी हो तो)':'फोटो (वैकल्पिक)',type:'file'});
    openForm(a==='editMem'?'सदस्य की जानकारी बदलें':'कमेटी सदस्य जोड़ें',fl,x,async(v,btn)=>{const f=(v.files||[])[0];delete v.files;
      if(f&&assets){btn.textContent='फोटो अपलोड हो रही है…';v.photo=(await assets.upload(await shrink(f))).id}
      if(a==='editMem')await db.doc('committee/'+id).update(v);else await db.collection('committee').add({...v,example:false})})}
  if(a==='delMem'){const x=S.team.find(y=>y.id===id);confirmBox(`<b>${esc(x.name)}</b> (${esc(x.post)}) को कमेटी की सूची से हटा दिया जाएगा।`,'हाँ, हटाएँ',async()=>{await db.doc('committee/'+id).delete();if(x.photo&&assets)try{await assets.delete(x.photo)}catch(_){}})}
  if(a==='setTerm')openForm('कमेटी का कार्यकाल',[{k:'termFrom',label:'कब से',ph:'जैसे अप्रैल 2026'},{k:'termTo',label:'कब तक',ph:'जैसे मार्च 2028'},{k:'termNote',label:'नोट (वैकल्पिक)',ph:'जैसे आम सभा में 15 मार्च 2026 को चुनी गई'}],S.cfg,
    async v=>{await db.doc('config/main').set({...S.cfg,...v})});
  if(a==='addSvc'||a==='editSvc'){const x=a==='editSvc'?S.svc.find(y=>y.id===id):{cat:SVC[0][0]};if(!x)return;
    openForm(a==='editSvc'?'जानकारी बदलें':'सेवा देने वाला जोड़ें',[
      {k:'name',label:'नाम',req:true,ph:'जैसे राजू'},{k:'cat',label:'काम',type:'select',options:SVC.map(([c,i])=>[c,i+' '+c])},{k:'phone',label:'मोबाइल नंबर',type:'tel',req:true},
      {k:'timing',label:'कब मिलते हैं (वैकल्पिक)',ph:'जैसे सुबह 6 से 8, रविवार छुट्टी'},{k:'rate',label:'रेट / चार्ज (वैकल्पिक)',ph:'जैसे ₹200 प्रति विज़िट'},{k:'area',label:'कहाँ से आते हैं (वैकल्पिक)',ph:'जैसे पास की बस्ती'},
      {k:'note',label:'नोट (वैकल्पिक)',type:'textarea',ph:'जैसे कॉलोनी में 5 साल से काम कर रहे हैं'},{k:'verified',label:'पहचान / पुलिस वेरिफिकेशन हो चुका है',type:'check'}],x,
    async v=>{if(a==='editSvc')await db.doc('services/'+id).update(v);else await db.collection('services').add({...v,example:false})})}
  if(a==='delSvc'){const x=S.svc.find(y=>y.id===id);confirmBox(`<b>${esc(x.name)}</b> (${esc(x.cat)}) को सूची से हटा दिया जाएगा।`,'हाँ, हटाएँ',()=>db.doc('services/'+id).delete())}
  if(a==='likeSvc'){if(!uid)return;const cur={...(S.sv[uid]||{})};cur[id]=!cur[id];try{await db.doc('svcvotes/'+uid).set(cur)}catch(e){console.warn(e)}}
  if(a==='copyPhone'){const t=id;const btn=document.querySelector(`[data-act="copyPhone"][data-id="${CSS.escape(t)}"]`);
    try{await navigator.clipboard.writeText(t);if(btn)btn.textContent='कॉपी हुआ ✓'}catch(_){if(btn)btn.textContent='नंबर चुनकर कॉपी करें'}return}
  if(a==='ownerPanel'){ownerScreen();return}
  if(a==='addLogin'||a==='editLogin'){const x=a==='editLogin'?S.members.find(y=>y.id===id):{role:'resident'};if(!x)return;
    openForm(a==='editLogin'?'सदस्य बदलें':'लॉगिन वाला सदस्य जोड़ें',[{k:'name',label:'नाम',req:true},{k:'phone10',label:'मोबाइल नंबर (10 अंक)',type:'tel'},{k:'email',label:'या ईमेल (वैकल्पिक)',type:'email'},
      {k:'house',label:'मकान नंबर',ph:'जैसे A-12'},{k:'role',label:'भूमिका',type:'select',options:[['resident','🏠 निवासी'],['admin','👑 एडमिन (कमेटी)']]}],x,
    async v=>{const row={name:v.name,phone10:phone10(v.phone10),email:v.email.toLowerCase(),house:v.house,role:v.role};if(!row.phone10&&!row.email)throw {code:'rule',message:'मोबाइल नंबर या ईमेल में से एक ज़रूर डालें।'};if(row.phone10&&row.phone10.length!==10)throw {code:'23514'};
      try{if(a==='editLogin')await B.members.update(id,row);else await B.members.add({...row,colony_id:COLONY})}catch(e){throw mapErr(e)}loadMembers()},
    `<p class="muted" style="margin:0;font-size:14px">यही नंबर या ईमेल डालकर यह व्यक्ति OTP से लॉगिन करेगा।</p>`)}
  if(a==='delLogin'){const x=S.members.find(y=>y.id===id);confirmBox(`<b>${esc(x.name)}</b> (${esc(x.phone10||x.email)}) अब ऐप में लॉगिन नहीं कर पाएँगे।`,'हाँ, हटाएँ',async()=>{try{await B.members.remove(id)}catch(e){throw mapErr(e)}loadMembers()})}
  if(a==='bulkMem'){const have=new Set(S.members.map(m=>m.phone10).filter(Boolean));const rows=[];
    S.houses.forEach(h=>{[[h.ownerPhone,h.owner],[h.occ==='rent'?h.tenantPhone:'',h.tenant]].forEach(([p,n])=>{const t=phone10(p);if(t.length===10&&!have.has(t)){have.add(t);rows.push({colony_id:COLONY,name:String(n||'').replace(/\s*\(उदाहरण\)/,''),phone10:t,house:h.no,role:'resident'})}})});
    if(!rows.length){alertBox('सभी घरों के मालिक और किराएदारों के नंबर पहले से जुड़े हैं, या घरों में 10 अंकों के नंबर नहीं लिखे हैं।');return}
    confirmBox(`घरों की जानकारी से <b>${rows.length}</b> नए लोग (मालिक और किराएदार) निवासी के रूप में जोड़े जाएँगे। वे अपने नंबर से OTP डालकर लॉगिन कर सकेंगे।`,'हाँ, जोड़ें',async()=>{try{await B.members.addMany(rows)}catch(e){throw mapErr(e)}loadMembers()});return}
  if(a==='payOnline'){if(!S.cfg.upiId)return;const myH=MEM&&MEM.house?S.houses.find(h=>String(h.no).replace(/\s/g,'').toLowerCase()===String(MEM.house).replace(/\s/g,'').toLowerCase()):null;
    const hid=id||(myH&&myH.id)||(S.houses[0]&&S.houses[0].id);if(!hid){alertBox('पहले कमेटी घरों की जानकारी जोड़े।');return}
    const h0=houseById(hid);const d0=dueMonths(h0);const m0=d0[0]||(S.pay[hid+'_'+curMonth()]?addM(curMonth(),1):curMonth());
    const amt=mm=>Number(S.cfg.charge||0)+(overdue(mm)?FEE():0);
    openForm('💳 ऑनलाइन मेंटेनेंस जमा करें',[{k:'house',label:'मकान',type:'select',options:S.houses.map(h=>[h.id,h.no+' · '+h.owner])},{k:'month',label:'किस महीने का',type:'month',req:true},{k:'amount',label:'रकम (₹)',type:'number',req:true},
      {k:'ref',label:'भुगतान के बाद: UTR / रेफ़रेंस नंबर',req:true,ph:'UPI ऐप में दिखने वाला 12 अंकों का नंबर'},{k:'date',label:'भुगतान की तारीख',type:'date',def:today(),req:true}],{house:hid,month:m0,amount:amt(m0)},
    async v=>{if(!(v.amount>0))throw {code:'amt'};const h=houseById(v.house);if(S.pay[v.house+'_'+v.month])throw {code:'rule',message:`मकान ${h.no} का ${mLong(v.month)} का मेंटेनेंस पहले से जमा दर्ज है।`};
      await db.collection('payclaims').add({house:v.house,houseNo:h.no,month:v.month,amount:v.amount,ref:v.ref.replace(/\s/g,''),date:v.date,name:MEM.member_name||meLabel(),by:uid,status:'pending'})},
    `<div id="upibox" class="upibox"></div>`);
    const frm=dlg.querySelector('#frm');const box=dlg.querySelector('#upibox');
    const draw=()=>{const a=Number(frm.elements.amount.value||0),mm=frm.elements.month.value,h=houseById(frm.elements.house.value)||h0;
      const url=`upi://pay?pa=${encodeURIComponent(S.cfg.upiId)}&pn=${encodeURIComponent(S.cfg.payeeName||S.cfg.name)}&am=${a}&cu=INR&tn=${encodeURIComponent('मेंटेनेंस '+(h?h.no:'')+' '+mm)}`;
      let qr='';try{const q=qrcode(0,'M');q.addData(url);q.make();qr=q.createSvgTag({cellSize:4,margin:2,scalable:true})}catch(_){}
      box.innerHTML=`<div class="qr">${qr}</div><div style="min-width:0"><b>1.</b> इस QR को किसी भी UPI ऐप (PhonePe, Google Pay, Paytm, BHIM) से स्कैन करें, या फ़ोन पर नीचे का बटन दबाएँ।<div class="muted num" style="font-size:13.5px;margin:4px 0">UPI: ${esc(S.cfg.upiId)} · ${rs(a)}</div><a class="btn sm" href="${url}">📲 UPI ऐप से ${rs(a)} भरें</a><div style="margin-top:8px"><b>2.</b> भुगतान के बाद UTR नंबर नीचे लिखकर “सेव करें” दबाएँ। कमेटी पुष्टि करेगी।</div></div>`};
    ['house','month','amount'].forEach(k=>frm.elements[k].addEventListener('input',()=>{if(k!=='amount'){frm.elements.amount.value=amt(frm.elements.month.value)}draw()}));draw();return}
  if(a==='claimOk'){const c=S.claims.find(x=>x.id===id);if(!c)return;const h=houseById(c.house);
    confirmBox(`मकान <b>${esc(c.houseNo)}</b> का ${mLong(c.month)} का <b>${rs(c.amount)}</b> जमा दर्ज होगा और रसीद बन जाएगी।`,'हाँ, पुष्टि करें',async()=>{
      await db.doc('payments/'+c.house+'_'+c.month).set({house:c.house,houseNo:c.houseNo,month:c.month,amount:c.amount,date:c.date,mode:'UPI',note:'UTR '+(c.ref||''),receipt:'LV/'+c.month.replace('-','')+'/'+String(c.houseNo).replace(/\s+/g,''),example:false});
      await db.doc('payclaims/'+id).update({status:'approved'})});return}
  if(a==='claimNo'){confirmBox('निवासी को “पैसा नहीं मिला” दिखेगा, ताकि वे कमेटी से बात करें।','हाँ',()=>db.doc('payclaims/'+id).update({status:'rejected'}));return}
  if(a==='goto'){tab=id;if(m)F.view=m;try{localStorage.setItem('lv-tab',tab)}catch(_){}renderAll();window.scrollTo({top:0});return}
  if(a==='addVeh'||a==='editVeh'){if(!S.houses.length){confirmBox('पहले “घर व निवासी” में घर जोड़ें, फिर गाड़ी जोड़ें।','ठीक है',async()=>{});return}
    const v=a==='editVeh'?S.veh.find(x=>x.id===id):{type:'car',parkAt:PARK[0]};
    openForm(a==='editVeh'?'गाड़ी की जानकारी बदलें':'नई गाड़ी जोड़ें',[
      {k:'house',label:'मकान',type:'select',options:S.houses.map(h=>[h.id,h.no+' · '+h.owner])},{k:'type',label:'गाड़ी का प्रकार',type:'select',options:Object.entries(VT).map(([k,x])=>[k,x[0]])},
      {k:'number',label:'गाड़ी नंबर',req:true,ph:'जैसे MP09 AB 1234'},{k:'model',label:'मॉडल / रंग (वैकल्पिक)',ph:'जैसे सफ़ेद स्विफ्ट'},{k:'parkAt',label:'आम तौर पर कहाँ खड़ी होती है',type:'select',options:PARK}],v,
    async x=>{x.number=x.number.toUpperCase();x.houseNo=(houseById(x.house)||{}).no||'';if(a==='editVeh')await db.doc('vehicles/'+id).update(x);else await db.collection('vehicles').add({...x,example:false})})}
  if(a==='delVeh'){const v=S.veh.find(x=>x.id===id);confirmBox(`गाड़ी <b>${esc(v.number)}</b> रजिस्टर से हटा दी जाएगी।`,'हाँ, हटाएँ',()=>db.doc('vehicles/'+id).delete())}
  if(a==='parkComp')openForm('गलत पार्किंग की शिकायत',[
      {k:'vnum',label:'गाड़ी नंबर (जितना दिखे)',req:true,ph:'जैसे MP09 AB 1234 या सिर्फ़ 1234'},{k:'where',label:'गाड़ी कहाँ खड़ी है',req:true,ph:'जैसे मेरे गेट के सामने, गली नंबर 2'},
      {k:'text',label:'और जानकारी (वैकल्पिक)',type:'textarea',ph:'जैसे सुबह से खड़ी है, गाड़ी बाहर नहीं निकल पा रही'},{k:'house',label:'आपका मकान नंबर',req:true},{k:'name',label:'आपका नाम',req:true}],null,
    async v=>{await db.collection('complaints').add({kind:'complaint',cat:'पार्किंग',title:'गलत पार्किंग: '+v.vnum.toUpperCase()+' · '+v.where,text:v.text||v.where,vnum:v.vnum.toUpperCase(),house:v.house,name:v.name,status:'new',reply:'',date:today(),votes:{},example:false})},
    `<p class="muted" style="margin:0;font-size:14px">शिकायत कमेटी को दिखेगी। अगर गाड़ी कॉलोनी की है तो कमेटी को उसके मालिक का नंबर अपने आप दिख जाएगा।</p>`);
  if(a==='editRules')openForm('पार्किंग के नियम',[{k:'parkRules',label:'नियम (हर लाइन में एक)',type:'textarea'}],{parkRules:S.cfg.parkRules||DEFAULT_RULES},
    async v=>{await db.doc('config/main').set({...S.cfg,parkRules:v.parkRules})});
  if(a==='addPoll')openForm('नया पोल',[{k:'q',label:'सवाल',req:true,ph:'जैसे क्या मुख्य गेट पर CCTV लगवाना चाहिए?'},{k:'note',label:'और जानकारी (वैकल्पिक)',type:'textarea',ph:'जैसे अनुमानित खर्च ₹25,000, हर घर से ₹500 एक बार'},{k:'opts',label:'विकल्प (हर लाइन में एक)',type:'textarea',req:true,def:'हाँ\nनहीं\nकोई राय नहीं'}],null,
    async v=>{const options=v.opts.split('\n').map(s=>s.trim()).filter(Boolean);if(options.length<2)throw {code:'opts'};await db.collection('polls').add({q:v.q,note:v.note,options,open:true,date:today(),example:false})});
  if(a==='togglePoll'){const p=S.polls.find(x=>x.id===id);await db.doc('polls/'+id).update({open:!p.open}).catch(e=>console.warn(e))}
  if(a==='delPoll')confirmBox('यह पोल और उसके नतीजे हट जाएँगे।','हाँ, हटाएँ',()=>db.doc('polls/'+id).delete());
  if(a==='votePoll'){if(!uid)return;const i=Number(m);const cur={...(S.pv[uid]||{})};if(cur[id]===i)return;cur[id]=i;
    try{await db.doc('pollvotes/'+uid).set(cur)}catch(e){console.warn(e)}}
  if(a==='addPhotos'){if(!assets)return;const al=[...new Set(S.photos.map(p=>p.album).filter(Boolean))];
    openForm('फोटो जोड़ें',[{k:'album',label:'एल्बम / कार्यक्रम का नाम',req:true,ph:'जैसे दिवाली 2026'},{k:'caption',label:'फोटो के बारे में (वैकल्पिक)'},{k:'date',label:'तारीख',type:'date',def:today()},{k:'files',label:'फोटो चुनें (एक साथ कई चुन सकते हैं)',type:'file',req:true}],{album:al[0]||''},
    async(v,btn)=>{let n=0;for(const f of v.files){btn.textContent=`अपलोड हो रहा है ${++n}/${v.files.length}…`;const blob=await shrink(f);const r=await assets.upload(blob);
      await db.collection('gallery').add({asset:r.id,album:v.album,caption:v.caption,date:v.date||today(),example:false})}})}
  if(a==='viewPhoto'){const p=S.photos.find(x=>x.id===id);if(!p)return;
    dlg.innerHTML=`<div class="dbody"><img src="${PIX}" data-img="${esc(p.asset)}" alt="${esc(p.caption||p.album)}" style="width:100%;border-radius:8px;max-height:65vh;object-fit:contain;background:var(--bg)"><div><b>${esc(p.album)}</b>${p.caption?' · '+esc(p.caption):''}<div class="muted" style="font-size:13.5px">${dFmt(p.date)}</div></div><div class="err" id="ferr"></div>
    <div class="dfoot">${assets?`<button class="btn danger" id="delph">फोटो हटाएँ</button>`:''}<button class="btn" data-close>बंद करें</button></div></div>`;
    const d=dlg.querySelector('#delph');if(d)d.onclick=()=>confirmBox('यह फोटो गैलरी से हमेशा के लिए हट जाएगी।','हाँ, हटाएँ',async()=>{await db.doc('gallery/'+id).delete();try{await assets.delete(p.asset)}catch(_){}});
    dlg.showModal()}
  if(a==='clearEx')confirmBox('सभी “उदाहरण” वाले घर, भुगतान, शिकायतें, सूचनाएँ और खर्च हटा दिए जाएँगे। आपका जोड़ा हुआ असली डेटा नहीं हटेगा।','हाँ, उदाहरण हटाएँ',async()=>{
    const jobs=[['houses',S.houses],['payments',S.payList],['complaints',S.comp],['notices',S.notices],['expenses',S.exp],['polls',S.polls],['vehicles',S.veh],['services',S.svc],['committee',S.team],['cctvlog',S.clog]];
    for(const [col,arr] of jobs)for(const d of arr.filter(x=>x.example))await db.doc(col+'/'+d.id).delete()});
}
async function shrink(f){try{const bm=await createImageBitmap(f);const k=Math.min(1,1600/Math.max(bm.width,bm.height));const c=document.createElement('canvas');c.width=Math.round(bm.width*k);c.height=Math.round(bm.height*k);c.getContext('2d').drawImage(bm,0,0,c.width,c.height);
  const b=await new Promise(r=>c.toBlob(r,'image/jpeg',0.85));return b||f}catch(_){return f}}
function copyText(t){const done=()=>{const e=document.getElementById('ferr');if(e)e.textContent='कॉपी हो गया'};
  try{navigator.clipboard.writeText(t).then(done,()=>fallback())}catch(_){fallback()}
  function fallback(){const r=dlg.querySelector('.receipt');if(r){const s=getSelection(),rg=document.createRange();rg.selectNodeContents(r);s.removeAllRanges();s.addRange(rg);const e=document.getElementById('ferr');if(e)e.textContent='टेक्स्ट चुन लिया गया है, अब कॉपी करें'}}}
document.getElementById('main').addEventListener('click',e=>{const b=e.target.closest('[data-act]');if(!b||!b.dataset.act||!db)return;if(b.tagName==='A')e.preventDefault();act(b.dataset.act,b.dataset.id,b.dataset.m)});
document.getElementById('main').addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('[role=button][data-act]')){e.preventDefault();e.target.click()}});
renderTabs();

function waApiBtn(ph){return CFG.WHATSAPP_API&&isAdmin&&ph.length===10?'<button class="btn" style="--tc:#1f9d55;--tc-ink:#fff" id="waapi">🤖 अपने आप WhatsApp भेजें</button>':''}
function bindWaApi(ph,kind,params){const b=dlg.querySelector('#waapi');if(!b)return;b.onclick=async()=>{b.disabled=true;b.textContent='भेजा जा रहा है…';const e=dlg.querySelector('#ferr');
  try{await B.fn('send-whatsapp',{colony_id:COLONY,to:'91'+ph,kind,params});e.style.color='var(--ok)';e.textContent='✓ WhatsApp पर भेज दिया गया।';b.textContent='✓ भेजा गया'}
  catch(x){console.warn(x);e.style.color='var(--bad)';e.textContent='अपने आप नहीं भेजा जा सका। “WhatsApp पर भेजें” बटन से भेजें।';b.disabled=false;b.textContent='🤖 फिर कोशिश करें'}}}
document.getElementById('role').addEventListener('click',()=>{if(MEM)userMenu()});
boot();
