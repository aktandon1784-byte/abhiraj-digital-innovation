import React from "react";

export function KumarSolarCardVisual() {
  return (
    <div className="relative w-full h-full min-h-[220px] flex items-center justify-center select-none overflow-hidden">
      {/* Background radiant yellow sun with rays */}
      <div className="absolute -top-3 left-6 z-0">
        <svg width="70" height="70" viewBox="0 0 100 100" fill="none" className="animate-spin-slow">
          <circle cx="50" cy="50" r="22" fill="#FBBF24" />
          <circle cx="50" cy="50" r="18" fill="#F59E0B" />
          {/* Sun Rays */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <line
              key={deg}
              x1="50"
              y1="14"
              x2="50"
              y2="6"
              stroke="#F59E0B"
              strokeWidth="4"
              strokeLinecap="round"
              transform={`rotate(${deg} 50 50)`}
            />
          ))}
        </svg>
      </div>

      {/* 3D Solar Panel Grid SVG (Tilted) */}
      <div className="absolute right-1 top-2 w-[120px] h-[75px] z-10 pointer-events-none">
        <svg viewBox="0 0 140 90" fill="none" className="w-full h-full filter drop-shadow-md">
          {/* Panel Base & Frame */}
          <polygon
            points="15,40 105,10 135,45 45,80"
            fill="#1E293B"
            stroke="#94A3B8"
            strokeWidth="2.5"
          />
          {/* Blue Photovoltaic Cells Surface */}
          <polygon
            points="18,40 103,12 132,45 47,77"
            fill="#1D4ED8"
          />
          {/* Grid lines horizontal */}
          <line x1="26" y1="48" x2="111" y2="20" stroke="#93C5FD" strokeWidth="1" strokeOpacity="0.8" />
          <line x1="36" y1="60" x2="121" y2="32" stroke="#93C5FD" strokeWidth="1" strokeOpacity="0.8" />
          {/* Grid lines vertical */}
          <line x1="45" y1="28" x2="25" y2="52" stroke="#93C5FD" strokeWidth="1" strokeOpacity="0.8" />
          <line x1="68" y1="21" x2="52" y2="65" stroke="#93C5FD" strokeWidth="1" strokeOpacity="0.8" />
          <line x1="90" y1="15" x2="78" y2="72" stroke="#93C5FD" strokeWidth="1" strokeOpacity="0.8" />
          <line x1="112" y1="26" x2="105" y2="58" stroke="#93C5FD" strokeWidth="1" strokeOpacity="0.8" />
          {/* Mounting Stand */}
          <line x1="60" y1="76" x2="60" y2="88" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
          <line x1="115" y1="46" x2="115" y2="75" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      {/* Laptop Mockup Displaying Kumar Solar Panel Website */}
      <div className="relative w-[170px] sm:w-[185px] z-20 mt-14 ml-3 shadow-2xl transition-transform hover:scale-[1.02]">
        {/* Lid & Screen */}
        <div className="bg-[#0B132B] rounded-t-lg p-1 border border-slate-600/80 shadow-lg">
          {/* Browser Bar */}
          <div className="flex items-center justify-between pb-0.5 px-1 bg-slate-900 rounded-t text-[6px] text-slate-300">
            <div className="flex gap-0.5">
              <span className="w-1 h-1 rounded-full bg-rose-500" />
              <span className="w-1 h-1 rounded-full bg-amber-500" />
              <span className="w-1 h-1 rounded-full bg-emerald-500" />
            </div>
            <span className="font-mono text-[5.5px] text-slate-400 truncate max-w-[85px]">
              kumar-solar-panel-website
            </span>
          </div>

          {/* Web Page Screen */}
          <div className="bg-[#0A1128] rounded-b overflow-hidden text-white p-1 text-[7px] leading-tight">
            {/* Nav */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-0.5 mb-1">
              <span className="font-bold text-[6.5px] text-amber-400">Kumar Solar Panel</span>
              <div className="flex gap-1 text-[5px] text-slate-300">
                <span>Home</span>
                <span>Services</span>
              </div>
            </div>

            {/* Hero Banner with Solar House */}
            <div className="bg-gradient-to-r from-blue-900/90 to-amber-950/80 rounded p-1 border border-blue-800/40">
              <div className="text-[7.5px] font-black text-amber-300 leading-none">
                Clean Energy
              </div>
              <div className="text-[7px] font-extrabold text-white leading-none mt-0.5">
                Brighter Tomorrow
              </div>

              {/* Mini Rooftop House */}
              <div className="mt-1 flex items-center justify-between">
                <div className="text-[5px] text-slate-300">Rooftop Solar Solutions</div>
                <div className="text-[9px]">🏡☀️</div>
              </div>
            </div>
          </div>
        </div>

        {/* Laptop Base */}
        <div className="h-1.5 bg-gradient-to-b from-slate-400 via-slate-500 to-slate-700 rounded-b-md shadow-md flex items-center justify-center">
          <div className="w-8 h-0.5 bg-slate-300 rounded-full" />
        </div>
      </div>
    </div>
  );
}
