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
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span>Premium Trading Signals Available</span>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="font-display mt-8 text-6xl leading-[1.0] md:text-8xl">
            <span className="text-gradient">Forge your wealth</span>
            <br />
            <span className="text-accent-gradient italic">with The Forex Mafia.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Signal provision and seamless transactions for traders. We bridge your capital
            to Deriv, Weltrade and every major broker — settled fast, priced fair, watched
            24/7 by our AI desk.
          </p>
        </Reveal>

        <Reveal delay={0.22}>
          <div className="mt-12 flex flex-row items-center justify-center gap-3">
            <Link
              to="/contact"
              className="premium-button group"
            >
              <span>Deposit</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/contact"
              className="secondary-glass-button"
            >
              <Wallet className="h-4 w-4" />
              <span>Withdrawal</span>
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.32}>
          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-muted-foreground">
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
      <span className="text-primary-glow">{icon}</span>
      {label}
    </div>
  );
}

function Brokers() {
  // Using direct premium web URLs so they display instantly without missing files
  const brokerLogos = [
    { 
      src: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Binance_Logo.svg", 
      alt: "Binance" 
    },
    { 
      src: "https://images.ctfassets.net/7985732m7v09/48wOAtbBvD6Fv6gM5H6Zl2/9b618cf2e4d9b4bfa856e7e83df92d4d/deriv-logo.png", 
      alt: "Deriv" 
    },
    { 
      src: "https://upload.wikimedia.org/wikipedia/commons/4/4f/MetaTrader_4_logo.svg", 
      alt: "MetaTrader 4" 
    },
    { 
      src: "https://upload.wikimedia.org/wikipedia/commons/8/8c/MetaTrader_5_logo.svg", 
      alt: "MetaTrader 5" 
    },
    { 
      src: "https://vignette.wikia.nocookie.net/logopedia/images/d/d0/Weltrade_logo.png/revision/latest?cb=20211119154432", 
      alt: "Weltrade" 
    },
    { 
      src: "https://justmarkets.com/assets/images/logo/justmarkets-logo-white.svg", 
      alt: "Just Markets" 
    },
  ];

  // Duplicating the array for a seamless, unbroken scrolling loop track
  const marqueeItems = [...brokerLogos, ...brokerLogos, ...brokerLogos];

  return (
    <section className="relative border-y border-border bg-background/40 py-12 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-xs uppercase tracking-[0.25em] text-muted-foreground mb-10">
          Trusted across leading brokers & exchanges
        </p>
        
        {/* Container with fading gradient masks on left & right sides */}
        <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_10%,_black_90%,transparent_100%)]">
          <div className="flex w-max animate-infinite-scroll gap-6 py-2">
            {marqueeItems.map((broker, index) => (
              <div
                key={index}
                className="flex h-16 w-32 items-center justify-center rounded-xl border border-border bg-card/40 p-4 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card/60"
              >
                <img
                  src={broker.src}
                  alt={broker.alt}
                  className="max-h-full max-w-full object-contain opacity-70 transition-opacity duration-300 hover:opacity-100 invert-0 brightness-100"
                  onError={(e) => {
                    // Fallback to prevent layout breaking if a URL goes down
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            ))}
          </div>
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
          <p className="text-xs uppercase tracking-[0.25em] text-primary-glow">The Forge</p>
          <h2 className="font-display mt-4 text-4xl md:text-6xl">
            <span className="text-gradient">A trading desk,</span>{" "}
            <span className="text-accent-gradient italic">re-engineered.</span>
          </h2>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-5 md:grid-cols-3">
        {items.map((it, i) => (
          <Reveal key={it.n} delay={i * 0.08}>
            <div className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card/40 p-7 backdrop-blur-sm transition-colors hover:border-primary/40">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/15 opacity-0 blur-3xl transition-opacity group-hover:opacity-100" />
              <div className="flex items-center justify-between text-primary-glow">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary-glow/30 to-primary/20">
                  {it.icon}
                </div>
                <span className="font-mono text-xs text-muted-foreground">{it.n}</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold tracking-tight">{it.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{it.body}</p>
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
              <p className="text-xs uppercase tracking-[0.25em] text-emerald-400 font-semibold drop-shadow-[0_0_12px_rgba(52,211,153,0.3)]">
                Instant Intelligence
              </p>
              <h3 className="font-display mt-4 text-3xl md:text-5xl">
                <span className="text-gradient">Join our WhatsApp</span>{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500 italic">
                  broadcast channel.
                </span>
              </h3>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
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