"use client";

import React from "react";

export function HeadphonesIllustration({
  className = "w-36 h-36",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} text-stone-200 stroke-current`}
    >
      <path
        d="M 45 130 C 42 70, 70 30, 100 30 C 130 30, 158 70, 155 130"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M 52 125 C 49 76, 74 40, 100 40 C 126 40, 151 76, 148 125"
        strokeWidth="1.8"
        strokeDasharray="4 3"
      />

      <path d="M 40 120 L 52 120" strokeWidth="3" strokeLinecap="round" />
      <path d="M 148 120 L 160 120" strokeWidth="3" strokeLinecap="round" />
      <rect
        x="41"
        y="118"
        width="10"
        height="18"
        rx="2"
        strokeWidth="2"
        fill="#181818"
      />
      <rect
        x="149"
        y="118"
        width="10"
        height="18"
        rx="2"
        strokeWidth="2"
        fill="#181818"
      />

      <path
        d="M 46 136 C 36 142, 34 165, 38 185"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="46" cy="136" r="3" fill="currentColor" />

      <g transform="translate(18, 145) rotate(-10)">
        <ellipse
          cx="32"
          cy="40"
          rx="22"
          ry="32"
          strokeWidth="2.5"
          fill="#141414"
        />
        <ellipse
          cx="32"
          cy="40"
          rx="16"
          ry="24"
          strokeWidth="1.5"
          strokeDasharray="3 2"
        />
        <line
          x1="22"
          y1="30"
          x2="42"
          y2="50"
          strokeWidth="1"
          strokeOpacity="0.6"
        />
        <line
          x1="22"
          y1="50"
          x2="42"
          y2="30"
          strokeWidth="1"
          strokeOpacity="0.6"
        />
        <line
          x1="26"
          y1="24"
          x2="38"
          y2="56"
          strokeWidth="1"
          strokeOpacity="0.6"
        />
        <line
          x1="38"
          y1="24"
          x2="26"
          y2="56"
          strokeWidth="1"
          strokeOpacity="0.6"
        />
        <path
          d="M 14 25 C 10 38, 10 46, 16 58"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>

      <path
        d="M 154 136 C 164 142, 166 165, 162 185"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="154" cy="136" r="3" fill="currentColor" />

      <g transform="translate(122, 145) rotate(10)">
        <ellipse
          cx="28"
          cy="40"
          rx="22"
          ry="32"
          strokeWidth="2.5"
          fill="#141414"
        />
        <ellipse
          cx="28"
          cy="40"
          rx="16"
          ry="24"
          strokeWidth="1.5"
          strokeDasharray="3 2"
        />
        <line
          x1="18"
          y1="30"
          x2="38"
          y2="50"
          strokeWidth="1"
          strokeOpacity="0.6"
        />
        <line
          x1="18"
          y1="50"
          x2="38"
          y2="30"
          strokeWidth="1"
          strokeOpacity="0.6"
        />
        <line
          x1="22"
          y1="24"
          x2="34"
          y2="56"
          strokeWidth="1"
          strokeOpacity="0.6"
        />
        <line
          x1="34"
          y1="24"
          x2="22"
          y2="56"
          strokeWidth="1"
          strokeOpacity="0.6"
        />
        <path
          d="M 46 25 C 50 38, 50 46, 44 58"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>

      <path
        d="M 44 210 C 44 228, 65 235, 75 220 C 85 205, 95 238, 120 236 C 145 234, 156 225, 156 210"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function VintageMicrophoneIllustration({
  className = "w-48 h-64",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 240 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} text-stone-300 stroke-current`}
    >
      <g strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.8">
        <line x1="30" y1="70" x2="45" y2="80" />
        <line x1="20" y1="100" x2="40" y2="105" />
        <line x1="35" y1="130" x2="50" y2="125" />
        <line x1="210" y1="70" x2="195" y2="80" />
        <line x1="220" y1="100" x2="200" y2="105" />
        <line x1="205" y1="130" x2="190" y2="125" />
      </g>

      <path
        d="M 90 60 C 90 35, 150 35, 150 60 L 150 140 C 150 160, 90 160, 90 140 Z"
        strokeWidth="3"
        fill="#181818"
      />

      <g strokeWidth="1.2" strokeOpacity="0.75">
        <line x1="90" y1="60" x2="150" y2="60" />
        <line x1="90" y1="80" x2="150" y2="80" />
        <line x1="90" y1="100" x2="150" y2="100" />
        <line x1="90" y1="120" x2="150" y2="120" />
        <line x1="90" y1="140" x2="150" y2="140" />

        <line x1="102" y1="45" x2="102" y2="145" />
        <line x1="114" y1="40" x2="114" y2="148" />
        <line x1="126" y1="40" x2="126" y2="148" />
        <line x1="138" y1="45" x2="138" y2="145" />
      </g>

      <rect
        x="88"
        y="95"
        width="64"
        height="12"
        rx="3"
        strokeWidth="2.5"
        fill="#202020"
      />
      <circle cx="120" cy="101" r="3" fill="#FF7B60" stroke="#FF7B60" />

      <path
        d="M 95 155 L 145 155 L 140 190 L 100 190 Z"
        strokeWidth="2.5"
        fill="#161616"
      />

      <path
        d="M 72 120 C 70 185, 170 185, 168 120"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <circle cx="72" cy="120" r="5" strokeWidth="2" fill="#121212" />
      <circle cx="168" cy="120" r="5" strokeWidth="2" fill="#121212" />

      <rect
        x="114"
        y="185"
        width="12"
        height="25"
        rx="2"
        strokeWidth="2.5"
        fill="#222"
      />
      <circle cx="120" cy="210" r="5" strokeWidth="2.5" fill="#333" />

      <line
        x1="120"
        y1="215"
        x2="120"
        y2="280"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <rect
        x="112"
        y="240"
        width="16"
        height="8"
        rx="2"
        strokeWidth="2"
        fill="#262626"
      />

      <ellipse
        cx="120"
        cy="285"
        rx="55"
        ry="14"
        strokeWidth="3"
        fill="#161616"
      />
      <ellipse
        cx="120"
        cy="283"
        rx="42"
        ry="10"
        strokeWidth="1.5"
        strokeDasharray="3 3"
      />
      <ellipse cx="120" cy="281" rx="20" ry="5" strokeWidth="2" fill="#222" />
    </svg>
  );
}

