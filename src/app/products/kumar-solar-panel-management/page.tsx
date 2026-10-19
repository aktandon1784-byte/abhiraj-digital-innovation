import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Sun,
  Zap,
  ShieldCheck,
  FileText,
  Boxes,
  BookOpen,
  ArrowRight,
  Sparkles,
  Smartphone,
  Calculator,
  Download,
  CheckCircle2,
  PhoneCall,
  Mail,
  Building2,
  Users,
  Compass,
  FileSpreadsheet,
  Layers,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { KumarSolarInquiryForm } from "@/components/kumar-solar/KumarSolarInquiryForm";

export const metadata: Metadata = {
  title: "Kumar Solar Panel Management PWA — Complete Solar Business Software | Abhiraj Digital Innovation",
  description:
    "End-to-end solar enterprise management Progressive Web App (PWA). Includes interactive product catalogues, live quotation builder, vector PDF exports, real-time stock register, double-entry accounting ledgers, cash & bank books, and CA financial statements.",
  openGraph: {
    title: "Kumar Solar Panel Management PWA — Complete Solar Business Software",
    description:
      "A complete ERP & PWA solution built for solar EPC contractors, dealers, and installers. Explore live interactive demo.",
    url: "https://abhirajdigitalinnovation.com/products/kumar-solar-panel-management",
    siteName: "Abhiraj Digital Innovation",
    type: "website",
  },
};

