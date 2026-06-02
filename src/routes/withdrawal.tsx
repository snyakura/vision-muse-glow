import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Wallet, ShieldCheck, Zap, History, TrendingUp, Landmark } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { PageBackground } from "@/components/page-background";

export const Route = createFileRoute("/withdrawal")({
  head: () => ({
    meta: [
      { title: "Withdraw Profits — ChainForge" },
      {
        name: "description",
        content: "Fast, reliable withdrawals. Bridge your trading profits back to your bank or wallet.",
      },
    ],
  }),
  component: WithdrawalPage,
});

function WithdrawalPage() {
  return (
    <>
      <section className="relative">
        <PageBackground variant="soft" />
        <div className="relative mx-auto max-w-5xl px-6 pt-24 pb-20 text-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.25em] text-primary-glow font-['Montserrat']">Capital Access</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display mt-5 text-5xl md:text-7xl font-['Montserrat']">
              <span className="text-gradient">Withdraw</span>{" "}
              <span className="text-accent-gradient italic">Profits.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-7 max-w-2xl text-muted-foreground md:text-lg">
              Realize your gains without the wait. Our bridge ensures that your profits 
              move from the broker to your destination at institutional speeds.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { 
              icon: <Landmark className="h-6 w-6" />, 
              t: "Bank Payout", 
              d: "Direct settlement to your local or international bank account in record time." 
            },
            { 
              icon: <Wallet className="h-6 w-6" />, 
              t: "Crypto Wallet", 
              d: "Withdraw profits directly to your cold storage or personal crypto exchange account." 
            },
            { 
              icon: <History className="h-6 w-6" />, 
              t: "Instant Bridge", 
              d: "Move capital between brokers (e.g. Deriv to Weltrade) via our internal desk." 
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
                <span className="text-accent-gradient italic">liquidate?</span>
              </h2>
              <p className="mt-6 text-muted-foreground md:text-lg">
                To maintain our sub-60 minute settlement average, all withdrawals are coordinated 
                through our 24/7 liquidity desk. Contact us to start your request.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-primary-glow to-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)]"
                >
                  Request Withdrawal
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <div className="flex items-center gap-6 px-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest">
                    <ShieldCheck className="h-4 w-4 text-emerald-500" />
                    Verified
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest">
                    <TrendingUp className="h-4 w-4 text-primary-glow" />
                    Live Rates
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