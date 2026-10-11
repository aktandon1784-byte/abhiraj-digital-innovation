/**
 * Colony Mitra (कॉलोनी मित्र) — colony subscription plans.
 *
 * Kept separate from the OPD Assistant AI plans in ./plans.ts.
 * Prices are decided ONLY on the server: monthly ₹2,999 and yearly ₹29,999 per colony,
 * optionally overridden by COLONY_MITRA_MONTHLY_PRICE_INR / COLONY_MITRA_YEARLY_PRICE_INR
 * (whole rupees). Client-sent amounts are never used.
 */

export const COLONY_MITRA_FIRST_COLONY = "लक्ष्मण विहार";

export type ColonyMitraPlanId = "monthly" | "yearly";

export interface ColonyMitraPlan {
  id: ColonyMitraPlanId;
  name: string;
  amountPaise: number;
  displayPrice: string;
  period: string;
}

const PLAN_DEFS: Record<ColonyMitraPlanId, { env: string; fallback: string; name: string; period: string }> = {
  monthly: { env: "COLONY_MITRA_MONTHLY_PRICE_INR", fallback: "2999", name: "Colony Mitra — Monthly Colony Plan", period: "/ महीना" },
  yearly: { env: "COLONY_MITRA_YEARLY_PRICE_INR", fallback: "29999", name: "Colony Mitra — Yearly Colony Plan", period: "/ साल" },
};

export function getColonyMitraPlan(id: unknown = "monthly"): ColonyMitraPlan | null {
  if (id !== "monthly" && id !== "yearly") return null;
  const def = PLAN_DEFS[id];
  const raw = (process.env[def.env] || def.fallback).trim();
  if (!/^\d{1,7}$/.test(raw)) return null;
  const rupees = Number(raw);
  if (rupees < 1) return null;
  return {
    id,
    name: def.name,
    amountPaise: rupees * 100,
    displayPrice: `₹${rupees.toLocaleString("en-IN")}`,
    period: def.period,
  };
}

export function getColonyMitraPlans(): ColonyMitraPlan[] {
  return (["monthly", "yearly"] as const).map((id) => getColonyMitraPlan(id)).filter((p): p is ColonyMitraPlan => p !== null);
}

export interface ColonyMitraBuyer {
  colonyName: string;
  city: string;
  houses: string;
  contactName: string;
  phone: string;
  email: string;
}

/** Validate and normalise the purchase form. Returns an error message or the cleaned buyer. */
export function cleanBuyer(input: Partial<ColonyMitraBuyer> | undefined): ColonyMitraBuyer | string {
  const s = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);
  const b: ColonyMitraBuyer = {
    colonyName: s(input?.colonyName, 80),
    city: s(input?.city, 60),
    houses: s(input?.houses, 6),
    contactName: s(input?.contactName, 80),
    phone: s(input?.phone, 20).replace(/\D/g, "").slice(-10),
    email: s(input?.email, 120).toLowerCase(),
  };
  if (!b.colonyName) return "कॉलोनी का नाम लिखें।";
  if (!b.contactName) return "संपर्क व्यक्ति का नाम लिखें।";
  if (b.phone.length !== 10) return "10 अंकों का मोबाइल नंबर लिखें।";
  if (!/^\S+@\S+\.\S+$/.test(b.email)) return "सही ईमेल लिखें।";
  if (b.houses && !/^\d+$/.test(b.houses)) return "घरों की संख्या सिर्फ़ अंकों में लिखें।";
  return b;
}
