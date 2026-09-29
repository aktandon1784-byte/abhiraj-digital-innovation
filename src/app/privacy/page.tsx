import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Abhiraj Digital Innovation",
  description: "Privacy Policy and patient confidentiality guidelines for Abhiraj Digital Innovation and OPD Assistant AI.",
};

export default function PrivacyPage() {
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
          <span className="text-blue-400 font-semibold">PRIVACY POLICY</span>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading">
            Privacy Policy
          </h1>
          <p className="text-xs font-mono text-slate-400">
            Last Updated: 2026 • Abhiraj Digital Innovation
          </p>
        </div>

        <div className="mt-8 space-y-6 text-sm text-slate-300 leading-relaxed p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-white">1. Scope of Policy</h2>
            <p>
              This Privacy Policy applies to the digital services, websites, and applications operated by <strong>Abhiraj Digital Innovation</strong>, including our Android application <strong>OPD Assistant AI</strong>.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-white">2. Patient Data & Clinical Confidentiality</h2>
            <p>
              Healthcare professionals should avoid entering directly identifying patient information (such as full legal names, government identity numbers, or residential addresses) into the application unless necessary, authorized, and handled in accordance with applicable confidentiality and medical privacy standards.
            </p>
            <p>
              OPD Assistant AI is engineered as an assistance and clinical reference tool, not as a permanent electronic health record (EHR) repository.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-white">3. Information Collected</h2>
            <p>
              When communicating with us via our contact form or official email, we collect the contact details you provide (such as your name, email address, and inquiry details) strictly for the purpose of responding to your request.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-white">4. No Unauthorized Third-Party Data Sharing</h2>
            <p>
              We do not sell, rent, or trade personal contact information to third-party advertisers or external data brokers.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-white">5. Contact Information</h2>
            <p>
              For privacy-related questions or inquiries regarding our policies, please contact:
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-blue-400">
              <Mail className="w-4 h-4" />
              <span>abhirajdigitalinnovation@gmail.com</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
