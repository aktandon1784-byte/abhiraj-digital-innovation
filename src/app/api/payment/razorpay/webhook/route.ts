import { NextRequest, NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/razorpay";
import { recordVerifiedSubscription } from "@/lib/subscriptions";
import { PlanId } from "@/types/payment";

export const dynamic = "force-dynamic";

/**
 * POST /api/payment/razorpay/webhook
 * 
 * Handles server-to-server webhook notifications from Razorpay.
 * Guarantees that even if the customer closes their browser before returning,
 * the subscription access is securely recorded upon payment capture.
 */
export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing webhook signature" }, { status: 400 });
    }

    const isValid = verifyWebhookSignature({ rawBody, signature });
    if (!isValid) {
      console.warn("Invalid Razorpay webhook signature received");
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(rawBody);
    const eventType = event?.event;

    // Handle payment capture / order paid events
    if (eventType === "payment.captured" || eventType === "order.paid") {
      const paymentEntity = event?.payload?.payment?.entity;
      const orderEntity = event?.payload?.order?.entity;

      const notes = paymentEntity?.notes || orderEntity?.notes || {};
      const planId = (notes.planId as PlanId) || "monthly";
      const userEmail = notes.userEmail || paymentEntity?.email;
      const userPhone = notes.userPhone || paymentEntity?.contact;
      const userName = notes.userName;

      const orderId = paymentEntity?.order_id || orderEntity?.id;
      const paymentId = paymentEntity?.id;

      if (userEmail && orderId && paymentId) {
        recordVerifiedSubscription({
          userEmail,
          userPhone,
          userName,
          planId: planId === "yearly" ? "yearly" : "monthly",
          razorpayOrderId: orderId,
          razorpayPaymentId: paymentId,
          verifiedAt: new Date(),
        });
        console.log(`Webhook successfully recorded subscription for ${userEmail} (${planId})`);
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Webhook error";
    console.error("Webhook processing error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
