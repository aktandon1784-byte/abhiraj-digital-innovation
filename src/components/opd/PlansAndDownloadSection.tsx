"use client";

import React, { useState, useEffect } from "react";
import {
  Smartphone,
  CheckCircle2,
  Lock,
  Play,
  ShieldCheck,
  Info,
  AlertCircle,
  Download,
  CreditCard,
  KeyRound,
  FileCheck2,
} from "lucide-react";
import { PlanId, PaymentGatewayStatus, DownloadStatusResponse } from "@/types/payment";
import { SUBSCRIPTION_PLANS } from "@/lib/plans";
import { OPDAssistantLogo } from "@/components/brand/OPDAssistantLogo";
import { RazorpayCheckoutModal } from "@/components/checkout/RazorpayCheckoutModal";

export function PlansAndDownloadSection() {
  const [selectedPlanId, setSelectedPlanId] = useState<PlanId>("monthly");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [gatewayStatus, setGatewayStatus] = useState<PaymentGatewayStatus | null>(null);
  const [downloadStatus, setDownloadStatus] = useState<DownloadStatusResponse | null>(null);
  const [isLoadingStatus, setIsLoadingStatus] = useState(true);

  useEffect(() => {
    // Fetch payment gateway configuration status
    fetch("/api/payment/status")
      .then((res) => res.json())
      .then((data: PaymentGatewayStatus) => {
        setGatewayStatus(data);
      })
      .catch((err) => {
        console.error("Failed to fetch payment status:", err);
      });

    // Fetch APK download availability status
    fetch("/api/download/status")
      .then((res) => res.json())
      .then((data: DownloadStatusResponse) => {
        setDownloadStatus(data);
      })
      .catch((err) => {
        console.error("Failed to fetch download status:", err);
      })
      .finally(() => {
        setIsLoadingStatus(false);
      });
  }, []);

  const openCheckout = (planId: PlanId) => {
    setSelectedPlanId(planId);
    setIsCheckoutOpen(true);
  };

  const isConfigured = Boolean(gatewayStatus?.configured);
  const isApkAvailable = Boolean(downloadStatus?.apkAvailable);

  return (
    <section id="plans-and-download" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div className="space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-blue-950/80 border border-blue-800/60 text-blue-300">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
            <span>Plans & Access</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
            Get OPD Assistant AI
          </h2>
          <p className="text-base sm:text-lg font-medium text-blue-400">
            Medical Chat Box for Healthcare Professionals
          </p>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
            Select a professional subscription plan or prepare for the direct Android mobile application release.
          </p>

          {/* Integration Status Badge */}
          <div className="pt-2">
            {isConfigured ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Payment Active
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-amber-950/60 text-amber-300 border border-amber-800/80">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                Payment Integration — Setup Required
              </span>
            )}
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* MONTHLY PLAN CARD */}
          <div className="relative rounded-2xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold tracking-wider uppercase text-slate-400">
                  MONTHLY
                </span>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  FLEXIBLE ACCESS
                </span>
              </div>

              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
                    ₹199
                  </span>
                  <span className="text-sm font-medium text-slate-400">
                    / month
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Monthly subscription providing access to the application&apos;s structured clinical reference resources and AI-assisted Medical Chat Box.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 space-y-2.5 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>Access to the application&apos;s 25 clinical reference modules</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>AI-assisted Medical Chat Box for structured clinical queries</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>Structured clinical reference schemas &amp; differential considerations</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>Reference assistance for qualified healthcare professionals</span>
                </div>
              </div>
            </div>

            {/* Monthly Subscribe Button */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => openCheckout("monthly")}
                className={`w-full py-3.5 px-4 rounded-xl text-xs font-semibold transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                  isConfigured
                    ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-950/50"
                    : "bg-slate-950 hover:bg-slate-900 text-slate-300 border border-slate-800"
                }`}
              >
                <span className="font-bold text-sm">Subscribe Monthly — ₹199</span>
                <span className="text-[10px] text-blue-400 font-mono">
                  {isConfigured ? "Secure Checkout with Razorpay" : "Payment Integration — Setup Required"}
                </span>
              </button>
            </div>
          </div>

          {/* YEARLY PLAN CARD */}
          <div className="relative rounded-2xl p-6 sm:p-8 bg-slate-900/90 border-2 border-blue-500/50 shadow-xl shadow-blue-950/30 transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold tracking-wider uppercase text-blue-400">
                  YEARLY
                </span>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-blue-950 text-blue-300 border border-blue-800/80 font-semibold badge-glow">
                  ANNUAL SUBSCRIPTION
                </span>
              </div>

              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
                    ₹1,999
                  </span>
                  <span className="text-sm font-medium text-slate-400">
                    / year
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Annual subscription plan providing 12 months of access to existing clinical reference resources with single annual billing.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 space-y-2.5 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>Full access to all 25 clinical reference modules</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>AI-assisted Medical Chat Box for structured clinical queries</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>Access to the application&apos;s existing clinical reference resources</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>Reference assistance for qualified healthcare professionals</span>
                </div>
              </div>
            </div>

            {/* Yearly Subscribe Button */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => openCheckout("yearly")}
                className={`w-full py-3.5 px-4 rounded-xl text-xs font-semibold transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                  isConfigured
                    ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-950/50"
                    : "bg-slate-950 hover:bg-slate-900 text-slate-200 border border-blue-900/60"
                }`}
              >
                <span className="font-bold text-sm">Subscribe Yearly — ₹1,999</span>
                <span className="text-[10px] text-blue-400 font-mono">
                  {isConfigured ? "Secure Checkout with Razorpay" : "Payment Integration — Setup Required"}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Razorpay Gateway Information Card */}
        <div className="max-w-4xl mx-auto rounded-xl p-5 bg-slate-950/80 border border-slate-800/80 space-y-2 text-xs text-slate-300">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <div className="font-bold text-white text-sm">
                Secure Payments with Razorpay
              </div>
              <p className="text-slate-300 leading-relaxed">
                Choose your preferred plan and complete payment through Razorpay&apos;s secure checkout.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Pay securely using available UPI, cards, net banking and other supported payment methods. Available payment methods are presented by Razorpay based on the current checkout configuration.
              </p>
            </div>
          </div>
        </div>

        {/* 6 & 9. ANDROID DOWNLOAD CARD (Premium Glassmorphism with App Logo) */}
        <div className="max-w-4xl mx-auto rounded-2xl p-6 sm:p-8 bg-[#090F1E] border border-blue-900/40 shadow-2xl backdrop-blur-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 border-b border-slate-800/80 pb-6">
            <div className="flex items-center gap-4">
              {/* Official OPD Assistant AI App Icon */}
              <OPDAssistantLogo size={60} showBadge={true} />
              <div>
                <span className="text-[10px] font-mono uppercase text-blue-400 tracking-wider">
                  Official Android Application
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-heading mt-0.5">
                  OPD Assistant AI for Android
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Medical Chat Box for Healthcare Professionals
                </p>
              </div>
            </div>
            <div className="flex flex-col items-start sm:items-end gap-1.5">
              <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-blue-950/90 border border-blue-800 text-blue-300 font-semibold self-start sm:self-auto">
                Official Android Release
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                Platform: Android 8.0+
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Download the official application from an authorized Abhiraj Digital Innovation distribution source. Designed specifically for Android devices to assist qualified clinicians with fast, structured clinical reference lookup.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
            {/* Real APK Download Button */}
            {isApkAvailable ? (
              <a
                href="/api/download/android"
                download="opd-assistant-ai-release.apk"
                className="inline-flex flex-col items-center justify-center px-6 py-3.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-lg shadow-emerald-950/50"
              >
                <span className="font-bold text-sm flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Official Android App
                </span>
                <span className="text-[10px] text-emerald-200 font-mono">
                  Official APK Release Available
                </span>
              </a>
            ) : (
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="inline-flex flex-col items-center justify-center px-6 py-3.5 rounded-xl text-xs font-semibold bg-slate-950 text-slate-400 border border-slate-800 cursor-not-allowed opacity-90 shadow-inner"
              >
                <span className="text-slate-200 font-bold text-sm flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-slate-500" />
                  Download Official Android App
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">
                  Download — Coming Soon
                </span>
              </button>
            )}

            <div className="text-[11px] text-slate-400 flex items-center gap-2">
              <Play className="w-3.5 h-3.5 text-emerald-400 fill-current" />
              <span>Google Play Store — Coming Soon</span>
            </div>
          </div>
        </div>

        {/* 7. TRUST / APK SAFETY MESSAGE SECTION */}
        <div className="max-w-4xl mx-auto rounded-xl p-5 bg-slate-950/90 border border-slate-800 space-y-3 text-xs text-slate-300">
          <div className="flex items-center gap-2 text-blue-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <FileCheck2 className="w-4 h-4" />
            <span>Official Application</span>
          </div>

          <div className="space-y-2 text-slate-300 leading-relaxed">
            <p>
              OPD Assistant AI is the official Android application developed for Abhiraj Digital Innovation.
            </p>
            <p>
              Download the application only from the official Abhiraj Digital Innovation website or the official Google Play Store release when available.
            </p>
            <p className="text-slate-400 text-[11px]">
              Before installation, users should verify that the application has been obtained from an official distribution source.
            </p>
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-4 text-[11px] font-mono text-blue-300">
            <span>Official Release</span>
            <span className="text-slate-600">•</span>
            <span>Controlled Distribution</span>
            <span className="text-slate-600">•</span>
            <span>Application Integrity</span>
          </div>
        </div>

        {/* Policy & Infrastructure Notes */}
        <div className="max-w-4xl mx-auto rounded-xl p-4 sm:p-5 bg-slate-950/80 border border-slate-800/80 space-y-2 text-xs text-slate-400">
          <div className="flex items-start gap-2.5">
            <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <p>
                <strong>Distribution Note:</strong> Direct APK download will be activated when the production signed APK binary is uploaded to the distribution server.
              </p>
              <p>
                <strong>Payment Verification:</strong> Subscription access is cryptographically verified server-side via HMAC SHA-256 signatures before activating account access.
              </p>
              <p className="text-[11px] text-slate-500">
                Notice: All transactions are processed through certified Razorpay checkout channels. Secret keys are never exposed in client code.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Razorpay Interactive Checkout Modal */}
      <RazorpayCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        selectedPlanId={selectedPlanId}
        gatewayStatus={gatewayStatus}
      />
    </section>
  );
}
