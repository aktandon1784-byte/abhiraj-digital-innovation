import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: "sm" | "md" | "lg";
}

/**
 * Temporary Professional SVG Logo Concept for Abhiraj Digital Innovation
 * 
 * Modularly architected so that replacing this component with the final official
 * logo will instantly update the entire website without any layout breakages.
 */
export function BrandLogo({ className = "", showWordmark = true, size = "md" }: LogoProps) {
  const iconDimensions = {
    sm: 28,
    md: 36,
    lg: 48,
  }[size];

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg p-1 transition-opacity hover:opacity-95 ${className}`}
      aria-label="Abhiraj Digital Innovation - Home"
    >
      {/* Precision Geometric Monogram Icon: Abstract A-D-I Vector Interlock */}
      <svg
        width={iconDimensions}
        height={iconDimensions}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
        aria-hidden="true"
      >
        <rect width="48" height="48" rx="10" fill="#0B132B" stroke="#1E293B" strokeWidth="1.5" />
        {/* Geometric Hexagonal/Nexus Core */}
        <path
          d="M24 9L36 16V30L24 37L12 30V16L24 9Z"
          stroke="#1E3A8A"
          strokeWidth="1.5"
          strokeDasharray="2 2"
        />
        {/* Outer 'A' and 'D' Dynamic Struts in Cobalt Blue */}
        <path
          d="M16 33L24 14L32 33"
          stroke="#2563EB"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Horizontal Beam / Digital Bridge */}
        <path
          d="M19 26H29"
          stroke="#0284C7"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Core Innovation Node in Sky Accent */}
        <circle cx="24" cy="20" r="3" fill="#38BDF8" />
      </svg>

      {/* Corporate Wordmark */}
      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span className="font-bold tracking-tight text-white font-sans text-base sm:text-lg group-hover:text-blue-400 transition-colors">
            ABHIRAJ
          </span>
          <span className="text-[10px] tracking-[0.18em] uppercase text-slate-400 font-medium mt-0.5">
            Digital Innovation
          </span>
        </div>
      )}
    </Link>
  );
}
