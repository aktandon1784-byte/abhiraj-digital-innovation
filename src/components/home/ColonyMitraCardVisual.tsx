import React from "react";
import { Building2, Bell, Users, CreditCard, ShieldCheck } from "lucide-react";

export function ColonyMitraCardVisual() {
  return (
    <div className="relative w-full h-full min-h-[220px] flex items-center justify-center select-none overflow-hidden">
      {/* Background ambient purple/indigo glow */}
      <div className="absolute top-2 right-2 w-28 h-28 rounded-full bg-indigo-200/40 blur-xl pointer-events-none" />

      {/* Background Gated Colony & Towers SVG */}
      <div className="absolute right-0 bottom-0 w-[170px] h-[105px] opacity-90 z-0 pointer-events-none">
        <svg viewBox="0 0 170 105" fill="none" className="w-full h-full">
          {/* Ground & Colony Paved Roadway */}
          <rect y="92" width="170" height="13" fill="#CBD5E1" rx="3" />
          <path d="M0 96C45 93 125 94 170 96L170 105L0 105Z" fill="#94A3B8" />

          {/* Colony Entrance Gate Arch */}
          <path d="M12 94V52C12 44 18 38 28 38C38 38 44 44 44 52V94" stroke="#4338CA" strokeWidth="2.5" fill="none" />
          <path d="M16 60H40M16 72H40M16 84H40" stroke="#6366F1" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="28" cy="34" r="3" fill="#F59E0B" />

          {/* Colony Tower 1 (Tall, Modern Indigo) */}
          <rect x="52" y="24" width="38" height="70" fill="#4338CA" rx="2" />
          {/* Windows Matrix Tower 1 */}
          <rect x="57" y="30" width="7" height="6" fill="#E0E7FF" rx="0.5" />
          <rect x="68" y="30" width="7" height="6" fill="#FDE047" rx="0.5" />
          <rect x="79" y="30" width="7" height="6" fill="#E0E7FF" rx="0.5" />
          <rect x="57" y="42" width="7" height="6" fill="#E0E7FF" rx="0.5" />
          <rect x="68" y="42" width="7" height="6" fill="#E0E7FF" rx="0.5" />
          <rect x="79" y="42" width="7" height="6" fill="#FDE047" rx="0.5" />
          <rect x="57" y="54" width="7" height="6" fill="#FDE047" rx="0.5" />
          <rect x="68" y="54" width="7" height="6" fill="#E0E7FF" rx="0.5" />
          <rect x="79" y="54" width="7" height="6" fill="#E0E7FF" rx="0.5" />
          <rect x="57" y="66" width="7" height="6" fill="#E0E7FF" rx="0.5" />
          <rect x="68" y="66" width="7" height="6" fill="#E0E7FF" rx="0.5" />
          <rect x="79" y="66" width="7" height="6" fill="#E0E7FF" rx="0.5" />

          {/* Tower 2 (Residential Block, Slate/Purple) */}
          <rect x="94" y="36" width="46" height="58" fill="#6366F1" rx="2" />
          {/* Windows Matrix Tower 2 */}
          <rect x="100" y="42" width="8" height="6" fill="#EEF2FF" rx="0.5" />
          <rect x="113" y="42" width="8" height="6" fill="#EEF2FF" rx="0.5" />
          <rect x="126" y="42" width="8" height="6" fill="#FDE047" rx="0.5" />
          <rect x="100" y="54" width="8" height="6" fill="#FDE047" rx="0.5" />
          <rect x="113" y="54" width="8" height="6" fill="#EEF2FF" rx="0.5" />
          <rect x="126" y="54" width="8" height="6" fill="#EEF2FF" rx="0.5" />
          <rect x="100" y="66" width="8" height="6" fill="#EEF2FF" rx="0.5" />
          <rect x="113" y="66" width="8" height="6" fill="#EEF2FF" rx="0.5" />
          <rect x="126" y="66" width="8" height="6" fill="#EEF2FF" rx="0.5" />

          {/* Landscaping Tree */}
          <circle cx="152" cy="72" r="13" fill="#10B981" />
          <circle cx="156" cy="66" r="9" fill="#059669" />
          <rect x="150" y="82" width="4" height="12" fill="#78350F" />
        </svg>
      </div>

      {/* Smartphone Mockup (Overlapping in foreground) */}
      <div className="relative w-[130px] sm:w-[145px] bg-[#0F172A] rounded-[22px] p-1.5 shadow-xl shadow-indigo-950/25 border-2 border-indigo-600/60 z-10 mr-4">
        {/* Screen */}
        <div className="bg-[#FAF5FF] rounded-[18px] overflow-hidden flex flex-col items-center">
          {/* Notch */}
          <div className="w-full bg-slate-900 pt-1 pb-0.5 flex justify-center">
            <div className="w-8 h-1.5 bg-slate-800 rounded-full" />
          </div>

          {/* App Header */}
          <div className="w-full px-2 pt-1 pb-1 text-center bg-white border-b border-indigo-50">
            <div className="w-5 h-5 mx-auto rounded-md bg-indigo-100 flex items-center justify-center text-indigo-600 mb-0.5">
              <Building2 className="w-3 h-3" />
            </div>
            <div className="text-[8.5px] font-bold text-slate-900 leading-none">Colony Mitra</div>
            <div className="text-[6.5px] text-indigo-600 font-medium leading-none mt-0.5">Society Management</div>
          </div>

          {/* 4 Colony Feature Tiles */}
          <div className="p-2 w-full grid grid-cols-2 gap-1.5 bg-gradient-to-b from-indigo-50/40 to-white">
            {/* Notice Board - Violet */}
            <div className="bg-[#FAF5FF] border border-purple-200 rounded-lg p-1.5 flex flex-col items-center justify-center shadow-2xs">
              <div className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center mb-0.5 shadow-xs">
                <Bell className="w-3 h-3" />
              </div>
              <span className="text-[7px] font-bold text-purple-950 leading-none">Notices</span>
            </div>

            {/* Resident Directory - Indigo */}
            <div className="bg-[#EEF2FF] border border-indigo-200 rounded-lg p-1.5 flex flex-col items-center justify-center shadow-2xs">
              <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center mb-0.5 shadow-xs">
                <Users className="w-3 h-3" />
              </div>
              <span className="text-[7px] font-bold text-indigo-950 leading-none">Directory</span>
            </div>

            {/* Maintenance - Blue */}
            <div className="bg-[#F0F9FF] border border-sky-200 rounded-lg p-1.5 flex flex-col items-center justify-center shadow-2xs">
              <div className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center mb-0.5 shadow-xs">
                <CreditCard className="w-3 h-3" />
              </div>
              <span className="text-[7px] font-bold text-sky-950 leading-none">Maintenance</span>
            </div>

            {/* Security / Helpdesk - Emerald */}
            <div className="bg-[#ECFDF5] border border-emerald-200 rounded-lg p-1.5 flex flex-col items-center justify-center shadow-2xs">
              <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center mb-0.5 shadow-xs">
                <ShieldCheck className="w-3 h-3" />
              </div>
              <span className="text-[7px] font-bold text-emerald-950 leading-none">Helpdesk</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
