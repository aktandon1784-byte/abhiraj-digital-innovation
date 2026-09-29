import React from "react";
import Link from "next/link";
import {
  Smartphone,
  Code2,
  Globe,
  ArrowRight,
  Stethoscope,
  CheckCircle2,
  Zap,
  Layers,
  Terminal,
  MessageSquare,
  Play,
  Mail,
} from "lucide-react";

export default function HomePage() {
  const services = [
    {
      title: "Mobile Application Development",
      badge: "PRIMARY FOCUS",
      subtitle: "Android Mobile Applications",
      desc: "Creating practical Android mobile applications focused on usability, clarity and real-world utility.",
      icon: Smartphone,
      isPrimary: true,
      features: [
        "Android Application Engineering",
        "Clean, Accessible User Interfaces",
        "Rapid Quick-Reference Workflows",
        "Reliable Real-World Usability",
      ],
      href: "/services#mobile",
    },
    {
      title: "Software Development",
      badge: "SECONDARY FOCUS",
      subtitle: "Custom Digital Solutions",
      desc: "Developing practical software tools and digital solutions based on specific requirements.",
      icon: Code2,
      isPrimary: false,
      features: [
        "Custom Software Tools",
        "Practical Digital Utilities",
        "Tailored Application Logic",
      ],
      href: "/services#software",
    },
    {
      title: "Website Development",
      badge: "SECONDARY FOCUS",
      subtitle: "Modern Responsive Websites",
      desc: "Creating modern, responsive websites for organizations, applications and digital projects.",
      icon: Globe,
      isPrimary: false,
      features: [
        "Modern Responsive Web Design",
        "Application & Project Websites",
        "Clean & Accessible Layouts",
      ],
      href: "/services#web",
    },
  ];

  const approachPillars = [
    {
      number: "01",
      title: "Practical Solutions",
      desc: "Focused on creating useful digital products for real-world requirements.",
      icon: Zap,
    },
    {
      number: "02",
      title: "Android Mobile Focus",
      desc: "Our primary focus is developing practical Android mobile applications.",
      icon: Smartphone,
    },
    {
      number: "03",
      title: "Clean Development",
      desc: "Focused on clear, maintainable and purposeful development.",
      icon: Code2,
    },
    {
      number: "04",
      title: "User-Focused Design",
      desc: "Interfaces designed with clarity and ease of use in mind.",
      icon: Layers,
    },
    {
      number: "05",
      title: "Real-World Problem Solving",
      desc: "Building digital solutions around practical user requirements.",
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="relative space-y-24 sm:space-y-32 py-10 lg:py-16 bg-grid-pattern">
      {/* Ambient Lighting Glow */}
      <div className="ambient-hero-glow" aria-hidden="true" />

      {/* 1. HERO SECTION */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Hero Left: Narrative & Positioning */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-mono bg-blue-950/80 border border-blue-800/60 text-blue-300 badge-glow">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              <span>DIGITAL APPLICATIONS & MOBILE DEVELOPMENT</span>
            </div>

            <div className="space-y-2">
              <span className="block text-xs font-mono uppercase tracking-[0.2em] text-blue-400 font-semibold">
                ABHIRAJ DIGITAL INNOVATION
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] font-heading text-gradient">
                Building Practical Digital Applications
              </h1>
            </div>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              We focus on creating useful mobile applications, software and websites that solve real-world problems.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/opd-assistant-ai"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/25 hover:shadow-blue-500/35 transition-all duration-200 active:scale-95"
              >
                <span>Explore OPD Assistant AI</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition-all duration-200"
              >
                <span>Explore Services</span>
              </Link>
            </div>

            {/* Practical Focus Checkpoints */}
            <div className="pt-8 border-t border-slate-800/80 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-blue-950/80 border border-blue-800/50 flex items-center justify-center text-blue-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span className="text-slate-200 font-medium">Android Mobile Apps (Primary Focus)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-blue-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>Software Development</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-blue-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>Website Development</span>
              </div>
            </div>
          </div>

          {/* Hero Right: Console Visual */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl p-1 bg-gradient-to-b from-blue-500/20 via-slate-800/40 to-slate-900/80 shadow-2xl">
              <div className="rounded-[15px] bg-slate-950/90 border border-slate-800/80 p-6 sm:p-7 space-y-6 backdrop-blur-xl">
                {/* Console Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                    <span className="text-slate-300 font-medium">Active Focus: Android Applications</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-blue-950/90 border border-blue-800/60 text-blue-300 text-[10px]">
                    Production Ready
                  </span>
                </div>

                {/* Featured Application Spotlight Card */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-blue-900/40 space-y-3 relative overflow-hidden group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                        <Stethoscope className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white flex items-center gap-1.5">
                          <span>OPD Assistant AI</span>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-900/60 text-blue-300">
                            Android
                          </span>
                        </div>
                        <div className="text-xs text-slate-400">Medical Chat Box</div>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed border-t border-slate-800/80 pt-2.5">
                    An AI-assisted Medical Chat Box and Clinical Reference & Decision-Support Application for healthcare professionals.
                  </p>
                  <div className="pt-1">
                    <Link
                      href="/opd-assistant-ai"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300"
                    >
                      <span>Explore Dedicated Product Page</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Technical Focus Stack */}
                <div className="space-y-2.5">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between">
                    <span>Technical Focus Distribution</span>
                    <span className="text-blue-400 text-[10px]">CURRENT FOCUS</span>
                  </div>

                  {/* Primary: Mobile (Android) */}
                  <div className="p-3 rounded-lg bg-slate-900/60 border border-blue-900/50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-md bg-blue-950 text-blue-400">
                        <Smartphone className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-200">Mobile Applications</div>
                        <div className="text-[10px] text-slate-400">Android Application Development</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800/60">
                      PRIMARY
                    </span>
                  </div>

                  {/* Secondary: Software */}
                  <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-md bg-slate-800 text-slate-400">
                        <Code2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-300">Software Development</div>
                        <div className="text-[10px] text-slate-400">Custom Software & Digital Tools</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-400">
                      SECONDARY
                    </span>
                  </div>

                  {/* Secondary: Websites */}
                  <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-md bg-slate-800 text-slate-400">
                        <Globe className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-300">Website Development</div>
                        <div className="text-[10px] text-slate-400">Responsive Modern Websites</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-400">
                      SECONDARY
                    </span>
                  </div>
                </div>

                {/* Console Footer */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-blue-400" />
                    <span>Practical Utility</span>
                  </span>
                  <span className="text-slate-400">Real-World Solutions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CURRENT APPLICATION INTRODUCTION CARD (Clean & Uncluttered) */}
      <section id="application" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="relative rounded-2xl p-1 bg-gradient-to-b from-blue-500/30 via-slate-800/40 to-slate-900 border border-slate-800/80 overflow-hidden shadow-2xl">
          <div className="rounded-[15px] bg-[#0A101D] p-6 sm:p-10 lg:p-12 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Product Left: Clean Narrative */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-blue-950/80 border border-blue-800/60 text-blue-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                  <span>CURRENT APPLICATION</span>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
                    OPD Assistant AI
                  </h2>
                  <p className="text-sm sm:text-base font-medium text-blue-400 mt-1">
                    AI-Assisted Clinical Reference & Decision-Support Application
                  </p>
                </div>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  An AI-assisted Medical Chat Box and Clinical Reference & Decision-Support Application developed by Abhiraj Digital Innovation, designed to help appropriately qualified healthcare professionals access, organize and understand relevant clinical information.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                    <div className="flex items-center gap-2 text-sm font-bold text-white">
                      <MessageSquare className="w-4 h-4 text-blue-400" />
                      <span>Medical Chat Box</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Assists qualified healthcare professionals with structured clinical reference queries and information processing.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                    <div className="flex items-center gap-2 text-sm font-bold text-white">
                      <Smartphone className="w-4 h-4 text-blue-400" />
                      <span>Android Mobile Platform</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Built for Android mobile devices to provide rapid reference lookup at the point of care.
                    </p>
                  </div>
                </div>

                {/* Google Play Store Integration Area */}
                <div className="pt-2 space-y-4">
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/90 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-emerald-950/60 border border-emerald-800/40 flex items-center justify-center text-emerald-400">
                        <Play className="w-4 h-4 fill-current" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">Google Play Store</div>
                        <div className="text-[11px] text-slate-400">Google Play Store — Coming Soon</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400">
                      Coming Soon
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <Link
                      href="/opd-assistant-ai"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/25 transition-all"
                    >
                      <span>Explore OPD Assistant AI</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors"
                    >
                      <span>Inquire About Application</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Product Right: Clean Overview Graphic */}
              <div className="lg:col-span-5">
                <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono text-slate-400">
                    <span className="text-slate-300 font-semibold">Application Overview</span>
                    <span className="text-blue-400">Android Application</span>
                  </div>

                  <div className="space-y-3 text-xs text-slate-300">
                    <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                      <div className="font-semibold text-white mb-1">Product Organization</div>
                      <p className="text-[11px] text-slate-400">
                        A dedicated digital product engineered and maintained by Abhiraj Digital Innovation.
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                      <div className="font-semibold text-white mb-1">Medical Chat Box Utility</div>
                      <p className="text-[11px] text-slate-400">
                        Combines structured clinical references with AI assistance to support professional workflows.
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                      <div className="font-semibold text-white mb-1">Professional Scope</div>
                      <p className="text-[11px] text-slate-400">
                        Intended for appropriately qualified healthcare professionals. Does not replace professional clinical judgment.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 text-center">
                    <Link
                      href="/opd-assistant-ai"
                      className="text-xs font-mono text-blue-400 hover:text-blue-300 inline-flex items-center gap-1"
                    >
                      <span>View full clinical modules & disclaimers →</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR SERVICES SECTION */}
      <section id="services" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-5 border-b border-slate-800">
          <div className="space-y-1">
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-400">
              Our Services
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading text-gradient">
              What We Build
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md">
            We focus on three practical areas: Android mobile applications, software development and website development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className={`relative rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 group ${
                  service.isPrimary
                    ? "bg-slate-900/90 border-2 border-blue-500/40 shadow-xl shadow-blue-950/30"
                    : "bg-slate-900/60 border border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                      service.isPrimary ? "bg-blue-600/20 text-blue-400 border border-blue-500/40" : "bg-slate-800 text-slate-400 border border-slate-700/60"
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[10px] font-mono px-2.5 py-1 rounded-full font-semibold border ${
                      service.isPrimary
                        ? "bg-blue-950 text-blue-300 border-blue-800/80 badge-glow"
                        : "bg-slate-800 text-slate-400 border-slate-700"
                    }`}>
                      {service.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                      {service.title}
                    </h3>
                    <div className="text-xs font-mono text-slate-400 mt-1">
                      {service.subtitle}
                    </div>
                    <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>

                  {/* Feature Checklist */}
                  <ul className="space-y-2 pt-2 border-t border-slate-800/80 text-xs text-slate-400">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <span>Read Service Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. ABOUT SECTION */}
      <section id="about" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="rounded-2xl p-8 sm:p-12 bg-slate-900/60 border border-slate-800 backdrop-blur-xl space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-blue-400 font-semibold">
                About Us
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading text-gradient">
                About Abhiraj Digital Innovation
              </h2>
              <div className="h-1 w-16 bg-blue-600 rounded-full mt-2"></div>
            </div>

            <div className="lg:col-span-7 space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              <p>
                <strong className="text-white">Abhiraj Digital Innovation</strong> is focused on building practical digital applications, software solutions and modern websites around real-world requirements.
              </p>
              <p className="text-slate-300">
                Our current primary focus is mobile application development, with OPD Assistant AI as our current application.
              </p>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Alongside mobile applications, we work on practical software and website solutions with an emphasis on purposeful functionality, clear interfaces and useful digital experiences.
              </p>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 hover:text-blue-300"
                >
                  <span>Learn more about our initiative →</span>
                </Link>
              </div>
            </div>
          </div>

          {/* 3 Core Grounded Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-800/80">
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="text-xs font-mono text-blue-400">PILLAR 01</div>
              <h3 className="text-sm font-bold text-white">Practical Digital Applications</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Focused on functional utility, clarity, and real user needs rather than superficial marketing trends.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="text-xs font-mono text-blue-400">PILLAR 02</div>
              <h3 className="text-sm font-bold text-white">Android Mobile Focus</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Primary engineering emphasis placed on Android mobile platforms where users require fast and accessible tools.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="text-xs font-mono text-blue-400">PILLAR 03</div>
              <h3 className="text-sm font-bold text-white">Clean Engineering</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Clear code, predictable behavior, and transparent delivery milestones without exaggerated claims.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US / OUR APPROACH */}
      <section id="why-us" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="text-xs font-mono uppercase tracking-wider text-blue-400 font-semibold">
            Our Approach
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading text-gradient">
            Why Choose Us
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Truthful principles that guide how we build digital applications.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {approachPillars.slice(0, 3).map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/30 transition-all space-y-4 group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-800/60 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    {pillar.number}
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 max-w-4xl mx-auto">
          {approachPillars.slice(3, 5).map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/30 transition-all space-y-4 group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-800/60 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    {pillar.number}
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. CONTACT BANNER */}
      <section id="contact" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="rounded-2xl p-8 sm:p-12 bg-gradient-to-r from-blue-950/60 via-slate-900 to-slate-900 border border-blue-800/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Have a Project or Question?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Have an idea for a mobile application, software solution, website, or an enquiry regarding our current application? Get in touch with Abhiraj Digital Innovation.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-blue-400 justify-center md:justify-start">
              <Mail className="w-4 h-4" />
              <span>abhirajdigitalinnovationhead@gmail.com</span>
            </div>
          </div>
          <Link
            href="/contact"
            className="flex-shrink-0 px-8 py-3.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 transition-all active:scale-95"
          >
            Get In Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