export default function KumarSolarProductPage() {
  const verifiedModules = [
    {
      title: "Product Catalogue & Brand Directory",
      desc: "Structured catalogue for Mono PERC & TOPCon bifacial panels (540W–580W), on-grid & hybrid inverters, LiFePO4 battery storage, HDG mounting structures, and solar pumps.",
      icon: Sun,
      color: "from-amber-500/20 to-orange-500/20",
      accent: "text-amber-400",
    },
    {
      title: "Interactive Quotations & Vector PDF",
      desc: "Live Quotation Builder with itemized pricing, real-time GST (5%, 12%, 18%), client discounts, installation & transport charges, and instantaneous vector PDF generation.",
      icon: FileText,
      color: "from-blue-500/20 to-cyan-500/20",
      accent: "text-blue-400",
    },
    {
      title: "Stock Register & Warehouse Audit",
      desc: "Real-time stock tracking with Goods Receipt Notes (GRN), delivery issues, minimum threshold alerts, and automated stock valuation reports exportable to PDF.",
      icon: Boxes,
      color: "from-emerald-500/20 to-teal-500/20",
      accent: "text-emerald-400",
    },
    {
      title: "Double-Entry Accounting & Khata Bahi",
      desc: "Complete financial engine featuring Cash Book (रोकड़ बही), Bank/UPI Book, Customer & Supplier Ledgers (खाता बही), Day Book, and journal vouchers.",
      icon: BookOpen,
      color: "from-purple-500/20 to-indigo-500/20",
      accent: "text-purple-400",
    },
    {
      title: "Daily, Monthly & Yearly CA Statements",
      desc: "Official financial statements including Trial Balance (तलपट), Profit & Loss, Balance Sheet, and Chartered Accountant financial export reports.",
      icon: FileSpreadsheet,
      color: "from-pink-500/20 to-rose-500/20",
      accent: "text-pink-400",
    },
    {
      title: "Solar Calculator & PM Surya Ghar Subsidy",
      desc: "Integrated rooftop solar capacity estimator calculating unit generation, monthly bill savings, CO₂ offset, and Central Government subsidy eligibility.",
      icon: Calculator,
      color: "from-yellow-500/20 to-amber-500/20",
      accent: "text-yellow-400",
    },
  ];

  const deploymentTiers = [
    {
      name: "Dedicated Cloud Setup",
      subtitle: "For Growing Solar EPCs & Installers",
      price: "₹34,999",
      billing: "One-time setup + Cloud Hosting",
      features: [
        "Complete Kumar Solar Panel Management PWA",
        "Branded with your company name, GSTIN & logo",
        "Quotation builder with official vector PDF export",
        "Full Stock Register with auto-movement logging",
        "Customer & Supplier Khata Bahi ledgers",
        "Cash book, bank & UPI book with double-entry",
        "PWA installable on mobile & desktop",
        "6 months priority engineering support",
      ],
      ctaText: "Inquire for Cloud Setup",
      popular: true,
    },
    {
      name: "Custom Enterprise Deployment",
      subtitle: "For Multi-Branch Solar Distributors",
      price: "Contact Sales",
      billing: "Tailored to operation scale",
      features: [
        "Everything in Dedicated Cloud Setup",
        "Multi-warehouse & branch inventory tracking",
        "Custom ERP integration & automated backups",
        "Multi-user roles (Admin, Sales, Store, Accounts)",
        "Advanced CA Statement customization",
        "On-premise / private cloud hosting option",
        "Dedicated account manager & SLA support",
      ],
      ctaText: "Contact Sales Team",
      popular: false,
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#060B18] text-slate-100 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-blue-600/10 via-amber-500/5 to-transparent blur-3xl pointer-events-none" />

      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/" className="hover:text-blue-400 transition-colors">
            HOME
          </Link>
          <span>/</span>
          <Link href="/services#software" className="hover:text-blue-400 transition-colors">
            PRODUCTS
          </Link>
          <span>/</span>
          <span className="text-amber-400 font-semibold uppercase">KUMAR SOLAR PANEL PWA</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Action Buttons */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono bg-amber-500/10 border border-amber-500/30 text-amber-300">
              <Sun className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
              <span>ENTERPRISE SOLAR SOFTWARE SUITE &amp; PWA</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-heading">
                Kumar Solar Panel <br />
                <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 bg-clip-text text-transparent">
                  Management PWA
                </span>
              </h1>
              <p className="text-lg sm:text-xl font-medium text-slate-300">
                Complete Solar Business Management Software — from customer requirement to vector PDF quotation, inventory movements, and double-entry accounting.
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl">
              Engineered specifically for solar energy contractors, EPC providers, and equipment dealers. Manage product catalogues, customer inquiries, quotes with auto-GST calculations, real-time stock registers, customer &amp; supplier ledgers (खाता बही), and CA-ready financial statements.
            </p>

            {/* Core Badges */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-slate-800/80 border border-slate-700 text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Live Interactive Demo
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-slate-800/80 border border-slate-700 text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Official Vector PDF Generation
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-slate-800/80 border border-slate-700 text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Complete Khata Bahi &amp; Cash Book
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-slate-800/80 border border-slate-700 text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Mobile &amp; Desktop PWA
              </span>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Link
                href="/demo/kumar-solar-panel"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-sm sm:text-base shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Sparkles className="w-5 h-5 text-slate-950" />
                <span>Launch Working Demo</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#inquire-form"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600/80 text-white font-semibold text-sm sm:text-base transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-blue-400" />
                <span>Request a Demo / Buy</span>
              </a>

              <a
                href="mailto:abhirajdigitalinnovation@gmail.com?subject=Kumar%20Solar%20Panel%20Management%20PWA%20Inquiry"
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-slate-300 text-sm font-medium transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Email Us</span>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Mockup */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl p-1 bg-gradient-to-b from-amber-500/30 via-blue-500/20 to-transparent shadow-2xl">
              <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shadow-inner">
                {/* Visual Header Mockup */}
                <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-sm">
                      <Sun className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Kumar Solar Panel</div>
                      <div className="text-[10px] text-amber-400 font-mono">PWA Enterprise Workspace</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    Live Demo Ready
                  </span>
                </div>

                {/* Screenshot Display */}
                <div className="relative aspect-[4/3] bg-slate-950 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/images/kumar-solar/user-screenshot.png"
                    alt="Kumar Solar Panel Management PWA Interface"
                    width={640}
                    height={480}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                    priority
                  />
                  {/* Overlay Action */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent flex items-end p-4">
                    <Link
                      href="/demo/kumar-solar-panel"
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-lg transition-colors"
                    >
                      <span>Explore Demo Environment</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Key Metrics Strip */}
                <div className="grid grid-cols-3 divide-x divide-slate-800 bg-slate-900/90 text-center py-3">
                  <div>
                    <div className="text-xs font-bold text-white">100%</div>
                    <div className="text-[10px] text-slate-400">Isolated Demo</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-amber-400">Instant</div>
                    <div className="text-[10px] text-slate-400">PDF Generator</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-emerald-400">Double-Entry</div>
                    <div className="text-[10px] text-slate-400">Khata Bahi</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DEMO BANNER CALLOUT */}
      <section className="border-y border-slate-800 bg-slate-900/60 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">
                Inspect Before You Purchase — Fully Interactive Sandbox
              </div>
              <div className="text-xs text-slate-400">
                Create real quotations, test PDF generation, modify stock movements, and record ledger transactions.
              </div>
            </div>
          </div>

          <Link
            href="/demo/kumar-solar-panel"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
          >
            <span>Open Demo Sandbox</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 3. VERIFIED CORE MODULES & WORKFLOWS */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-blue-500/10 text-blue-300 border border-blue-500/20">
            <span>FULL OPERATIONAL WORKFLOWS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
            Built for Real Solar Business Operations
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Every module addresses daily challenges faced by solar EPC contractors: quoting accurately, tracking equipment serials, managing warehouse inventory, and maintaining clean financial records.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {verifiedModules.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="relative group rounded-2xl p-6 bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all hover:bg-slate-900/80"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${m.color} border border-slate-700/60 flex items-center justify-center mb-5`}>
                  <Icon className={`w-6 h-6 ${m.accent}`} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                  {m.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {m.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. APPLICATION SCREENSHOT SHOWCASE */}
      <section className="py-16 bg-slate-950/80 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-1">
                Visual Inspection
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                Explore the Software Interface
              </h2>
            </div>
            <Link
              href="/demo/kumar-solar-panel"
              className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
            >
              <span>Test live in the demo workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl overflow-hidden bg-slate-900 border border-slate-800 space-y-3 p-4">
              <div className="aspect-video relative rounded-lg overflow-hidden bg-slate-950 border border-slate-800/80">
                <Image
                  src="/images/kumar-solar/hero-banner.png"
                  alt="Customer Portal & Solar Calculator"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Customer Portal &amp; Calculator</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Public solar savings estimator with PM Surya Ghar Muft Bijli Yojana calculation.
                </p>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden bg-slate-900 border border-slate-800 space-y-3 p-4">
              <div className="aspect-video relative rounded-lg overflow-hidden bg-slate-950 border border-slate-800/80">
                <Image
                  src="/images/kumar-solar/reference-mockup.png"
                  alt="Multi-device PWA interface"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Progressive Web App (PWA)</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Works seamlessly on smartphones, tablets, laptops, and workstation screens.
                </p>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden bg-slate-900 border border-slate-800 space-y-3 p-4">
              <div className="aspect-video relative rounded-lg overflow-hidden bg-slate-950 border border-slate-800/80">
                <Image
                  src="/images/kumar-solar/user-screenshot.png"
                  alt="Enterprise Admin & Quotations"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Quotation Builder &amp; PDF</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Customizable item lines, auto-tax splitting, discounts, and vector PDF exports.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PRICING & DEPLOYMENT TIERS */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
            <span>TRANSPARENT LICENSING &amp; DEPLOYMENT</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
            Choose Your Deployment Model
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Deployed on your private infrastructure or fully hosted and maintained by Abhiraj Digital Innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {deploymentTiers.map((tier, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-8 bg-slate-900/60 border ${
                tier.popular ? "border-amber-500/60 shadow-xl shadow-amber-500/10" : "border-slate-800"
              } flex flex-col justify-between relative`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-500 text-slate-950 uppercase tracking-wide">
                  Most Popular
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">{tier.subtitle}</p>
                </div>

                <div className="pt-2 pb-4 border-y border-slate-800">
                  <div className="text-3xl font-extrabold text-white font-heading">{tier.price}</div>
                  <div className="text-xs text-slate-400 font-mono mt-1">{tier.billing}</div>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                  {tier.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <a
                  href="#inquire-form"
                  className={`w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors ${
                    tier.popular
                      ? "bg-amber-500 hover:bg-amber-400 text-slate-950"
                      : "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
                  }`}
                >
                  <span>{tier.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. LEAD & INQUIRY WORKFLOW (Phase 6 Integration) */}
      <section id="inquire-form" className="py-16 bg-slate-950 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <KumarSolarInquiryForm />
        </div>
      </section>

      {/* 7. CONTACT & SUPPORT FOOTNOTE */}
      <section className="py-12 border-t border-slate-900 bg-[#060B18] text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p>
            Kumar Solar Panel Management PWA is developed and maintained by{" "}
            <span className="text-slate-300 font-semibold">Abhiraj Digital Innovation</span>.
          </p>
          <p>
            Official Enterprise Email:{" "}
            <a href="mailto:abhirajdigitalinnovation@gmail.com" className="text-blue-400 hover:underline">
              abhirajdigitalinnovation@gmail.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
