"use client";

import { useEffect, useMemo, useState } from "react";

/**
 * Infinite, seamless animated background:
 *  - Twinkling starfield that drifts upward forever
 *  - Two parallel forex-style line charts that scroll endlessly (no easing pauses)
 *  - Soft grid overlay
 */
export function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);
  const [lite, setLite] = useState(false);
  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const narrow = window.innerWidth < 768;
    const lowMem =
      typeof navigator !== "undefined" &&
      // @ts-expect-error non-standard but widely available
      ((navigator.deviceMemory && navigator.deviceMemory <= 4) ||
        (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4));
    setLite(isCoarse || reduced || narrow || Boolean(lowMem));
  }, []);

  const stars = useMemo(() => {
    const count = lite ? 38 : 90;
    const out: { x: number; y: number; s: number; d: number; o: number }[] = [];
    let seed = 7;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    for (let i = 0; i < count; i++) {
      out.push({
        x: rand() * 100,
        y: rand() * 100,
        s: rand() * 1.6 + 0.4,
        d: rand() * 6 + 3,
        o: rand() * 0.7 + 0.2,
      });
    }
    return out;
  }, [lite]);

  // Reusable chart path — designed so that placing two copies side-by-side
  // (offset by viewBox width) creates a seamless infinite loop.
  const chartPath =
    "M0,260 C100,220 180,300 260,250 C340,200 420,180 520,210 C620,240 700,290 800,240 C900,190 1000,160 1100,200 L1200,260";
  const chartFill =
    "M0,260 C100,220 180,300 260,250 C340,200 420,180 520,210 C620,240 700,290 800,240 C900,190 1000,160 1100,200 L1200,260 L1200,400 L0,400 Z";

  const chartPathB =
    "M0,320 C120,300 220,340 320,310 C420,280 520,260 640,290 C760,320 860,350 980,310 C1080,280 1160,260 1200,320";
  const chartFillB =
    "M0,320 C120,300 220,340 320,310 C420,280 520,260 640,290 C760,320 860,350 980,310 C1080,280 1160,260 1200,320 L1200,400 L0,400 Z";

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Stars layer with continuous upward drift */}
      <div className="absolute inset-0 stars-drift">
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

      {/* Chart A — infinite scroll */}
      <div className="absolute inset-x-0 bottom-0 h-[60vh] w-[200%] opacity-[0.22] chart-scroll-a">
        <svg viewBox="0 0 2400 400" preserveAspectRatio="none" className="h-full w-full">
          <defs>
            <linearGradient id="chartA" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="lineA" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#A855F7" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#A855F7" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#A855F7" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <g>
            <path d={chartFill} fill="url(#chartA)" />
            <path d={chartPath} fill="none" stroke="url(#lineA)" strokeWidth="2" />
          </g>
          <g transform="translate(1200,0)">
            <path d={chartFill} fill="url(#chartA)" />
            <path d={chartPath} fill="none" stroke="url(#lineA)" strokeWidth="2" />
          </g>
        </svg>
      </div>

      {/* Chart B — counter scroll (skipped on low-power devices) */}
      {!lite && (
        <div className="absolute inset-x-0 bottom-0 h-[60vh] w-[200%] opacity-[0.18] chart-scroll-b">
          <svg viewBox="0 0 2400 400" preserveAspectRatio="none" className="h-full w-full">
            <defs>
              <linearGradient id="chartB" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="lineB" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#22D3EE" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <g>
              <path d={chartFillB} fill="url(#chartB)" />
              <path d={chartPathB} fill="none" stroke="url(#lineB)" strokeWidth="2" />
            </g>
            <g transform="translate(1200,0)">
              <path d={chartFillB} fill="url(#chartB)" />
              <path d={chartPathB} fill="none" stroke="url(#lineB)" strokeWidth="2" />
            </g>
          </svg>
        </div>
      )}

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
        @keyframes starsDrift {
          0%   { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(0, -120px, 0); }
        }
        .stars-drift {
          animation: starsDrift 90s linear infinite;
        }
        @keyframes scrollChartA {
          0%   { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes scrollChartB {
          0%   { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .chart-scroll-a { animation: scrollChartA 60s linear infinite; }
        .chart-scroll-b { animation: scrollChartB 80s linear infinite; }
      `}</style>
    </div>
  );
}
