import React from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/brand/Logo";
import { Smartphone, Code2, Globe, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800/80 bg-[#070B14] text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-slate-800/80">
          {/* Brand & Authentic Positioning */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="md" />
            <div className="text-xs font-mono tracking-wider uppercase text-blue-400 font-semibold">
              DIGITAL APPLICATIONS | MOBILE APPS | SOFTWARE | WEBSITES
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Abhiraj Digital Innovation is focused on building practical digital applications, software solutions and modern websites around real-world requirements.
            </p>
            <div className="pt-1">
              <a
                href="mailto:abhirajdigitalinnovationhead@gmail.com"
                className="inline-flex items-center gap-2 text-xs font-mono text-slate-300 hover:text-blue-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>abhirajdigitalinnovationhead@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Core Services */}
          <div>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Our Services
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/services#mobile" className="hover:text-white transition-colors flex items-center gap-2">
                  <Smartphone className="w-3.5 h-3.5 text-blue-400" />
                  <span>Mobile Applications</span>
                </Link>
              </li>
              <li>
                <Link href="/services#software" className="hover:text-white transition-colors flex items-center gap-2">
                  <Code2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Software Development</span>
                </Link>
              </li>
              <li>
                <Link href="/services#web" className="hover:text-white transition-colors flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  <span>Website Development</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/opd-assistant-ai" className="hover:text-white transition-colors">
                  Our Application
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Current Application Spotlight */}
          <div>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Current Application
            </h3>
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2 text-xs">
              <div className="font-bold text-white flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>OPD Assistant AI</span>
              </div>
              <div className="text-[10px] font-mono text-blue-400">
                Medical Chat Box (Android)
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                An AI-assisted Medical Chat Box and Clinical Reference & Decision-Support Application for qualified healthcare professionals.
              </p>
              <Link
                href="/opd-assistant-ai"
                className="inline-block text-[11px] font-semibold text-blue-400 hover:text-blue-300 transition-colors pt-1"
              >
                Explore OPD Assistant AI ➜
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {currentYear} ABHIRAJ DIGITAL INNOVATION. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-slate-200 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-200 transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
