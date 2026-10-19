import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Sun,
  Zap,
  ShieldCheck,
  BatteryCharging,
  Cpu,
  Layers,
  Wrench,
  Droplets,
  Fence,
  FileText,
  Calculator,
  BookOpen,
  Receipt,
  Building2,
  TrendingUp,
  Download,
  Smartphone,
  Monitor,
  ExternalLink,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Info,
  Calendar,
  CreditCard,
  BarChart3,
  Box,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Kumar Solar Panel — Complete Solar Panel Solution | Products | Abhiraj Digital Innovation",
  description:
    "Kumar Solar Panel is a comprehensive, production-deployed Solar Management Progressive Web Application (PWA) featuring residential & commercial rooftop solar catalogues, quotation generation, inventory control, and multi-ledger accounting.",
  openGraph: {
    title: "Kumar Solar Panel — Complete Solar Panel Solution",
    description:
      "Explore the live Kumar Solar Panel PWA: full product catalogue, instant solar quotations, inventory stock management, and complete day book & customer ledgers.",
    url: "https://abhiraj-digital-innovation.vercel.app/products/kumar-solar-panel",
    siteName: "Abhiraj Digital Innovation",
    type: "website",
  },
};

export default function KumarSolarPanelProductPage() {
  const livePwaUrl = "https://kumar-solar-panel.vercel.app";
  const liveProductsUrl = "https://kumar-solar-panel.vercel.app/products";
  const liveQuoteUrl = "https://kumar-solar-panel.vercel.app/quote";
  const verifiedPhone = "+91 98765 43210";
  const verifiedEmail = "kumar.solar@gmail.com";
  const verifiedWhatsApp =
    "https://wa.me/919876543210?text=%E0%A4%A8%E0%A4%AE%E0%A4%B8%E0%A5%8D%E0%A4%A4%E0%A5%87%20%E0%A4%95%E0%A5%81%E0%A4%AE%E0%A4%BE%E0%A4%B0%20%E0%A4%B8%E0%A5%8B%E0%A4%B2%E0%A4%B0%20%E0%A4%AA%E0%A5%88%E0%A4%A8%E0%A4%B2%2C%20%E0%A4%AE%E0%A5%81%E0%A4%9D%E0%A5%87%20%E0%A4%B8%E0%A5%8B%E0%A4%B2%E0%A4%B0%20%E0%A4%B8%E0%A4%BF%E0%A4%B8%E0%A5%8D%E0%A4%9F%E0%A4%AE%20%E0%A4%95%E0%A5%80%20%E0%A4%9C%E0%A4%BE%E0%A4%A8%E0%A4%95%E0%A4%BE%E0%A4%B0%E0%A5%80%20%E0%A4%94%E0%A4%B0%20%E0%A4%95%E0%A5%8B%E0%A4%9F%E0%A5%87%E0%A4%B6%E0%A4%A8%20%E0%A4%9A%E0%A4%BE%E0%A4%B9%E0%A4%BF%E0%A4%8F%E0%A5%A4";

  // Product categories as present in the live PWA application
  const catalogueCategories = [
    {
      title: "Solar Panels",
      hindi: "सोलर पैनल",
      specs: "Mono PERC, TOPCon & Bifacial (330W – 550W+)",
      desc: "High-efficiency Tier-1 photovoltaic modules designed for maximum sunlight conversion even in diffuse lighting conditions. BIS and ALMM certified.",
      icon: Sun,
      color: "text-amber-400 bg-amber-950/40 border-amber-800/40",
      accent: "from-amber-500/20 to-orange-500/10",
      badge: "ALMM & BIS Approved",
    },
    {
      title: "Solar Inverters",
      hindi: "सोलर इन्वर्टर",
      specs: "On-Grid, Hybrid & Micro Inverters",
      desc: "Intelligent power electronics with real-time MPPT tracking, grid synchronization, dual input strings, and high conversion efficiency (up to 98.6%).",
      icon: Cpu,
      color: "text-blue-400 bg-blue-950/40 border-blue-800/40",
      accent: "from-blue-500/20 to-cyan-500/10",
      badge: "Pure Sine Wave",
    },
    {
      title: "Solar Batteries",
      hindi: "सोलर बैटरी",
      specs: "Lithium LiFePO4 & Solar Tubular (C10)",
      desc: "Deep-cycle energy storage solutions delivering high discharge tolerance, long cycle longevity (up to 4000+ cycles), and dependable backup power.",
      icon: BatteryCharging,
      color: "text-emerald-400 bg-emerald-950/40 border-emerald-800/40",
      accent: "from-emerald-500/20 to-teal-500/10",
      badge: "High Energy Density",
    },
    {
      title: "Mounting Structures",
      hindi: "माउंटिंग स्ट्रक्चर",
      specs: "Hot-Dip Galvanized & Pre-Galvanized GI",
      desc: "Wind-resistant, anti-corrosive rooftop and elevated mounting frames engineered for concrete slabs, tin-shed clamp systems, and ground installations.",
      icon: Layers,
      color: "text-amber-300 bg-amber-950/30 border-amber-700/40",
      accent: "from-amber-600/20 to-yellow-500/10",
      badge: "Rust-Resistant GI",
    },
    {
      title: "Electrical Accessories & BoS",
      hindi: "वायरिंग व सुरक्षा उपकरण",
      specs: "DCDB / ACDB, DC Cables, MC4 & Earthing",
      desc: "Complete Balance of System (BoS) including SPD surge protectors, miniature circuit breakers, UV-resistant dual-insulated DC copper wire, and chemical earthing.",
      icon: Wrench,
      color: "text-purple-400 bg-purple-950/40 border-purple-800/40",
      accent: "from-purple-500/20 to-indigo-500/10",
      badge: "IS Certified BoS",
    },
    {
      title: "Solar Water Pumps",
      hindi: "सोलर वाटर पंप",
      specs: "AC / DC Submersible & Surface Pumps",
      desc: "Agricultural solar pumping solutions for tubewells, open wells, and micro-irrigation under agricultural subsidy frameworks.",
      icon: Droplets,
      color: "text-cyan-400 bg-cyan-950/40 border-cyan-800/40",
      accent: "from-cyan-500/20 to-sky-500/10",
      badge: "Agricultural Subsidy",
    },
    {
      title: "Solar Fencing & Perimeter Gates",
      hindi: "सुरक्षा बाड़ व गेट",
      specs: "Solar Energizers & Perimeter Shock Systems",
      desc: "Effective farm, orchard, and boundary protection utilizing pulsed solar energizers that deter wildlife and trespassers safely.",
      icon: Fence,
      color: "text-rose-400 bg-rose-950/40 border-rose-800/40",
      accent: "from-rose-500/20 to-pink-500/10",
      badge: "Farm Security",
    },
  ];

  // Business and Financial Management capabilities in the application
  const managementFeatures = [
    {
      title: "Inventory & Stock Control",
      desc: "Track stock quantities for panels, inverters, batteries, and hardware components with inward receipts, supplier logs, and balance alerts.",
      icon: Box,
    },
    {
      title: "Customer Enquiries & Quotations",
      desc: "Capture customer requirements, generate customized solar quotations with PM Surya Ghar subsidy calculations, and manage conversion pipelines.",
      icon: FileText,
    },
    {
      title: "Cash Book & Daily Day Book",
      desc: "Record every daily cash receipt and expenditure. Keep clear chronological day-book entries for site visits, hardware purchases, and collections.",
      icon: BookOpen,
    },
    {
      title: "Bank Book Management",
      desc: "Reconcile banking transactions, digital UPI collections, NEFT/RTGS payments, and cheques directly against customer project accounts.",
      icon: CreditCard,
    },
    {
      title: "Customer Ledger & Receivables",
      desc: "Maintain detailed account statements per client, record milestone installations, track partial payments, and issue itemized transaction receipts.",
      icon: Receipt,
    },
    {
      title: "Daily, Monthly & Yearly Reports",
      desc: "Generate structured business intelligence overviews: daily activity logs, monthly turnover, and annual accounting statements for tax audits.",
      icon: BarChart3,
    },
  ];

  return (
    <div className="relative space-y-16 sm:space-y-24 py-10 lg:py-16 bg-[#060B18]">
      {/* Ambient Radial Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[550px] pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle 450px at 50% 120px, rgba(245, 158, 11, 0.12), rgba(37, 99, 235, 0.08), transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* ========================================================= */}
      {/* 1. HERO SECTION                                           */}
      {/* ========================================================= */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {/* Breadcrumb Bar */}
        <div className="mb-6 flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/" className="hover:text-blue-400 transition-colors">
            ABHIRAJ DIGITAL INNOVATION
          </Link>
          <span>/</span>
          <span className="text-slate-500">PRODUCTS</span>
          <span>/</span>
          <span className="text-amber-400 font-semibold">KUMAR SOLAR PANEL</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Hero Narrative */}
          <div className="lg:col-span-7 space-y-5">
            {/* Live PWA Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-mono bg-amber-950/70 border border-amber-600/40 text-amber-300">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span>LIVE PWA • DEPLOYED &amp; OPERATIONAL</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-heading">
                Kumar Solar Panel
              </h1>
              <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-300 bg-clip-text text-transparent">
                Complete Solar Panel Solution | संपूर्ण सोलर समाधान
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-400">
                Baloda Bazar - Bhatapara, Chhattisgarh • Verified Production Deployment
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              An all-in-one Progressive Web Application (PWA) designed and deployed for solar businesses and their clients. Combines customer-facing rooftop solar packages, capacity calculators, and quotation tools with a comprehensive enterprise back-office suite including inventory stock control, cash book, bank book, day book, and customer ledger accounting.
            </p>

            {/* Feature Highlights Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                Rooftop Solar Solutions
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                <Calculator className="w-3.5 h-3.5 text-blue-400" />
                Solar Quote &amp; Calculator
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                <Receipt className="w-3.5 h-3.5 text-emerald-400" />
                Multi-Ledger Accounting
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                <Smartphone className="w-3.5 h-3.5 text-purple-400" />
                Installable PWA
              </span>
            </div>

            {/* Core Action CTAs: Live Demo + Catalogue + Quote */}
            <div className="pt-3 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5">
              {/* Primary: View Live Demo */}
              <a
                href={livePwaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-xl shadow-amber-500/20 transition-all active:scale-95 group"
                id="cta-view-live-demo"
              >
                <Sun className="w-4 h-4 text-slate-950" />
                <span>View Live Demo</span>
                <ExternalLink className="w-4 h-4 text-slate-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              {/* Secondary: Explore Product Catalogue */}
              <a
                href={liveProductsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 transition-all group"
                id="cta-explore-catalogue"
              >
                <Box className="w-4 h-4 text-amber-400" />
                <span>Explore Product Catalogue</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* Tertiary: Get a Solar Quote */}
              <a
                href={liveQuoteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/20 transition-all group"
                id="cta-get-solar-quote"
              >
                <FileText className="w-4 h-4 text-white" />
                <span>Get a Solar Quote</span>
                <ExternalLink className="w-3.5 h-3.5 text-blue-200 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Hero Visual Card: Interactive Preview Container */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-amber-500/30 p-6 shadow-2xl backdrop-blur-xl space-y-5">
              {/* Top Banner Ribbon */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                    <Sun className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white tracking-wide">
                      KUMAR SOLAR PANEL
                    </div>
                    <div className="text-[10px] font-mono text-amber-400">
                      PWA APPLICATION SUITE
                    </div>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
                  ONLINE v2.4
                </span>
              </div>

              {/* Mini Interactive App Preview Highlights */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-950/80 text-blue-400 flex items-center justify-center">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Rooftop Solar EPC</div>
                      <div className="text-[11px] text-slate-400">PM Surya Ghar Subsidy Ready</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-semibold text-emerald-400">Up to 78,000 Subsidy</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-950/80 text-amber-400 flex items-center justify-center">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Day Book &amp; Cash Book</div>
                      <div className="text-[11px] text-slate-400">Daily reconciliation &amp; logging</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-semibold text-amber-400">Automated Ledger</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-950/80 text-purple-400 flex items-center justify-center">
                      <Box className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Inventory Stock Control</div>
                      <div className="text-[11px] text-slate-400">Panels, Inverters, Structures</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-semibold text-purple-400">Real-time SKU</span>
                </div>
              </div>

              {/* Direct Live App Launch Banner */}
              <div className="pt-2">
                <a
                  href={livePwaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-blue-950/80 to-slate-900 border border-blue-700/50 hover:border-blue-500 transition-all text-xs font-medium text-slate-200 group"
                >
                  <span className="flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-blue-400" />
                    <span>kumar-solar-panel.vercel.app</span>
                  </span>
                  <span className="text-blue-400 font-semibold group-hover:underline flex items-center gap-1">
                    Open App <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. PRODUCT CATALOGUE OVERVIEW                              */}
      {/* ========================================================= */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-amber-950/70 border border-amber-600/40 text-amber-300">
            <Box className="w-3.5 h-3.5" />
            <span>PRODUCT CATALOGUE OVERVIEW</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
            Comprehensive Solar Hardware &amp; Systems
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Every category supported in the live Kumar Solar Panel application catalogue, calibrated for residential, commercial, and agricultural clean energy installations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {catalogueCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                className="group relative rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${cat.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                      {cat.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                      {cat.title}
                    </h3>
                    <div className="text-xs font-medium text-amber-400/90 font-hindi mt-0.5">
                      {cat.hindi}
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 mt-1">
                      {cat.specs}
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Available in Live PWA</span>
                  <a
                    href={liveProductsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-semibold transition-colors"
                  >
                    <span>View Models</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Explore Catalogue CTA Banner */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-amber-950/20 to-slate-900 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold text-white">
              Looking for detailed technical datasheets &amp; pricing?
            </h4>
            <p className="text-xs text-slate-300">
              Explore the interactive catalogue on the live Kumar Solar application with real-time model filters.
            </p>
          </div>
          <a
            href={liveProductsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all flex-shrink-0"
          >
            <span>Browse Full Catalogue</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. BUSINESS & ACCOUNTING SUITE                             */}
      {/* ========================================================= */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-blue-950/70 border border-blue-600/40 text-blue-300">
            <Receipt className="w-3.5 h-3.5" />
            <span>OPERATIONAL &amp; FINANCIAL MANAGEMENT</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
            Enterprise Accounting &amp; Stock Intelligence
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            The Kumar Solar Panel application integrates daily bookkeeping and business tools, enabling solar installers to run operations and accounting from one unified PWA.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {managementFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/90 hover:border-blue-500/40 transition-all duration-200 space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-800/60 flex items-center justify-center text-blue-400">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Security & Isolation Callout (Requirement 6 Compliance) */}
        <div className="mt-8 p-5 rounded-xl bg-slate-900/50 border border-slate-800 flex items-start gap-3.5 text-xs text-slate-300">
          <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold text-white">Enterprise Privacy &amp; Isolated Project Architecture:</span>
            <p className="text-slate-400 leading-relaxed">
              Kumar Solar Panel is maintained as an independent, secure Vercel production system. Client records, customer quotations, cash book ledgers, and confidential business documents are protected within authenticated administrative sessions and are never exposed or synced into this public web integration.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. INSTALL APP / DOWNLOAD (PWA GUIDE)                      */}
      {/* ========================================================= */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-b from-slate-900 to-[#0B132B] border border-amber-500/30 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle Background Glow */}
          <div
            className="absolute -right-20 -bottom-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-amber-950/80 border border-amber-600/50 text-amber-300">
              <Download className="w-3.5 h-3.5" />
              <span>INSTALL APP / DOWNLOAD</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
              Install Kumar Solar Panel on Desktop &amp; Mobile
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Kumar Solar Panel is developed as a modern <strong>Progressive Web App (PWA)</strong>. It installs directly from your browser without needing heavy app store downloads, updates automatically in real-time, and functions smoothly across all devices.
            </p>

            {/* Direct PWA Install Link */}
            <div className="pt-2">
              <a
                href={livePwaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/20"
                id="btn-open-install-pwa"
              >
                <Download className="w-4 h-4" />
                <span>Open &amp; Install PWA Now</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Device Installation Guides */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 pt-8 border-t border-slate-800">
            {/* Guide 1: Android Chrome */}
            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2.5 text-amber-400">
                <Smartphone className="w-5 h-5" />
                <h3 className="text-sm font-bold text-white">Android (Chrome / Samsung)</h3>
              </div>
              <ol className="text-xs text-slate-300 space-y-2 list-decimal list-inside leading-relaxed">
                <li>Open <code className="text-amber-300 bg-slate-900 px-1 py-0.5 rounded">kumar-solar-panel.vercel.app</code> in Chrome.</li>
                <li>Tap the <strong>three dots menu (⋮)</strong> at top right.</li>
                <li>Select <strong>&quot;Install App&quot;</strong> or <strong>&quot;Add to Home screen&quot;</strong>.</li>
                <li>The Kumar Solar app icon will appear on your home screen.</li>
              </ol>
            </div>

            {/* Guide 2: Apple iOS / iPadOS */}
            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2.5 text-blue-400">
                <Smartphone className="w-5 h-5" />
                <h3 className="text-sm font-bold text-white">iPhone &amp; iPad (Safari)</h3>
              </div>
              <ol className="text-xs text-slate-300 space-y-2 list-decimal list-inside leading-relaxed">
                <li>Open the URL in <strong>Apple Safari</strong>.</li>
                <li>Tap the <strong>Share button</strong> (square with up arrow).</li>
                <li>Scroll down and tap <strong>&quot;Add to Home Screen&quot;</strong>.</li>
                <li>Tap <strong>Add</strong> at top right to launch full-screen anytime.</li>
              </ol>
            </div>

            {/* Guide 3: Windows & Mac Desktop */}
            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2.5 text-emerald-400">
                <Monitor className="w-5 h-5" />
                <h3 className="text-sm font-bold text-white">Desktop (Chrome / Edge)</h3>
              </div>
              <ol className="text-xs text-slate-300 space-y-2 list-decimal list-inside leading-relaxed">
                <li>Open the website in Chrome or Microsoft Edge.</li>
                <li>Click the <strong>Install icon (⊕)</strong> on the right of the address bar.</li>
                <li>Click <strong>&quot;Install&quot;</strong> to add a standalone desktop window.</li>
                <li>Access directly from your Start Menu, Taskbar, or Dock.</li>
              </ol>
            </div>
          </div>

          {/* Clarification on APK vs PWA */}
          <div className="mt-6 p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center gap-3 text-xs text-slate-400">
            <Info className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>
              <strong>Note on PWA vs APK:</strong> Progressive Web Apps install securely and instantly straight from your web browser without requiring external APK files or installation permissions. Always verify and install directly via the official production link.
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. CUSTOMER ENQUIRY & CONTACT CHANNELS                     */}
      {/* ========================================================= */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-8 sm:p-12 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-emerald-950/70 border border-emerald-600/40 text-emerald-300">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>CUSTOMER ENQUIRY &amp; SUPPORT</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Ready for Clean Solar Energy?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Connect directly through verified inquiry channels for solar feasibility surveys, government subsidies, or technical consultations.
            </p>
          </div>

          {/* Triad Action Buttons (Requirement 5) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {/* Button 1: Request a Quote */}
            <a
              href={liveQuoteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-2 p-5 rounded-xl bg-gradient-to-b from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold text-sm shadow-lg shadow-blue-600/20 transition-all text-center group"
              id="btn-request-quote"
            >
              <Calculator className="w-6 h-6 text-white" />
              <span>Request a Quote</span>
              <span className="text-[11px] text-blue-200 font-normal">Online solar estimate</span>
            </a>

            {/* Button 2: Contact Sales */}
            <Link
              href="/contact"
              className="flex flex-col items-center justify-center gap-2 p-5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-sm transition-all text-center group"
              id="btn-contact-sales"
            >
              <Mail className="w-6 h-6 text-amber-400" />
              <span>Contact Sales</span>
              <span className="text-[11px] text-slate-400 font-normal">Official enquiry desk</span>
            </Link>

            {/* Button 3: WhatsApp Enquiry */}
            <a
              href={verifiedWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-2 p-5 rounded-xl bg-gradient-to-b from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-semibold text-sm shadow-lg shadow-emerald-600/20 transition-all text-center group"
              id="btn-whatsapp-enquiry"
            >
              <MessageSquare className="w-6 h-6 text-white" />
              <span>WhatsApp Enquiry</span>
              <span className="text-[11px] text-emerald-200 font-normal">Chat directly on WhatsApp</span>
            </a>
          </div>

          {/* Verified Contact Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-800 text-xs">
            <div className="flex items-start gap-3 text-slate-300">
              <Phone className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-white">Direct Helpline</div>
                <a href={`tel:${verifiedPhone.replace(/\s+/g, "")}`} className="text-slate-400 hover:text-amber-400 transition-colors">
                  {verifiedPhone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 text-slate-300">
              <Mail className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-white">Verified Contact Email</div>
                <a href={`mailto:${verifiedEmail}`} className="text-slate-400 hover:text-blue-400 transition-colors">
                  {verifiedEmail}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 text-slate-300">
              <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-white">Service Location</div>
                <span className="text-slate-400">Baloda Bazar - Bhatapara, Chhattisgarh</span>
              </div>
            </div>
          </div>
        </div>

        {/* Link to Case Study in Portfolio */}
        <div className="mt-8 text-center text-xs text-slate-400">
          Interested in the engineering case study of this project?{" "}
          <Link
            href="/portfolio/kumar-solar-panel"
            className="text-amber-400 hover:underline font-semibold"
          >
            Read the Kumar Solar Website Case Study in Portfolio →
          </Link>
        </div>
      </section>
    </div>
  );
}
