"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/brand/Logo";
import { ChevronDown, Menu, X, Smartphone, Code2, Globe } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const pathname = usePathname();

  const services = [
    {
      title: "Mobile Application Development",
      desc: "Our primary focus: Android mobile applications",
      href: "/services#mobile",
      icon: Smartphone,
      isPrimary: true,
    },
    {
      title: "Software Development",
      desc: "Custom software tools and practical solutions",
      href: "/services#software",
      icon: Code2,
      isPrimary: false,
    },
    {
      title: "Website Development",
      desc: "Fast, responsive websites and web applications",
      href: "/services#web",
      icon: Globe,
      isPrimary: false,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <div className="flex-shrink-0">
            <BrandLogo size="md" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" aria-label="Main Navigation">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === "/" ? "text-white bg-slate-900" : "text-slate-300 hover:text-white hover:bg-slate-900/60"
              }`}
            >
              Home
            </Link>

            <Link
              href="/about"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === "/about" ? "text-white bg-slate-900" : "text-slate-300 hover:text-white hover:bg-slate-900/60"
              }`}
            >
              About
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <div className="flex items-center">
                <Link
                  href="/services"
                  className={`px-3 py-2 rounded-l-md text-sm font-medium transition-colors ${
                    pathname === "/services" ? "text-white bg-slate-900" : "text-slate-300 hover:text-white hover:bg-slate-900/60"
                  }`}
                >
                  Services
                </Link>
                <button
                  type="button"
                  className={`p-2 rounded-r-md text-slate-400 hover:text-white hover:bg-slate-900/60 transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                    pathname === "/services" ? "bg-slate-900 text-white" : ""
                  }`}
                  aria-expanded={servicesDropdownOpen}
                  aria-label="Toggle Services Menu"
                  onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                >
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${servicesDropdownOpen ? "rotate-180" : ""}`} />
                </button>
              </div>

              {servicesDropdownOpen && (
                <div className="absolute left-0 mt-1 w-72 rounded-xl bg-slate-900 border border-slate-800 shadow-xl py-2 z-50 animate-in fade-in duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800/80 flex items-center justify-between">
                    <span>What We Do</span>
                    <Link
                      href="/services"
                      onClick={() => setServicesDropdownOpen(false)}
                      className="text-blue-400 hover:text-blue-300 text-[10px] lowercase"
                    >
                      view all →
                    </Link>
                  </div>
                  <div className="p-1 space-y-1">
                    {services.map((service) => {
                      const Icon = service.icon;
                      return (
                        <Link
                          key={service.title}
                          href={service.href}
                          className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-800 transition-colors group"
                          onClick={() => setServicesDropdownOpen(false)}
                        >
                          <div className={`p-2 rounded-md ${service.isPrimary ? "bg-blue-950 text-blue-400" : "bg-slate-800 text-slate-400"} group-hover:text-blue-300`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-slate-200 group-hover:text-white flex items-center gap-1.5">
                              <span>{service.title}</span>
                              {service.isPrimary && (
                                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-blue-900/50 text-blue-300">
                                  Primary
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-400 leading-snug">
                              {service.desc}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/opd-assistant-ai"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === "/opd-assistant-ai" || pathname === "/application"
                  ? "text-white bg-slate-900"
                  : "text-slate-300 hover:text-white hover:bg-slate-900/60"
              }`}
            >
              Our Application
            </Link>

            <Link
              href="/contact"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === "/contact" ? "text-white bg-slate-900" : "text-slate-300 hover:text-white hover:bg-slate-900/60"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Primary Action Button */}
          <div className="hidden md:flex items-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950 px-4 pt-3 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            About
          </Link>
          <div className="px-3 py-1 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-slate-400">
            <span>Services</span>
            <Link
              href="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="text-blue-400 lowercase font-sans text-xs"
            >
              view page →
            </Link>
          </div>
          <div className="pl-3 space-y-1">
            {services.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-1.5 rounded-md text-sm text-slate-300 hover:bg-slate-800"
              >
                {item.title} {item.isPrimary ? "(Primary)" : ""}
              </Link>
            ))}
          </div>
          <Link
            href="/opd-assistant-ai"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            Our Application (OPD Assistant AI)
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            Contact
          </Link>
          <div className="pt-2">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
