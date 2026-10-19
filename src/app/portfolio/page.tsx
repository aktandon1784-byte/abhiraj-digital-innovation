import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ExternalLink,
  Smartphone,
  Globe,
  ArrowRight,
  Sparkles,
  Clock,
  ShieldCheck,
  Stethoscope,
  Home,
  Sun,
  Users,
  Building2,
} from "lucide-react";
import { OPDCardVisual } from "@/components/home/OPDCardVisual";
import { GharMitraCardVisual } from "@/components/home/GharMitraCardVisual";
import { KumarSolarCardVisual } from "@/components/home/KumarSolarCardVisual";
import { ColonyMitraCardVisual } from "@/components/home/ColonyMitraCardVisual";

export const metadata: Metadata = {
  title: "Portfolio & Products | Abhiraj Digital Innovation",
  description:
    "Explore digital products and client web projects developed by Abhiraj Digital Innovation, including OPD Assistant AI, GharMitra, Kumar Solar Panel Website, and Colony Mitra.",
};

export default function PortfolioPage() {
  return (
    <div className="relative space-y-16 sm:space-y-24 py-10 lg:py-16 bg-grid-pattern">
      <div className="ambient-hero-glow" aria-hidden="true" />

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="mb-6 flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/" className="hover:text-blue-400 transition-colors">
            ABHIRAJ DIGITAL INNOVATION
          </Link>
          <span>/</span>
          <span className="text-blue-400 font-semibold">PORTFOLIO &amp; PRODUCTS</span>
        </div>

        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-mono bg-blue-950/80 border border-blue-800/60 text-blue-300">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            <span>OUR WORK &amp; CREATIONS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight font-heading">
            Our Products &amp; Client Projects
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            From mobile applications built with grounded purpose to responsive client web platforms, discover what we build at Abhiraj Digital Innovation.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {/* 1. OPD Assistant AI */}
          <Link
            href="/opd-assistant-ai"
            className="group block bg-[#EEF5FF] rounded-2xl border border-[#CFE2FE] hover:border-blue-400 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col justify-between overflow-hidden relative cursor-pointer"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFB703] text-slate-900 text-[10px] font-bold tracking-wide uppercase">
                <span>COMING SOON ON GOOGLE PLAY</span>
              </div>
              <div className="flex items-start gap-2.5 mt-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-[#0B1930] leading-tight font-heading">
                    OPD Assistant AI
                  </h3>
                  <p className="text-xs font-semibold text-blue-600">
                    Medical Chat Box
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                An upcoming AI-assisted medical chat and clinical quick-reference application designed for healthcare professionals.
              </p>
              <div className="my-4">
                <OPDCardVisual />
              </div>
            </div>
            <div className="w-full flex items-center justify-between px-3.5 py-2 rounded-full bg-white border border-blue-200 text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 text-xs font-semibold shadow-2xs transition-colors">
              <span>View Product Details</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* 2. GharMitra */}
          <Link
            href="/gharmitra"
            className="group block bg-[#EDF8F2] rounded-2xl border border-[#C7EBD7] hover:border-emerald-400 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col justify-between overflow-hidden relative cursor-pointer"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFB703] text-slate-900 text-[10px] font-bold tracking-wide uppercase">
                <span>COMING SOON ON GOOGLE PLAY</span>
              </div>
              <div className="flex items-start gap-2.5 mt-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Home className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-[#0B1930] leading-tight font-heading">
                    GharMitra (घर मित्र)
                  </h3>
                  <p className="text-xs font-semibold text-emerald-600">
                    Home Services Marketplace
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                An upcoming Home Services Marketplace mobile application for Baloda Bazar District, Chhattisgarh, connecting households with trusted services.
              </p>
              <div className="my-4">
                <GharMitraCardVisual />
              </div>
            </div>
            <div className="w-full flex items-center justify-between px-3.5 py-2 rounded-full bg-white border border-emerald-200 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 text-xs font-semibold shadow-2xs transition-colors">
              <span>View Product Details</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* 3. Kumar Solar Panel Website */}
          <div className="group relative bg-[#FFFDEB] rounded-2xl border border-[#FDE68A] hover:border-amber-400 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col justify-between overflow-hidden cursor-pointer">
            <Link
              href="/portfolio/kumar-solar-panel"
              className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              aria-label="View Kumar Solar Panel Website project details"
            />
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1865F2] text-white text-[10px] font-bold tracking-wide uppercase">
                <span>CLIENT PROJECT</span>
              </div>
              <div className="flex items-start gap-2.5 mt-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0">
                  <Sun className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-[#0B1930] leading-tight font-heading">
                    Kumar Solar Panel Website
                  </h3>
                  <p className="text-xs font-semibold text-amber-600">
                    Client Website Project
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                A modern client website developed for Kumar Solar Panel Services, showcasing clean renewable solutions.
              </p>
              <div className="my-4">
                <KumarSolarCardVisual />
              </div>
            </div>
            <div className="pt-2 flex items-center gap-2 relative z-20">
              <Link
                href="/portfolio/kumar-solar-panel"
                className="flex-1 inline-flex items-center justify-between px-3.5 py-2 rounded-xl bg-white hover:bg-amber-50 border border-amber-300 text-slate-800 text-xs font-semibold shadow-2xs transition-colors"
              >
                <span>Project Case Study</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
              </Link>
              <a
                href="https://kumar-solar-panel.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-[#1865F2] hover:bg-blue-600 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-all active:scale-95"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Demo</span>
              </a>
            </div>
          </div>

          {/* 4. Colony Mitra */}
          <Link
            href="/colony-mitra"
            className="group block bg-[#F5F3FF] rounded-2xl border border-[#DDD6FE] hover:border-indigo-400 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col justify-between overflow-hidden relative cursor-pointer"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFB703] text-slate-900 text-[10px] font-bold tracking-wide uppercase">
                <Clock className="w-3 h-3 flex-shrink-0" />
                <span>IN ACTIVE DEVELOPMENT</span>
              </div>
              <div className="flex items-start gap-2.5 mt-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-[#0B1930] leading-tight font-heading">
                    Colony Mitra (कॉलोनी मित्र)
                  </h3>
                  <p className="text-xs font-semibold text-indigo-600">
                    Residential Colony Platform
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                An upcoming digital platform engineered to organize society circulars, resident rosters, and colony operations into one seamless hub.
              </p>
              <div className="my-4">
                <ColonyMitraCardVisual />
              </div>
            </div>
            <div className="w-full flex items-center justify-between px-3.5 py-2 rounded-full bg-white border border-indigo-200 text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 text-xs font-semibold shadow-2xs transition-colors">
              <span>View Product Details</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
