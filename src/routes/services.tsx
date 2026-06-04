import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bitcoin, LineChart, Globe2, ShieldCheck, Zap } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { PageBackground } from "@/components/page-background";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — ChainForge" },
      {
        name: "description",
        content:
          "Institutional-grade payment rails, broker funding, withdrawals and crypto transfers for serious traders.",
      },
      { property: "og:title", content: "Services — ChainForge" },
      {
        property: "og:description",
        content:
          "Instant deposits, fast withdrawals, multi-chain transfers — built for the way modern traders move capital.",
      },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden">
        <PageBackground variant="soft" />
        <div className="relative mx-auto max-w-5xl px-6 pt-24 pb-16 text-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.25em] text-primary-glow">Elite Services</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display mt-5 text-5xl md:text-7xl">
              <span className="text-gradient">Institutional grade</span>{" "}
              <br />
              <span className="text-accent-gradient italic">financial rails.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-7 max-w-2xl text-muted-foreground md:text-lg">
              Two specialised tracks, one frictionless gateway. From MT5 funding to
              cold-storage withdrawals — capital moves at the speed of the markets.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 2. ORIGINAL TRACKS (Forex & Crypto Traders) */}
      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-16 md:grid-cols-2">
        <Reveal>
          <Card
            icon={<LineChart className="h-5 w-5" />}
            title="Forex traders"
            tag="Track 01"
            items={[
              ["Instant deposits", "Fund MT4, MT5, cTrader and other brokerage accounts without delay."],
              ["Fast withdrawals", "Access profits quickly with streamlined withdrawal processing."],
              ["Multiple currencies", "USD, EUR, GBP and more — at competitive exchange rates."],
            ]}
          />
        </Reveal>
        <Reveal delay={0.08}>
          <Card
            icon={<Bitcoin className="h-5 w-5" />}
            title="Crypto traders"
            tag="Track 02"
            items={[
              ["One-click transfers", "Deposit crypto from your wallet to Binance, Coinbase, Bybit and more."],
              ["Direct to wallet", "Withdraw gains straight to your secure cold storage."],
              ["Multi-chain support", "Seamless transactions across major blockchain networks."],
            ]}
          />
        </Reveal>
      </section>

      {/* 3. ORIGINAL BENEFITS ROW */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: <ShieldCheck className="h-5 w-5" />, t: "Verified counterparties", d: "Every transaction reconciled against a vetted broker or exchange." },
            { icon: <Zap className="h-5 w-5" />, t: "Sub-minute settlement", d: "Median settlement under 60 seconds for verified accounts." },
            { icon: <Globe2 className="h-5 w-5" />, t: "Global coverage", d: "Operating across Africa, EU and APAC with local-rail support." },
          ].map((b, i) => (
            <Reveal key={b.t} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-border bg-card/40 p-6 backdrop-blur-sm">
                <div className="text-primary-glow">{b.icon}</div>
                <p className="mt-4 font-medium">{b.t}</p>
                <p className="mt-2 text-sm text-muted-foreground">{b.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 4. TRUE FUNDEDNEXT BENTO DESIGN GRID */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-12 items-stretch">
          
          {/* Left Column Container: Houses the two vertically stacked promotional blocks */}
          <div className="md:col-span-5 flex flex-col gap-6 justify-between">
            
            {/* Upper Promotion Card: 24h Payouts layout style */}
            <Reveal delay={0.04}>
              <div className="group relative flex flex-col justify-between h-[210px] overflow-hidden rounded-[24px] bg-[#1d144d] border border-white/5 p-7 transition-all duration-300 hover:scale-[1.01]">
                <div className="flex items-start justify-between gap-4">
                  <div className="max-w-[70%]">
                    <h3 className="text-xl font-bold text-white tracking-tight leading-tight">24 Hours Payout</h3>
                    <p className="mt-2.5 text-xs font-normal text-white/70 leading-relaxed">
                      Your payout processed within 24 hours guaranteed or we add an extra $1,000 to your account.
                    </p>
                  </div>
                  <div className="w-14 h-14 shrink-0 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-105 transition-transform duration-300">
                    <Zap className="w-7 h-7 text-yellow-400 fill-yellow-400" />
                  </div>
                </div>
                <div className="mt-4 inline-flex self-start bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-1.5 text-[10px] font-mono font-bold tracking-wider text-emerald-400">
                  GUARANTEED BRAND PROMISE
                </div>
              </div>
            </Reveal>

            {/* Lower Promotion Card: Transforming Journeys / Account Scale style */}
            <Reveal delay={0.08}>
              <div className="group relative flex flex-col justify-between h-[210px] overflow-hidden rounded-[24px] bg-[#0c29d6] border border-white/5 p-7 transition-all duration-300 hover:scale-[1.01]">
                <div className="flex items-start justify-between gap-4">
                  <div className="max-w-[70%]">
                    <h3 className="text-xl font-bold text-white tracking-tight leading-tight">Prime Infrastructure</h3>
                    <p className="mt-2.5 text-xs font-normal text-white/80 leading-relaxed">
                      Transforming global trading journeys through raw conditions and industry-leading liquidity desk allocation.
                    </p>
                  </div>
                  <div className="w-14 h-14 shrink-0 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-105 transition-transform duration-300">
                    <ShieldCheck className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div className="flex items-center gap-2 self-start px-0.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                  </span>
                  <span className="text-[10px] font-mono font-bold text-white/90 uppercase tracking-widest">LIVE SCALE PROGRAM VIA ASSETS</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Main Showcase Block: Wide grid layout mimicking the laptop terminal viewer */}
          <div className="md:col-span-7">
            <Reveal delay={0.12}>
              <div className="group relative h-full min-h-[444px] overflow-hidden rounded-[24px] bg-gradient-to-br from-[#0c0720] via-[#070414] to-[#020105] border border-white/5 p-8 md:p-10 flex flex-col justify-between transition-all duration-300 hover:border-primary/20">
                <div className="absolute inset-0 bg-grid opacity-[0.15] pointer-events-none mix-blend-overlay" />
                
                <div className="relative z-10 grid gap-8 md:grid-cols-12 items-center h-full">
                  <div className="md:col-span-7 flex flex-col justify-between h-full py-2">
                    <div>
                      <h3 className="text-2xl font-bold tracking-tight text-white md:text-3xl leading-tight">Best Trading Conditions</h3>
                      <p className="mt-3.5 text-sm font-medium text-white/80 leading-snug">
                        Trade on our main label infrastructure with MT4, MT5 & cTrader.
                      </p>
                      <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
                        Advanced MQ licenses, tight raw execution parameters, and customized dashboard environments ensure unmatched trade processing speed.
                      </p>
                    </div>

                    {/* Circular Platform Indicators precisely aligned */}
                    <div className="mt-8 flex flex-wrap items-center gap-3">
                      {[
                        { label: "5", bg: "bg-blue-600/10 text-blue-400 border-blue-500/20" },
                        { label: "4", bg: "bg-indigo-600/10 text-indigo-400 border-indigo-500/20" },
                        { label: "c", bg: "bg-amber-600/10 text-amber-400 border-amber-500/20" },
                        { label: "M", bg: "bg-emerald-600/10 text-emerald-400 border-emerald-500/20" }
                      ].map((item, index) => (
                        <div 
                          key={index} 
                          className={`w-11 h-11 rounded-full ${item.bg} border flex items-center justify-center font-display text-base font-bold shadow-inner transform transition-transform duration-200 hover:scale-110`}
                        >
                          {item.label}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Offset Angled Mockup Frame Container */}
                  <div className="md:col-span-5 relative self-end justify-self-end w-full max-w-[280px] md:max-w-none pt-4 md:pt-0">
                    <div className="relative rounded-xl border border-white/10 overflow-hidden shadow-2xl rotate-[-4deg] md:rotate-[-6deg] translate-x-4 translate-y-6 origin-bottom-right transition-transform duration-500 group-hover:rotate-[-2deg] group-hover:translate-x-2">
                      <img 
                        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80" 
                        alt="Trading dashboard mockup execution" 
                        className="w-full h-auto object-cover brightness-90 saturate-120" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      {/* 5. BRIDGE CTA CARD SECTION */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-card/80 to-background p-10 md:p-14">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_0%_100%,oklch(0.55_0.22_250_/_0.4),transparent_60%)]" />
            <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <h3 className="font-display text-3xl md:text-4xl">
                  <span className="text-gradient">Ready to bridge</span>{" "}
                  <span className="text-accent-gradient italic">your capital?</span>
                </h3>
                <p className="mt-3 max-w-xl text-sm text-muted-foreground">
                  Onboard in minutes with a dedicated account manager.
                </p>
              </div>
              <Link
                to="/contact"
                className="secondary-glass-button group gap-2 text-sm font-medium tracking-wide shadow-glow"
              >
                Open an account
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

/* Helper Grid Layout Component Block */
function Card({
  icon,
  title,
  tag,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  tag: string;
  items: [string, string][];
}) {
  return (
    <div className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card/40 p-8 backdrop-blur-sm transition-colors hover:border-primary/40">
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/20 opacity-0 blur-3xl transition-opacity group-hover:opacity-100" />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary-glow/30 to-primary/20 text-primary-glow">
            {icon}
          </div>
          <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
        </div>
        <span className="font-mono text-xs text-muted-foreground">{tag}</span>
      </div>
      <div className="mt-6 divide-y divide-border">
        {items.map(([t, d]) => (
          <div key={t} className="py-4 first:pt-0 last:pb-0">
            <p className="text-sm font-medium">{t}</p>
            <p className="mt-1 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}