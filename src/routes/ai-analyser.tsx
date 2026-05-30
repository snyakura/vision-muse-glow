import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Brain, Activity, Target, Sparkles, TrendingUp } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { PageBackground } from "@/components/page-background";

export const Route = createFileRoute("/ai-analyser")({
  head: () => ({
    meta: [
      { title: "AI Analyser — ChainForge" },
      {
        name: "description",
        content:
          "Multi-timeframe AI market intelligence across forex, indices and crypto — delivered in real time.",
      },
      { property: "og:title", content: "AI Analyser — ChainForge" },
      {
        property: "og:description",
        content:
          "Machine-learning models scan every major chart every 15 minutes — surfacing high-conviction setups.",
      },
    ],
  }),
  component: AIAnalyser,
});

function AIAnalyser() {
  return (
    <>
      <section className="relative">
        <PageBackground />
        <div className="relative mx-auto max-w-5xl px-6 pt-24 pb-24 text-center">
          <Reveal>
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur-md">
              <Sparkles className="h-3 w-3 text-primary-glow" />
              Powered by ChainForge Intelligence
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display mt-7 text-5xl leading-[1.05] md:text-7xl">
              <span className="text-gradient">An AI desk</span>{" "}
              <span className="text-accent-gradient italic">that never sleeps.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-7 max-w-2xl text-muted-foreground md:text-lg">
              Our analyser ingests price action, macro flow and on-chain data across 80+
              instruments and surfaces high-conviction setups — every fifteen minutes,
              every day.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { n: "98.4%", l: "Uptime" },
            { n: "15m", l: "Scan cadence" },
            { n: "80+", l: "Instruments" },
            { n: "24/7", l: "Coverage" },
          ].map((s, i) => (
            <Reveal key={s.l} delay={i * 0.06}>
              <div className="rounded-2xl border border-border bg-card/40 p-6 backdrop-blur-sm">
                <p className="font-display text-4xl text-accent-gradient">{s.n}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">{s.l}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: <Brain className="h-5 w-5" />, t: "Pattern recognition", d: "Transformer models trained on 12 years of multi-asset price data." },
            { icon: <Activity className="h-5 w-5" />, t: "Macro context", d: "Cross-references economic calendar, COT data and ETF flows in real time." },
            { icon: <Target className="h-5 w-5" />, t: "Entry, SL & TP", d: "Every signal arrives with structured execution — no guesswork." },
            { icon: <TrendingUp className="h-5 w-5" />, t: "Backtested edge", d: "Every model is walk-forward validated before going live." },
            { icon: <Sparkles className="h-5 w-5" />, t: "Confidence scoring", d: "Each setup is scored 0–100 so you size with intent." },
            { icon: <Activity className="h-5 w-5" />, t: "Risk guardrails", d: "Automatic exposure caps across correlated instruments." },
          ].map((f, i) => (
            <Reveal key={f.t} delay={i * 0.05}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card/40 p-7 backdrop-blur-sm transition-colors hover:border-primary/40">
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/15 opacity-0 blur-3xl transition-opacity group-hover:opacity-100" />
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary-glow/30 to-primary/20 text-primary-glow">
                  {f.icon}
                </div>
                <p className="mt-5 font-medium">{f.t}</p>
                <p className="mt-2 text-sm text-muted-foreground">{f.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-card/80 to-background p-10 md:p-14">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_0%,oklch(0.55_0.22_250_/_0.4),transparent_60%)]" />
            <div className="relative text-center">
              <h3 className="font-display text-3xl md:text-5xl">
                <span className="text-gradient">Subscribe to the</span>{" "}
                <span className="text-accent-gradient italic">signal feed.</span>
              </h3>
              <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
                Live alerts on Telegram, Discord and email — included with every ChainForge
                account.
              </p>
              <Link
                to="/contact"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-primary-glow to-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)]"
              >
                Request access
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
