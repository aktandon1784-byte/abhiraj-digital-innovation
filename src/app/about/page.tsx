import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Smartphone,
  Code2,
  Globe,
  ArrowRight,
  CheckCircle2,
  Zap,
  Layers,
  Terminal,
  ShieldCheck,
  Mail,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About | Abhiraj Digital Innovation",
  description:
    "Abhiraj Digital Innovation is focused on building practical digital applications, software solutions and modern websites around real-world requirements.",
};

export default function AboutPage() {
  const pillars = [
    {
      title: "Practical Digital Applications",
      desc: "We prioritize tangible, real-world utility over vanity metrics. Every project is built around genuine user needs and practical workflows.",
      icon: Zap,
    },
    {
      title: "Android Mobile Focus",
      desc: "Our current primary engineering focus is Android mobile application development, delivering accessible and fast tools at the point of need.",
      icon: Smartphone,
    },
    {
      title: "Clean & Maintainable Code",
      desc: "Clear architecture, disciplined software craftsmanship, and truthful specifications guide all our development work.",
      icon: Code2,
    },
    {
      title: "Purposeful Design",
      desc: "Interfaces designed with clarity, legibility, and rapid comprehension, ensuring ease of use without unnecessary complexity.",
      icon: Layers,
    },
  ];

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
          <span className="text-blue-400 font-semibold">ABOUT</span>
        </div>

        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-blue-950/80 border border-blue-800/60 text-blue-300">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            <span>DIGITAL INNOVATION INITIATIVE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-heading text-gradient">
            About Abhiraj Digital Innovation
          </h1>

          <div className="space-y-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            <p>
              <strong className="text-white">Abhiraj Digital Innovation</strong> is focused on building practical digital applications, software solutions and modern websites around real-world requirements.
            </p>
            <p>
              Our current primary focus is mobile application development, with <strong className="text-blue-400">OPD Assistant AI</strong> as our current application.
            </p>
            <p className="text-slate-400 text-sm sm:text-base">
              Alongside mobile applications, we work on practical software and website solutions with an emphasis on purposeful functionality, clear interfaces and useful digital experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Focus Breakdown */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mobile App Dev */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border-2 border-blue-500/40 shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-950 text-blue-400 border border-blue-800/60 flex items-center justify-center">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-blue-400 uppercase tracking-wider font-semibold">
                PRIMARY FOCUS
              </div>
              <h2 className="text-lg font-bold text-white mt-1">
                Mobile Application Development
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Engineering practical Android mobile applications built for responsive performance, clear information architecture, and point-of-need usability.
            </p>
            <div className="pt-2 border-t border-slate-800 text-xs text-slate-400">
              Current Project: <strong className="text-white">OPD Assistant AI</strong>
            </div>
          </div>

          {/* Software Dev */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 flex items-center justify-center">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                DEVELOPMENT AREA
              </div>
              <h2 className="text-lg font-bold text-white mt-1">
                Software Development
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Developing custom software tools, backend microservices, and practical digital utilities designed around structured requirements.
            </p>
            <div className="pt-2 border-t border-slate-800 text-xs text-slate-400">
              Focus: Custom tools & application logic
            </div>
          </div>

          {/* Website Dev */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 flex items-center justify-center">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                DEVELOPMENT AREA
              </div>
              <h2 className="text-lg font-bold text-white mt-1">
                Website Development
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Building fast, modern, responsive websites for organizations, applications, and digital initiatives with clean aesthetics and strong technical foundations.
            </p>
            <div className="pt-2 border-t border-slate-800 text-xs text-slate-400">
              Focus: Modern, responsive web design
            </div>
          </div>
        </div>
      </section>

      {/* Current Product Callout */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-2xl bg-[#0A101D] border border-blue-900/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-[10px] font-mono bg-blue-950 text-blue-300 border border-blue-800/60">
              <span>OUR CURRENT APPLICATION</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              OPD Assistant AI (Android)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              OPD Assistant AI is an AI-assisted Medical Chat Box and Clinical Reference & Decision-Support Application designed to assist qualified healthcare professionals.
            </p>
          </div>
          <Link
            href="/opd-assistant-ai"
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/25 transition-all"
          >
            <span>Explore Dedicated Product Page</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Core Principles */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="space-y-1">
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-400">
              Guiding Principles
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              How We Work
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Authentic values that shape how Abhiraj Digital Innovation approaches technology.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-950/80 text-blue-400 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white">{pillar.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl p-8 sm:p-10 bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Connect with Abhiraj Digital Innovation
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Have an inquiry or project discussion? Reach out directly to our team.
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
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
