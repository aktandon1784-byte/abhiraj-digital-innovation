"use client";

import React, { useState } from "react";
import { CheckCircle2, Loader2, Lock } from "lucide-react";

type RazorpayResponse = { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string };
type RazorpayCtor = new (options: Record<string, unknown>) => { open: () => void; on: (e: string, cb: (r: unknown) => void) => void };

function loadCheckout(): Promise<boolean> {
  return new Promise((resolve) => {
    const w = window as unknown as { Razorpay?: RazorpayCtor };
    if (w.Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

export function ColonyMitraPurchaseForm({
  priceSet,
  displayPrice,
  firstColony,
}: {
  priceSet: boolean;
  displayPrice: string | null;
  firstColony: string;
}) {
  const [form, setForm] = useState({ colonyName: firstColony, city: "", houses: "", contactName: "", phone: "", email: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState<{ paymentId: string } | null>(null);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [k]: e.target.value });

  async function pay(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const r = await fetch("/api/colony-mitra/purchase/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const order = await r.json();
      if (!order.success) {
        setError(order.error || "भुगतान शुरू नहीं हो सका।");
        return;
      }
      if (!(await loadCheckout())) {
        setError("Razorpay लोड नहीं हुआ। इंटरनेट जाँचकर फिर कोशिश करें।");
        return;
      }
      const Razorpay = (window as unknown as { Razorpay: RazorpayCtor }).Razorpay;
      const rz = new Razorpay({
        key: order.keyId,
        order_id: order.orderId,
        amount: order.amount,
        currency: order.currency,
        name: "Abhiraj Digital Innovation",
        description: `Colony Mitra · ${form.colonyName}`,
        prefill: { name: form.contactName, email: form.email, contact: form.phone },
        notes: { colonyName: form.colonyName },
        theme: { color: "#4F46E5" },
        handler: async (resp: RazorpayResponse) => {
          setBusy(true);
          try {
            const v = await fetch("/api/colony-mitra/purchase/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(resp),
            }).then((x) => x.json());
            if (v.verified) setDone({ paymentId: v.paymentId });
            else setError(v.error || "भुगतान की पुष्टि नहीं हो सकी।");
          } catch {
            setError("भुगतान की पुष्टि नहीं हो सकी। अगर पैसा कटा है तो हमसे संपर्क करें।");
          } finally {
            setBusy(false);
          }
        },
        modal: { ondismiss: () => setBusy(false) },
      });
      rz.on("payment.failed", () => setError("भुगतान पूरा नहीं हुआ। फिर कोशिश करें।"));
      rz.open();
    } catch {
      setError("भुगतान शुरू नहीं हो सका। इंटरनेट जाँचकर फिर कोशिश करें।");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-700/60 space-y-3">
        <div className="flex items-center gap-2 text-emerald-300 font-bold text-lg">
          <CheckCircle2 className="w-6 h-6" /> भुगतान सफल हुआ
        </div>
        <p className="text-slate-300 text-sm">
          <strong className="text-white">{form.colonyName}</strong> के लिए Colony Mitra का मासिक प्लान ले लिया गया है। हमारी टीम{" "}
          <strong className="text-white">{form.phone}</strong> पर संपर्क करके आपकी कॉलोनी का सेटअप शुरू करेगी।
        </p>
        <p className="text-xs text-slate-400">
          Payment ID: <span className="font-mono text-slate-200">{done.paymentId}</span> · इसे संभालकर रखें।
        </p>
      </div>
    );
  }

  const input =
    "w-full rounded-xl bg-slate-950/70 border border-slate-700 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500";
  const label = "block text-xs font-semibold text-slate-300 mb-1.5";

  return (
    <form onSubmit={pay} className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label htmlFor="cm-colony" className={label}>कॉलोनी / सोसाइटी का नाम</label>
          <input id="cm-colony" required className={input} value={form.colonyName} onChange={set("colonyName")} />
        </div>
        <div>
          <label htmlFor="cm-city" className={label}>शहर</label>
          <input id="cm-city" className={input} value={form.city} onChange={set("city")} placeholder="जैसे बलौदा बाज़ार" />
        </div>
        <div>
          <label htmlFor="cm-houses" className={label}>कुल घर (लगभग)</label>
          <input id="cm-houses" inputMode="numeric" className={input} value={form.houses} onChange={set("houses")} placeholder="जैसे 150" />
        </div>
        <div>
          <label htmlFor="cm-name" className={label}>संपर्क व्यक्ति (अध्यक्ष / सचिव)</label>
          <input id="cm-name" required className={input} value={form.contactName} onChange={set("contactName")} />
        </div>
        <div>
          <label htmlFor="cm-phone" className={label}>मोबाइल नंबर</label>
          <input id="cm-phone" required type="tel" inputMode="numeric" className={input} value={form.phone} onChange={set("phone")} placeholder="10 अंक" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cm-email" className={label}>ईमेल</label>
          <input id="cm-email" required type="email" className={input} value={form.email} onChange={set("email")} />
        </div>
      </div>

      {error && <p className="text-sm text-rose-400">{error}</p>}

      {priceSet ? (
        <button
          type="submit"
          disabled={busy}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/25 transition-all disabled:opacity-60"
        >
          {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
          <span>{displayPrice} / महीना · UPI या कार्ड से भुगतान करें</span>
        </button>
      ) : (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/40 text-sm text-amber-200">
          मासिक प्लान की कीमत जल्द घोषित होगी। तब तक संपर्क करें:{" "}
          <a className="underline" href="mailto:abhirajdigitalinnovation@gmail.com?subject=Colony%20Mitra">
            abhirajdigitalinnovation@gmail.com
          </a>
        </div>
      )}
      <p className="text-[11px] text-slate-500">
        भुगतान Razorpay से सुरक्षित होता है (UPI, कार्ड, नेट बैंकिंग)। आपकी जानकारी सिर्फ़ सेटअप के लिए इस्तेमाल होगी।
      </p>
    </form>
  );
}
