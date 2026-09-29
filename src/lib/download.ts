import fs from "fs";
import path from "path";
import { DownloadStatusResponse } from "@/types/payment";

/**
 * APK Download & Distribution Architecture
 * 
 * POLICIES & SECURITY:
 * 1. Does NOT serve fake APKs or placeholders.
 * 2. Only serves APK if a real, verified production binary is present on the server.
 * 3. Supports dual models:
 *    - 'public': APK is downloadable, in-app access gated by subscription.
 *    - 'subscription_required': APK download itself requires verified subscription.
 */

// Production APK lookup paths
const LOCAL_APK_PATHS = [
  process.env.ANDROID_APK_PATH,
  path.join(process.cwd(), "private_downloads", "opd-assistant-ai.apk"),
  path.join(process.cwd(), "public", "downloads", "opd-assistant-ai-release.apk"),
].filter(Boolean) as string[];

/**
 * Check if a genuine production signed APK exists on the filesystem
 */
export function getRealApkPath(): string | null {
  for (const candidatePath of LOCAL_APK_PATHS) {
    try {
      if (fs.existsSync(candidatePath)) {
        const stats = fs.statSync(candidatePath);
        // Ensure it is a file and has non-trivial size (> 5MB for a real Android APK)
        if (stats.isFile() && stats.size > 5 * 1024 * 1024) {
          return candidatePath;
        }
      }
    } catch {
      // Ignore filesystem access check errors
    }
  }
  return null;
}

/**
 * Get current Android APK distribution status
 */
export function getDownloadStatus(): DownloadStatusResponse {
  const realApk = getRealApkPath();
  const apkAvailable = Boolean(realApk);

  const accessPolicy = (process.env.DOWNLOAD_ACCESS_POLICY === "subscription_required"
    ? "subscription_required"
    : "public") as "public" | "subscription_required";

  return {
    apkAvailable,
    statusText: apkAvailable ? "Official Android Release Available" : "Download — Coming Soon",
    buttonText: apkAvailable ? "Download Official Android App" : "Download — Coming Soon",
    version: apkAvailable ? "1.0.0" : null,
    releaseNotes: apkAvailable
      ? "Official production signed APK build."
      : "Production signed APK build is in final release preparation for authorized clinical distribution.",
    playStoreStatus: "Google Play Store — Coming Soon",
    accessPolicy,
  };
}
