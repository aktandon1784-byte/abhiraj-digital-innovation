import React from "react";
import { Home, Zap, Droplet, Sparkles, Wrench } from "lucide-react";

export function GharMitraCardVisual() {
  return (
    <div className="relative w-full h-full min-h-[220px] flex items-center justify-center select-none overflow-hidden">
      {/* Background warm sunlight glow */}
      <div className="absolute top-2 right-2 w-24 h-24 rounded-full bg-amber-200/40 blur-xl pointer-events-none" />

      {/* Background Houses & Trees SVG */}
      <div className="absolute right-0 bottom-0 w-[160px] h-[95px] opacity-90 z-0 pointer-events-none">
        <svg viewBox="0 0 160 95" fill="none" className="w-full h-full">
          {/* Ground */}
          <rect y="82" width="160" height="13" fill="#86EFAC" rx="4" />
          <path d="M0 86C40 82 120 84 160 86L160 95L0 95Z" fill="#4ADE80" />

          {/* Tree Left */}
          <circle cx="28" cy="62" r="14" fill="#22C55E" />
          <circle cx="32" cy="56" r="10" fill="#16A34A" />
          <rect x="29" y="72" width="4" height="12" fill="#78350F" />

          {/* House 1 (Blue Roof) */}
          <path d="M45 48L75 28L105 48Z" fill="#0284C7" />
          <rect x="52" y="48" width="46" height="36" fill="#F8FAFC" />
          {/* Windows */}
          <rect x="58" y="54" width="10" height="10" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1" />
          <rect x="80" y="54" width="10" height="10" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1" />
          {/* Door */}
          <rect x="70" y="68" width="10" height="16" fill="#92400E" rx="1" />

          {/* House 2 (Amber/Brown Roof) */}
          <path d="M98 52L125 35L152 52Z" fill="#D97706" />
          <rect x="104" y="52" width="42" height="32" fill="#FEF3C7" />
          <rect x="110" y="58" width="8" height="8" fill="#FDE68A" stroke="#B45309" strokeWidth="1" />
          <rect x="130" y="58" width="8" height="8" fill="#FDE68A" stroke="#B45309" strokeWidth="1" />
          <rect x="120" y="68" width="8" height="16" fill="#78350F" />

          {/* Tree Right */}
          <circle cx="150" cy="64" r="12" fill="#15803D" />
          <rect x="148" y="74" width="4" height="10" fill="#78350F" />
        </svg>
      </div>

      {/* Smartphone Mockup (Overlapping in foreground) */}
      <div className="relative w-[130px] sm:w-[145px] bg-[#0A1A14] rounded-[22px] p-1.5 shadow-xl shadow-emerald-950/20 border-2 border-emerald-600/60 z-10 mr-4">
        {/* Screen */}
        <div className="bg-[#F8FCFA] rounded-[18px] overflow-hidden flex flex-col items-center">
          {/* Notch */}
          <div className="w-full bg-slate-900 pt-1 pb-0.5 flex justify-center">
            <div className="w-8 h-1.5 bg-slate-800 rounded-full" />
          </div>

          {/* App Header */}
          <div className="w-full px-2 pt-1 pb-1 text-center bg-white border-b border-emerald-50">
            <div className="w-5 h-5 mx-auto rounded-md bg-emerald-100 flex items-center justify-center text-emerald-600 mb-0.5">
              <Home className="w-3 h-3" />
            </div>
            <div className="text-[8.5px] font-bold text-slate-900 leading-none">GharMitra</div>
            <div className="text-[6.5px] text-emerald-600 font-medium leading-none mt-0.5">Complete Home Solution</div>
          </div>

          {/* 4 Colorful Service Square Tiles */}
          <div className="p-2 w-full grid grid-cols-2 gap-1.5 bg-gradient-to-b from-emerald-50/40 to-white">
            {/* Electrician - Yellow */}
            <div className="bg-[#FFFBEB] border border-amber-200 rounded-lg p-1.5 flex flex-col items-center justify-center shadow-2xs">
              <div className="w-5 h-5 rounded-full bg-amber-400 text-white flex items-center justify-center mb-0.5 shadow-xs">
                <Zap className="w-3 h-3 fill-white" />
              </div>
              <span className="text-[7px] font-bold text-amber-900 leading-none">Electrician</span>
            </div>

            {/* Plumber - Blue */}
            <div className="bg-[#F0F9FF] border border-sky-200 rounded-lg p-1.5 flex flex-col items-center justify-center shadow-2xs">
              <div className="w-5 h-5 rounded-full bg-sky-500 text-white flex items-center justify-center mb-0.5 shadow-xs">
                <Droplet className="w-3 h-3 fill-white" />
              </div>
              <span className="text-[7px] font-bold text-sky-900 leading-none">Plumber</span>
            </div>

            {/* Cleaning - Green */}
            <div className="bg-[#ECFDF5] border border-emerald-200 rounded-lg p-1.5 flex flex-col items-center justify-center shadow-2xs">
              <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center mb-0.5 shadow-xs">
                <Sparkles className="w-3 h-3 fill-white" />
              </div>
              <span className="text-[7px] font-bold text-emerald-900 leading-none">Cleaning</span>
            </div>

            {/* Carpenter - Orange */}
            <div className="bg-[#FFF7ED] border border-orange-200 rounded-lg p-1.5 flex flex-col items-center justify-center shadow-2xs">
              <div className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center mb-0.5 shadow-xs">
                <Wrench className="w-3 h-3" />
              </div>
              <span className="text-[7px] font-bold text-orange-900 leading-none">Carpenter</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
