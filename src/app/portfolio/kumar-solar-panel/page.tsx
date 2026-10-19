import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Sun,
  Globe,
  ExternalLink,
  CheckCircle2,
  Monitor,
  Smartphone,
  ShieldCheck,
  Zap,
  ArrowRight,
  Sparkles,
  Layers,
  ChevronRight,
  Mail,
  Building2,
  Users,
} from "lucide-react";
import { KumarSolarCardVisual } from "@/components/home/KumarSolarCardVisual";

export const metadata: Metadata = {
  title: "Kumar Solar Panel Website Case Study | Portfolio | Abhiraj Digital Innovation",
  description:
    "Client project case study of the Kumar Solar Panel Website designed and developed by Abhiraj Digital Innovation, featuring modern responsive design and clean energy showcase.",
};

export default function KumarSolarPanelCaseStudyPage() {
  const verifiedSections = [
    {
      title: "Hero & Clean Energy Proposition",
      desc: "High-impact introduction highlighting rooftop solar solutions, environmental benefits, and power cost savings.",
      icon: Sun,
    },
    {
      title: "Solar Solutions & Packages",
      desc: "Structured presentation of residential rooftop setups, commercial installations, and on-grid / off-grid options.",
      icon: Zap,
    },
    {
      title: "Technology & Quality Assurance",
      desc: "Clear specifications covering Tier-1 solar photovoltaic panels, smart inverters, and long-term durability warranties.",
      icon: ShieldCheck,
    },
    {
      title: "Customer Inquiries & Consultation",
      desc: "Frictionless contact pathways enabling homeowners and businesses to request feasibility assessments and quotes.",
      icon: Users,
    },
  ];

  const designPillars = [
    {
      title: "Responsive Multi-Device Layout",
      desc: "Engineered from mobile screens to 4K displays with fluid typography, responsive grid structures, and touch-optimized interactions.",
      icon: Monitor,
    },
    {
      title: "Clean Solar Brand Palette",
      desc: "Curated harmonious color aesthetics combining deep oceanic navy tones with radiant solar amber accents to communicate trust and vitality.",
      icon: Sparkles,
    },
    {
      title: "Fast Lightweight Performance",
      desc: "Built with modern front-end technologies and static asset optimization for instantaneous page loads and low bandwidth usage.",
      icon: Layers,
    },
    {
      title: "Purpose-Driven Navigation",
      desc: "Straightforward hierarchical structure guiding prospective solar clients from awareness directly to quote inquiry.",
      icon: ArrowRight,
    },
  ];

  return (
    <div className="relative space-y-16 sm:space-y-24 py-10 lg:py-16 bg-grid-pattern">
      {/* Ambient Lighting Glow */}
      <div className="ambient-hero-glow" aria-hidden="true" />

      {/* 1. HERO SECTION */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {/* Breadcrumbs */}
        <div className="mb-6 flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/" className="hover:text-blue-400 transition-colors">
            ABHIRAJ DIGITAL INNOVATION
          </Link>
          <span>/</span>
          <Link href="/portfolio" className="hover:text-blue-400 transition-colors">
            PORTFOLIO
          </Link>
          <span>/</span>
          <span className="text-amber-400 font-semibold">KUMAR SOLAR PANEL</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            {/* Identity Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-mono bg-blue-950/80 border border-blue-800/60 text-blue-300">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              <span>CLIENT WEBSITE PROJECT • DELIVERED &amp; LIVE</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-heading">
                Kumar Solar Panel Website
              </h1>
              <div className="text-xl sm:text-2xl font-bold text-amber-400">
                Modern Responsive Clean Energy Showcase
              </div>
              <p className="text-sm sm:text-base font-medium text-slate-300">
                Client: Kumar Solar Panel Services • Developed by Abhiraj Digital Innovation
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              A comprehensive client website designed and built for <strong className="text-white">Kumar Solar Panel Services</strong> to present rooftop solar installations, commercial renewable systems, and clean energy solutions to prospective residential and business clients.
            </p>

            {/* Project Meta Chips */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                <span>Web Application &amp; Showcase</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <Monitor className="w-3.5 h-3.5 text-amber-400" />
                <span>Fully Responsive Design</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Production Vercel Deployment</span>
              </div>
            </div>

            {/* Dual CTAs: Prominent Live Demo Link */}
            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="https://kumar-solar-panel-website.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-[#1865F2] hover:bg-blue-600 shadow-xl shadow-blue-600/30 transition-all active:scale-95 group"
              >
                <span>View Live Website (Demo)</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 transition-all"
              >
                <span>Request a Website Like This</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Visual Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-[#FFFDEB] rounded-3xl border-2 border-[#FDE68A] p-6 shadow-2xl relative overflow-hidden">
              <div className="mb-3 flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1865F2] text-white text-[10px] font-bold tracking-wide uppercase">
                  <span>LIVE DEMO AVAILABLE</span>
                </div>
                <a
                  href="https://kumar-solar-panel-website.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-mono font-bold text-blue-700 hover:underline inline-flex items-center gap-1"
                >
                  <span>Open URL</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <KumarSolarCardVisual />
              <div className="mt-4 pt-3 border-t border-amber-200/80 text-center">
                <p className="text-xs text-amber-950 font-semibold">
                  Kumar Solar Panel Services — Clean Energy Web Experience
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROJECT OVERVIEW & SCOPE */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
          <div className="space-y-1">
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-400">
              Project Brief
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Project Background &amp; Objectives
            </h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
            <p>
              The objective of the <strong className="text-white">Kumar Solar Panel Website</strong> project was to design and deploy a modern, visually striking digital presence for Kumar Solar Panel Services. The business required a professional platform to showcase rooftop solar installations, commercial clean energy capabilities, and customer consultation pathways.
            </p>
            <p>
              Abhiraj Digital Innovation created a responsive web experience combining clear technical information, structured solution packages, transparent customer consultation forms, and solar industry aesthetic cues.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[11px] font-mono text-slate-400 uppercase">Client</span>
              <div className="text-sm font-bold text-white">Kumar Solar Panel Services</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[11px] font-mono text-slate-400 uppercase">Category</span>
              <div className="text-sm font-bold text-white">Website &amp; Digital Showcase</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[11px] font-mono text-slate-400 uppercase">Delivery</span>
              <div className="text-sm font-bold text-emerald-400">Deployed &amp; Live on Vercel</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VERIFIED SECTIONS ON THE WEBSITE */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <div className="text-xs font-mono uppercase tracking-wider text-blue-400 font-semibold">
            Information Architecture
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
            Key Verified Website Sections
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Every section of the website was crafted to establish authority and drive client inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {verifiedSections.map((sec, i) => {
            const Icon = sec.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white font-heading">
                    {sec.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {sec.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. DESIGN & ENGINEERING APPROACH */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <div className="text-xs font-mono uppercase tracking-wider text-blue-400 font-semibold">
            Engineering Highlights
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
            Design &amp; Technical Approach
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Adhering to our core commitment to practical utility, clean code, and responsive aesthetics.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {designPillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3 hover:border-blue-500/30 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-800/60 flex items-center justify-center text-blue-400">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white font-heading">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. CALL TO ACTION / VISIT LIVE DEMO */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl p-8 sm:p-12 bg-gradient-to-r from-blue-950/70 via-slate-900 to-slate-900 border border-blue-800/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-blue-900/50 text-blue-300">
              <Globe className="w-3.5 h-3.5" />
              <span>Live Demonstration Link</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Experience the Live Project
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Explore the live website demo deployed at <code>kumar-solar-panel-website.vercel.app</code> or talk to us about building a tailored digital presence for your organization.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-blue-400 justify-center md:justify-start">
              <Mail className="w-4 h-4" />
              <span>abhirajdigitalinnovation@gmail.com</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
            <Link
              href="/products/kumar-solar-panel-management"
              className="px-6 py-3.5 rounded-xl text-sm font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 shadow-lg shadow-amber-500/20 transition-all active:scale-95 inline-flex items-center gap-2"
            >
              <span>Explore Software Product</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/demo/kumar-solar-panel"
              className="px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors inline-flex items-center gap-2"
            >
              <span>Launch Interactive Demo</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </Link>
            <a
              href="https://kumar-solar-panel-website.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors inline-flex items-center gap-1.5"
            >
              <span>Original Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
