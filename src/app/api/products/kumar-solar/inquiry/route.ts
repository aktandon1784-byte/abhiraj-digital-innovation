import { NextResponse } from "next/server";
import { z } from "zod";

const inquirySchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  businessName: z.string().optional().default(""),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid 10-digit phone number required"),
  cityDistrict: z.string().min(2, "City/District required"),
  state: z.string().default("Chhattisgarh"),
  interestType: z.enum(["demo_request", "purchase_inquiry", "custom_enterprise"]),
  currentOperation: z.string().optional().default(""),
  projectNotes: z.string().optional().default(""),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = inquirySchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation error",
          issues: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const trackingRef = `ADI-KSP-${Date.now().toString().slice(-6)}`;

    // In production, this can forward to SMTP / Email / CRM / Database
    console.log(`[Kumar Solar Inquiry Received] Ref: ${trackingRef}`, data);

    return NextResponse.json({
      success: true,
      referenceNumber: trackingRef,
      message:
        "Thank you! Your demo request and sales inquiry has been received by Abhiraj Digital Innovation. Our enterprise engineering team will get in touch with you shortly.",
      contactEmail: "abhirajdigitalinnovation@gmail.com",
    });
  } catch (err: any) {
    console.error("Kumar Solar inquiry API error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error processing inquiry" },
      { status: 500 }
    );
  }
}
