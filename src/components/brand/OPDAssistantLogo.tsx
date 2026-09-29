import React from "react";

interface OPDAssistantLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | number;
  showBadge?: boolean;
}

/**
 * OPD Assistant AI — Official Application Visual Identity & Icon
 * 
 * Visual Semantics:
 * 1. Medical / Healthcare: Precision clinical reference structure with four cardinal clinical domains.
 * 2. AI / Intelligent Assistance: Centered 4-point synaptic intelligence node in luminous sky-blue.
 * 3. Clinical Architecture: Diagnostic circuit loop harmonizing reference inquiry with decision support.
 * 4. Obsidian Glass Form Factor: Native Android squircle aesthetic tailored for dark/blue UI language.
 */
export function OPDAssistantLogo({
  className = "",
  size = "md",
  showBadge = false,
}: OPDAssistantLogoProps) {
  const pixelSize =
    typeof size === "number"
      ? size
      : {
          sm: 32,
          md: 48,
          lg: 64,
          xl: 88,
        }[size];

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={pixelSize}
        height={pixelSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 select-none"
        role="img"
        aria-label="OPD Assistant AI - Medical Chat Box Application Icon"
      >
        <defs>
          {/* Deep Obsidian Radial Background */}
          <radialGradient
            id="opd-bg-grad"
            cx="50%"
            cy="30%"
            r="80%"
            fx="50%"
            fy="30%"
          >
            <stop offset="0%" stopColor="#0E1E38" />
            <stop offset="60%" stopColor="#08101E" />
            <stop offset="100%" stopColor="#030712" />
          </radialGradient>

          {/* Cyan/Sky AI Intelligence Gradient */}
          <linearGradient id="ai-spark-grad" x1="32" y1="32" x2="68" y2="68" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>

          {/* Cobalt Structure Gradient */}
          <linearGradient id="clinical-strut-grad" x1="16" y1="16" x2="84" y2="84" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>

          {/* Ambient Glow Filter */}
          <filter id="ai-glow" x="20%" y="20%" width="60%" height="60%" filterUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Android Squircle App Base */}
        <rect
          x="3"
          y="3"
          width="94"
          height="94"
          rx="24"
          fill="url(#opd-bg-grad)"
          stroke="#1E3A8A"
          strokeWidth="2"
        />

        {/* 2. Precision Geometric Clinical Hex-Framework */}
        <path
          d="M50 14L80 31V69L50 86L20 69V31L50 14Z"
          stroke="#1E293B"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />

        {/* 3. Clinical Reference Framework: Cardinal Diagnostic Brackets */}
        {/* Top Bracket */}
        <path
          d="M42 22H58V32H42Z"
          fill="#1E3A8A"
          fillOpacity="0.4"
          stroke="#3B82F6"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        {/* Bottom Bracket */}
        <path
          d="M42 68H58V78H42Z"
          fill="#1E3A8A"
          fillOpacity="0.4"
          stroke="#3B82F6"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        {/* Left Bracket */}
        <path
          d="M22 42H32V58H22Z"
          fill="#1E3A8A"
          fillOpacity="0.4"
          stroke="#3B82F6"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        {/* Right Bracket */}
        <path
          d="M68 42H78V58H68Z"
          fill="#1E3A8A"
          fillOpacity="0.4"
          stroke="#3B82F6"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />

        {/* 4. Cross Diagnostic Vector Connectors */}
        <path
          d="M50 32V42M50 58V68M32 50H42M58 50H68"
          stroke="#2563EB"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* 5. Center Clinical AI Core: Luminous Intelligence Diamond Spark */}
        <g filter="url(#ai-glow)">
          <path
            d="M50 34L54.5 45.5L66 50L54.5 54.5L50 66L45.5 54.5L34 50L45.5 45.5L50 34Z"
            fill="url(#ai-spark-grad)"
          />
        </g>

        {/* 6. Central Pulse Focal Point */}
        <circle cx="50" cy="50" r="3.5" fill="#FFFFFF" />

        {/* 7. Diagnostic Micro-Wave / Vital Vector Accents */}
        <circle cx="50" cy="27" r="2" fill="#38BDF8" />
        <circle cx="50" cy="73" r="2" fill="#38BDF8" />
        <circle cx="27" cy="50" r="2" fill="#38BDF8" />
        <circle cx="73" cy="50" r="2" fill="#38BDF8" />
      </svg>

      {showBadge && (
        <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-600 border border-slate-900"></span>
        </span>
      )}
    </div>
  );
}
