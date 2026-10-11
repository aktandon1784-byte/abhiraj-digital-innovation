import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
// Usage: serve public/ (e.g. python3 -m http.server 3300 -d public) then: node colony-mitra/tests/demo-test.mjs
const URL=process.env.DEMO_URL||'http://localhost:3300/colony-mitra/demo.html';
const out=[];const ok=(c,n)=>out.push((c?'PASS ':'FAIL ')+n);
const b=await chromium.launch();let first=true;
const shared=await b.newContext({viewport:{width:1280,height:900}});
async function session(phone,vp={width:1280,height:900}){
  const ctx={close:async()=>{await pg.close()}};const pg=await shared.newPage();await pg.setViewportSize(vp);const errs=[];
  pg.on('pageerror',e=>errs.push(e.message));pg.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
  pg.on('dialog',d=>d.accept());
  await pg.goto(URL);if(first){await pg.evaluate(()=>{localStorage.clear()});first=false}else await pg.evaluate(()=>{localStorage.removeItem('cs-demo-session')});await pg.goto(URL);
  await pg.fill('#lph',phone);await pg.click('#lbtn');await pg.fill('#otp','123456');
  await pg.waitForSelector('#tabs [data-tab]',{timeout:8000});await pg.waitForTimeout(400);
  return {ctx,pg,errs};
}
const tabs=async pg=>pg.$$eval('#tabs [data-tab]',e=>e.map(x=>x.dataset.tab));
const go=async(pg,t)=>{await pg.click(`#tabs [data-tab="${t}"]`);await pg.waitForTimeout(250)};
const text=async pg=>pg.$eval('#main',e=>e.innerText);

