import fs from "fs";
import path from "path";
import { PlanId, SubscriptionRecord, UserAccessStatus } from "@/types/payment";
import { SUBSCRIPTION_PLANS } from "./plans";

/**
 * Backend Subscription & User Access Management
 * 
 * Manages verified subscription records associated with user accounts:
 * User Account + Verified Payment + Subscription Plan + Subscription Status + Expiry Date
 */

const DATA_DIR = path.join(process.cwd(), "data");
const SUBSCRIPTIONS_FILE = path.join(DATA_DIR, "subscriptions.json");

// In-memory fallback cache
const memorySubscriptions: Map<string, SubscriptionRecord> = new Map();

/**
 * Ensure storage directory and file exist safely
 */
function ensureDataFile(): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(SUBSCRIPTIONS_FILE)) {
      fs.writeFileSync(SUBSCRIPTIONS_FILE, JSON.stringify([], null, 2), "utf8");
    }
  } catch (err) {
    console.warn("Storage directory initialization note:", err);
  }
}

/**
 * Read all subscriptions from persistent storage
 */
export function getAllSubscriptions(): SubscriptionRecord[] {
  try {
    ensureDataFile();
    if (fs.existsSync(SUBSCRIPTIONS_FILE)) {
      const data = fs.readFileSync(SUBSCRIPTIONS_FILE, "utf8");
      const list = JSON.parse(data);
      if (Array.isArray(list)) {
        return list;
      }
    }
  } catch (err) {
    console.error("Error reading subscriptions storage:", err);
  }
  return Array.from(memorySubscriptions.values());
}

/**
 * Persist subscriptions list
 */
function saveSubscriptionsList(subscriptions: SubscriptionRecord[]): void {
  try {
    ensureDataFile();
    fs.writeFileSync(SUBSCRIPTIONS_FILE, JSON.stringify(subscriptions, null, 2), "utf8");
  } catch (err) {
    console.error("Error saving subscriptions storage, falling back to memory:", err);
    // Keep updated in memory map
    subscriptions.forEach((sub) => memorySubscriptions.set(sub.id, sub));
  }
}

/**
 * Record a verified subscription after server cryptographic verification
 */
export function recordVerifiedSubscription({
  userEmail,
  userPhone,
  userName,
  planId,
  razorpayOrderId,
  razorpayPaymentId,
  verifiedAt = new Date(),
}: {
  userEmail: string;
  userPhone?: string;
  userName?: string;
  planId: PlanId;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  verifiedAt?: Date;
}): SubscriptionRecord {
  const plan = SUBSCRIPTION_PLANS[planId];
  if (!plan) {
    throw new Error(`Invalid plan identifier: ${planId}`);
  }

  const now = verifiedAt;
  const expiresAtDate = new Date(now.getTime() + plan.durationDays * 24 * 60 * 60 * 1000);

  const normalizedEmail = userEmail.trim().toLowerCase();

  const record: SubscriptionRecord = {
    id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    userEmail: normalizedEmail,
    userPhone: userPhone?.trim() || undefined,
    userName: userName?.trim() || undefined,
    planId: plan.id,
    planName: plan.name,
    amount: plan.amount,
    currency: "INR",
    status: "active",
    razorpayOrderId,
    razorpayPaymentId,
    verifiedAt: now.toISOString(),
    expiresAt: expiresAtDate.toISOString(),
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  };

  const all = getAllSubscriptions();
  // Filter out older records for the same email or append
  const updated = [record, ...all.filter((s) => s.id !== record.id)];
  saveSubscriptionsList(updated);
  memorySubscriptions.set(record.id, record);

  return record;
}

/**
 * Validate user subscription access based on account and expiry date
 */
export function checkUserAccess(userEmail: string): UserAccessStatus {
  if (!userEmail) {
    return { hasAccess: false, subscription: null, reason: "No user email provided" };
  }

  const normalized = userEmail.trim().toLowerCase();
  const all = getAllSubscriptions();

  // Find active subscriptions for this user
  const userSubs = all.filter((s) => s.userEmail.toLowerCase() === normalized);

  if (userSubs.length === 0) {
    return { hasAccess: false, subscription: null, reason: "No active subscription found for this account" };
  }

  // Sort by expiry date descending
  userSubs.sort((a, b) => new Date(b.expiresAt).getTime() - new Date(a.expiresAt).getTime());
  const latestSub = userSubs[0];

  const now = new Date();
  const expiresAt = new Date(latestSub.expiresAt);

  if (now > expiresAt) {
    return {
      hasAccess: false,
      subscription: { ...latestSub, status: "expired" },
      reason: "Subscription has expired",
    };
  }

  return {
    hasAccess: true,
    subscription: latestSub,
  };
}
