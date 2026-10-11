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
      className={`inline-flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg py-1 transition-opacity hover:opacity-95 ${className}`}
      aria-label="Abhiraj Digital Innovation - Home"
    >
      {/* Precision Geometric Monogram Icon: Bold Stylized 'A' Vector from Reference */}
      <svg
        width={iconDimensions}
        height={iconDimensions}
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
        aria-hidden="true"
      >
        <path
          d="M8 38L22 6L36 38H28L22 23L16 38H8Z"
          fill="url(#logo_grad_a)"
        />
        <path
          d="M17.5 28.5L22 17L26.5 28.5H17.5Z"
          fill="#060B18"
        />
        <path
          d="M22 23L29 38H36L22 6V23Z"
          fill="url(#logo_grad_b)"
          fillOpacity="0.85"
        />
        <defs>
          <linearGradient id="logo_grad_a" x1="8" y1="6" x2="36" y2="38" gradientUnits="userSpaceOnUse">
            <stop stopColor="#38BDF8" />
            <stop offset="0.5" stopColor="#2563EB" />
            <stop offset="1" stopColor="#1D4ED8" />
          </linearGradient>
          <linearGradient id="logo_grad_b" x1="22" y1="6" x2="36" y2="38" gradientUnits="userSpaceOnUse">
            <stop stopColor="#60A5FA" />
            <stop offset="1" stopColor="#1E40AF" />
          </linearGradient>
        </defs>
      </svg>

      {/* Corporate Wordmark */}
      {showWordmark && (
        <div className="flex flex-col leading-tight">
          <span className="font-bold tracking-tight text-white font-sans text-sm sm:text-base group-hover:text-blue-300 transition-colors">
            Abhiraj Digital Innovation
          </span>
          <span className="text-[11px] text-slate-400 font-normal">
            Ideas Today, Better Tomorrow.
          </span>
        </div>
      )}
    </Link>
  );
}
