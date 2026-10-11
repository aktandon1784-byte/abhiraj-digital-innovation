import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { portfolio } from "@/lib/products";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return portfolio.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const w = portfolio.find((x) => x.slug === slug);
  return w ? { title: `${w.name} · Portfolio`, description: w.summary } : {};
}

export default async function PortfolioItemPage({ params }: Props) {
  const { slug } = await params;
  const w = portfolio.find((x) => x.slug === slug);
  if (!w) notFound();

  return (
    <div className="relative py-10 lg:py-16 bg-grid-pattern">
      <div className="ambient-hero-glow" aria-hidden="true" />
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link href="/portfolio" className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300">
          <ArrowLeft className="w-4 h-4" /> Portfolio
        </Link>
        <div className="space-y-2">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400">{w.kind}</div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-heading">{w.name}</h1>
        </div>
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <p className="text-slate-300 leading-relaxed">{w.summary}</p>
          <a
            href={w.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/25"
          >
            View live website <ExternalLink className="w-4 h-4" />
          </a>
          <p className="text-xs text-slate-500 break-all">{w.liveUrl}</p>
        </div>
        <Link href="/contact" className="inline-block text-sm font-semibold text-slate-300 hover:text-white">
          Want a website like this? Contact us →
        </Link>
      </section>
    </div>
  );
}
