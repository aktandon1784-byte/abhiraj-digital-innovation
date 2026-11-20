import React from "react";
import { Stethoscope, MessageSquare, FileText } from "lucide-react";

export function OPDCardVisual() {
  return (
    <div className="relative w-full h-full min-h-[220px] flex items-center justify-center select-none overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-radial from-blue-200/50 to-transparent pointer-events-none" />

      {/* Floating Cyan Chat/Doc Bubbles */}
      <div className="absolute left-1 top-6 flex flex-col gap-2 z-20">
        {/* Bubble 1: Chat with lines */}
        <div className="w-7 h-7 rounded-lg bg-sky-400 text-white flex items-center justify-center shadow-md shadow-sky-400/30 transform -rotate-6">
          <MessageSquare className="w-3.5 h-3.5 fill-white/20" />
        </div>
        {/* Bubble 2: Chat dots */}
        <div className="w-7 h-7 rounded-lg bg-sky-400 text-white flex items-center justify-center shadow-md shadow-sky-400/30 ml-2 transform rotate-3">
          <div className="flex gap-0.5">
            <span className="w-1 h-1 rounded-full bg-white" />
            <span className="w-1 h-1 rounded-full bg-white" />
            <span className="w-1 h-1 rounded-full bg-white" />
          </div>
        </div>
        {/* Bubble 3: File Doc */}
        <div className="w-7 h-7 rounded-lg bg-sky-400 text-white flex items-center justify-center shadow-md shadow-sky-400/30 transform -rotate-3">
          <FileText className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Smartphone Mockup */}
      <div className="relative w-[130px] sm:w-[145px] bg-[#0E1726] rounded-[22px] p-1.5 shadow-xl shadow-blue-900/20 border-2 border-slate-700/60 ml-6 z-10">
        {/* Screen */}
        <div className="bg-[#F6F9FD] rounded-[18px] overflow-hidden flex flex-col items-center">
          {/* Dynamic Island / Notch */}
          <div className="w-full bg-slate-900 pt-1 pb-0.5 flex justify-center">
            <div className="w-8 h-1.5 bg-slate-800 rounded-full" />
          </div>

          {/* App Header */}
          <div className="w-full px-2 pt-1 pb-1 text-center bg-white border-b border-blue-50">
            <div className="w-5 h-5 mx-auto rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-0.5">
              <Stethoscope className="w-3 h-3" />
            </div>
            <div className="text-[8.5px] font-bold text-slate-900 leading-none">OPD Assistant AI</div>
            <div className="text-[6.5px] text-blue-600 font-medium leading-none mt-0.5">Medical Chat Box</div>
          </div>

          {/* Doctor Illustration */}
          <div className="relative w-full h-[120px] bg-gradient-to-b from-blue-50/70 to-blue-100/50 flex flex-col items-center justify-end overflow-hidden">
            {/* SVG Doctor with Stethoscope & Lab Coat */}
            <svg viewBox="0 0 120 120" className="w-[110px] h-[110px] drop-shadow-sm">
              {/* Doctor Head & Hair */}
              <circle cx="60" cy="40" r="18" fill="#FAD0B1" />
              {/* Hair */}
              <path
                d="M42 38C42 27 50 20 60 20C70 20 78 27 78 38C78 39 76 33 70 30C64 27 56 27 50 30C44 33 42 39 42 38Z"
                fill="#2C1810"
              />
              {/* Eyes */}
              <ellipse cx="54" cy="39" rx="1.5" ry="2" fill="#1E293B" />
              <ellipse cx="66" cy="39" rx="1.5" ry="2" fill="#1E293B" />
              {/* Smile */}
              <path d="M56 46C58 48 62 48 64 46" stroke="#C2410C" strokeWidth="1.2" strokeLinecap="round" fill="none" />

              {/* Lab Coat / Body */}
              <path
                d="M32 95C32 72 44 65 60 65C76 65 88 72 88 95L88 120L32 120Z"
                fill="#FFFFFF"
              />
              {/* Inner Scrub (Cyan/Blue) */}
              <path
                d="M52 65L60 78L68 65L68 85L52 85Z"
                fill="#0284C7"
              />
              {/* Stethoscope */}
              <path
                d="M48 64C48 76 50 86 56 88C62 86 64 76 64 64"
                stroke="#475569"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="56" cy="89" r="4" fill="#94A3B8" stroke="#334155" strokeWidth="1.5" />
              {/* Coat Lapels */}
              <path d="M44 65L52 88L40 92Z" fill="#F1F5F9" />
              <path d="M76 65L68 88L80 92Z" fill="#F1F5F9" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
