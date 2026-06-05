"use client";

import { useEffect, useMemo, useState } from "react";

/**
 * Lively, minimal animated background:
 * - Drifting starfield (CSS keyframes)
 * - Two slow-moving SVG line-chart paths (forex feel)
 * - Soft scanline grid
 * Rendered fixed behind the entire app; pointer-events disabled.
 */
export function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Stable seeded stars (deterministic for SSR/CSR parity)
  const stars = useMemo(() => {
    const out: { x: number; y: number; s: number; d: number; o: number }[] = [];
    let seed = 7;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    for (let i = 0; i < 90; i++) {
      out.push({
        x: rand() * 100,
        y: rand() * 100,
        s: rand() * 1.6 + 0.4,
        d: rand() * 6 + 3,
        o: rand() * 0.7 + 0.2,
      });
    }
    return out;
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Stars layer */}
      <div className="absolute inset-0">
        {mounted &&
          stars.map((st, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-white animate-twinkle-soft"
              style={{
                left: `${st.x}%`,
                top: `${st.y}%`,
                width: `${st.s}px`,
                height: `${st.s}px`,
                opacity: st.o,
                animationDuration: `${st.d}s`,
                animationDelay: `${(i % 10) * 0.3}s`,
                boxShadow: "0 0 6px rgba(255,255,255,0.6)",
              }}
            />
          ))}
      </div>

      {/* Moving line chart SVG — two layered drifting paths */}
      <svg
        className="absolute inset-x-0 bottom-0 h-[60vh] w-full opacity-[0.22]"
        viewBox="0 0 1200 400"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="chartA" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="chartB" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="lineA" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#A855F7" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#A855F7" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#A855F7" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="lineB" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#22D3EE" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Chart A (slow drift) */}
        <g className="chart-drift-a">
          <path
            d="M0,260 C100,220 180,300 260,250 C340,200 420,180 520,210 C620,240 700,290 800,240 C900,190 1000,160 1100,200 L1200,180 L1200,400 L0,400 Z"
            fill="url(#chartA)"
          />
          <path
            d="M0,260 C100,220 180,300 260,250 C340,200 420,180 520,210 C620,240 700,290 800,240 C900,190 1000,160 1100,200 L1200,180"
            fill="none"
            stroke="url(#lineA)"
            strokeWidth="2"
          />
        </g>

        {/* Chart B (counter drift) */}
        <g className="chart-drift-b">
          <path
            d="M0,320 C120,300 220,340 320,310 C420,280 520,260 640,290 C760,320 860,350 980,310 C1080,280 1160,260 1200,270 L1200,400 L0,400 Z"
            fill="url(#chartB)"
          />
          <path
            d="M0,320 C120,300 220,340 320,310 C420,280 520,260 640,290 C760,320 860,350 980,310 C1080,280 1160,260 1200,270"
            fill="none"
            stroke="url(#lineB)"
            strokeWidth="2"
          />
        </g>
      </svg>

      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" />

      <style>{`
        @keyframes twinkleSoft {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.95; transform: scale(1.4); }
        }
        .animate-twinkle-soft {
          animation-name: twinkleSoft;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }
        @keyframes chartDriftA {
          0%   { transform: translate3d(0,0,0); }
          50%  { transform: translate3d(-60px,-12px,0); }
          100% { transform: translate3d(0,0,0); }
        }
        @keyframes chartDriftB {
          0%   { transform: translate3d(0,0,0); }
          50%  { transform: translate3d(80px,8px,0); }
          100% { transform: translate3d(0,0,0); }
        }
        .chart-drift-a { animation: chartDriftA 22s ease-in-out infinite; transform-origin: center; }
        .chart-drift-b { animation: chartDriftB 28s ease-in-out infinite; transform-origin: center; }
      `}</style>
    </div>
  );
}
