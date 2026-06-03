"use client";

import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Wallet,
  BarChart3,
  ShieldCheck,
  Zap,
  Bitcoin,
  LineChart,
  Sparkles,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { PageBackground } from "@/components/page-background";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ChainForge — Forge your wealth with The Forex Mafia" },
      {
        name: "description",
        content:
          "Premium AI-driven signals, instant deposits and seamless withdrawals across Deriv, Weltrade and major brokers. Join the ChainForge family.",
      },
      { property: "og:title", content: "ChainForge — The Forex Mafia" },
      {
        property: "og:description",
        content:
          "Institutional-grade payment infrastructure and AI-driven signals for forex and crypto traders.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <Brokers />
      <Pillars />
      <BridgeCTA />
    </>
  );
}

function Hero() {
  return (
    <section className="relative">
      <PageBackground />
      <div className="relative mx-auto max-w-5xl px-6 pt-24 pb-32 text-center md:pt-36 md:pb-44">
        <Reveal>
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs text-black backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Premium Trading Signals Available
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="font-display mt-8 text-6xl leading-[1.0] md:text-8xl">
            <span className="text-black">Forge your wealth</span>
            <br />
            <span className="text-black italic">with The Forex Mafia.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-black md:text-lg">
            Signal provision and seamless transactions for traders. We bridge your capital
            to Deriv, Weltrade and every major broker — settled fast, priced fair, watched
            24/7 by our AI desk.
          </p>
        </Reveal>

        <Reveal delay={0.22}>
          <div className="mt-12 flex flex-row items-center justify-center gap-4">
            {/* --- LIVELY DEPOSIT BUTTON --- */}
            <Link
              to="/deposit"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[linear-gradient(135deg,#111111_0%,#333333_50%,#111111_100%)] bg-[length:200%_200%] bg-[position:left_center] px-7 py-3.5 text-sm font-medium text-white shadow-[0_4px_15px_rgba(0,0,0,0.15)] transition-all duration-500 ease-out hover:-translate-y-0.5 hover:scale-[1.03] hover:bg-[position:right_center] hover:shadow-[0_12px_25px_rgba(0,0,0,0.3)]"
            >
              {/* Shimmer overlay effect */}
              <span className="absolute top-0 -left-[75%] z-10 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-none group-hover:left-[125%] group-hover:transition-all group-hover:duration-1000 group-hover:ease-in-out" />
              
              <span className="relative z-20 flex items-center gap-2">
                Deposit
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>

            {/* --- LIVELY WITHDRAWAL BUTTON --- */}
            <Link
              to="/withdrawal"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-neutral-300 bg-white/80 bg-[linear-gradient(135deg,rgba(255,255,255,0)_0%,rgba(240,240,240,1)_50%,rgba(255,255,255,0)_100%)] bg-[length:200%_200%] bg-[position:left_center] px-7 py-3.5 text-sm font-medium text-black backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-0.5 hover:scale-[1.03] hover:border-black hover:bg-[position:right_center] hover:shadow-[0_10px_20px_rgba(0,0,0,0.08)]"
            >
              {/* Shimmer overlay effect */}
              <span className="absolute top-0 -left-[75%] z-10 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-black/5 to-transparent transition-none group-hover:left-[125%] group-hover:transition-all group-hover:duration-1000 group-hover:ease-in-out" />
              
              <span className="relative z-20 flex items-center gap-2">
                <Wallet className="h-4 w-4 transition-transform group-hover:rotate-6" />
                Withdrawal
              </span>
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.32}>
          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-black">
            <Pill icon={<BarChart3 className="h-3.5 w-3.5" />} label="Premium Signals" />
            <Pill icon={<Wallet className="h-3.5 w-3.5" />} label="Funding & Withdrawals" />
            <Pill icon={<ShieldCheck className="h-3.5 w-3.5" />} label="Secure Transactions" />
            <Pill icon={<Zap className="h-3.5 w-3.5" />} label="Instant Processing" />
          </div>
          
          <div className="mt-12 flex justify-center overflow-hidden h-28 items-center pointer-events-none">
            <img 
              src="/TFM.png" 
              alt="The Forex Mafia Branding" 
              className="h-[280px] w-auto object-contain -my-[84px] block" 
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Pill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-black">{icon}</span>
      {label}
    </div>
  );
}

function Brokers() {
  const brokers = ["DERIV", "WELTRADE", "BINANCE", "BYBIT", "MT5", "cTRADER", "COINBASE"];
  return (
    <section className="relative border-y border-border bg-background/40">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <p className="text-center text-xs uppercase tracking-[0.25em] text-black">
          Trusted across leading brokers & exchanges
        </p>
        <div className="mask-fade-edges mt-7 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-sm font-semibold tracking-[0.18em] text-black">
          {brokers.map((b) => (
            <span key={b} className="transition-opacity hover:opacity-100">
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pillars() {
  const items = [
    {
      n: "01",
      icon: <LineChart className="h-5 w-5" />,
      title: "Signals desk",
      body: "Tier-1 setups delivered with entry, SL and TP — distributed across our private channels in real time.",
    },
    {
      n: "02",
      icon: <Bitcoin className="h-5 w-5" />,
      title: "Liquidity bridge",
      body: "Move USD, EUR, GBP and stablecoins between brokers and wallets without manual reconciliation.",
    },
    {
      n: "03",
      icon: <Sparkles className="h-5 w-5" />,
      title: "AI analyser",
      body: "Multi-timeframe market scans across FX majors, indices and crypto — every fifteen minutes.",
    },
  ];

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-32">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-black">The Forge</p>
          <h2 className="font-display mt-4 text-4xl md:text-6xl">
            <span className="text-black">A trading desk,</span>{" "}
            <span className="text-black italic">re-engineered.</span>
          </h2>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-5 md:grid-cols-3">
        {items.map((it, i) => (
          <Reveal key={it.n} delay={i * 0.08}>
            <div className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card/40 p-7 backdrop-blur-sm transition-colors hover:border-primary/40">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/15 opacity-0 blur-3xl transition-opacity group-hover:opacity-100" />
              <div className="flex items-center justify-between text-black">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-neutral-100">
                  {it.icon}
                </div>
                <span className="font-mono text-xs text-black">{it.n}</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold tracking-tight text-black">{it.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-black">{it.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function BridgeCTA() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-16">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-card/80 to-background p-10 md:p-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_100%_0%,oklch(0.62_0.18_160_/_0.15),transparent_60%)]" />
          
          <div className="relative grid gap-10 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7">
              <p className="text-xs uppercase tracking-[0.25em] text-black font-semibold">
                Instant Intelligence
              </p>
              <h3 className="font-display mt-4 text-3xl md:text-5xl">
                <span className="text-black">Join our WhatsApp</span>{" "}
                <span className="text-black italic">
                  broadcast channel.
                </span>
              </h3>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-black md:text-base">
                Get real-time market updates, tier-1 trading setups, and exclusive platform releases sent straight to your phone as they happen.
              </p>
            </div>
            
            <div className="md:col-span-5 md:justify-self-end">
              <a
                href="https://whatsapp.com/channel/YOUR_CHANNEL_ID"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-emerald-500 to-emerald-600 px-7 py-3.5 text-sm font-medium text-white shadow-[0_4px_20px_rgba(16,185,129,0.3)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_4px_25px_rgba(16,185,129,0.45)]"
              >
                Enter the channel
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}