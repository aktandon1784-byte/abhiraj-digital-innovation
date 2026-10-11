import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  Smartphone,
  Clock,
  Sparkles,
  ShieldCheck,
  Users,
  Bell,
  CreditCard,
  MessageSquare,
  FileText,
  AlertCircle,
  CheckCircle2,
  Info,
  ArrowRight,
  ArrowDown,
  Layers,
  HelpCircle,
  Mail,
  Home,
  Compass,
} from "lucide-react";
import { ColonyMitraCardVisual } from "@/components/home/ColonyMitraCardVisual";

export const metadata: Metadata = {
  title: "Colony Mitra (कॉलोनी मित्र) — Residential Colony & Society Platform | Abhiraj Digital Innovation",
  description:
    "Colony Mitra (कॉलोनी मित्र) is an upcoming Residential Colony and Society Management application, currently in active architecture and development by Abhiraj Digital Innovation.",
  openGraph: {
    title: "Colony Mitra (कॉलोनी मित्र) — Residential Colony & Society Platform",
    description:
      "A centralized digital platform designed to simplify residential society coordination, resident directories, and community operations.",
    url: "https://abhirajdigitalinnovation.com/colony-mitra",
    siteName: "Abhiraj Digital Innovation",
    type: "website",
  },
};

export default function ColonyMitraPage() {
  const intendedUsers = [
    {
      title: "Colony Residents & Homeowners",
      desc: "Residents seeking timely society circulars, organized record access, and straightforward communication with management committees.",
      icon: Home,
    },
    {
      title: "Resident Welfare Associations (RWA)",
      desc: "Elected governing bodies needing a structured digital hub to publish notices, manage resolutions, and maintain clear records.",
      icon: Users,
    },
    {
      title: "Gated Communities & Societies",
      desc: "Residential complexes, townships, and housing societies seeking to replace informal chat groups with reliable digital workflows.",
      icon: Building2,
    },
    {
      title: "Society Administrators & Facility Staff",
      desc: "On-ground administrative personnel managing maintenance requests, vendor logs, and common community resources.",
      icon: ShieldCheck,
    },
  ];

  const plannedWorkflows = [
    {
      step: "01",
      title: "Centralized Notice Board",
      badge: "PLANNED MODULE",
      desc: "Official broadcasts, meeting agendas, and emergency advisories published with persistent archive access.",
      icon: Bell,
      color: "purple",
    },
    {
      step: "02",
      title: "Resident & Household Directory",
      badge: "PLANNED MODULE",
      desc: "Verified flat and plot directory with privacy-preserving contact preferences for smooth inter-resident coordination.",
      icon: Users,
      color: "indigo",
    },
    {
      step: "03",
      title: "Society Maintenance Framework",
      badge: "PLANNED MODULE",
      desc: "Transparent maintenance fee tracking, receipt generation, and expense visibility for community peace of mind.",
      icon: CreditCard,
      color: "sky",
    },
    {
      step: "04",
      title: "Grievance Redressal & Helpdesk",
      badge: "PLANNED MODULE",
      desc: "Ticketed issue reporting for electrical, plumbing, sanitation, or civil concerns with tracking from submission to resolution.",
      icon: MessageSquare,
      color: "emerald",
    },
  ];

  const plannedRoadmap = [
    {
      title: "Visitor Check-in & Gate Security",
      status: "ROADMAP SPECIFICATION",
      desc: "Future gatekeeper integration for pre-approved guests, delivery verification, and entry authorization.",
      icon: ShieldCheck,
    },
    {
      title: "Facility & Amenity Scheduling",
      status: "ROADMAP SPECIFICATION",
      desc: "Planned reservation system for clubhouse, community hall, and shared recreational zones.",
      icon: Compass,
    },
    {
      title: "Document Vault & Society Bylaws",
      status: "ROADMAP SPECIFICATION",
      desc: "Secure cloud repository for society registration documents, audit reports, and governing rules.",
      icon: FileText,
    },
    {
      title: "Automated SMS & WhatsApp Alerts",
      status: "ROADMAP SPECIFICATION",
      desc: "Multi-channel notifications for time-sensitive emergency alerts and payment reminder schedules.",
      icon: Bell,
    },
  ];

  const faqs = [
    {
      question: "What problem does Colony Mitra aim to solve?",
      answer:
        "Most residential societies and colonies rely on informal WhatsApp groups and paper notices, leading to lost announcements, lack of accountability for complaints, and confusion over maintenance balances. Colony Mitra is being conceptualized to bring these fragmented interactions into one organized, transparent digital platform.",
    },
    {
      question: "Is Colony Mitra currently live or ready for public download?",
      answer:
        "No. Colony Mitra is currently in the active architecture, UI/UX prototyping, and system design phase by Abhiraj Digital Innovation. It is not yet available for public download or live production use. Live deployment and Google Play Store distribution will be announced upon conclusion of alpha and beta testing.",
    },
    {
      question: "Can our residential society participate in early pilot testing?",
      answer:
        "Yes. We welcome conversations with residential welfare associations, society presidents, and colony secretaries who wish to provide feedback on requirements or explore early pilot onboarding. Please reach out to our team through our contact page.",
    },
  ];

  return (
    <div className="relative space-y-16 sm:space-y-24 py-10 lg:py-16 bg-grid-pattern">
      {/* Ambient Lighting Glow */}
      <div className="ambient-hero-glow" aria-hidden="true" />

      {/* ========================================================= */}
      {/* 1. HERO SECTION                                           */}
      {/* ========================================================= */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {/* Breadcrumb Navigation */}
        <div className="mb-6 flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/" className="hover:text-blue-400 transition-colors">
            ABHIRAJ DIGITAL INNOVATION
          </Link>
          <span>/</span>
          <Link href="/#products-projects" className="hover:text-blue-400 transition-colors">
            PRODUCTS
          </Link>
          <span>/</span>
          <span className="text-indigo-400 font-semibold">COLONY MITRA (कॉलोनी मित्र)</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Narrative & Status */}
          <div className="lg:col-span-7 space-y-5">
            {/* Identity Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-mono bg-indigo-950/80 border border-indigo-800/60 text-indigo-300">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
              <span>UPCOMING PRODUCT • IN ACTIVE ARCHITECTURE</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-heading">
                Colony Mitra <span className="text-indigo-400">(कॉलोनी मित्र)</span>
              </h1>
              <div className="text-xl sm:text-2xl font-bold text-indigo-300">
                Residential Colony &amp; Society Management Platform
              </div>
              <p className="text-sm sm:text-base font-medium text-slate-300">
                Category: <strong>Residential Community Tech</strong> • Product of{" "}
                <strong>Abhiraj Digital Innovation</strong>
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              <strong className="text-white">Colony Mitra (कॉलोनी मित्र)</strong> is an upcoming digital platform engineered to bring structure, transparency, and effortless coordination to residential societies, gated townships, and colony communities. By centralizing official announcements, resident records, and maintenance workflows, Colony Mitra aims to eliminate the disorder of unorganized chat groups and paper circulars.
            </p>

            {/* Platform & Status Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-200">
                <Smartphone className="w-4 h-4 text-indigo-400" />
                <span>Planned Platform: <strong>Android App &amp; Web Dashboard</strong></span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-amber-300">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Development Status: <strong>In Active Development</strong></span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#planned-architecture"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/25 transition-all"
              >
                <span>Explore Planned Architecture</span>
                <ArrowDown className="w-4 h-4" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 transition-all"
              >
                <span>Partner or Inquire for Pilot</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Showcase Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-[#F5F3FF] rounded-3xl border-2 border-[#DDD6FE] p-6 shadow-2xl relative overflow-hidden">
              <div className="mb-3 flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-700 text-white text-[10px] font-bold tracking-wide uppercase">
                  <span>CONCEPT VISUAL</span>
                </div>
                <span className="text-[11px] font-mono font-bold text-indigo-800">IN ACTIVE DESIGN</span>
              </div>
              <ColonyMitraCardVisual />
              <div className="mt-4 pt-3 border-t border-indigo-200/80 text-center">
                <p className="text-xs text-indigo-950 font-semibold">
                  A Unified Digital Platform for Residential Society Governance
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. TRANSPARENT DEVELOPMENT STATUS & REALITY NOTICE         */}
      {/* ========================================================= */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-400">
                Development Status &amp; Scope Transparency
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Under Active Conceptualization &amp; Architecture
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-300 leading-relaxed pt-2 border-t border-slate-800">
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-bold text-indigo-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Currently In Progress</span>
              </div>
              <p className="text-slate-400">
                Colony Mitra is undergoing domain modeling, user journey mapping, committee workflow analysis, and wireframe creation. The architecture is being built specifically around regional society governance needs in India.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-300">
                <Info className="w-4 h-4" />
                <span>Planned Modules (Not Yet In Production)</span>
              </div>
              <p className="text-slate-400">
                Live resident authentication, automated maintenance payment processing, visitor gate check-ins, push notification dispatch, and Google Play Store release are scheduled upcoming phases.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. PURPOSE & PROBLEM SOLVED                               */}
      {/* ========================================================= */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <div className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
            The Problem We Aim to Solve
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
            Modernizing Residential Society Operations
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
            Traditional housing societies face recurring administrative obstacles that degrade community living.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Scattered Communication</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Crucial committee notices, water supply schedules, and urgent alerts get drowned in informal messaging group noise and memes.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <CreditCard className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Opaque Maintenance Records</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Paper registers and disconnected spreadsheets create friction between residents and treasurers regarding dues, payments, and receipts.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Untracked Complaints</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Maintenance grievances—such as broken streetlights, lift failures, or plumbing leaks—are reported verbally and frequently forgotten.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. INTENDED USERS                                         */}
      {/* ========================================================= */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <div className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
            User Ecosystem
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
            Designed for Colony Stakeholders
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Tailored roles and interfaces planned for every member of the residential community.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {intendedUsers.map((user) => {
            const Icon = user.icon;
            return (
              <div
                key={user.title}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 transition-colors space-y-3"
              >
                <div className="w-9 h-9 rounded-xl bg-indigo-950 border border-indigo-800 flex items-center justify-center text-indigo-400">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white">{user.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{user.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. PLANNED ARCHITECTURE & CORE WORKFLOWS                  */}
      {/* ========================================================= */}
      <section id="planned-architecture" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-indigo-950/70 border border-indigo-800/60 text-indigo-300">
            <Layers className="w-3.5 h-3.5" />
            <span>ARCHITECTURE SPECIFICATION</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
            Planned Features &amp; Workflows
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
            The core functional modules designed for the initial release phase of Colony Mitra.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plannedWorkflows.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-indigo-950 border border-indigo-800 flex items-center justify-center text-indigo-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {item.badge}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-mono text-indigo-400 font-bold">{item.step}</span>
                    <h3 className="text-lg font-bold text-white mt-0.5">{item.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
                <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2 text-xs text-indigo-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Specification defined • Implementation scheduled</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. FUTURE EXPANSION ROADMAP                               */}
      {/* ========================================================= */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
              Future Roadmap
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white font-heading">
              Planned Expansion Capabilities
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Advanced features earmarked for future development iterations post-pilot validation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {plannedRoadmap.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-950/80 flex items-center justify-center text-indigo-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-200">{item.title}</h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. FREQUENTLY ASKED QUESTIONS                             */}
      {/* ========================================================= */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 space-y-2">
          <div className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
            Common Inquiries
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.question} className="p-5 sm:p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
              <h3 className="text-sm sm:text-base font-bold text-white flex items-start gap-2.5">
                <HelpCircle className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                <span>{faq.question}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pl-6.5">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. ENGAGEMENT & VERIFIED CONTACT CTA                      */}
      {/* ========================================================= */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-indigo-950/70 via-slate-900/90 to-slate-950 border border-indigo-800/50 shadow-2xl text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-indigo-900/60 border border-indigo-700/60 text-indigo-200">
            <Building2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>Colony Mitra Early Collaboration</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading max-w-xl mx-auto">
            Interested in Shaping Colony Mitra for Your Society?
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            We are actively gathering inputs from residential committee members and colony managers to ensure the final product meets everyday community demands. Connect with our development team today.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
            >
              <span>Contact Abhiraj Digital Innovation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="mailto:abhirajdigitalinnovation@gmail.com"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 transition-all"
            >
              <Mail className="w-4 h-4 text-indigo-400" />
              <span>abhirajdigitalinnovation@gmail.com</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
