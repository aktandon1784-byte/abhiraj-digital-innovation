import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Building2, Smartphone, Eye, Download, CheckCircle2, Settings, Clock } from "lucide-react";
import { ColonyMitraPurchaseForm } from "@/components/colony-mitra/ColonyMitraPurchaseForm";
import { COLONY_MITRA_FIRST_COLONY, getColonyMitraPlans } from "@/lib/colonyMitraPurchase";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Colony Mitra ख़रीदें — मासिक / सालाना कॉलोनी प्लान | Abhiraj Digital Innovation",
  description: "Colony Mitra (कॉलोनी मित्र) का मासिक या सालाना कॉलोनी प्लान Razorpay (UPI / कार्ड) से ख़रीदें।",
};

const ready = [
  "कमेटी और निवासी के अलग रूप: निवासी को सिर्फ़ अपना घर दिखता है",
  "किराएदार का बायोडाटा (फोटो, आधार के आख़िरी 4 अंक, काम का ID) और कमेटी की जाँच",
  "घर, मालिक और किराएदार का रिकॉर्ड",
  "मेंटेनेंस (1–10 तारीख, लेट फीस, रसीद, बकाया सूची)",
  "UPI QR से भुगतान की सूचना और कमेटी की पुष्टि",
  "हिसाब-किताब (आय-खर्च, बची रकम)",
  "शिकायत / सुझाव, सूचना बोर्ड, पोल / वोटिंग",
  "त्योहार / कार्यक्रम के शुल्क-चंदे और कमेटी के संदेश (ऐप के अंदर)",
  "पार्किंग, CCTV, सेवाएँ, कमेटी सदस्य, फोटो गैलरी",
];
const needsSetup = [
  "OTP लॉगिन (SMS / WhatsApp / ईमेल)",
  "WhatsApp पर अपने आप रसीद और रिमाइंडर",
  "ऑनलाइन डेटा सर्वर और फोटो स्टोरेज",
];
const later = ["Android APK फ़ाइल / Play Store", "विज़िटर व गेट मैनेजमेंट", "पुश नोटिफ़िकेशन"];

export default function ColonyMitraPurchasePage() {
  const plans = getColonyMitraPlans();

  return (
    <div className="relative space-y-12 sm:space-y-16 py-10 lg:py-16 bg-grid-pattern">
      <div className="ambient-hero-glow" aria-hidden="true" />

      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="mb-6 flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/" className="hover:text-blue-400 transition-colors">ABHIRAJ DIGITAL INNOVATION</Link>
          <span>/</span>
          <Link href="/colony-mitra" className="hover:text-blue-400 transition-colors">COLONY MITRA</Link>
          <span>/</span>
          <span className="text-indigo-400 font-semibold">ख़रीदें</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-mono bg-indigo-950/80 border border-indigo-800/60 text-indigo-300">
              <Building2 className="w-3.5 h-3.5" />
              <span>MONTHLY &amp; YEARLY COLONY PLANS</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight font-heading">
              Colony Mitra <span className="text-indigo-400">ख़रीदें</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              पूरी कॉलोनी के लिए मासिक या सालाना प्लान। पहली कॉलोनी: <strong className="text-white">{COLONY_MITRA_FIRST_COLONY}</strong>।
              भुगतान के बाद हमारी टीम आपकी कॉलोनी के घर, सदस्य और सेटिंग्स जोड़कर ऐप शुरू करती है।
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {plans.length ? (
                plans.map((p) => (
                  <div key={p.id} className="p-5 rounded-2xl bg-slate-900/80 border border-indigo-700/50">
                    <div className="text-xs font-mono text-indigo-300 uppercase tracking-wider">
                      {p.id === "yearly" ? "सालाना प्लान" : "मासिक प्लान"}
                    </div>
                    <div className="text-3xl font-extrabold text-white mt-1 tabular-nums">
                      {p.displayPrice}
                      <span className="text-base font-medium text-slate-400"> {p.period}</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-1">पूरी कॉलोनी के लिए</div>
                  </div>
                ))
              ) : (
                <div className="text-xl font-bold text-amber-300">कीमत जल्द घोषित होगी</div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="/colony-mitra/demo.html"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 transition-all"
              >
                <Eye className="w-4 h-4" /> डेमो देखें (मोबाइल पर भी)
              </a>
              <a
                href="/colony-mitra/app/index.html"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 transition-all"
              >
                <Smartphone className="w-4 h-4" /> वेब ऐप (सेटअप बाकी)
              </a>
              <span
                aria-disabled="true"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-slate-500 bg-slate-900/60 border border-slate-800 cursor-not-allowed"
              >
                <Download className="w-4 h-4" /> APK अभी उपलब्ध नहीं
              </span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <ColonyMitraPurchaseForm
              plans={plans.map((p) => ({ id: p.id, displayPrice: p.displayPrice, period: p.period }))}
              firstColony={COLONY_MITRA_FIRST_COLONY}
            />
          </div>
        </div>
      </section>

      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading mb-2">अभी क्या-क्या उपलब्ध है</h2>
        <p className="text-sm text-slate-400 mb-6">ईमानदार स्थिति, ताकि ख़रीदने से पहले आपको सब साफ़ पता हो।</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-emerald-800/60 space-y-3">
            <div className="flex items-center gap-2 text-emerald-300 font-bold"><CheckCircle2 className="w-5 h-5" /> ऐप में बना हुआ (डेमो में देखें)</div>
            <ul className="space-y-1.5 text-sm text-slate-300">{ready.map((t) => <li key={t}>• {t}</li>)}</ul>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-amber-800/60 space-y-3">
            <div className="flex items-center gap-2 text-amber-300 font-bold"><Settings className="w-5 h-5" /> अभी चालू नहीं · सेटअप बाकी</div>
            <ul className="space-y-1.5 text-sm text-slate-300">{needsSetup.map((t) => <li key={t}>• {t}</li>)}</ul>
            <p className="text-xs text-slate-400">इसके लिए SMS / WhatsApp सेवा और डेटा सर्वर के खाते जोड़ने बाकी हैं। डेमो में OTP नकली (123456) है, असली संदेश नहीं जाता।</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-700 space-y-3">
            <div className="flex items-center gap-2 text-slate-300 font-bold"><Clock className="w-5 h-5" /> अभी उपलब्ध नहीं · आगे आएगा</div>
            <ul className="space-y-1.5 text-sm text-slate-400">{later.map((t) => <li key={t}>• {t}</li>)}</ul>
          </div>
        </div>
      </section>
    </div>
  );
}
