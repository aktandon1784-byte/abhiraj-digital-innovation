import { PlanId, SubscriptionPlan } from "@/types/payment";

/**
 * Authoritative Server-Enforced Subscription Plans Table
 * 
 * CRITICAL SECURITY GUARANTEE:
 * Prices and plan details are strictly read from this table on the server.
 * Client-submitted price amounts are NEVER trusted or used to create Razorpay orders.
 */
export const SUBSCRIPTION_PLANS: Record<PlanId, SubscriptionPlan> = {
  monthly: {
    id: "monthly",
    name: "OPD Assistant AI Monthly",
    amount: 19900, // ₹199.00 in paise
    displayPrice: "₹199",
    period: "/ month",
    durationDays: 30,
    features: [
      "Access to the application's 25 clinical reference modules",
      "AI-assisted Medical Chat Box for structured clinical queries",
      "Structured clinical reference schemas & differential considerations",
      "Reference assistance for qualified healthcare professionals",
    ],
  },
  yearly: {
    id: "yearly",
    name: "OPD Assistant AI Yearly",
    amount: 199900, // ₹1,999.00 in paise
    displayPrice: "₹1,999",
    period: "/ year",
    durationDays: 365,
    features: [
      "Full access to all 25 clinical reference modules",
      "AI-assisted Medical Chat Box for structured clinical queries",
      "Access to the application's existing clinical reference resources",
      "Reference assistance for qualified healthcare professionals",
    ],
  },
};

/**
 * Safely retrieve a subscription plan by ID
 */
export function getSubscriptionPlan(planId: string): SubscriptionPlan | null {
  if (planId === "monthly" || planId === "yearly") {
    return SUBSCRIPTION_PLANS[planId];
  }
  return null;
}
