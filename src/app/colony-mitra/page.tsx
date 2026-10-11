import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Mukta } from "next/font/google";
import {
  Home,
  Wallet,
  BookOpen,
  Car,
  Cctv,
  Megaphone,
  Vote,
  Wrench,
  Users,
  Images,
  Smartphone,
  Download,
  Eye,
  ShieldCheck,
  QrCode,
  MessageCircle,
  CheckCircle2,
  Mail,
} from "lucide-react";
import { colonyMitra } from "@/lib/colonyMitra";
import { siteConfig } from "@/lib/config";

const mukta = Mukta({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "कॉलोनी मित्र (Colony Mitra) · कॉलोनी / सोसाइटी ऐप",
  description:
    "कॉलोनी का पूरा रजिस्टर एक ऐप में: घर-किराएदार, मेंटेनेंस (UPI भुगतान), हिसाब-किताब, शिकायतें, पार्किंग, CCTV और पोल। पूरी तरह हिंदी में।",
};

const features = [
  { icon: Home, title: "घर व किराएदार", desc: "मालिक, किराएदार, पुलिस वेरिफिकेशन का पूरा रिकॉर्ड" },
  { icon: Wallet, title: "मेंटेनेंस 1–10 तारीख", desc: "समय पर / देर से / बकाया अलग रंग में, लेट फीस, रसीद" },
  { icon: QrCode, title: "UPI से भुगतान", desc: "QR स्कैन करें, पैसा सीधे कॉलोनी खाते में, कमेटी पुष्टि करे" },
  { icon: BookOpen, title: "हिसाब-किताब", desc: "आय-खर्च की रोकड़ बही, बिल की फोटो के साथ" },
  { icon: Car, title: "पार्किंग", desc: "गाड़ी नंबर डालें, मालिक का पता तुरंत" },
  { icon: Cctv, title: "CCTV / सुरक्षा", desc: "कैमरे चालू या खराब, फुटेज देखने का अनुरोध" },
  { icon: Megaphone, title: "शिकायत / सुझाव", desc: "निवासी लिखें, कमेटी जवाब दे, स्थिति सबको दिखे" },
  { icon: Vote, title: "पोल / वोटिंग", desc: "हर फ़ैसले पर सबकी राय, एक व्यक्ति एक वोट" },
  { icon: Wrench, title: "सेवाएँ", desc: "प्लंबर, कामवाली, दूध वाले के भरोसेमंद नंबर" },
  { icon: Users, title: "कमेटी सदस्य", desc: "कौन किस पद पर, किससे किस काम के लिए बात करें" },
  { icon: Images, title: "फोटो गैलरी", desc: "त्योहार और कार्यक्रमों की यादें" },
  { icon: ShieldCheck, title: "OTP लॉगिन, सुरक्षित डेटा", desc: "हर कॉलोनी का डेटा अलग, सिर्फ़ जुड़े हुए लोग देख सकें" },
];

const screens = [
  { src: "/colony-mitra/screens/home.jpg", cap: "होम: सब कुछ एक नज़र में" },
  { src: "/colony-mitra/screens/maint.jpg", cap: "मेंटेनेंस: किसने दिया, किसका बाकी" },
  { src: "/colony-mitra/screens/ledger.jpg", cap: "6 महीने का खाता" },
  { src: "/colony-mitra/screens/acct.jpg", cap: "हिसाब-किताब" },
  { src: "/colony-mitra/screens/parking.jpg", cap: "पार्किंग: गाड़ी से मालिक खोजें" },
  { src: "/colony-mitra/screens/cctv.jpg", cap: "CCTV और सुरक्षा" },
  { src: "/colony-mitra/screens/comp.jpg", cap: "शिकायत / सुझाव" },
  { src: "/colony-mitra/screens/team.jpg", cap: "कमेटी सदस्य" },
];

const faqs = [
  {
    q: "क्या हर निवासी को पैसे देने होंगे?",
    a: "नहीं। कमेटी पूरी कॉलोनी का एक प्लान लेती है, जिसका ख़र्च कॉलोनी फंड से जाता है। निवासियों के लिए ऐप मुफ़्त है।",
  },
  {
    q: "लॉगिन कैसे करें?",
    a: "कमेटी आपका मोबाइल नंबर ऐप में जोड़ती है। फिर उसी नंबर या ईमेल पर आए OTP से लॉगिन करें।",
  },
  {
    q: "हमारी कॉलोनी का डेटा सुरक्षित रहेगा?",
    a: "हाँ। हर कॉलोनी का डेटा अलग रहता है और सिर्फ़ उसी कॉलोनी के जुड़े हुए लोग देख सकते हैं। निवासी हिसाब या किसी और का रिकॉर्ड नहीं बदल सकते।",
  },
  {
    q: "क्या iPhone पर चलेगा?",
    a: "हाँ। “फ़ोन में ऐप जोड़ें” वाला तरीका एंड्रॉयड और iPhone दोनों पर चलता है। APK फ़ाइल सिर्फ़ एंड्रॉयड के लिए है।",
  },
  {
    q: "बुज़ुर्ग लोग चला पाएँगे?",
    a: "ऐप पूरी तरह हिंदी में है, बड़े अक्षर और रंगीन बटन हैं। ज़रूरत हो तो हम कॉलोनी में आकर समझाते भी हैं।",
  },
];

export default function ColonyMitraPage() {
  const btnPrimary =
    "inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-bold text-[#3B2A00] bg-gradient-to-br from-amber-200 to-amber-400 hover:from-amber-100 hover:to-amber-300 shadow-lg shadow-amber-500/20 transition-all active:scale-95";
  const btnGhost =
    "inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold text-slate-100 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 transition-all";

  return (
    <div className={`${mukta.className} relative py-10 lg:py-16 space-y-20 sm:space-y-28 bg-grid-pattern`}>
      <div className="ambient-hero-glow" aria-hidden="true" />

      {/* Hero */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm bg-emerald-950/70 border border-emerald-800/60 text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>नया ऐप · कॉलोनी और सोसाइटी के लिए · पूरी तरह हिंदी में</span>
            </div>
            <div className="flex items-center gap-4">
              <img
                src="/colony-mitra/app/icons/icon-192.png"
                alt=""
                width={72}
                height={72}
                className="w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-2xl shadow-xl shadow-blue-900/40"
              />
              <div>
                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
                  {colonyMitra.name}
                </h1>
                <p className="text-sm font-mono uppercase tracking-[0.2em] text-blue-400">{colonyMitra.nameEn}</p>
              </div>
            </div>
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed">
              आपकी कॉलोनी का पूरा रजिस्टर, अब एक ऐप में। घर-किराएदार, मेंटेनेंस का हिसाब, UPI से भुगतान, शिकायतें, पार्किंग और CCTV, सब कुछ मोबाइल पर। रसीद बुक और रजिस्टर की ज़रूरत ख़त्म।
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={colonyMitra.appUrl} className={btnPrimary}>
                <Smartphone className="w-5 h-5" />
                <span>ऐप खोलें / इंस्टॉल करें</span>
              </a>
              <a href={colonyMitra.demoUrl} target="_blank" rel="noopener" className={btnGhost}>
                <Eye className="w-5 h-5" />
                <span>डेमो देखें</span>
              </a>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400 pt-2">
              {["एंड्रॉयड और iPhone दोनों पर", "बुज़ुर्ग भी आसानी से चला सकें", "पहला महीना मुफ़्त"].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5 flex justify-center gap-4 items-end">
            <div className="w-52 sm:w-60 rounded-[28px] border-[7px] border-slate-800 overflow-hidden shadow-2xl shadow-blue-950/60 bg-slate-900">
              <img src="/colony-mitra/screens/home.jpg" alt="कॉलोनी मित्र ऐप का होम पेज" className="w-full block" />
            </div>
            <div className="hidden sm:block w-44 mb-8 rounded-[24px] border-[6px] border-slate-800 overflow-hidden shadow-2xl bg-slate-900 opacity-90">
              <img src="/colony-mitra/screens/maint.jpg" alt="मेंटेनेंस पेज" className="w-full block" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">एक ऐप, कॉलोनी के सारे काम</h2>
        <p className="text-slate-400 mt-2 mb-8 text-lg">कमेटी का काम आसान, और निवासियों को हर बात की साफ़ जानकारी।</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex gap-4 p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-blue-700/60 transition-colors">
              <div className="flex-none w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{title}</h3>
                <p className="text-slate-400 text-[15px] leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Screenshots */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">ऐप कैसा दिखता है</h2>
        <p className="text-slate-400 mt-2 mb-6 text-lg">बाएँ-दाएँ सरकाकर देखें →</p>
        <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory">
          {screens.map((s) => (
            <figure key={s.src} className="flex-none w-52 snap-start">
              <div className="rounded-[24px] border-[6px] border-slate-800 overflow-hidden bg-slate-900 max-h-[440px]">
                <img src={s.src} alt={s.cap} loading="lazy" className="w-full block" />
              </div>
              <figcaption className="text-sm text-slate-400 text-center mt-2">{s.cap}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Download */}
      <section id="download" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="rounded-2xl p-1 bg-gradient-to-b from-blue-500/30 via-slate-800/40 to-slate-900 border border-slate-800/80">
          <div className="rounded-[15px] bg-[#0A101D] p-6 sm:p-10 space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">ऐप डाउनलोड करें</h2>
              <p className="text-slate-400 mt-2 text-lg">अपने फ़ोन के हिसाब से तरीका चुनें।</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-6 rounded-2xl bg-slate-900/80 border-2 border-blue-600/60 space-y-4">
                <span className="inline-block text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                  ⭐ सबसे आसान · सलाह
                </span>
                <h3 className="text-2xl font-bold text-white">📲 फ़ोन में ऐप जोड़ें</h3>
                <p className="text-slate-400">एंड्रॉयड और iPhone दोनों पर। कोई फ़ाइल डाउनलोड नहीं करनी पड़ती।</p>
                <ol className="list-decimal pl-5 space-y-1.5 text-slate-300">
                  <li>नीचे का बटन दबाएँ, ऐप खुल जाएगा।</li>
                  <li>
                    <b>एंड्रॉयड (Chrome):</b> ऊपर ⋮ मेन्यू → <b>“ऐप इंस्टॉल करें”</b> या “होम स्क्रीन पर जोड़ें”।
                  </li>
                  <li>
                    <b>iPhone (Safari):</b> नीचे शेयर बटन ⬆️ → <b>“Add to Home Screen”</b>।
                  </li>
                  <li>होम स्क्रीन पर ऐप का आइकन आ जाएगा।</li>
                </ol>
                <a href={colonyMitra.appUrl} className={btnPrimary}>
                  <Smartphone className="w-5 h-5" />
                  <span>ऐप खोलें और इंस्टॉल करें</span>
                </a>
              </div>
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                <span className="inline-block text-xs font-bold px-2.5 py-1 rounded-full bg-blue-950 text-blue-300 border border-blue-800">
                  सिर्फ़ एंड्रॉयड
                </span>
                <h3 className="text-2xl font-bold text-white">🤖 APK फ़ाइल डाउनलोड करें</h3>
                <p className="text-slate-400">असली एंड्रॉयड ऐप की फ़ाइल।</p>
                <ol className="list-decimal pl-5 space-y-1.5 text-slate-300">
                  <li>नीचे का बटन दबाकर फ़ाइल डाउनलोड करें।</li>
                  <li>
                    फ़ाइल खोलें। फ़ोन पूछे तो <b>“इस स्रोत से ऐप की अनुमति दें”</b> चालू करें।
                  </li>
                  <li>
                    <b>“Install”</b> दबाएँ।
                  </li>
                </ol>
                {colonyMitra.apkUrl ? (
                  <a href={colonyMitra.apkUrl} download className={btnGhost}>
                    <Download className="w-5 h-5" />
                    <span>Download APK</span>
                  </a>
                ) : (
                  <span className={`${btnGhost} opacity-60 cursor-not-allowed`} aria-disabled="true">
                    <Download className="w-5 h-5" />
                    <span>APK जल्द आ रही है</span>
                  </span>
                )}
                <p className="text-sm text-slate-500">
                  फ़ोन “अनजान ऐप” की चेतावनी दिखा सकता है। यह ऐप सिर्फ़ इसी वेबसाइट से डाउनलोड करें।
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="price" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">कीमत: कॉलोनी के हिसाब से</h2>
        <p className="text-slate-400 mt-2 mb-8 text-lg">
          पूरी कॉलोनी का एक प्लान, जिसे कमेटी कॉलोनी फंड से देती है। निवासियों से अलग से कुछ नहीं लिया जाता।
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {colonyMitra.plans.map((p) => (
            <div
              key={p.name}
              className={`relative p-6 rounded-2xl bg-slate-900/80 space-y-2 ${p.highlight ? "border-2 border-amber-400/80" : "border border-slate-800"}`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-5 text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-400 text-[#3B2A00]">
                  सबसे लोकप्रिय
                </span>
              )}
              <h3 className="text-xl font-bold text-white">{p.name}</h3>
              <p className="text-slate-400">{p.houses}</p>
              <p className="text-4xl font-extrabold text-white tabular-nums">
                {p.price}
                <span className="text-base font-medium text-slate-400"> / महीना</span>
              </p>
              <ul className="text-slate-300 space-y-1 pt-2">
                <li>✓ सारी सुविधाएँ</li>
                <li>✓ WhatsApp रसीद और रिमाइंडर</li>
                <li>✓ फ़ोन पर मदद और ट्रेनिंग</li>
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-5 p-4 rounded-xl bg-slate-900/70 border border-slate-800 text-slate-300">
          🎁 <b>पहला महीना मुफ़्त।</b> सालाना प्लान पर 2 महीने मुफ़्त। एक बार की सेटअप फीस ₹2,999 (घर, किराएदार और गाड़ियों का डेटा भरना और ट्रेनिंग)।
        </p>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">अक्सर पूछे जाने वाले सवाल</h2>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="group p-5 rounded-xl bg-slate-900/70 border border-slate-800">
              <summary className="cursor-pointer font-semibold text-white text-lg">{f.q}</summary>
              <p className="mt-2 text-slate-400">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <h2 className="text-3xl font-extrabold text-white">अपनी कॉलोनी में कॉलोनी मित्र शुरू करवाएँ</h2>
        <p className="text-slate-400 text-lg">कमेटी के लिए मुफ़्त डेमो और पहला महीना मुफ़्त।</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href={`mailto:${siteConfig.contact.email}?subject=${encodeURIComponent("कॉलोनी मित्र ऐप")}`} className={btnPrimary}>
            <Mail className="w-5 h-5" />
            <span>{siteConfig.contact.email}</span>
          </a>
          <Link href="/contact" className={btnGhost}>
            <MessageCircle className="w-5 h-5" />
            <span>संपर्क करें</span>
          </Link>
        </div>
        <p className="text-xs text-slate-500 pt-4">डेमो और तस्वीरों में नमूना (उदाहरण) डेटा है।</p>
      </section>
    </div>
  );
}