// ---------- resident A-1 ----------
{const {ctx,pg,errs}=await session('9999900002');
 const t=await tabs(pg);
 ok(t.includes('myhouse')&&!t.includes('houses')&&!t.includes('tenants')&&!t.includes('parking')&&!t.includes('admin'),'resident tabs: '+t.join(','));
 let tx=await text(pg);
 ok(tx.includes('A-1')&&!tx.includes('A-2')&&!tx.includes('B-5')&&!tx.includes('B-7'),'resident home shows only own house');
 ok(tx.includes('रविवार को आम सभा')&&!tx.includes('मकान B-5 का अगस्त'),'resident sees broadcast but not B-5 message');
 await pg.screenshot({path:'/tmp/res-home.png',fullPage:true});
 await go(pg,'myhouse');tx=await text(pg);
 ok(tx.includes('पत्नी सीमा')&&!tx.includes('सुनील वर्मा')&&!tx.includes('अमित यादव'),'my house: own family, no other tenants');
 // add a tenant
 await pg.click('[data-act="addTenant"]');
 await pg.fill('#f_name','टेस्ट किराएदार');await pg.fill('#f_phone','9812345678');await pg.fill('#f_permAddr','ग्राम सिमगा');
 await pg.fill('#f_aadhaarLast4','123456789012');ok((await pg.inputValue('#f_aadhaarLast4')).length===4,'Aadhaar box accepts only 4 digits');
 await pg.fill('#f_aadhaarLast4','12ab');await pg.fill('#f_work','किराना दुकान');await pg.fill('#f_since','2026-10-01');await pg.check('#f_consent');
 await pg.click('#frm [type=submit]');await pg.waitForTimeout(300);
 ok((await pg.$eval('#ferr',e=>e.textContent)).includes('आख़िरी 4 अंक'),'invalid Aadhaar digits rejected');
 await pg.fill('#f_aadhaarLast4','9012');
 await pg.setInputFiles('#f_photoF',{name:'p.png',mimeType:'image/png',buffer:Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==','base64')});
 await pg.click('#frm [type=submit]');await pg.waitForTimeout(800);
 tx=await text(pg);ok(tx.includes('टेस्ट किराएदार')&&tx.includes('XXXX XXXX 9012')&&tx.includes('कमेटी की जाँच बाकी'),'resident adds tenant (pending check, masked Aadhaar)');
 // family edit
 await pg.click('[data-act="editFamily"]');await pg.fill('#f_family','पत्नी सीमा, बेटा अमन');await pg.click('#frm [type=submit]');await pg.waitForTimeout(500);
 ok((await text(pg)).includes('पत्नी सीमा, बेटा अमन'),'resident edits family details');
 await go(pg,'maint');tx=await text(pg);ok(tx.includes('A-1')&&!tx.includes('B-5')&&!tx.includes('सुरेश'),'maintenance shows only own house');
 await go(pg,'comp');tx=await text(pg);ok(!tx.includes('B-5')&&!tx.includes('विनोद'),'complaints: only own');
 await pg.click('[data-act="addComp"]');await pg.selectOption('#f_cat','स्ट्रीट लाइट');await pg.fill('#f_title','गली 3 की स्ट्रीट लाइट बंद');await pg.fill('#f_text','3 दिन से बंद है');
 await pg.click('#frm [type=submit]');await pg.waitForTimeout(500);tx=await text(pg);ok(tx.includes('गली 3 की स्ट्रीट लाइट बंद')&&tx.includes('नई'),'resident files complaint for own house');
 await go(pg,'fees');tx=await text(pg);ok(tx.includes('नवरात्रि गरबा')&&tx.includes('बाकी'),'resident sees fee due');
 await go(pg,'acct');tx=await text(pg);ok(tx.includes('अभी फंड में बची रकम')&&!tx.includes('बाकी रकम')&&!tx.includes('सभी एंट्री')&&!tx.includes('मेंटेनेंस वसूली'),'resident sees fund totals only (no cash book)');
 await go(pg,'msgs');tx=await text(pg);ok(tx.includes('रविवार को आम सभा')&&!tx.includes('B-5'),'resident inbox');
 const leak=await pg.evaluate(async()=>{const r=await window.CS_BACKEND.docs.listAll('demo-lv');return r.filter(x=>['houses','tenants','payments','vehicles','feepay','complaints','expenses','payclaims'].includes(x.collection)).map(x=>x.collection+':'+(x.data.houseNo||x.data.house||x.data.no||''))});
 ok(leak.every(x=>/A-1|ex-a1/.test(x)),'backend gives resident only A-1 private records: '+leak.join(' | '));
 const hack=await pg.evaluate(async()=>{try{await window.CS_BACKEND.docs.insert('demo-lv','notices','x',{title:'hack'});return 'allowed'}catch(e){return 'denied'}});
 ok(hack==='denied','resident cannot post notice via backend');
 const hack2=await pg.evaluate(async()=>{try{await window.CS_BACKEND.members.update('m2',{role:'admin'});return 'allowed'}catch(e){return 'denied'}});
 ok(hack2==='denied','resident cannot make self admin via backend');
 ok(!errs.length,'no console errors (resident) '+errs.join(';'));
 await ctx.close()}

// ---------- treasurer (admin, not chief) ----------
{const {ctx,pg,errs}=await session('9999900003');
 const t=await tabs(pg);ok(t.includes('houses')&&t.includes('tenants')&&t.includes('admin')&&!t.includes('myhouse'),'committee tabs');
 await go(pg,'tenants');let tx=await text(pg);ok(tx.includes('सुनील वर्मा')&&tx.includes('अमित यादव')&&tx.includes('टेस्ट किराएदार'),'committee sees all tenants incl. new one');
 const btn=await pg.$('[data-act="verifyTenant"]');await btn.click();await pg.waitForTimeout(400);tx=await text(pg);ok(tx.includes('कोषाध्यक्ष डेमो (कोषाध्यक्ष)'),'committee verifies tenant');
 await go(pg,'admin');tx=await text(pg);ok(tx.includes('सिर्फ़ अध्यक्ष / सचिव')&&tx.includes('एडमिन जोड़ने / बदलने का अधिकार सिर्फ़ अध्यक्ष / सचिव को है'),'treasurer sees chief-only notice');
 const r=await pg.evaluate(async()=>{try{await window.CS_BACKEND.members.add({colony_id:'demo-lv',name:'x',phone10:'9000000001',role:'admin',post:'सदस्य'});return 'allowed'}catch(e){return e.message}});
 ok(r.includes('अध्यक्ष या सचिव'),'treasurer cannot add an admin: '+r);
 await go(pg,'msgs');await pg.click('.toolbar [data-act="addMsg"]');await pg.selectOption('[name="to"]','pick');await pg.check('#hpk input[value="ex-a1"]');
 await pg.fill('#f_title','A-1 के लिए जाँच');await pg.fill('#f_body','कृपया अपने किराएदार का पुलिस वेरिफिकेशन जमा करें');await pg.click('#frm [type=submit]');await pg.waitForTimeout(600);
 ok((await pg.$eval('#dlg',e=>e.open&&e.innerText.includes('संदेश ऐप में पहुँच गया'))),'message sent, WhatsApp list shown');
 await pg.keyboard.press('Escape');
 await go(pg,'fees');tx=await text(pg);ok(tx.includes('1/4')&&tx.includes('घरों ने दिया'),'committee fee summary');
 ok(!errs.length,'no console errors (treasurer) '+errs.join(';'));
 await pg.screenshot({path:'/tmp/adm-fees.png',fullPage:true});
 await ctx.close()}

// ---------- resident A-1 again: sees the targeted message and verification ----------
{const {ctx,pg}=await session('9999900002');
 await go(pg,'msgs');let tx=await text(pg);ok(tx.includes('A-1 के लिए जाँच'),'resident receives targeted message');
 await go(pg,'myhouse');tx=await text(pg);ok(tx.includes('कमेटी ने जाँच की'),'resident sees committee verification');
 await ctx.close()}
// ---------- resident A-2 does not see A-1 message ----------
{const {ctx,pg,errs}=await session('9999900004',{width:390,height:844});
 let tx=await text(pg);ok(!tx.includes('A-1 के लिए जाँच'),'A-2 does not get A-1 message');
 await go(pg,'myhouse');tx=await text(pg);ok(tx.includes('सुनील वर्मा')&&!tx.includes('टेस्ट किराएदार'),'A-2 sees own tenant only');
 const ov=await pg.evaluate(()=>document.documentElement.scrollWidth>innerWidth);ok(!ov,'mobile: no horizontal overflow');
 await pg.screenshot({path:'/tmp/res2-myhouse-mobile.png',fullPage:true});
 ok(!errs.length,'no console errors (A-2) '+errs.join(';'));
 await ctx.close()}
// ---------- chief adds admin + audit ----------
{const {ctx,pg,errs}=await session('9999900001');
 await go(pg,'admin');await pg.click('[data-act="addLogin"]');await pg.fill('#f_name','नए सचिव');await pg.fill('#f_phone10','9999900007');await pg.selectOption('#f_role','admin');await pg.selectOption('#f_post','सचिव');
 await pg.click('#frm [type=submit]');await pg.waitForTimeout(600);let tx=await text(pg);
 ok(tx.includes('नए सचिव')&&tx.includes('बदलाव का रिकॉर्ड')&&tx.includes('कमेटी डेमो (अध्यक्ष)'),'chief adds admin, audit shows actor');
 await pg.screenshot({path:'/tmp/adm-admin.png',fullPage:true});
 ok(!errs.length,'no console errors (chief) '+errs.join(';'));
 await ctx.close()}
// ---------- outsider join request ----------
{const pg=await shared.newPage();const ctx={close:()=>pg.close()};await pg.goto(URL);await pg.evaluate(()=>{localStorage.removeItem('cs-demo-session')});await pg.goto(URL);
 await pg.fill('#lph','9999900009');await pg.click('#lbtn');await pg.fill('#otp','123456');await pg.waitForSelector('#jform');
 await pg.fill('#jc','lv2026');await pg.fill('#jn','नया परिवार');await pg.fill('#jh','B-9');await pg.click('#jform [type=submit]');await pg.waitForTimeout(500);
 ok((await pg.$eval('#jerr',e=>e.textContent)).includes('अनुरोध भेज दिया'),'outsider sends join request');
 await ctx.close()}
{const {ctx,pg}=await session('9999900001');await go(pg,'admin');const tx=await text(pg);ok(tx.includes('जुड़ने के अनुरोध')&&tx.includes('नया परिवार'),'committee sees join request');await ctx.close()}
await b.close();console.log(out.join('\n'));
