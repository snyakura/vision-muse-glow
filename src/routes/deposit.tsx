import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Wallet, ShieldCheck, Zap, Landmark, CreditCard } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { PageBackground } from "@/components/page-background";

export const Route = createFileRoute("/deposit")({
  head: () => ({
    meta: [
      { title: "Deposit Capital — ChainForge" },
      {
        name: "description",
        content: "Instant and secure funding for your trading accounts across major brokers.",
      },
    ],
  }),
  component: DepositPage,
});

function DepositPage() {
  return (
    <>
      <section className="relative">
        <PageBackground variant="soft" />
        <div className="relative mx-auto max-w-5xl px-6 pt-24 pb-20 text-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.25em] text-primary-glow font-['Montserrat']">Account Funding</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display mt-5 text-5xl md:text-7xl font-['Montserrat']">
              <span className="text-gradient">Deposit</span>{" "}
              <span className="text-accent-gradient italic">Capital.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-7 max-w-2xl text-muted-foreground md:text-lg">
              Move your capital onto the desk with zero friction. We bridge your funds to
              Deriv, Weltrade, MT5, and more — settled in minutes.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { 
              icon: <Landmark className="h-6 w-6" />, 
              t: "Bank Rails", 
              d: "Fast local EFT and international wire transfers processed by our desk." 
            },
            { 
              icon: <Wallet className="h-6 w-6" />, 
              t: "Crypto Bridge", 
              d: "Deposit via USDT (ERC20/TRC20), BTC, or ETH for instant account credit." 
            },
            { 
              icon: <CreditCard className="h-6 w-6" />, 
              t: "Card Funding", 
              d: "Secure Visa and Mastercard gateways for immediate trading liquidity." 
            },
          ].map((m, i) => (
            <Reveal key={m.t} delay={i * 0.06}>
              <div className="group h-full rounded-3xl border border-border bg-card/40 p-8 backdrop-blur-sm transition-colors hover:border-primary/40">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary-glow/30 to-primary/20 text-primary-glow">
                  {m.icon}
                </div>
                <h3 className="mt-6 text-xl font-semibold tracking-tight font-['Montserrat']">{m.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <Reveal>
          <div className="rounded-[2.5rem] border border-border bg-gradient-to-b from-card/60 to-background p-10 md:p-16">
            <div className="max-w-3xl">
              <h2 className="font-display text-3xl md:text-5xl font-['Montserrat']">
                <span className="text-gradient">Ready to</span>{" "}
                <span className="text-accent-gradient italic">fund your strategy?</span>
              </h2>
              <p className="mt-6 text-muted-foreground md:text-lg">
                Our dedicated managers handle every deposit manually to ensure 100% security 
                and reconciliation. Reach out to the desk to initiate your transfer.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-primary-glow to-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)]"
                >
                  Initiate Deposit
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <div className="flex items-center gap-6 px-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest">
                    <ShieldCheck className="h-4 w-4 text-emerald-500" />
                    Insured
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest">
                    <Zap className="h-4 w-4 text-primary-glow" />
                    ~5 Min
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}