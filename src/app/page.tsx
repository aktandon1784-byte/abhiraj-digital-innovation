import React from "react";
import Link from "next/link";
import {
  Smartphone,
  Code2,
  Globe,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Zap,
  Layers,
  Sparkles,
  Users,
  ShieldCheck,
  TrendingUp,
  Mail,
  ChevronRight,
  Home,
  Sun,
  Stethoscope,
  Rocket,
  Clock,
  FileText,
  HeartPulse,
  MessageSquareHeart,
  UserCheck,
  RefreshCw,
  Monitor,
  Lightbulb,
  Settings,
  BarChart3,
  Play,
  MessageSquare,
  Terminal,
  Building2,
  Bell,
  Utensils,
  Store,
  Compass,
} from "lucide-react";
import { OPDCardVisual } from "@/components/home/OPDCardVisual";
import { GharMitraCardVisual } from "@/components/home/GharMitraCardVisual";
import { KumarSolarCardVisual } from "@/components/home/KumarSolarCardVisual";
import { ColonyMitraCardVisual } from "@/components/home/ColonyMitraCardVisual";
import { ChatporaCardVisual } from "@/components/home/ChatporaCardVisual";
import { PlayStoreIcon } from "@/components/home/PlayStoreIcon";
import { HeroDevicesMockup } from "@/components/home/HeroDevicesMockup";

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

  const valueStripItems = [
    {
      icon: Sparkles,
      title: "Innovative Approach",
      desc: "Creative solutions for real-world problems",
      accent: "text-blue-400 bg-blue-950/80 border-blue-800/60",
    },
    {
      icon: Users,
      title: "Client Focused",
      desc: "Your success is our priority",
      accent: "text-sky-400 bg-sky-950/80 border-sky-800/60",
    },
    {
      icon: ShieldCheck,
      title: "Quality Development",
      desc: "Modern, scalable and reliable solutions",
      accent: "text-emerald-400 bg-emerald-950/80 border-emerald-800/60",
    },
    {
      icon: TrendingUp,
      title: "Growing Together",
      desc: "Building a better digital future",
      accent: "text-amber-400 bg-amber-950/80 border-amber-800/60",
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
    <div className="relative pb-16 bg-[#060B18]">
      {/* Ambient Lighting Glow */}
      <div className="ambient-hero-glow" aria-hidden="true" />

      {/* ========================================================= */}
      {/* 1. HERO SECTION (~386-390px tall at desktop)              */}
      {/* ========================================================= */}
      <section className="relative z-10 w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 h-auto lg:h-[386px] min-h-[386px] flex items-center pt-2 pb-4 lg:py-0">
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-4">
          {/* Hero Left: Narrative & CTAs (around 42% width) */}
          <div className="w-full lg:w-[42%] lg:max-w-[500px] flex-shrink-0 space-y-3">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-950/70 border border-blue-800/60 text-sky-300">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Innovative Digital Solutions</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[38px] xl:text-[40px] font-extrabold tracking-tight text-white leading-[1.14] font-heading">
              Building Smart<br />
              Apps &amp; Websites<br />
              for a <span className="text-[#38BDF8]">Better Tomorrow</span>
            </h1>

            {/* Supporting Description */}
            <p className="text-sm text-slate-300 max-w-[460px] leading-relaxed">
              At Abhiraj Digital Innovation, we create modern mobile applications
              and professional websites that solve real-world problems and help
              businesses grow in the digital world.
            </p>

            {/* Hero CTAs */}
            <div className="pt-1 flex flex-wrap items-center gap-3">
              <a
                href="#products-projects"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#1865F2] hover:bg-blue-600 shadow-md shadow-blue-600/30 transition-all duration-200 active:scale-95"
              >
                <Rocket className="w-4 h-4" />
                <span>Explore Our Work</span>
              </a>
              <a
                href="#application"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition-all duration-200"
              >
                <Play className="w-4 h-4 fill-white text-white" />
                <span>Watch Video</span>
              </a>
            </div>

            {/* Practical Focus Checkpoints */}
            <div className="pt-2.5 border-t border-slate-800/80 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] sm:text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-950/90 border border-blue-800/60 flex items-center justify-center text-blue-400">
                  <CheckCircle2 className="w-3 h-3" />
                </div>
                <span className="text-slate-200 font-medium">Android Mobile Apps (Primary Focus)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-blue-400">
                  <CheckCircle2 className="w-3 h-3" />
                </div>
                <span>Software Development</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-blue-400">
                  <CheckCircle2 className="w-3 h-3" />
                </div>
                <span>Website Development</span>
              </div>
            </div>
          </div>

          {/* Hero Right: Laptop & Smartphone Mockups (around 58% width) */}
          <div className="w-full lg:w-[58%] flex items-center justify-end pr-0 lg:pr-3 overflow-visible">
            <HeroDevicesMockup />
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. OUR PRODUCTS & PROJECTS SECTION (Light Background)    */}
      {/* ========================================================= */}
      <section
        id="products-projects"
        className="relative z-10 w-full bg-[#F4F6FB] pt-7 pb-8 border-t border-slate-200/90 text-slate-900 scroll-mt-20"
      >
        <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-6 space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-white text-blue-600 border border-blue-200 shadow-2xs">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>Our Products &amp; Projects</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#0B1930] font-heading tracking-tight">
              Our Innovations &amp; Creations
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
              Mobile Applications and Website Projects developed by Abhiraj Digital Innovation.
            </p>
          </div>

          {/* Products & Projects Showcase Grid (3 Columns on Desktop, 4th card wraps naturally) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-5 items-stretch">
            {/* ----------------------------------------------------- */}
            {/* CARD 1: OPD ASSISTANT AI */}
            {/* ----------------------------------------------------- */}
            <Link
              href="/opd-assistant-ai"
              className="group block bg-[#EEF5FF] rounded-2xl border border-[#CFE2FE] hover:border-blue-400 shadow-sm hover:shadow-xl hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 transition-all duration-300 p-4 sm:p-5 overflow-hidden relative min-h-[365px] cursor-pointer"
              aria-label="View OPD Assistant AI medical chat box product details"
            >
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 h-full">
                {/* Left Column: Text & Features */}
                <div className="sm:col-span-7 flex flex-col justify-between z-10 space-y-2">
                  <div>
                    {/* Status Pill Badge */}
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFB703] text-slate-900 text-[10px] font-bold tracking-wide uppercase shadow-2xs">
                      <PlayStoreIcon className="w-3 h-3 flex-shrink-0" />
                      <span>COMING SOON ON GOOGLE PLAY</span>
                    </div>

                    {/* Title with Stethoscope */}
                    <div className="flex items-start gap-2 mt-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0 mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Stethoscope className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-extrabold text-[#0B1930] group-hover:text-blue-700 transition-colors leading-tight font-heading">
                          OPD Assistant AI
                        </h3>
                        <p className="text-xs font-semibold text-blue-600 leading-tight">
                          Medical Chat Box
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed mt-1.5">
                      An upcoming AI-powered medical chat and clinical quick-reference application designed for healthcare professionals.
                    </p>

                    {/* 4 Feature Bullets */}
                    <div className="space-y-1.5 mt-2">
                      <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-800">
                        <FileText className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                        <span>Clinical Quick Reference</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-800">
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                        <span>Medical Information</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-800">
                        <HeartPulse className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                        <span>Healthcare Support</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-800">
                        <MessageSquareHeart className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                        <span>Easy &amp; Smart Chat Experience</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Pill */}
                  <div className="pt-2">
                    <div className="w-full flex items-center justify-between px-3 py-1.5 rounded-full bg-white border border-blue-200 text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 text-xs font-semibold shadow-2xs transition-colors">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>View Details • Coming Soon</span>
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Right Column: Visual Mockup */}
                <div className="sm:col-span-5 flex items-center justify-center relative group-hover:scale-[1.02] transition-transform duration-300">
                  <OPDCardVisual />
                </div>
              </div>
            </Link>

            {/* ----------------------------------------------------- */}
            {/* CARD 2: GHARMITRA */}
            {/* ----------------------------------------------------- */}
            <Link
              href="/gharmitra"
              className="group block bg-[#EDF8F2] rounded-2xl border border-[#C7EBD7] hover:border-emerald-400 shadow-sm hover:shadow-xl hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 transition-all duration-300 p-4 sm:p-5 overflow-hidden relative min-h-[365px] cursor-pointer"
              aria-label="View GharMitra complete home solution product details"
            >
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 h-full">
                {/* Left Column: Text & Features */}
                <div className="sm:col-span-7 flex flex-col justify-between z-10 space-y-2">
                  <div>
                    {/* Status Pill Badge */}
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFB703] text-slate-900 text-[10px] font-bold tracking-wide uppercase shadow-2xs">
                      <PlayStoreIcon className="w-3 h-3 flex-shrink-0" />
                      <span>COMING SOON ON GOOGLE PLAY</span>
                    </div>

                    {/* Title with House Icon */}
                    <div className="flex items-start gap-2 mt-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0 mt-0.5 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        <Home className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-extrabold text-[#0B1930] group-hover:text-emerald-800 transition-colors leading-tight font-heading">
                          GharMitra (घर मित्र)
                        </h3>
                        <p className="text-xs font-semibold text-emerald-600 leading-tight">
                          Home Services Marketplace
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-[11px] sm:text-slate-600 text-xs leading-relaxed mt-1.5">
                      An upcoming Home Services Marketplace application being developed to bring trusted household services together in one convenient platform. Initial target market: Baloda Bazar District, Chhattisgarh.
                    </p>

                    {/* 4 Feature Bullets */}
                    <div className="space-y-1.5 mt-2">
                      <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-800">
                        <Home className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>Home Services Booking</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-800">
                        <UserCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>Verified Professionals</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-800">
                        <Layers className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>Multiple Home Solutions</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-800">
                        <RefreshCw className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>Easy &amp; Reliable Support</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Pill */}
                  <div className="pt-2">
                    <div className="w-full flex items-center justify-between px-3 py-1.5 rounded-full bg-white border border-emerald-200 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 text-xs font-semibold shadow-2xs transition-colors">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>View Details • Coming Soon</span>
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Right Column: Visual Mockup */}
                <div className="sm:col-span-5 flex items-center justify-center relative group-hover:scale-[1.02] transition-transform duration-300">
                  <GharMitraCardVisual />
                </div>
              </div>
            </Link>

            {/* ----------------------------------------------------- */}
            {/* CARD 3: KUMAR SOLAR PANEL WEBSITE */}
            {/* ----------------------------------------------------- */}
            <div className="group relative bg-[#FFFDEB] rounded-2xl border border-[#FDE68A] hover:border-amber-400 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-4 sm:p-5 flex flex-col justify-between overflow-hidden min-h-[365px] cursor-pointer">
              {/* Primary Card Link covering the entire card */}
              <Link
                href="/portfolio/kumar-solar-panel"
                className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                aria-label="View Kumar Solar Panel Website project details"
              />

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 h-full relative z-0">
                {/* Left Column: Text & Features */}
                <div className="sm:col-span-7 flex flex-col justify-between z-10 space-y-2">
                  <div>
                    {/* Badge: CLIENT PROJECT */}
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1865F2] text-white text-[10px] font-bold tracking-wide uppercase shadow-2xs">
                      <Users className="w-3 h-3 flex-shrink-0" />
                      <span>CLIENT PROJECT</span>
                    </div>

                    {/* Title */}
                    <div className="mt-2">
                      <h3 className="text-lg sm:text-xl font-extrabold text-[#0B1930] group-hover:text-blue-700 transition-colors leading-tight font-heading">
                        Kumar Solar Panel Website
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed mt-1.5">
                      A website project developed for Kumar Solar Panel Services, showcasing their solar solutions, services and business information.
                    </p>

                    {/* 4 Feature Bullets */}
                    <div className="space-y-1.5 mt-2">
                      <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-800">
                        <Clock className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                        <span>Modern &amp; Professional Design</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-800">
                        <Monitor className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                        <span>Responsive Website</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-800">
                        <Sun className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                        <span>Showcase of Solar Services</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-800">
                        <Sparkles className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                        <span>Built with Latest Technology</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Actions Row (relative z-20 to allow direct interaction without duplicate click) */}
                  <div className="pt-2 flex items-center gap-2 relative z-20">
                    <Link
                      href="/portfolio/kumar-solar-panel"
                      className="flex-1 inline-flex items-center justify-between px-3 py-2 rounded-xl bg-white hover:bg-amber-50 border border-amber-300 text-slate-800 text-xs font-semibold shadow-2xs transition-colors"
                    >
                      <span>Project Details</span>
                      <ChevronRight className="w-3.5 h-3.5 text-amber-600 group-hover:translate-x-0.5 transition-transform" />
                    </Link>

                    <a
                      href="https://kumar-solar-panel-website.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#1865F2] hover:bg-blue-600 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-all active:scale-95 flex-shrink-0"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Demo</span>
                    </a>
                  </div>
                </div>

                {/* Right Column: Visual Mockup */}
                <div className="sm:col-span-5 flex items-center justify-center relative group-hover:scale-[1.02] transition-transform duration-300">
                  <KumarSolarCardVisual />
                </div>
              </div>
            </div>

            {/* ----------------------------------------------------- */}
            {/* CARD 4: COLONY MITRA */}
            {/* ----------------------------------------------------- */}
            <Link
              href="/colony-mitra"
              className="group block bg-[#F5F3FF] rounded-2xl border border-[#DDD6FE] hover:border-indigo-400 shadow-sm hover:shadow-xl hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 transition-all duration-300 p-4 sm:p-5 overflow-hidden relative min-h-[365px] cursor-pointer"
              aria-label="View Colony Mitra residential colony and society platform product details"
            >
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 h-full">
                {/* Left Column: Text & Features */}
                <div className="sm:col-span-7 flex flex-col justify-between z-10 space-y-2">
                  <div>
                    {/* Status Pill Badge */}
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFB703] text-slate-900 text-[10px] font-bold tracking-wide uppercase shadow-2xs">
                      <Clock className="w-3 h-3 flex-shrink-0" />
                      <span>IN ACTIVE DEVELOPMENT</span>
                    </div>

                    {/* Title with Building Icon */}
                    <div className="flex items-start gap-2 mt-2">
                      <div className="w-7 h-7 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0 mt-0.5 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-extrabold text-[#0B1930] group-hover:text-indigo-700 transition-colors leading-tight font-heading">
                          Colony Mitra (कॉलोनी मित्र)
                        </h3>
                        <p className="text-xs font-semibold text-indigo-600 leading-tight">
                          Residential Colony &amp; Society Platform
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed mt-1.5">
                      An upcoming residential colony and society management application designed to centralize notices, resident directories, and community operations.
                    </p>

                    {/* 4 Feature Bullets */}
                    <div className="space-y-1.5 mt-2">
                      <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-800">
                        <Building2 className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
                        <span>Colony Digital Hub</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-800">
                        <Users className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
                        <span>Resident &amp; Directory Coordination</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-800">
                        <Bell className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
                        <span>Society Notices &amp; Circulars</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-800">
                        <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
                        <span>Structured Community Operations</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Pill */}
                  <div className="pt-2">
                    <div className="w-full flex items-center justify-between px-3 py-1.5 rounded-full bg-white border border-indigo-200 text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 text-xs font-semibold shadow-2xs transition-colors">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>View Details • In Development</span>
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Right Column: Visual Mockup */}
                <div className="sm:col-span-5 flex items-center justify-center relative group-hover:scale-[1.02] transition-transform duration-300">
                  <ColonyMitraCardVisual />
                </div>
              </div>
            </Link>

            {/* ----------------------------------------------------- */}
            {/* CARD 5: CHATPORA */}
            {/* ----------------------------------------------------- */}
            <div className="group relative bg-[#FFF7ED] rounded-2xl border border-[#FED7AA] hover:border-orange-400 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-4 sm:p-5 flex flex-col justify-between overflow-hidden min-h-[365px]">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 h-full relative z-0">
                {/* Left Column: Text & Features */}
                <div className="sm:col-span-7 flex flex-col justify-between z-10 space-y-2">
                  <div>
                    {/* Status Pill Badge */}
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFB703] text-slate-900 text-[10px] font-bold tracking-wide uppercase shadow-2xs">
                      <Smartphone className="w-3 h-3 flex-shrink-0" />
                      <span>PWA PREVIEW</span>
                    </div>

                    {/* Title with Utensils Icon */}
                    <div className="flex items-start gap-2 mt-2">
                      <div className="w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 flex-shrink-0 mt-0.5 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                        <Utensils className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-extrabold text-[#0B1930] group-hover:text-orange-700 transition-colors leading-tight font-heading">
                          Chatpora (चटपोरा)
                        </h3>
                        <p className="text-xs font-semibold text-orange-600 leading-tight">
                          Local Food Ordering &amp; Delivery PWA
                        </p>
                      </div>
                    </div>

                    {/* Tagline */}
                    <p className="text-[11px] font-medium text-orange-800 italic mt-1">
                      “चटपोरा — हमर शहर, हमर स्वाद।”
                    </p>

                    {/* Description */}
                    <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed mt-1.5">
                      A local food ordering and delivery platform designed to connect customers with restaurants and delivery partners in the Baloda Bazar–Bhatapara region of Chhattisgarh.
                    </p>

                    {/* 4 Feature Bullets */}
                    <div className="space-y-1.5 mt-2">
                      <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-800">
                        <Compass className="w-3.5 h-3.5 text-orange-600 flex-shrink-0" />
                        <span>Local Restaurant Discovery</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-800">
                        <Utensils className="w-3.5 h-3.5 text-orange-600 flex-shrink-0" />
                        <span>Food Ordering Platform</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-800">
                        <Store className="w-3.5 h-3.5 text-orange-600 flex-shrink-0" />
                        <span>Restaurant and Delivery Partner Portals</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-800">
                        <Smartphone className="w-3.5 h-3.5 text-orange-600 flex-shrink-0" />
                        <span>Progressive Web App (PWA)</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Actions Row (relative z-20 to allow direct interaction) */}
                  <div className="pt-2 flex items-center gap-2 relative z-20">
                    <a
                      href="https://chatpora-pwa.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-orange-50 border border-orange-300 text-slate-800 text-xs font-semibold shadow-2xs transition-colors"
                      title="Preview Chatpora food ordering platform"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-orange-600 flex-shrink-0" />
                      <span>View Demo</span>
                    </a>

                    <a
                      href="https://chatpora-pwa.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#1865F2] hover:bg-blue-600 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-all active:scale-95 flex-shrink-0"
                      title="Open Chatpora PWA application"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open Chatpora PWA</span>
                    </a>
                  </div>
                </div>

                {/* Right Column: Visual Mockup */}
                <div className="sm:col-span-5 flex items-center justify-center relative group-hover:scale-[1.02] transition-transform duration-300">
                  <ChatporaCardVisual />
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 3. BOTTOM BENEFITS STRIP (Compact light strip)           */}
          {/* ========================================================= */}
          <div className="mt-6 py-3.5 px-6 rounded-xl bg-[#EDF4FD] border border-[#D5E3F7]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">Innovative Approach</h4>
                  <p className="text-[11px] text-slate-500 leading-snug mt-0.5">Creative solutions for real-world problems</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">Client Focused</h4>
                  <p className="text-[11px] text-slate-500 leading-snug mt-0.5">Your success is our priority</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                  <Settings className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">Quality Development</h4>
                  <p className="text-[11px] text-slate-500 leading-snug mt-0.5">Modern, scalable and reliable solutions</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">Growing Together</h4>
                  <p className="text-[11px] text-slate-500 leading-snug mt-0.5">Building a better digital future</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. CURRENT APPLICATION DEEP DIVE (OPD Assistant AI)       */}
      {/* ========================================================= */}
      <section id="application" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24 scroll-mt-24">
        <div className="relative rounded-2xl p-1 bg-gradient-to-b from-blue-500/30 via-slate-800/40 to-slate-900 border border-slate-800/80 overflow-hidden shadow-2xl">
          <div className="rounded-[15px] bg-[#0A101D] p-6 sm:p-10 lg:p-12 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Product Left: Clean Narrative */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-blue-950/80 border border-blue-800/60 text-blue-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span>CURRENT APPLICATION</span>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
                    OPD Assistant AI
                  </h2>
                  <p className="text-sm sm:text-base font-medium text-blue-400 mt-1">
                    AI-Assisted Clinical Reference &amp; Decision-Support Application
                  </p>
                </div>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  An AI-assisted Medical Chat Box and Clinical Reference &amp; Decision-Support Application developed by Abhiraj Digital Innovation, designed to help appropriately qualified healthcare professionals access, organize and understand relevant clinical information.
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
                      <span>View full clinical modules &amp; disclaimers →</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. OUR SERVICES SECTION */}
      {/* ========================================================= */}
      <section
        id="services"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24 scroll-mt-24"
      >
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
            We focus on three practical areas: Android mobile applications,
            software development and website development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className={`relative rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 group ${service.isPrimary
                    ? "bg-slate-900/90 border-2 border-blue-500/40 shadow-xl shadow-blue-950/30"
                    : "bg-slate-900/60 border border-slate-800 hover:border-slate-700"
                  }`}
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${service.isPrimary
                          ? "bg-blue-600/20 text-blue-400 border border-blue-500/40"
                          : "bg-slate-800 text-slate-400 border border-slate-700/60"
                        }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span
                      className={`text-[10px] font-mono px-2.5 py-1 rounded-full font-semibold border ${service.isPrimary
                          ? "bg-blue-950 text-blue-300 border-blue-800/80 badge-glow"
                          : "bg-slate-800 text-slate-400 border-slate-700"
                        }`}
                    >
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

      {/* ========================================================= */}
      {/* 5. ABOUT SECTION */}
      {/* ========================================================= */}
      <section
        id="about"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24"
      >
        <div className="rounded-2xl p-8 sm:p-12 bg-slate-900/60 border border-slate-800 backdrop-blur-xl space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-blue-400 font-semibold">
                About Us
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading text-gradient">
                About Abhiraj Digital Innovation
              </h2>
              <div className="h-1 w-16 bg-blue-600 rounded-full mt-2" />
            </div>

            <div className="lg:col-span-7 space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              <p>
                <strong className="text-white">Abhiraj Digital Innovation</strong> is focused on building practical digital applications, software solutions and modern websites around real-world requirements.
              </p>
              <p className="text-slate-300">
                Our current primary focus is mobile application development, with OPD Assistant AI as our current application, alongside impactful client projects like the Kumar Solar Panel website.
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

      {/* ========================================================= */}
      {/* 6. WHY CHOOSE US / OUR APPROACH */}
      {/* ========================================================= */}
      <section
        id="why-us"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24"
      >
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

      {/* ========================================================= */}
      {/* 7. CONTACT BANNER */}
      {/* ========================================================= */}
      <section
        id="contact"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24"
      >
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
              <span>abhirajdigitalinnovation@gmail.com</span>
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
