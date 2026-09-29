import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions | Abhiraj Digital Innovation",
  description: "Terms and conditions of use for Abhiraj Digital Innovation and OPD Assistant AI.",
};

export default function TermsPage() {
  return (
    <div className="relative space-y-16 py-10 lg:py-16 bg-grid-pattern">
      <div className="ambient-hero-glow" aria-hidden="true" />

      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/" className="hover:text-blue-400 transition-colors">
            HOME
          </Link>
          <span>/</span>
          <span className="text-blue-400 font-semibold">TERMS & CONDITIONS</span>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading">
            Terms & Conditions
          </h1>
          <p className="text-xs font-mono text-slate-400">
            Last Updated: 2026 • Abhiraj Digital Innovation
          </p>
        </div>

        <div className="mt-8 space-y-6 text-sm text-slate-300 leading-relaxed p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-white">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the digital platforms, website, and applications developed by <strong>Abhiraj Digital Innovation</strong>, you acknowledge and agree to comply with these Terms & Conditions.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-white">2. Medical & Clinical Disclaimer</h2>
            <p>
              <strong>OPD Assistant AI</strong> is an AI-assisted Medical Chat Box and Clinical Reference & Decision-Support Application intended solely for appropriately qualified healthcare professionals.
            </p>
            <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 text-xs text-amber-200 space-y-2">
              <p>
                • It does NOT provide a final diagnosis, final treatment decisions, prescriptions, or definitive specialist opinions.
              </p>
              <p>
                • Final decisions regarding diagnosis, treatment, medication selection, dosage, referral, and emergency management remain the responsibility of the qualified healthcare professional.
              </p>
              <p>
                • OPD Assistant AI must not be used to delay or replace urgent medical assessment or emergency care.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-white">3. Professional Discretion & Verification</h2>
            <p>
              All clinical reference data, differential suggestions, and calculations must be independently reviewed and verified by a licensed clinician before taking any patient care action.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-white">4. Intellectual Property</h2>
            <p>
              All branding, trade names, codebases, and interface assets associated with Abhiraj Digital Innovation and OPD Assistant AI are the property of Abhiraj Digital Innovation.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-white">5. Contact</h2>
            <p>
              For legal inquiries regarding these terms, contact:
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-blue-400">
              <Mail className="w-4 h-4" />
              <span>abhirajdigitalinnovationhead@gmail.com</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
