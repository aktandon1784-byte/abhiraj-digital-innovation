"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  X,
  Lock,
  Loader2,
  Calendar,
  CreditCard,
  Building,
} from "lucide-react";
import { PlanId, PaymentGatewayStatus, VerifyPaymentResponse } from "@/types/payment";
import { SUBSCRIPTION_PLANS } from "@/lib/plans";
import { OPDAssistantLogo } from "@/components/brand/OPDAssistantLogo";

interface RazorpayCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlanId: PlanId;
  gatewayStatus: PaymentGatewayStatus | null;
}

declare global {
  interface Window {
    Razorpay?: unknown;
  }
}

export function RazorpayCheckoutModal({
  isOpen,
  onClose,
  selectedPlanId,
  gatewayStatus,
}: RazorpayCheckoutModalProps) {
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verifiedResult, setVerifiedResult] = useState<VerifyPaymentResponse | null>(null);

  if (!isOpen) return null;

  const plan = SUBSCRIPTION_PLANS[selectedPlanId] || SUBSCRIPTION_PLANS.monthly;
  const isConfigured = Boolean(gatewayStatus?.configured);

  /**
   * Dynamically loads Razorpay checkout script if not present
   */
  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (typeof window !== "undefined" && window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  /**
   * Initializes Razorpay checkout flow with server-side order and verification
   */
  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!userEmail || !userEmail.includes("@")) {
      setError("Please provide a valid clinician / user email address to link your subscription.");
      return;
    }

    if (!isConfigured) {
      setError(
        "Payment gateway credentials (RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET) are not yet configured on this server. Integration setup is required."
      );
      return;
    }

    setIsLoading(true);

    try {
      // 1. Create order on the server
      const orderRes = await fetch("/api/payment/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: plan.id,
          userEmail: userEmail.trim(),
          userPhone: userPhone.trim() || undefined,
          userName: userName.trim() || undefined,
        }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok || !orderData.success) {
        throw new Error(orderData.error || orderData.message || "Failed to create order on server.");
      }

      // 2. Ensure script is loaded
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Failed to load Razorpay Checkout SDK. Please check your internet connection.");
      }

      // 3. Launch Razorpay Checkout
      const RazorpayConstructor = (window as unknown as { Razorpay: new (options: unknown) => { open: () => void } }).Razorpay;

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency || "INR",
        name: "Abhiraj Digital Innovation",
        description: orderData.planName,
        order_id: orderData.orderId,
        prefill: {
          name: userName,
          email: userEmail,
          contact: userPhone,
        },
        theme: {
          color: "#2563EB",
          backdrop_color: "#030712",
        },
        notes: {
          planId: plan.id,
          userEmail: userEmail,
          product: "OPD Assistant AI",
        },
        handler: async function (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) {
          setIsLoading(true);
          try {
            // 4. Server-Side Cryptographic Verification
            const verifyRes = await fetch("/api/payment/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                planId: plan.id,
                userEmail: userEmail.trim(),
                userPhone: userPhone.trim() || undefined,
                userName: userName.trim() || undefined,
              }),
            });

            const verifyData: VerifyPaymentResponse = await verifyRes.json();

            if (!verifyRes.ok || !verifyData.verified) {
              throw new Error(verifyData.error || "Server payment verification failed.");
            }

            setVerifiedResult(verifyData);
          } catch (verifyErr: unknown) {
            const msg = verifyErr instanceof Error ? verifyErr.message : "Verification error";
            setError(msg);
          } finally {
            setIsLoading(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsLoading(false);
          },
        },
      };

      const rzpInstance = new RazorpayConstructor(options);
      rzpInstance.open();
    } catch (checkoutErr: unknown) {
      const msg = checkoutErr instanceof Error ? checkoutErr.message : "Checkout error";
      setError(msg);
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setVerifiedResult(null);
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#090F1C] border border-blue-900/40 shadow-2xl p-6 sm:p-8 space-y-6 text-slate-200 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 border-b border-slate-800 pb-5">
          <OPDAssistantLogo size={44} />
          <div>
            <div className="text-xs font-mono text-blue-400 uppercase tracking-wider">
              Abhiraj Digital Innovation
            </div>
            <h3 className="text-lg font-bold text-white font-heading">
              {verifiedResult ? "Subscription Activated" : "Complete Subscription"}
            </h3>
          </div>
        </div>

        {/* SUCCESS VERIFIED STATE */}
        {verifiedResult && (
          <div className="space-y-5 animate-in fade-in duration-300">
            <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800/80 flex items-start gap-3 text-emerald-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs">
                <div className="font-bold text-emerald-300 text-sm">
                  Cryptographically Verified
                </div>
                <p>{verifiedResult.message}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs text-slate-300">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Subscription Plan:</span>
                <span className="font-semibold text-white">{verifiedResult.planName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">User Account:</span>
                <span className="font-mono text-white">{userEmail}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Access Status:</span>
                <span className="font-mono text-emerald-400 font-bold uppercase">
                  {verifiedResult.status}
                </span>
              </div>
              {verifiedResult.expiresAt && (
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Expiry Date:</span>
                  <span className="font-mono text-blue-300">
                    {new Date(verifiedResult.expiresAt).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              Your subscription record has been cryptographically confirmed and securely registered
              on the Abhiraj Digital Innovation backend. You can use this account email to authenticate
              inside the OPD Assistant AI application.
            </p>

            <button
              onClick={handleReset}
              className="w-full py-3 px-4 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
            >
              Done
            </button>
          </div>
        )}

        {/* CHECKOUT FORM STATE */}
        {!verifiedResult && (
          <div className="space-y-5">
            {/* Selected Plan Summary */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase text-blue-400">Selected Plan</span>
                <div className="text-sm font-bold text-white mt-0.5">{plan.name}</div>
              </div>
              <div className="text-right">
                <div className="text-xl font-extrabold text-white font-heading">
                  {plan.displayPrice}
                </div>
                <div className="text-[11px] text-slate-400">{plan.period}</div>
              </div>
            </div>

            {/* Integration Status Alert if Setup Required */}
            {!isConfigured && (
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 flex items-start gap-3 text-amber-200">
                <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs">
                  <div className="font-bold text-amber-300">
                    Payment Integration — Setup Required
                  </div>
                  <p className="text-[11px] text-amber-200/90 leading-relaxed">
                    Razorpay server verification and order creation architecture is fully implemented.
                    To process real transactions, configure <code className="text-amber-100 font-mono">RAZORPAY_KEY_ID</code> and <code className="text-amber-100 font-mono">RAZORPAY_KEY_SECRET</code> in your server environment variables.
                  </p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-950/50 border border-rose-800/60 text-rose-300 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* User Account Details Form */}
            <form onSubmit={handleCheckout} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  Healthcare Professional Email <span className="text-rose-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="doctor@clinic.com"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-blue-500 focus:outline-none text-xs text-white placeholder-slate-500"
                />
                <p className="text-[10px] text-slate-400">
                  Subscription access will be linked to this email account.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">
                    Phone (Optional for UPI/SMS)
                  </label>
                  <input
                    type="tel"
                    placeholder="9876543210"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-blue-500 focus:outline-none text-xs text-white placeholder-slate-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">
                    Clinician Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Dr. / Practitioner Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-blue-500 focus:outline-none text-xs text-white placeholder-slate-500"
                  />
                </div>
              </div>

              {/* Exact Required Copy */}
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1.5 text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  <span>Secure payment powered by Razorpay</span>
                </div>
                <p className="leading-relaxed">
                  Pay securely using available UPI, cards, net banking and other supported payment methods.
                </p>
                <p className="text-[10px] text-slate-400">
                  Available payment methods are presented by Razorpay based on the current checkout configuration.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2">
                {isConfigured ? (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 px-4 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-950/50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Initializing Secure Razorpay Checkout...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>
                          {selectedPlanId === "yearly"
                            ? "Subscribe Yearly — ₹1,999"
                            : "Subscribe Monthly — ₹199"}
                        </span>
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled
                    aria-disabled="true"
                    className="w-full py-3.5 px-4 rounded-xl text-xs font-bold bg-slate-950 text-slate-400 border border-slate-800 cursor-not-allowed text-center transition-all flex items-center justify-center gap-2 opacity-90 shadow-inner"
                  >
                    <Lock className="w-4 h-4 text-amber-400" />
                    <span>Payment Integration — Setup Required</span>
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
