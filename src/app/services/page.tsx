import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Smartphone,
  Code2,
  Globe,
  ArrowRight,
  CheckCircle2,
  Terminal,
  Zap,
  Layers,
  Cpu,
  Mail,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Services | Abhiraj Digital Innovation",
  description:
    "Explore digital development services offered by Abhiraj Digital Innovation: Mobile Application Development (Android), Software Development, and Website Development.",
};

export default function ServicesPage() {
  return (
    <div className="relative space-y-20 sm:space-y-28 py-10 lg:py-16 bg-grid-pattern">
      {/* Ambient Lighting Glow */}
      <div className="ambient-hero-glow" aria-hidden="true" />

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/" className="hover:text-blue-400 transition-colors">
            HOME
          </Link>
          <span>/</span>
          <span className="text-blue-400 font-semibold">SERVICES</span>
        </div>

        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-blue-950/80 border border-blue-800/60 text-blue-300">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            <span>CORE TECHNICAL CAPABILITIES</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-heading text-gradient">
            Our Digital Services
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Abhiraj Digital Innovation concentrates on three practical development disciplines: Android mobile applications, custom software solutions, and modern websites.
          </p>
        </div>
      </section>

      {/* Service 1: Mobile App Dev (PRIMARY FOCUS) */}
      <section id="mobile" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <div className="p-8 sm:p-12 rounded-2xl bg-slate-900/80 border-2 border-blue-500/40 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/40 flex items-center justify-center">
                <Smartphone className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800/80 font-semibold uppercase">
                  PRIMARY FOCUS
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  Mobile Application Development
                </h2>
              </div>
            </div>
            <div className="text-xs font-mono text-blue-400 font-semibold">
              Platform: Android
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              <p>
                Mobile applications represent our primary engineering focus. We specialize in building practical, high-performance Android mobile applications designed to operate smoothly under real-world conditions.
              </p>
              <p>
                From rapid-lookup tools and quick-reference systems to clinical decision-support utilities like <strong className="text-white">OPD Assistant AI</strong>, our mobile development prioritizes fast responsiveness, logical data hierarchy, and offline resilience.
              </p>

              <div className="pt-2">
                <h3 className="text-xs font-mono uppercase tracking-wider text-blue-400 font-semibold mb-3">
                  Key Capabilities in Mobile Development:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>Android Native & Modern Architecture</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>Fast Point-of-Care User Interfaces</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>Structured Data & Offline Storage</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>Chat Interface & AI Assistance Integration</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Feature Callout */}
            <div className="lg:col-span-5 p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="text-xs font-mono text-blue-400 uppercase font-semibold">
                CURRENT APPLICATION SHOWCASE
              </div>
              <div className="text-base font-bold text-white">
                OPD Assistant AI Medical Chat Box
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Our flagship Android application engineered for qualified healthcare professionals, demonstrating our capabilities in clinical reference structuring, mobile chat UX, and fast point-of-care utility.
              </p>
              <Link
                href="/opd-assistant-ai"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 pt-1"
              >
                <span>Explore OPD Assistant AI details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Service 2: Software Development */}
      <section id="software" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <div className="p-8 sm:p-12 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-800 text-slate-300 border border-slate-700 flex items-center justify-center">
                <Code2 className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-semibold uppercase">
                  CUSTOM SOLUTIONS
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  Software Development
                </h2>
              </div>
            </div>
            <div className="text-xs font-mono text-slate-400">
              Specialty: Custom Software Tools
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              <p>
                We develop practical software tools and backend utilities customized around specific operational needs. Our emphasis is on robust logic, reliable data flows, and clean architectures that are easy to maintain and scale.
              </p>
              <p>
                Whether you need data processing utilities, automated operational workflows, or specialized application backends, we focus on engineering solutions that deliver dependable results without unnecessary bloat.
              </p>

              <div className="pt-2">
                <h3 className="text-xs font-mono uppercase tracking-wider text-blue-400 font-semibold mb-3">
                  Software Capabilities:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>Custom Business & Workflow Utilities</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>Backend Microservices & REST APIs</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>Structured Data Models & Processing</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>System Integration & Automation Scripts</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="text-xs font-mono text-slate-400 uppercase font-semibold">
                ENGINEERING APPROACH
              </div>
              <div className="text-base font-bold text-white">
                Purpose-Built & Maintainable
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                We believe in clean code, predictable error handling, and pragmatic architecture. We write software to solve genuine business problems with long-term reliability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service 3: Website Development */}
      <section id="web" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <div className="p-8 sm:p-12 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-800 text-slate-300 border border-slate-700 flex items-center justify-center">
                <Globe className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-semibold uppercase">
                  MODERN WEB
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  Website Development
                </h2>
              </div>
            </div>
            <div className="text-xs font-mono text-slate-400">
              Specialty: Modern Responsive Websites
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              <p>
                We build modern, responsive, and high-performance websites for organizations, digital products, and specialized applications.
              </p>
              <p>
                Our websites emphasize visual distinction, fast load times, accessible typography, and semantic structure, ensuring that your organization makes a credible and polished impression across desktops, tablets, and phones.
              </p>

              <div className="pt-2">
                <h3 className="text-xs font-mono uppercase tracking-wider text-blue-400 font-semibold mb-3">
                  Website Capabilities:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>Modern Responsive Web Design</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>Product & Application Showcase Portals</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>Accessible, Fast & SEO-Structured Layouts</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>Clean Dark Mode & Glassmorphic Aesthetics</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="text-xs font-mono text-slate-400 uppercase font-semibold">
                DESIGN STANDARD
              </div>
              <div className="text-base font-bold text-white">
                Aesthetic & Technical Precision
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every website we create is engineered with modern typography, optimized asset loading, and responsive layouts that perform seamlessly across all modern viewports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl p-8 sm:p-10 bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Discuss Your Project Requirements
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Have an idea for a mobile application, custom software utility, or website? Contact Abhiraj Digital Innovation.
            </p>
            <div className="pt-1 flex items-center gap-2 text-xs font-mono text-blue-400 justify-center md:justify-start">
              <Mail className="w-4 h-4" />
              <span>abhirajdigitalinnovation@gmail.com</span>
            </div>
          </div>
          <Link
            href="/contact"
            className="flex-shrink-0 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-all"
          >
            Get In Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
