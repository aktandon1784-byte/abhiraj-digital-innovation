// Builds public/colony-mitra/demo.html: the real app (app/index.html + app.js) running on the
// offline demo backend (demo/backend.js) with fake data (demo/seed.json). Run: node colony-mitra/build-demo.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const app = path.join(here, '..', 'public', 'colony-mitra', 'app');
const read = p => fs.readFileSync(p, 'utf8');
const inline = (name, js) => {
  if (/<\/script/i.test(js)) throw new Error(name + ' contains </script>');
  return '<script>' + js.replace(/\s+$/, '') + '\n</script>';
};

let html = read(path.join(app, 'index.html'));
const icon = 'data:image/png;base64,' + fs.readFileSync(path.join(app, 'icons', 'icon-192.png')).toString('base64');
const swap = (from, to) => { if (!html.includes(from)) throw new Error('not found in index.html: ' + from); html = html.replace(from, () => to); };
swap('<title>कॉलोनी मित्र</title>', '<title>कॉलोनी मित्र · डेमो</title>');
swap('<link rel="manifest" href="manifest.webmanifest">', '');
swap('<link rel="icon" type="image/png" sizes="192x192" href="icons/icon-192.png">', `<link rel="icon" type="image/png" sizes="192x192" href="${icon}">`);
swap('<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">', '');
const seed = JSON.stringify(JSON.parse(read(path.join(here, 'demo', 'seed.json'))));
const scripts = [
  inline('seed', 'window.CS_DEMO_SEED=' + seed + ';'),
  inline('backend', read(path.join(here, 'demo', 'backend.js'))),
  inline('qrcode', read(path.join(app, 'vendor', 'qrcode.js'))),
  inline('config', 'window.CS_CONFIG={DEMO:true,LOGIN_METHODS:["phone_sms","phone_whatsapp","email"],SUPPORT_WHATSAPP:""};'),
  inline('app', read(path.join(app, 'app.js'))),
].join('\n');
swap('<script src="vendor/supabase.js"></script>\n<script src="vendor/qrcode.js"></script>\n<script src="config.js"></script>\n<script src="app.js"></script>', scripts);
const out = path.join(here, '..', 'public', 'colony-mitra', 'demo.html');
fs.writeFileSync(out, html);
console.log('wrote', path.relative(process.cwd(), out), (html.length / 1024).toFixed(0) + ' KB');
