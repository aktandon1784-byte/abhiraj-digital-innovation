import crypto from "crypto";

/**
 * Server-Side Razorpay Payment Gateway Helper
 * 
 * SECURITY RULES:
 * - Credentials are read ONLY on the server side via process.env.
 * - Secret keys are NEVER exposed to the browser or sent in client responses.
 * - Payment signatures are cryptographically verified using HMAC SHA-256.
 */

export interface RazorpayCredentials {
  keyId: string;
  keySecret: string;
  webhookSecret: string;
  isConfigured: boolean;
}

/**
 * Safely check if Razorpay credentials are fully configured on the server
 */
export function getRazorpayCredentials(): RazorpayCredentials {
  const keyId = (process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "").trim();
  const keySecret = (process.env.RAZORPAY_KEY_SECRET || "").trim();
  const webhookSecret = (process.env.RAZORPAY_WEBHOOK_SECRET || "").trim();

  // Basic validation to ensure they are real keys and not placeholder text
  const isConfigured = Boolean(
    keyId &&
    keySecret &&
    !keyId.includes("placeholder") &&
    !keySecret.includes("placeholder") &&
    keyId.length >= 8 &&
    keySecret.length >= 8
  );

  return {
    keyId,
    keySecret,
    webhookSecret,
    isConfigured,
  };
}

/**
 * Public Key ID safe for client checkout initialization
 */
export function getPublicRazorpayKeyId(): string | null {
  const { keyId, isConfigured } = getRazorpayCredentials();
  return isConfigured ? keyId : null;
}

/**
 * Create a server-authenticated order with Razorpay API
 * 
 * @param amount Amount in smallest currency unit (paise for INR)
 * @param currency Default "INR"
 * @param receipt Internal receipt identifier
 * @param notes Custom metadata including planId and customer email
 */
export async function createRazorpayOrder({
  amount,
  currency = "INR",
  receipt,
  notes,
}: {
  amount: number;
  currency?: string;
  receipt: string;
  notes?: Record<string, string>;
}): Promise<{ id: string; amount: number; currency: string } | null> {
  const { keyId, keySecret, isConfigured } = getRazorpayCredentials();

  if (!isConfigured) {
    throw new Error("Razorpay credentials are not configured on the server.");
  }

  const authHeader = `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`;

  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader,
    },
    body: JSON.stringify({
      amount,
      currency,
      receipt,
      notes: notes || {},
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const errorMessage = errorData?.error?.description || `Razorpay order creation failed with status ${response.status}`;
    throw new Error(errorMessage);
  }

  const orderData = await response.json();
  return {
    id: orderData.id,
    amount: orderData.amount,
    currency: orderData.currency,
  };
}

/**
 * Cryptographically verify the payment signature received from Razorpay Checkout
 * 
 * Signature = HMAC_SHA256(order_id + "|" + payment_id, secret)
 */
export function verifyPaymentSignature({
  orderId,
  paymentId,
  signature,
}: {
  orderId: string;
  paymentId: string;
  signature: string;
}): boolean {
  const { keySecret, isConfigured } = getRazorpayCredentials();

  if (!isConfigured || !keySecret || !orderId || !paymentId || !signature) {
    return false;
  }

  try {
    const body = `${orderId}|${paymentId}`;
    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(body)
      .digest("hex");

    const expectedBuffer = Buffer.from(expectedSignature, "utf8");
    const signatureBuffer = Buffer.from(signature, "utf8");

    if (expectedBuffer.length !== signatureBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(expectedBuffer, signatureBuffer);
  } catch (err) {
    console.error("Signature verification error:", err);
    return false;
  }
}

/**
 * Cryptographically verify webhook events received from Razorpay
 */
export function verifyWebhookSignature({
  rawBody,
  signature,
}: {
  rawBody: string;
  signature: string;
}): boolean {
  const { webhookSecret } = getRazorpayCredentials();

  if (!webhookSecret || !signature || !rawBody) {
    return false;
  }

  try {
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(rawBody)
      .digest("hex");

    const expectedBuffer = Buffer.from(expectedSignature, "utf8");
    const signatureBuffer = Buffer.from(signature, "utf8");

    if (expectedBuffer.length !== signatureBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(expectedBuffer, signatureBuffer);
  } catch (err) {
    console.error("Webhook signature verification error:", err);
    return false;
  }
}

/**
 * Fetch payment status directly from Razorpay API to confirm capture status and amount
 */
export async function fetchRazorpayPayment(paymentId: string): Promise<{
  id: string;
  status: string;
  amount: number;
  currency: string;
  orderId: string;
  email?: string;
  contact?: string;
} | null> {
  const { keyId, keySecret, isConfigured } = getRazorpayCredentials();

  if (!isConfigured) return null;

  try {
    const authHeader = `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`;
    const response = await fetch(`https://api.razorpay.com/v1/payments/${paymentId}`, {
      headers: {
        Authorization: authHeader,
      },
    });

    if (!response.ok) return null;

    const data = await response.json();
    return {
      id: data.id,
      status: data.status,
      amount: data.amount,
      currency: data.currency,
      orderId: data.order_id,
      email: data.email,
      contact: data.contact,
    };
  } catch (err) {
    console.error("Failed to fetch payment from Razorpay:", err);
    return null;
  }
}
