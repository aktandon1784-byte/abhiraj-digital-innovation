import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { products, portfolio } from "@/lib/products";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Products and client work by Abhiraj Digital Innovation.",
};

export default function PortfolioPage() {
  return (
    <div className="relative py-10 lg:py-16 bg-grid-pattern">
      <div className="ambient-hero-glow" aria-hidden="true" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <header className="space-y-3">
          <span className="block text-xs font-mono uppercase tracking-[0.2em] text-blue-400 font-semibold">Portfolio</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-heading">Our Products & Work</h1>
          <p className="text-slate-300 max-w-2xl">Applications we build and websites we have delivered.</p>
        </header>

        <section className="space-y-5">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="group p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-blue-700/60 transition-colors space-y-2"
              >
                <div className="text-lg font-bold text-white group-hover:text-blue-300">{p.name}</div>
                <p className="text-sm text-slate-400">{p.tagline}</p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-400">
                  View <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="space-y-5">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Client Websites</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {portfolio.map((w) => (
              <div key={w.slug} className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400">{w.kind}</div>
                <div className="text-xl font-bold text-white">{w.name}</div>
                <p className="text-sm text-slate-400">{w.summary}</p>
                <div className="flex flex-wrap gap-3 pt-1">
                  <Link
                    href={`/portfolio/${w.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500"
                  >
                    Project details <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href={w.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-slate-200 bg-slate-900 border border-slate-700 hover:bg-slate-800"
                  >
                    Live demo <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
