import React from "react";
import { Utensils, Store, ShoppingBag, Smartphone } from "lucide-react";

export function ChatporaCardVisual() {
  return (
    <div className="relative w-full h-full min-h-[220px] flex items-center justify-center select-none overflow-hidden">
      {/* Background warm orange ambient glow */}
      <div className="absolute top-2 right-2 w-28 h-28 rounded-full bg-orange-200/50 blur-xl pointer-events-none" />

      {/* Background Local Food & Dining SVG Art */}
      <div className="absolute right-0 bottom-0 w-[170px] h-[105px] opacity-90 z-0 pointer-events-none">
        <svg viewBox="0 0 170 105" fill="none" className="w-full h-full">
          {/* Ground & Street Pathway */}
          <rect y="92" width="170" height="13" fill="#FED7AA" rx="3" />
          <path d="M0 96C45 93 125 94 170 96L170 105L0 105Z" fill="#FDBA74" />

          {/* Local Restaurant / Food Stall Canopy */}
          <path d="M14 52L46 42L78 52L72 58L46 50L20 58Z" fill="#EA580C" />
          <path d="M14 52L20 58L28 52L34 58L40 52L46 50L52 52L58 58L64 52L72 58L78 52" stroke="#C2410C" strokeWidth="1" />
          {/* Stall Structure */}
          <rect x="22" y="58" width="48" height="34" fill="#FFF7ED" stroke="#FDBA74" strokeWidth="1.5" rx="1" />
          {/* Counter & Display */}
          <rect x="27" y="66" width="38" height="14" fill="#FFEDD5" rx="1" />
          <rect x="32" y="70" width="8" height="6" fill="#F97316" rx="0.5" />
          <rect x="42" y="70" width="8" height="6" fill="#FB923C" rx="0.5" />
          <rect x="52" y="70" width="8" height="6" fill="#F97316" rx="0.5" />

          {/* Baloda Bazar Town Dining Building */}
          <rect x="84" y="32" width="52" height="60" fill="#F97316" rx="2" />
          {/* Windows / Dining Balcony */}
          <rect x="91" y="40" width="10" height="8" fill="#FFEDD5" rx="1" />
          <rect x="105" y="40" width="10" height="8" fill="#FEF08A" rx="1" />
          <rect x="119" y="40" width="10" height="8" fill="#FFEDD5" rx="1" />
          <rect x="91" y="54" width="10" height="8" fill="#FEF08A" rx="1" />
          <rect x="105" y="54" width="10" height="8" fill="#FFEDD5" rx="1" />
          <rect x="119" y="54" width="10" height="8" fill="#FEF08A" rx="1" />
          <rect x="91" y="68" width="10" height="8" fill="#FFEDD5" rx="1" />
          <rect x="105" y="68" width="10" height="8" fill="#FFEDD5" rx="1" />
          <rect x="119" y="68" width="10" height="8" fill="#FFEDD5" rx="1" />

          {/* Steaming Food Bowl Silhouette */}
          <path d="M40 38C40 33 52 33 52 38Z" fill="#EA580C" />
          <path d="M43 32C42 30 45 28 44 26" stroke="#FB923C" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M46 32C45 29 48 27 47 25" stroke="#FB923C" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M49 32C48 30 51 28 50 26" stroke="#FB923C" strokeWidth="1.2" strokeLinecap="round" />

          {/* Roadside tree */}
          <circle cx="152" cy="70" r="13" fill="#16A34A" />
          <circle cx="156" cy="64" r="9" fill="#22C55E" />
          <rect x="150" y="80" width="4" height="12" fill="#78350F" />
        </svg>
      </div>

      {/* Smartphone Mockup (Overlapping in foreground) */}
      <div className="relative w-[130px] sm:w-[145px] bg-[#1A0F0A] rounded-[22px] p-1.5 shadow-xl shadow-orange-950/25 border-2 border-orange-500/70 z-10 mr-4">
        {/* Screen */}
        <div className="bg-[#FFFDF9] rounded-[18px] overflow-hidden flex flex-col items-center">
          {/* Notch */}
          <div className="w-full bg-slate-900 pt-1 pb-0.5 flex justify-center">
            <div className="w-8 h-1.5 bg-slate-800 rounded-full" />
          </div>

          {/* App Header */}
          <div className="w-full px-2 pt-1 pb-1 text-center bg-white border-b border-orange-100">
            <div className="w-5 h-5 mx-auto rounded-md bg-orange-100 flex items-center justify-center text-orange-600 mb-0.5">
              <Utensils className="w-3 h-3" />
            </div>
            <div className="text-[8.5px] font-bold text-slate-900 leading-none">Chatpora</div>
            <div className="text-[6.5px] text-orange-600 font-medium leading-none mt-0.5">हमर शहर, हमर स्वाद</div>
          </div>

          {/* 4 Chatpora Feature Tiles */}
          <div className="p-2 w-full grid grid-cols-2 gap-1.5 bg-gradient-to-b from-orange-50/50 to-white">
            {/* Discovery - Orange */}
            <div className="bg-[#FFF7ED] border border-orange-200 rounded-lg p-1.5 flex flex-col items-center justify-center shadow-2xs">
              <div className="w-5 h-5 rounded-full bg-orange-600 text-white flex items-center justify-center mb-0.5 shadow-xs">
                <Utensils className="w-3 h-3" />
              </div>
              <span className="text-[7px] font-bold text-orange-950 leading-none">Discovery</span>
            </div>

            {/* Food Menu - Amber */}
            <div className="bg-[#FFFBEB] border border-amber-200 rounded-lg p-1.5 flex flex-col items-center justify-center shadow-2xs">
              <div className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center mb-0.5 shadow-xs">
                <ShoppingBag className="w-3 h-3" />
              </div>
              <span className="text-[7px] font-bold text-amber-950 leading-none">Ordering</span>
            </div>

            {/* Partner Portal - Emerald */}
            <div className="bg-[#ECFDF5] border border-emerald-200 rounded-lg p-1.5 flex flex-col items-center justify-center shadow-2xs">
              <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center mb-0.5 shadow-xs">
                <Store className="w-3 h-3" />
              </div>
              <span className="text-[7px] font-bold text-emerald-950 leading-none">Partners</span>
            </div>

            {/* PWA App - Sky */}
            <div className="bg-[#F0F9FF] border border-sky-200 rounded-lg p-1.5 flex flex-col items-center justify-center shadow-2xs">
              <div className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center mb-0.5 shadow-xs">
                <Smartphone className="w-3 h-3" />
              </div>
              <span className="text-[7px] font-bold text-sky-950 leading-none">Fast PWA</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
