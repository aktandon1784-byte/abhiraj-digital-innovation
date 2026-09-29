import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { getRealApkPath, getDownloadStatus } from "@/lib/download";
import { checkUserAccess } from "@/lib/subscriptions";

export const dynamic = "force-dynamic";

/**
 * GET /api/download/android
 * 
 * Secure endpoint to download the real signed Android APK.
 * CRITICAL INTEGRITY RULES:
 * - Never serves fake or placeholder files.
 * - Supports both public distribution and subscription-gated distribution models.
 */
export async function GET(req: NextRequest) {
  const apkPath = getRealApkPath();
  const { accessPolicy } = getDownloadStatus();

  // If no genuine APK file has been uploaded to the server yet
  if (!apkPath) {
    return NextResponse.json(
      {
        success: false,
        error:
          "The official signed Android APK is currently in release preparation and has not yet been uploaded to the production distribution server.",
        status: "Download — Coming Soon",
      },
      { status: 404 }
    );
  }

  // If the business model requires an active subscription to download
  if (accessPolicy === "subscription_required") {
    const userEmail = req.nextUrl.searchParams.get("email");
    if (!userEmail) {
      return NextResponse.json(
        {
          success: false,
          error: "An email with an active subscription is required to download under this policy.",
          requiresSubscription: true,
        },
        { status: 403 }
      );
    }

    const { hasAccess } = checkUserAccess(userEmail);
    if (!hasAccess) {
      return NextResponse.json(
        {
          success: false,
          error: "No active subscription verified for this user email.",
          requiresSubscription: true,
        },
        { status: 403 }
      );
    }
  }

  // Stream genuine APK file
  try {
    const fileBuffer = fs.readFileSync(apkPath);
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/vnd.android.package-archive",
        "Content-Disposition": 'attachment; filename="opd-assistant-ai-release.apk"',
        "Content-Length": fileBuffer.length.toString(),
      },
    });
  } catch (err) {
    console.error("Error reading production APK:", err);
    return NextResponse.json(
      { success: false, error: "Failed to read APK file from server." },
      { status: 500 }
    );
  }
}