export function RotatingStampBadge({
  size = 140,
  onClick,
}: {
  size?: number;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick?.()}
      className="relative flex items-center justify-center cursor-pointer select-none group transition-transform duration-300 hover:scale-105 active:scale-95"
      style={{ width: size, height: size }}
      title="Binge podcast in order!"
    >
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full animate-spin-slow transition-transform duration-500 ease-out"
      >
        <defs>
          <path
            id="textPathCircle"
            d="M 100, 100 m -76, 0 a 76,76 0 1,1 152,0 a 76,76 0 1,1 -152,0"
          />
        </defs>
        <circle
          cx="100"
          cy="100"
          r="92"
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <circle
          cx="100"
          cy="100"
          r="86"
          fill="none"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="1.5"
        />
        <text
          fill="#FFFFFF"
          fontSize="13"
          fontWeight="700"
          letterSpacing="4"
          className="uppercase tracking-widest font-sans select-none"
        >
          <textPath href="#textPathCircle" startOffset="0%">
            • NEW PODCAST OUT NOW • NEW PODCAST OUT NOW
          </textPath>
        </text>
      </svg>

      <div className="absolute inset-[30%] bg-white rounded-full flex flex-col items-center justify-center shadow-lg text-slate-950 p-2 text-center transition-all duration-300 group-hover:bg-[#FF7B60] group-hover:text-white">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 mb-0.5 transition-transform duration-300 group-hover:-translate-y-1"
        >
          <path d="M12 19V5" />
          <path d="M5 12l7-7 7 7" />
        </svg>
        <span className="text-[8px] font-extrabold leading-tight tracking-wider uppercase">
          Binge in
          <br />
          order!
        </span>
      </div>
    </div>
  );
}

export function AsteriskIcon({
  className = "w-6 h-6",
  color = "#25C0D0",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      className={className}
    >
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      <line x1="4.93" y1="19.07" x2="19.07" y2="4.93" />
    </svg>
  );
}

export function LineFlowerStarburst({
  className = "w-12 h-12",
  color = "rgba(255,255,255,0.7)",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      className={`${className} animate-spin-reverse-slow`}
    >
      {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5].map((angle, i) => (
        <g key={i} transform={`rotate(${angle} 50 50)`}>
          <line x1="50" y1="12" x2="50" y2="88" />
          <circle cx="50" cy="12" r="1.5" fill={color} />
          <circle cx="50" cy="88" r="1.5" fill={color} />
        </g>
      ))}
      <circle cx="50" cy="50" r="8" strokeWidth="1.5" />
    </svg>
  );
}

export function SoundWaveWidget({
  active = true,
  barCount = 14,
  height = "h-6",
  color = "#25C0D0",
}: {
  active?: boolean;
  barCount?: number;
  height?: string;
  color?: string;
}) {
  const delays = [
    0.1, 0.4, 0.2, 0.6, 0.3, 0.5, 0.15, 0.45, 0.25, 0.65, 0.35, 0.55, 0.2, 0.5,
  ];

  return (
    <div className={`flex items-center gap-0.75 ${height}`}>
      {Array.from({ length: barCount }).map((_, i) => (
        <span
          key={i}
          className="w-[2.5px] rounded-full transition-all duration-300"
          style={{
            backgroundColor: color,
            height: active ? "100%" : "20%",
            animation: active
              ? `wavePulse 1.1s ease-in-out infinite ${delays[i % delays.length]}s`
              : "none",
          }}
        />
      ))}
    </div>
  );
}
