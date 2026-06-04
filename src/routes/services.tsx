import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bitcoin, LineChart, Globe2, Wallet, ShieldCheck, Zap } from "lucide-react";
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
      <section className="relative">
        <PageBackground variant="soft" />
        <div className="relative mx-auto max-w-5xl px-6 pt-24 pb-20 text-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.25em] text-primary-glow">Elite Services</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display mt-5 text-5xl md:text-7xl">
              <span className="text-gradient">Institutional grade</span>{" "}
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

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-20 md:grid-cols-2">
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

      <section className="mx-auto max-w-6xl px-6 pb-24">
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
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-primary-glow to-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)]"
              >
                Open an account
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

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

void Wallet;
