import { NextRequest, NextResponse } from "next/server";
import { getSubscriptionPlan } from "@/lib/plans";
import { createRazorpayOrder, getRazorpayCredentials } from "@/lib/razorpay";
import { CreateOrderRequest, CreateOrderResponse } from "@/types/payment";

export const dynamic = "force-dynamic";

/**
 * POST /api/payment/razorpay/create-order
 * 
 * Creates an authenticated Razorpay Order.
 * CRITICAL SECURITY:
 * Amount is derived exclusively from the server-side plans table.
 * Any client-sent prices are discarded.
 */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CreateOrderRequest;
    const { planId, userEmail, userPhone, userName } = body || {};

    if (!userEmail || !userEmail.includes("@")) {
      return NextResponse.json<CreateOrderResponse>(
        { success: false, error: "A valid email address is required to link subscription access." },
        { status: 400 }
      );
    }

    const plan = getSubscriptionPlan(planId);
    if (!plan) {
      return NextResponse.json<CreateOrderResponse>(
        { success: false, error: "Invalid plan selected. Must be monthly or yearly." },
        { status: 400 }
      );
    }

    const { keyId, isConfigured } = getRazorpayCredentials();

    if (!isConfigured) {
      return NextResponse.json<CreateOrderResponse>(
        {
          success: false,
          setupRequired: true,
          message:
            "Payment Integration — Setup Required. Server credentials (RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET) must be configured in environment variables.",
        },
        { status: 503 }
      );
    }

    const receipt = `rcpt_${plan.id}_${Date.now().toString().slice(-8)}`;

    const order = await createRazorpayOrder({
      amount: plan.amount, // Strictly enforced server-side amount
      currency: "INR",
      receipt,
      notes: {
        product: "OPD Assistant AI",
        planId: plan.id,
        planName: plan.name,
        userEmail: userEmail.trim().toLowerCase(),
        userPhone: userPhone || "",
        userName: userName || "",
      },
    });

    if (!order) {
      return NextResponse.json<CreateOrderResponse>(
        { success: false, error: "Failed to initialize order with Razorpay." },
        { status: 500 }
      );
    }

    return NextResponse.json<CreateOrderResponse>({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
      planId: plan.id,
      planName: plan.name,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal order creation error";
    console.error("Order creation error:", err);
    return NextResponse.json<CreateOrderResponse>(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
