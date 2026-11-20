import React from "react";
import {
  Stethoscope,
  Sparkles,
  Zap,
  Home,
  Wrench,
  ChevronRight,
  Droplet,
  Sparkle,
  Hammer,
} from "lucide-react";

export function HeroDevicesMockup() {
  return (
    <div className="relative w-full max-w-[620px] lg:max-w-[640px] h-[340px] lg:h-[360px] flex items-center select-none overflow-visible mx-auto lg:mr-2 scale-[0.82] sm:scale-95 lg:scale-100 origin-center lg:origin-right transition-transform">
      {/* Ambient Blue Glow in Background */}
      <div
        className="absolute top-1/2 left-[42%] -translate-x-1/2 -translate-y-1/2 w-[460px] h-[260px] bg-blue-600/20 blur-[80px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative w-full h-full flex items-center">
        {/* ========================================================= */}
        {/* 1. LAPTOP MOCKUP (Background Left - Code Editor)          */}
        {/* ========================================================= */}
        <div className="absolute left-0 bottom-2 lg:bottom-3 w-[260px] sm:w-[290px] lg:w-[315px] z-10 transition-transform duration-300 hover:scale-[1.02]">
          {/* Laptop Lid & Screen */}
          <div className="bg-[#0B1222] rounded-t-xl p-2 border border-slate-700/80 shadow-2xl shadow-black/80">
            {/* Top Bar with window control dots */}
            <div className="flex items-center justify-between pb-1 px-1 border-b border-slate-800">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              </div>
              <div className="w-12 h-1 bg-slate-800 rounded-full" />
            </div>

            {/* Code Screen (Abstract syntax color blocks, no loose source code text) */}
            <div className="p-2 space-y-1.5 bg-[#060A14] rounded-md overflow-hidden" aria-hidden="true">
              <div className="flex items-center gap-1.5">
                <div className="w-7 h-1.5 rounded-sm bg-purple-400/80" />
                <div className="w-12 h-1.5 rounded-sm bg-sky-400/80" />
                <div className="w-10 h-1.5 rounded-sm bg-emerald-400/80" />
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-14 h-1.5 rounded-sm bg-purple-400/80" />
                <div className="w-16 h-1.5 rounded-sm bg-yellow-400/80" />
              </div>
              <div className="flex items-center gap-1.5 pl-3">
                <div className="w-6 h-1.5 rounded-sm bg-purple-400/70" />
                <div className="w-10 h-1.5 rounded-sm bg-sky-300/70" />
                <div className="w-14 h-1.5 rounded-sm bg-blue-400/70" />
              </div>
              <div className="flex items-center gap-1.5 pl-3">
                <div className="w-8 h-1.5 rounded-sm bg-purple-400/70" />
              </div>
              <div className="flex items-center gap-1.5 pl-6">
                <div className="w-16 h-1.5 rounded-sm bg-emerald-400/80" />
                <div className="w-8 h-1.5 rounded-sm bg-amber-300/80" />
              </div>
              <div className="flex items-center gap-1.5 pl-3">
                <div className="w-4 h-1.5 rounded-sm bg-slate-500/70" />
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-1.5 rounded-sm bg-slate-500/70" />
              </div>
            </div>
          </div>

          {/* Laptop Base */}
          <div className="h-2.5 bg-gradient-to-b from-slate-600 via-slate-700 to-slate-800 rounded-b-lg shadow-md flex items-center justify-center">
            <div className="w-10 h-0.5 bg-slate-500 rounded-full" />
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. SMARTPHONE 1: OPD Assistant AI (Center)                */}
        {/* ========================================================= */}
        <div className="absolute left-[140px] sm:left-[165px] lg:left-[178px] bottom-1 lg:bottom-2 w-[145px] sm:w-[160px] lg:w-[172px] z-20 transition-transform duration-300 hover:scale-[1.03]">
          {/* Chassis */}
          <div className="bg-[#0B1528] rounded-[24px] sm:rounded-[28px] p-1.5 border-[2.5px] border-slate-600/90 shadow-2xl shadow-blue-950/90 overflow-hidden">
            {/* Screen Surface */}
            <div className="rounded-[20px] sm:rounded-[24px] overflow-hidden bg-[#F4F9FD] text-slate-800 text-[8.5px] leading-tight">
              {/* Dynamic Island */}
              <div className="bg-slate-900 pt-1.5 pb-1 px-3 flex items-center justify-between text-[7px] text-slate-300">
                <span className="font-semibold text-slate-200">09:41</span>
                <div className="w-9 h-2 bg-slate-800 rounded-full" />
                <span className="font-mono text-[7px]">5G</span>
              </div>

              {/* App Bar */}
              <div className="bg-white px-2 py-1.5 border-b border-slate-100 flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <Stethoscope className="w-3 h-3" />
                </div>
                <div>
                  <div className="font-extrabold text-[9px] text-[#0D1527] leading-none">OPD Assistant AI</div>
                  <div className="text-[7px] text-blue-600 font-medium leading-none mt-0.5">Medical Chat Box</div>
                </div>
              </div>

              {/* Chat Message Bubble */}
              <div className="p-2 space-y-1.5 bg-gradient-to-b from-blue-50/60 to-white">
                <div className="flex items-start gap-1 bg-white p-1.5 rounded-lg border border-blue-100 shadow-2xs">
                  <span className="w-3.5 h-3.5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[7px] flex-shrink-0 font-bold">
                    👨‍⚕️
                  </span>
                  <div>
                    <div className="text-[7.5px] font-bold text-slate-800">Hello Doctor!</div>
                    <div className="text-[7px] text-slate-500">How can I help you today?</div>
                  </div>
                </div>

                {/* Quick Action List with Chevrons */}
                <div className="space-y-1 pt-0.5">
                  <div className="flex items-center justify-between p-1 bg-white rounded-md border border-slate-100 text-[7px] font-medium text-slate-700 shadow-2xs">
                    <span className="flex items-center gap-1">
                      <span className="text-blue-500">🩺</span> Check Symptoms
                    </span>
                    <ChevronRight className="w-2.5 h-2.5 text-slate-400" />
                  </div>

                  <div className="flex items-center justify-between p-1 bg-white rounded-md border border-slate-100 text-[7px] font-medium text-slate-700 shadow-2xs">
                    <span className="flex items-center gap-1">
                      <span className="text-blue-500">💊</span> Drug Information
                    </span>
                    <ChevronRight className="w-2.5 h-2.5 text-slate-400" />
                  </div>

                  <div className="flex items-center justify-between p-1 bg-white rounded-md border border-slate-100 text-[7px] font-medium text-slate-700 shadow-2xs">
                    <span className="flex items-center gap-1">
                      <span className="text-blue-500">📋</span> Clinical Guidelines
                    </span>
                    <ChevronRight className="w-2.5 h-2.5 text-slate-400" />
                  </div>

                  <div className="flex items-center justify-between p-1 bg-white rounded-md border border-slate-100 text-[7px] font-medium text-slate-700 shadow-2xs">
                    <span className="flex items-center gap-1">
                      <span className="text-blue-500">👤</span> Patient Education
                    </span>
                    <ChevronRight className="w-2.5 h-2.5 text-slate-400" />
                  </div>
                </div>

                {/* Doctor Avatar Badge */}
                <div className="pt-0.5 flex items-center justify-center gap-1 bg-blue-50/90 rounded-md py-1 border border-blue-100">
                  <span className="text-[8px]">👨‍⚕️</span>
                  <span className="text-[7px] font-semibold text-blue-700">Clinical Reference Mode</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 3. SMARTPHONE 2: GharMitra (Right)                        */}
        {/* ========================================================= */}
        <div className="absolute left-[245px] sm:left-[285px] lg:left-[310px] bottom-0 lg:bottom-1 w-[145px] sm:w-[160px] lg:w-[172px] z-30 transition-transform duration-300 hover:scale-[1.03]">
          {/* Chassis */}
          <div className="bg-[#0A1916] rounded-[24px] sm:rounded-[28px] p-1.5 border-[2.5px] border-emerald-600/70 shadow-2xl shadow-black/90 overflow-hidden">
            {/* Screen Surface */}
            <div className="rounded-[20px] sm:rounded-[24px] overflow-hidden bg-[#F6FAF8] text-slate-800 text-[8.5px] leading-tight">
              {/* Dynamic Island */}
              <div className="bg-slate-900 pt-1.5 pb-1 px-3 flex items-center justify-between text-[7px] text-slate-300">
                <span className="font-semibold text-slate-200">09:41</span>
                <div className="w-9 h-2 bg-slate-800 rounded-full" />
                <span className="font-mono text-[7px]">5G</span>
              </div>

              {/* App Bar */}
              <div className="bg-white px-2 py-1.5 border-b border-slate-100 flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                  <Home className="w-3 h-3" />
                </div>
                <div>
                  <div className="font-extrabold text-[9px] text-[#0D1527] leading-none">GharMitra</div>
                  <div className="text-[7px] text-emerald-600 font-medium leading-none mt-0.5">Complete Home Solution</div>
                </div>
              </div>

              {/* 4 Colorful Service Square Tiles */}
              <div className="p-2 space-y-1.5 bg-gradient-to-b from-emerald-50/50 to-white">
                <div className="grid grid-cols-2 gap-1.5">
                  {/* Electrician - Yellow */}
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-1.5 flex flex-col items-center justify-center text-center shadow-2xs">
                    <div className="w-4 h-4 rounded-full bg-amber-400 text-white flex items-center justify-center mb-0.5">
                      <Zap className="w-2.5 h-2.5 fill-white" />
                    </div>
                    <span className="text-[7px] font-bold text-amber-900 leading-none">Electrician</span>
                  </div>

                  {/* Plumber - Blue */}
                  <div className="bg-sky-50 border border-sky-200 rounded-lg p-1.5 flex flex-col items-center justify-center text-center shadow-2xs">
                    <div className="w-4 h-4 rounded-full bg-sky-500 text-white flex items-center justify-center mb-0.5">
                      <Droplet className="w-2.5 h-2.5 fill-white" />
                    </div>
                    <span className="text-[7px] font-bold text-sky-900 leading-none">Plumber</span>
                  </div>

                  {/* Cleaning - Green */}
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-1.5 flex flex-col items-center justify-center text-center shadow-2xs">
                    <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center mb-0.5">
                      <Sparkle className="w-2.5 h-2.5 fill-white" />
                    </div>
                    <span className="text-[7px] font-bold text-emerald-900 leading-none">Cleaning</span>
                  </div>

                  {/* Carpenter - Orange */}
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-1.5 flex flex-col items-center justify-center text-center shadow-2xs">
                    <div className="w-4 h-4 rounded-full bg-orange-500 text-white flex items-center justify-center mb-0.5">
                      <Hammer className="w-2.5 h-2.5 fill-white" />
                    </div>
                    <span className="text-[7px] font-bold text-orange-900 leading-none">Carpenter</span>
                  </div>
                </div>

                {/* House & Garden Graphic at bottom */}
                <div className="pt-1 px-1 flex items-center justify-between bg-emerald-50/80 rounded-md border border-emerald-100">
                  <div className="text-[7px]">
                    <span className="font-bold text-emerald-800">Verified Care</span>
                    <span className="text-slate-500 block">At your doorstep</span>
                  </div>
                  <span className="text-base leading-none">🏡🌳</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 4. FLOATING CURSIVE SCRIPT (Far Right)                    */}
        {/* ========================================================= */}
        <div className="hidden lg:flex flex-col absolute right-1 lg:right-2 top-4 lg:top-5 z-20 rotate-[-10deg] pointer-events-none select-none">
          <div className="font-serif italic text-sky-300/85 text-[21px] lg:text-[24px] leading-[1.08] tracking-wide drop-shadow-md">
            <div>Ideas</div>
            <div className="pl-2">Apps</div>
            <div className="pl-4">Websites</div>
            <div className="pl-6 text-sky-200">Real Impact</div>
          </div>
          {/* Decorative Underline Swoop */}
          <svg width="115" height="18" viewBox="0 0 130 20" fill="none" className="mt-0.5 ml-3 text-sky-400/80">
            <path
              d="M5 12C35 4 80 3 125 15"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
