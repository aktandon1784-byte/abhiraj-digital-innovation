import { NextRequest, NextResponse } from "next/server";
import { fetchRazorpayPayment, verifyPaymentSignature } from "@/lib/razorpay";
import { getColonyMitraPlan } from "@/lib/colonyMitraPurchase";

export const dynamic = "force-dynamic";

/**
 * POST /api/colony-mitra/purchase/verify
 * Verifies the Razorpay signature and confirms with Razorpay that the payment
 * belongs to the order and matches the Colony Mitra plan amount.
 * The paid order (with the colony details in its notes) is the record in the Razorpay Dashboard.
 */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => null)) as {
      razorpay_order_id?: string;
      razorpay_payment_id?: string;
      razorpay_signature?: string;
      planId?: string;
    } | null;
    const orderId = String(body?.razorpay_order_id || "");
    const paymentId = String(body?.razorpay_payment_id || "");
    const signature = String(body?.razorpay_signature || "");
    if (!orderId || !paymentId || !signature) {
      return NextResponse.json({ success: false, verified: false, error: "भुगतान की जानकारी अधूरी है।" }, { status: 400 });
    }

    if (!verifyPaymentSignature({ orderId, paymentId, signature })) {
      return NextResponse.json({ success: false, verified: false, error: "भुगतान की पुष्टि नहीं हो सकी।" }, { status: 400 });
    }

    const plan = getColonyMitraPlan(body?.planId);
    const payment = await fetchRazorpayPayment(paymentId);
    const okStatus = payment && (payment.status === "captured" || payment.status === "authorized");
    const okOrder = payment && payment.orderId === orderId;
    const okAmount = payment && plan && payment.amount === plan.amountPaise;
    if (!okStatus || !okOrder || !okAmount) {
      console.error("Colony Mitra payment mismatch", { orderId, paymentId, status: payment?.status });
      return NextResponse.json(
        { success: false, verified: false, error: "भुगतान की पुष्टि नहीं हो सकी। अगर पैसा कटा है तो हमसे संपर्क करें।" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, verified: true, paymentId, orderId, planId: plan?.id });
  } catch (err: unknown) {
    console.error("Colony Mitra verify error:", err);
    return NextResponse.json({ success: false, verified: false, error: "भुगतान की पुष्टि नहीं हो सकी।" }, { status: 500 });
  }
}
