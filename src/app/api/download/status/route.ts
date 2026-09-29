import { NextResponse } from "next/server";
import { getDownloadStatus } from "@/lib/download";

export const dynamic = "force-dynamic";

/**
 * GET /api/download/status
 * Returns genuine availability of the Android APK binary without placeholders.
 */
export async function GET() {
  const status = getDownloadStatus();
  return NextResponse.json(status);
}
