import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Home, Mail, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "GharMitra — Complete Home Solution",
  description: "GharMitra — Complete Home Solution, a product of Abhiraj Digital Innovation.",
};

export default function GharMitraPage() {
  return (
    <div className="relative py-10 lg:py-16 bg-grid-pattern">
      <div className="ambient-hero-glow" aria-hidden="true" />
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-mono bg-blue-950/80 border border-blue-800/60 text-blue-300">
          <span className="w-2 h-2 rounded-full bg-blue-400"></span>
          <span>A PRODUCT OF ABHIRAJ DIGITAL INNOVATION</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Home className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-heading">GharMitra</h1>
            <p className="text-lg sm:text-xl font-bold text-blue-400">Complete Home Solution</p>
          </div>
        </div>
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
          <p className="text-slate-300 leading-relaxed">
            GharMitra is a home-solution product from Abhiraj Digital Innovation. Detailed features, availability and
            download information will be published on this page.
          </p>
          <p className="text-slate-400 text-sm">For early access or more information, contact us.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={`mailto:${siteConfig.contact.email}?subject=${encodeURIComponent("GharMitra")}`}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/25 transition-all"
          >
            <Mail className="w-4 h-4" />
            <span>{siteConfig.contact.email}</span>
          </a>
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 transition-all"
          >
            <span>See all products & work</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
