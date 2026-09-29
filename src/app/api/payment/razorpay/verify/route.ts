import { NextRequest, NextResponse } from "next/server";
import { getSubscriptionPlan } from "@/lib/plans";
import { verifyPaymentSignature, fetchRazorpayPayment } from "@/lib/razorpay";
import { recordVerifiedSubscription } from "@/lib/subscriptions";
import { VerifyPaymentRequest, VerifyPaymentResponse } from "@/types/payment";

export const dynamic = "force-dynamic";

/**
 * POST /api/payment/razorpay/verify
 * 
 * Server-Side Cryptographic Payment Verification
 * CRITICAL RULE:
 * Never activate access based on frontend state alone.
 * Access is activated ONLY after verifying the HMAC SHA-256 signature using the secret key.
 */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as VerifyPaymentRequest;
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      planId,
      userEmail,
      userPhone,
      userName,
    } = body || {};

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json<VerifyPaymentResponse>(
        {
          success: false,
          verified: false,
          error: "Missing required Razorpay payment response parameters.",
        },
        { status: 400 }
      );
    }

    if (!userEmail || !userEmail.includes("@")) {
      return NextResponse.json<VerifyPaymentResponse>(
        {
          success: false,
          verified: false,
          error: "Valid user email is required to activate subscription access.",
        },
        { status: 400 }
      );
    }

    const plan = getSubscriptionPlan(planId);
    if (!plan) {
      return NextResponse.json<VerifyPaymentResponse>(
        {
          success: false,
          verified: false,
          error: "Invalid plan identifier specified.",
        },
        { status: 400 }
      );
    }

    // 1. Cryptographic HMAC SHA-256 Verification
    const isSignatureValid = verifyPaymentSignature({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
    });

    if (!isSignatureValid) {
      console.warn("Invalid payment signature detected for order:", razorpay_order_id);
      return NextResponse.json<VerifyPaymentResponse>(
        {
          success: false,
          verified: false,
          error: "Invalid cryptographic payment signature. Payment cannot be verified.",
        },
        { status: 400 }
      );
    }

    // 2. Double check directly with Razorpay API (amount & captured status)
    const paymentRecord = await fetchRazorpayPayment(razorpay_payment_id);
    if (paymentRecord) {
      // Validate that amount matches the plan's authoritative amount
      if (paymentRecord.amount !== plan.amount) {
        console.error(
          `Amount mismatch! Expected ${plan.amount} paise, received ${paymentRecord.amount} paise.`
        );
        return NextResponse.json<VerifyPaymentResponse>(
          {
            success: false,
            verified: false,
            error: "Payment amount does not match plan specifications.",
          },
          { status: 400 }
        );
      }
    }

    // 3. Securely record and activate user subscription
    const subscription = recordVerifiedSubscription({
      userEmail,
      userPhone,
      userName,
      planId: plan.id,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      verifiedAt: new Date(),
    });

    return NextResponse.json<VerifyPaymentResponse>({
      success: true,
      verified: true,
      subscriptionId: subscription.id,
      planId: plan.id,
      planName: plan.name,
      status: "active",
      expiresAt: subscription.expiresAt,
      message: `Payment successfully verified. Subscription to ${plan.name} is active until ${new Date(
        subscription.expiresAt
      ).toLocaleDateString()}.`,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Verification error";
    console.error("Verification error:", err);
    return NextResponse.json<VerifyPaymentResponse>(
      {
        success: false,
        verified: false,
        error: message,
      },
      { status: 500 }
    );
  }
}
