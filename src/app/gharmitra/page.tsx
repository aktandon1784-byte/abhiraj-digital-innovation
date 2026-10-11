import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Home,
  Smartphone,
  Play,
  Clock,
  Sparkles,
  Zap,
  Droplet,
  Wrench,
  Paintbrush,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  CreditCard,
  UserCheck,
  ArrowRight,
  ArrowDown,
  Info,
  PhoneCall,
  Mail,
  AlertCircle,
  Layers,
  HeartHandshake,
} from "lucide-react";
import { GharMitraCardVisual } from "@/components/home/GharMitraCardVisual";

export const metadata: Metadata = {
  title: "GharMitra (घर मित्र) — Home Services Marketplace | Abhiraj Digital Innovation",
  description:
    "GharMitra (घर मित्र) is an upcoming Home Services Marketplace Android mobile application for household maintenance and services, currently in active development by Abhiraj Digital Innovation for Baloda Bazar District, Chhattisgarh.",
};

export default function GharMitraPage() {
  const serviceCategories = [
    {
      id: "cleaning",
      title: "Cleaning & Deep Cleaning",
      icon: Sparkles,
      color: "emerald",
      bgLight: "bg-emerald-500/10",
      borderLight: "border-emerald-500/30",
      textColor: "text-emerald-400",
      desc: "Comprehensive residential cleaning services designed for modern busy households.",
      items: [
        "Full Home Deep Cleaning & Sanitization",
        "Kitchen & Chimney Degreasing",
        "Bathroom & Tile Scrubbing",
        "Sofa, Mattress & Carpet Shampooing",
        "Move-In & Move-Out Ready Cleaning",
      ],
    },
    {
      id: "appliances",
      title: "AC & Appliance Repair",
      icon: Wrench,
      color: "sky",
      bgLight: "bg-sky-500/10",
      borderLight: "border-sky-500/30",
      textColor: "text-sky-400",
      desc: "Prompt troubleshooting and routine maintenance for essential domestic appliances.",
      items: [
        "AC Servicing, Deep Jet Cleaning & Gas Refill",
        "Refrigerator Cooling & Compressor Diagnostics",
        "Washing Machine Drum & Motor Repairs",
        "Microwave, Geyser & Water Purifier Servicing",
        "Original Spare Parts Replacement Guidance",
      ],
    },
    {
      id: "electrical-plumbing",
      title: "Electrical & Plumbing Services",
      icon: Zap,
      color: "amber",
      bgLight: "bg-amber-500/10",
      borderLight: "border-amber-500/30",
      textColor: "text-amber-400",
      desc: "Rapid repair and safety inspections by trained technicians for essential utilities.",
      items: [
        "Circuit Breaker, MCB & Switchboard Repair",
        "Short Circuit Detection & Concealed Wiring",
        "Tap Leakage, Pipe Blockage & Drain Clearance",
        "Water Tank Cleaning & Motor Connection",
        "Geyser & Sanitary Ware Installation",
      ],
    },
    {
      id: "painting-renovation",
      title: "Painting & Home Renovation",
      icon: Paintbrush,
      color: "orange",
      bgLight: "bg-orange-500/10",
      borderLight: "border-orange-500/30",
      textColor: "text-orange-400",
      desc: "Professional aesthetics and structural maintenance to refresh and protect your home.",
      items: [
        "Interior & Exterior Wall Painting",
        "Waterproofing & Dampness Treatment",
        "Carpentry, Door Fitting & Lock Repairs",
        "Furniture Assembly & Wood Polishing",
        "POP, Wall Putty & Minor Civil Works",
      ],
    },
  ];

  const plannedWorkflow = [
    {
      step: "01",
      title: "Select Household Category",
      desc: "Browse organized categories—from cleaning to appliance repair—and choose the exact service needed.",
      icon: Layers,
    },
    {
      step: "02",
      title: "Pick Date & Preferred Slot",
      desc: "Select a convenient arrival window that fits your schedule with instant booking confirmation.",
      icon: Calendar,
    },
    {
      step: "03",
      title: "Clear Upfront Estimates",
      desc: "Review standardized rate cards without hidden fees or surprise on-site surcharges.",
      icon: CreditCard,
    },
    {
      step: "04",
      title: "Doorstep Service Delivery",
      desc: "Trained service partner arrives equipped with appropriate tools to complete the task.",
      icon: UserCheck,
    },
  ];

  const intendedUsers = [
    {
      title: "Busy Working Professionals",
      desc: "Individuals and families needing scheduled, reliable home maintenance without phone tag.",
    },
    {
      title: "Tenants & Apartment Residents",
      desc: "Renters needing quick appliance fixes, deep cleaning, or move-in preparation.",
    },
    {
      title: "Senior Citizens & Independent Seniors",
      desc: "Households requiring trustworthy, safe, and respectful doorstep assistance for daily repairs.",
    },
    {
      title: "Local Skilled Technicians",
      desc: "Independent regional electricians, plumbers, and mechanics seeking organized digital bookings.",
    },
  ];

  return (
    <div className="relative space-y-16 sm:space-y-24 py-10 lg:py-16 bg-grid-pattern">
      {/* Ambient Lighting Glow */}
      <div className="ambient-hero-glow" aria-hidden="true" />

      {/* 1. HERO SECTION */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/" className="hover:text-blue-400 transition-colors">
            ABHIRAJ DIGITAL INNOVATION
          </Link>
          <span>/</span>
          <span className="text-slate-400">PRODUCTS</span>
          <span>/</span>
          <span className="text-emerald-400 font-semibold">GHARMITRA (घर मित्र)</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            {/* Identity Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-mono bg-emerald-950/80 border border-emerald-800/60 text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>UPCOMING PRODUCT • IN ACTIVE DEVELOPMENT</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-heading">
                GharMitra (घर मित्र)
              </h1>
              <div className="text-xl sm:text-2xl font-bold text-emerald-400">
                Home Services Marketplace
              </div>
              <p className="text-sm sm:text-base font-medium text-slate-300">
                Category: <strong>Home Services Marketplace</strong> • Initial Target Market: <strong>Baloda Bazar District, Chhattisgarh</strong>
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              <strong className="text-white">GharMitra (घर मित्र)</strong> is an upcoming Home Services Marketplace mobile application engineered by{" "}
              <strong>Abhiraj Digital Innovation</strong> to streamline how households discover, schedule, and receive reliable home care—connecting residents with skilled services across cleaning, appliance maintenance, electrical, plumbing, and carpentry.
            </p>

            {/* Platform & Market Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-200">
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span>Primary Platform: <strong>Android Mobile App</strong></span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-emerald-300">
                <Home className="w-3.5 h-3.5 text-emerald-400" />
                <span>Target: <strong>Baloda Bazar District, Chhattisgarh</strong></span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-amber-300">
                <Play className="w-3.5 h-3.5 text-amber-400 fill-current" />
                <span>Google Play Store — Coming Soon (Not Yet Live)</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#categories"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/25 transition-all"
              >
                <span>Explore Service Categories</span>
                <ArrowDown className="w-4 h-4" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 transition-all"
              >
                <span>Partner or Inquire</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Visual Showcase Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-[#EDF8F2] rounded-3xl border-2 border-[#C7EBD7] p-6 shadow-2xl relative overflow-hidden">
              <div className="mb-3 flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-700 text-white text-[10px] font-bold tracking-wide uppercase">
                  <span>APP PREVIEW</span>
                </div>
                <span className="text-[11px] font-mono font-bold text-emerald-800">COMING SOON</span>
              </div>
              <GharMitraCardVisual />
              <div className="mt-4 pt-3 border-t border-emerald-200/80 text-center">
                <p className="text-xs text-emerald-900 font-semibold">
                  A Unified Digital Platform for Trusted Household Services
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRANSPARENT DEVELOPMENT STATUS NOTICE */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-400">
                Product Status &amp; Scope Transparency
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Under Active Architecture &amp; Development
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-300 leading-relaxed pt-2 border-t border-slate-800">
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-bold text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Currently In Progress</span>
              </div>
              <p className="text-slate-400">
                GharMitra is actively undergoing mobile UI/UX design, category architecture, database schema modeling, and booking workflow validation.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-300">
                <Info className="w-4 h-4" />
                <span>Planned Operations (Not Yet Live)</span>
              </div>
              <p className="text-slate-400">
                Live customer bookings, technician dispatch, on-site payment gateways, and Google Play Store distribution are upcoming development milestones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE SERVICE CATEGORIES */}
      <section id="categories" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
            Household Solutions
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
            Home Service Categories
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Designed to address routine and critical household needs through dedicated service verticals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {serviceCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className="p-6 sm:p-7 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all space-y-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className={`p-3 rounded-xl ${cat.bgLight} border ${cat.borderLight} ${cat.textColor}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-heading">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 space-y-2">
                  <div className="text-[11px] font-mono uppercase text-slate-400 font-semibold">
                    Planned Services Included:
                  </div>
                  <ul className="space-y-1.5">
                    {cat.items.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. PROPOSED BOOKING WORKFLOW */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
            Planned Architecture
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
            How the Booking Workflow Will Operate
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            A frictionless 4-step mobile journey designed to take the friction out of home maintenance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {plannedWorkflow.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3 relative group hover:border-emerald-500/30 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-extrabold text-slate-400">
                    STEP {item.step}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white font-heading">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. INTENDED AUDIENCE */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
          <div className="space-y-1">
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
              Target Audience
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Built for Modern Households &amp; Service Professionals
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {intendedUsers.map((u, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{u.title}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {u.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. COMING SOON BANNER & INQUIRY */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl p-8 sm:p-12 bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-800/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-emerald-900/50 text-emerald-300">
              <Clock className="w-3.5 h-3.5" />
              <span>In Active Development • Google Play Release Soon</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Have Questions or Want to Partner with GharMitra?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              If you are a service technician, contractor, or business interested in our upcoming platform launch, reach out to the Abhiraj Digital Innovation team.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-emerald-400 justify-center md:justify-start">
              <Mail className="w-4 h-4" />
              <span>abhirajdigitalinnovation@gmail.com</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/30 transition-all active:scale-95"
            >
              Get in Touch
            </Link>
            <Link
              href="/"
              className="px-6 py-3.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
