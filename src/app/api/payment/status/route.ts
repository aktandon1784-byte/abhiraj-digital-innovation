import { NextResponse } from "next/server";
import { getRazorpayCredentials } from "@/lib/razorpay";
import { PaymentGatewayStatus } from "@/types/payment";

export const dynamic = "force-dynamic";

/**
 * GET /api/payment/status
 * Returns current payment gateway readiness without exposing any secret keys.
 */
export async function GET() {
  const { keyId, isConfigured, webhookSecret } = getRazorpayCredentials();

  const status: PaymentGatewayStatus = {
    configured: isConfigured,
    statusText: isConfigured ? "Payment Active" : "Payment Integration — Setup Required",
    keyId: isConfigured ? keyId : null,
    webhookConfigured: Boolean(webhookSecret && webhookSecret.length > 5),
    environment: isConfigured
      ? keyId.startsWith("rzp_live")
        ? "production"
        : "development"
      : "unconfigured",
  };

  return NextResponse.json(status);
}
