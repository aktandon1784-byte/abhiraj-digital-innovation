"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, PhoneCall, Mail, Building2, User } from "lucide-react";

export function KumarSolarInquiryForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    email: "",
    phone: "",
    cityDistrict: "",
    state: "Chhattisgarh",
    interestType: "demo_request" as "demo_request" | "purchase_inquiry" | "custom_enterprise",
    projectNotes: "",
  });

  const [loading, setLoading] = useState(false);
  const [successRef, setSuccessRef] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/products/kumar-solar/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to submit inquiry. Please try again.");
      }

      setSuccessRef(json.referenceNumber);
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred. Please contact us directly.");
    } finally {
      setLoading(false);
    }
  };

  if (successRef) {
    return (
      <div className="rounded-2xl p-8 bg-slate-900 border border-emerald-500/40 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-white">Inquiry Received Successfully!</h3>
          <p className="text-xs font-mono text-emerald-400">Tracking Reference: {successRef}</p>
        </div>
        <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
          Thank you for your interest in <strong>Kumar Solar Panel Management PWA</strong>. Our engineering and sales team will contact you within 24 hours to schedule your personalized product walkthrough.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="mailto:abhirajdigitalinnovation@gmail.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
          >
            <Mail className="w-4 h-4 text-blue-400" />
            <span>Email Directly</span>
          </a>
          <button
            onClick={() => {
              setSuccessRef(null);
              setFormData({
                fullName: "",
                businessName: "",
                email: "",
                phone: "",
                cityDistrict: "",
                state: "Chhattisgarh",
                interestType: "demo_request",
                projectNotes: "",
              });
            }}
            className="text-xs text-slate-400 hover:text-white underline"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl p-6 sm:p-8 bg-slate-900/80 border border-slate-800 space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-blue-500/10 text-blue-300 border border-blue-500/20">
          <span>SALES &amp; DEMO DESK</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
          Request a Guided Demo or Purchase Consultation
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Interested in deploying Kumar Solar Panel Management PWA for your solar EPC business? Share your details and our team will get in touch.
        </p>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Request Type Selector */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: "demo_request", label: "Request a Demo" },
            { id: "purchase_inquiry", label: "Purchase Inquiry" },
            { id: "custom_enterprise", label: "Enterprise Custom" },
          ].map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => setFormData({ ...formData, interestType: type.id as any })}
              className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all border ${
                formData.interestType === type.id
                  ? "bg-amber-500/20 border-amber-500 text-amber-300"
                  : "bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Your Full Name <span className="text-amber-400">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="e.g. Ramesh Patel"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Business / Company Name
            </label>
            <input
              type="text"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              placeholder="e.g. Surya Power Solutions"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Phone / WhatsApp Number <span className="text-amber-400">*</span>
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+91 98XXX XXXXX"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Email Address <span className="text-amber-400">*</span>
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="you@company.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              City / District <span className="text-amber-400">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.cityDistrict}
              onChange={(e) => setFormData({ ...formData, cityDistrict: e.target.value })}
              placeholder="e.g. Raipur / Bilaspur"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              State
            </label>
            <input
              type="text"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Specific Requirements / Notes
          </label>
          <textarea
            rows={3}
            value={formData.projectNotes}
            onChange={(e) => setFormData({ ...formData, projectNotes: e.target.value })}
            placeholder="Tell us about your team size, expected monthly quotations, or specific custom requirements..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-sm tracking-wide transition-all shadow-lg shadow-amber-500/20 disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {loading ? (
            <span>Submitting Request...</span>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Submit Inquiry to Abhiraj Digital Innovation</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
