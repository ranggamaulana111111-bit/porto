"use client";

import { motion } from "framer-motion";

export function AlkonekMapMockup() {
  const markers = [
    { x: 120, y: 90, c: "#7cc49a", t: "ODP-01" },
    { x: 250, y: 140, c: "#7cc49a", t: "ODP-02" },
    { x: 300, y: 80, c: "#d4b48a", t: "ODP-03" },
    { x: 180, y: 175, c: "#d08a86", t: "ODP-04" },
  ];
  const legend = [
    { c: "#7cc49a", t: "Aktif" },
    { c: "#d4b48a", t: "Perhatian" },
    { c: "#d08a86", t: "Mati" },
  ];

  return (
    <svg
      viewBox="0 0 400 250"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Peta ODP interaktif"
    >
      <rect width="400" height="250" fill="#11202b" />
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="250" stroke="#1a2430" strokeWidth="1" />
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 50} x2="400" y2={i * 50} stroke="#1a2430" strokeWidth="1" />
      ))}
      <path d="M40 210 L360 50" stroke="#25323f" strokeWidth="7" strokeLinecap="round" />
      <path d="M60 40 L300 220" stroke="#25323f" strokeWidth="7" strokeLinecap="round" />
      <path d="M300 180 q40 -20 70 10 q-10 40 -50 35 q-40 -5 -20 -45 z" fill="#13262f" />

      {markers.map((m) => (
        <g key={m.t}>
          <circle cx={m.x} cy={m.y} r="11" fill={m.c} opacity="0.22" />
          <circle cx={m.x} cy={m.y} r="6" fill={m.c} stroke="#0f1620" strokeWidth="2" />
          <text x={m.x + 14} y={m.y + 3} fontSize="9" fill="#a7b3c2" fontFamily="monospace">
            {m.t}
          </text>
        </g>
      ))}

      <rect x="12" y="12" width="120" height="22" rx="5" fill="#182230" stroke="#233040" />
      <text x="20" y="27" fontSize="10" fill="#7e8a9c" fontFamily="monospace">
        Cari ODP…
      </text>

      <g transform="translate(296,12)">
        <rect width="92" height="58" rx="6" fill="#182230" stroke="#233040" />
        {legend.map((l, i) => (
          <g key={l.t} transform={`translate(10,${12 + i * 15})`}>
            <circle cx="5" cy="0" r="4" fill={l.c} />
            <text x="16" y="3" fontSize="9" fill="#a7b3c2" fontFamily="monospace">
              {l.t}
            </text>
          </g>
        ))}
      </g>

      <text x="12" y="240" fontSize="10" fill="#a7b3c2" fontFamily="monospace">
        Peta ODP · Alkonek
      </text>
    </svg>
  );
}

export function AlkonekPlusChartMockup() {
  const dl = "M20 180 L60 150 L100 160 L140 120 L180 132 L220 92 L260 110 L300 80 L340 96 L380 70";
  const ul = "M20 200 L60 192 L100 196 L140 182 L180 188 L220 172 L260 180 L300 166 L340 174 L380 162";
  const area = `${dl} L380 220 L20 220 Z`;

  return (
    <svg
      viewBox="0 0 400 250"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Grafik kecepatan real-time"
    >
      <defs>
        <linearGradient id="dlFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8db8cf" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#8db8cf" stopOpacity="0" />
        </linearGradient>
      </defs>

      {Array.from({ length: 5 }).map((_, i) => (
        <line
          key={i}
          x1="20"
          y1={60 + i * 40}
          x2="380"
          y2={60 + i * 40}
          stroke="#1a2430"
          strokeWidth="1"
        />
      ))}

      <motion.path
        d={area}
        fill="url(#dlFill)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      />
      <motion.path
        d={dl}
        fill="none"
        stroke="#8db8cf"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.1, ease: "easeInOut" }}
      />
      <motion.path
        d={ul}
        fill="none"
        stroke="#5fb6ad"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.1, ease: "easeInOut", delay: 0.15 }}
      />

      {["0s", "10s", "20s", "30s"].map((t, i) => (
        <text key={t} x={20 + i * 120} y="238" fontSize="8" fill="#5b6677" fontFamily="monospace">
          {t}
        </text>
      ))}
      <text
        x="6"
        y="60"
        fontSize="8"
        fill="#5b6677"
        fontFamily="monospace"
        transform="rotate(-90 6 60)"
      >
        Mbps
      </text>

      <g transform="translate(248,12)">
        <circle cx="0" cy="0" r="4" fill="#8db8cf" />
        <text x="10" y="3" fontSize="9" fill="#a7b3c2" fontFamily="monospace">
          Download
        </text>
        <circle cx="0" cy="16" r="4" fill="#5fb6ad" />
        <text x="10" y="19" fontSize="9" fill="#a7b3c2" fontFamily="monospace">
          Upload
        </text>
      </g>
    </svg>
  );
}
