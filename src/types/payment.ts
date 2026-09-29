/**
 * Payment, Subscription, and Order Types
 * For Razorpay Integration & OPD Assistant AI
 */

export type PlanId = "monthly" | "yearly";

export interface SubscriptionPlan {
  id: PlanId;
  name: string;
  amount: number; // in paise (e.g. 19900 = ₹199, 199900 = ₹1,999)
  displayPrice: string;
  period: string;
  durationDays: number;
  features: string[];
}

export interface PaymentGatewayStatus {
  configured: boolean;
  statusText: "Payment Active" | "Payment Integration — Setup Required";
  keyId: string | null;
  webhookConfigured: boolean;
  environment: "production" | "development" | "unconfigured";
}

export interface CreateOrderRequest {
  planId: PlanId;
  userEmail: string;
  userPhone?: string;
  userName?: string;
}

export interface CreateOrderResponse {
  success: boolean;
  setupRequired?: boolean;
  orderId?: string;
  amount?: number;
  currency?: string;
  keyId?: string;
  planId?: PlanId;
  planName?: string;
  error?: string;
  message?: string;
}

export interface VerifyPaymentRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  planId: PlanId;
  userEmail: string;
  userPhone?: string;
  userName?: string;
}

export interface VerifyPaymentResponse {
  success: boolean;
  verified: boolean;
  subscriptionId?: string;
  planId?: PlanId;
  planName?: string;
  status?: "active" | "failed";
  expiresAt?: string;
  message?: string;
  error?: string;
}

export interface SubscriptionRecord {
  id: string;
  userEmail: string;
  userPhone?: string;
  userName?: string;
  planId: PlanId;
  planName: string;
  amount: number;
  currency: string;
  status: "active" | "expired" | "pending";
  razorpayOrderId: string;
  razorpayPaymentId: string;
  verifiedAt: string;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserAccessStatus {
  hasAccess: boolean;
  subscription: SubscriptionRecord | null;
  reason?: string;
}

export interface DownloadStatusResponse {
  apkAvailable: boolean;
  statusText: string;
  buttonText: string;
  version: string | null;
  releaseNotes: string;
  playStoreStatus: string;
  accessPolicy: "public" | "subscription_required";
}
