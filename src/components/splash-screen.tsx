"use client";

import { useEffect, useState } from "react";

/**
 * Boot splash: ChainForge logo pops up with a soft glow on first load,
 * then dismisses smoothly. Skipped on subsequent navigations within the
 * same tab session.
 */
export function SplashScreen() {
  const [show, setShow] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem("cf_splash_shown")) return;
      sessionStorage.setItem("cf_splash_shown", "1");
    } catch {
      /* ignore */
    }
    setShow(true);
    const leave = setTimeout(() => setLeaving(true), 1300);
    const off = setTimeout(() => setShow(false), 1900);
    return () => {
      clearTimeout(leave);
      clearTimeout(off);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#030303] transition-opacity duration-[600ms] ${
        leaving ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="absolute h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.55),rgba(99,102,241,0.25)_40%,transparent_70%)] blur-3xl splash-pulse" />
      <img
        src="/q.png"
        alt="ChainForge"
        className="relative h-48 w-auto object-contain splash-pop drop-shadow-[0_0_45px_rgba(139,92,246,0.7)]"
      />
      <style>{`
        @keyframes splashPop {
          0%   { transform: scale(0.6); opacity: 0; filter: blur(8px); }
          60%  { transform: scale(1.08); opacity: 1; filter: blur(0); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes splashPulse {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50%      { opacity: 0.9;  transform: scale(1.12); }
        }
        .splash-pop   { animation: splashPop 0.9s cubic-bezier(0.16,1,0.3,1) both; }
        .splash-pulse { animation: splashPulse 1.6s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
