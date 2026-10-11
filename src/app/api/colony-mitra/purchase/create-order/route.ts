import { NextRequest, NextResponse } from "next/server";
import { createRazorpayOrder, getRazorpayCredentials } from "@/lib/razorpay";
import { cleanBuyer, getColonyMitraPlan, type ColonyMitraBuyer } from "@/lib/colonyMitraPurchase";

export const dynamic = "force-dynamic";

/**
 * POST /api/colony-mitra/purchase/create-order
 * Creates a Razorpay order for the Colony Mitra monthly colony plan.
 * The amount comes only from the server (COLONY_MITRA_MONTHLY_PRICE_INR); client prices are ignored.
 */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => null)) as Partial<ColonyMitraBuyer> | null;
    const buyer = cleanBuyer(body ?? undefined);
    if (typeof buyer === "string") {
      return NextResponse.json({ success: false, error: buyer }, { status: 400 });
    }

    const plan = getColonyMitraPlan();
    if (!plan) {
      return NextResponse.json(
        { success: false, priceNotSet: true, error: "Colony Mitra की कीमत अभी तय नहीं हुई है। कृपया संपर्क करें।" },
        { status: 503 }
      );
    }

    const { keyId, isConfigured } = getRazorpayCredentials();
    if (!isConfigured) {
      return NextResponse.json(
        { success: false, setupRequired: true, error: "ऑनलाइन भुगतान अभी चालू नहीं है। कृपया संपर्क करें।" },
        { status: 503 }
      );
    }

    const order = await createRazorpayOrder({
      amount: plan.amountPaise,
      currency: "INR",
      receipt: `cm_${Date.now().toString().slice(-10)}`,
      notes: {
        product: "Colony Mitra",
        planId: plan.id,
        colonyName: buyer.colonyName,
        city: buyer.city,
        houses: buyer.houses,
        contactName: buyer.contactName,
        phone: buyer.phone,
        email: buyer.email,
      },
    });
    if (!order) {
      return NextResponse.json({ success: false, error: "भुगतान शुरू नहीं हो सका। फिर कोशिश करें।" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
      planName: plan.name,
    });
  } catch (err: unknown) {
    console.error("Colony Mitra order error:", err);
    return NextResponse.json({ success: false, error: "भुगतान शुरू नहीं हो सका। फिर कोशिश करें।" }, { status: 500 });
  }
}
