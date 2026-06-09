"use client";

import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Gift, ShieldCheck, Sparkles } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { PageBackground } from "@/components/page-background";

export const Route = createFileRoute("/open-account")({
  head: () => ({
    meta: [
      { title: "Open a Trading Account — ChainForge" },
      {
        name: "description",
        content:
          "Open verified trading accounts with our partner brokers. Use promo code FOREXMAFIA for a 100% deposit bonus.",
      },
    ],
  }),
  component: OpenAccountPage,
});

type BrokerCard = {
  name: string;
  logo: string;
  tag: string;
  blurb: string;
  steps: string[];
  link: string;
  accent: string;
};

const BROKERS: BrokerCard[] = [
  {
    name: "Elev8",
    logo: "/elev8.png",
    tag: "Recommended",
    blurb:
      "Our flagship partner. Get verified, fund as little as $50 and we'll add you to our private trading groups. Use promo code FOREXMAFIA for a 100% deposit bonus.",
    steps: [
      "Click the button below to register.",
      "Verify your identity and email.",
      "Fund a minimum of $50.",
      "Apply promo code: FOREXMAFIA",
      "DM us your screenshot to be added to the groups.",
    ],
    link: "https://clickto.trade/b3Qzko9VnDa?ib=12067344",
    accent: "from-fuchsia-500 to-violet-600",
  },
  {
    name: "Weltrade",
    logo: "/weltrade.png",
    tag: "Synthetics",
    blurb:
      "Trade synthetic indices with high leverage. Open a Weltrade account, complete verification, and we'll plug you straight into our synthetic signals desk.",
    steps: [
      "Click the button below and complete the form.",
      "Verify your email and ID.",
      "Choose USD currency, fund and start trading.",
      "Send us your account screenshot to be added.",
    ],
    link: "https://gowt.net/ib64771",
    accent: "from-amber-500 to-rose-500",
  },
  {
    name: "Deriv",
    logo: "/deriv.png",
    tag: "Forex & Synthetics",
    blurb:
      "The Deriv setup runs through a short two-step onboarding. Follow the steps carefully and screenshot every confirmation page.",
    steps: [
      "Click the button below and enter your details.",
      "Open Gmail → click 'verify my email' from Deriv.",
      "Choose country Zimbabwe, set a password, screenshot it.",
      "Log in → top-left menu → Trader's Hub → switch Demo → Real.",
      "Create Deriv account in USD, fill ID details exactly as on ID.",
      "Add residential address, DOB, tick 'not a PEP', create account.",
      "When asked to transfer funds, choose 'Maybe later'.",
      "Screenshot the dashboard and send 'done' to us on WhatsApp.",
    ],
    link: "https://track.deriv.me/_s7oLLwNBzJ93ELhFE6Krg2Nd7ZgqdRLk/1/",
    accent: "from-red-500 to-orange-500",
  },
];

function OpenAccountPage() {
  return (
    <>
      <section className="relative">
        <PageBackground variant="soft" />
        <div className="relative mx-auto max-w-5xl px-6 pt-24 pb-12 text-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.25em] text-primary-glow font-['Montserrat']">
              Onboarding Desk
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display mt-5 text-5xl md:text-6xl font-['Montserrat']">
              <span className="text-gradient">Open your</span>{" "}
              <span className="text-accent-gradient">trading account.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-2xl text-muted-foreground text-sm md:text-base">
              Let's all create accounts with the best brokers — new money is about to be made.
              Signals and mentorship are <span className="text-foreground font-semibold">free</span> once
              you're funded. Use our promo code <span className="font-mono text-primary-glow">"FOREXMAFIA"</span> and
              get a <span className="text-emerald-400 font-semibold">100% deposit bonus</span>.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="https://whatsapp.com/channel/0029VaVnVETC6ZvgsD8foc3E"
                target="_blank"
                rel="noopener noreferrer"
                className="secondary-glass-button gap-2 text-sm"
              >
                <Sparkles className="h-4 w-4" /> Join WhatsApp Channel
              </a>
              <a
                href="https://vt.tiktok.com/ZSxA1XaRD/"
                target="_blank"
                rel="noopener noreferrer"
                className="secondary-glass-button gap-2 text-sm"
              >
                Follow on TikTok
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured promo: video + CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-10">
        <Reveal>
          <div className="card-animated rounded-3xl p-6 md:p-8 grid gap-6 md:grid-cols-2 items-center">
            <div className="rounded-2xl overflow-hidden bg-black border border-border">
              <video
                src="/vid.mp4"
                controls
                playsInline
                muted
                loop
                className="w-full h-full object-cover aspect-video"
              />
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-primary-glow mb-2">
                Featured Broker — Elev8
              </p>
              <h3 className="font-display text-2xl md:text-3xl leading-tight">
                Let's all create accounts with the best broker. New money is
                about to be made!!!!
              </h3>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                Signals and mentorship will be{" "}
                <span className="text-foreground font-semibold">free</span>.
                Register with the link below, get verified, fund as little as{" "}
                <span className="text-foreground font-semibold">$50</span> and
                we'll add you to our groups. Use our promo code{" "}
                <span className="font-mono text-primary-glow">"FOREXMAFIA"</span>{" "}
                and get a{" "}
                <span className="text-emerald-400 font-semibold">
                  100% deposit bonus
                </span>
                .
              </p>
              <a
                href="https://clickto.trade/b3Qzko9VnDa?ib=12067344"
                target="_blank"
                rel="noopener noreferrer"
                className="premium-button group mt-6"
              >
                <span>Register with Elev8</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 space-y-6">
        {BROKERS.map((b, i) => (
          <Reveal key={b.name} delay={i * 0.06}>
            <div className="card-animated rounded-3xl p-7 md:p-9 grid gap-6 md:grid-cols-12 items-start">
              <div className="md:col-span-4 flex flex-col items-start gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-background/60 p-2">
                  <img
                    src={b.logo}
                    alt={b.name}
                    className="h-full w-full object-contain"
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-primary-glow">
                    {b.tag}
                  </p>
                  <h3 className="mt-1 font-display text-2xl md:text-3xl">{b.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.blurb}</p>
                <a
                  href={b.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${b.accent} px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.03]`}
                >
                  Register now
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>

              <div className="md:col-span-8">
                <p className="text-xs font-bold uppercase tracking-wider text-foreground/80 mb-4 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" /> Step-by-step
                </p>
                <ol className="space-y-3">
                  {b.steps.map((s, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-muted-foreground">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-glow/20 text-[10px] font-bold text-primary-glow">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{s}</span>
                    </li>
                  ))}
                </ol>
                <div className="mt-5 flex items-start gap-2 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs text-emerald-200/90">
                  <Gift className="h-4 w-4 shrink-0 mt-0.5" />
                  After registering, send your verification screenshot to{" "}
                  <a
                    href="https://wa.me/263710554856"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-emerald-300 underline-offset-2 hover:underline"
                  >
                    +263 71 055 4856
                  </a>{" "}
                  on WhatsApp and say "done".
                </div>
              </div>
            </div>
          </Reveal>
        ))}

        <Reveal>
          <div className="card-animated rounded-3xl p-7 md:p-9 text-center">
            <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-400" />
            <h3 className="mt-4 font-display text-2xl md:text-3xl">
              <span className="text-gradient">Already registered?</span>
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Message the desk on WhatsApp and we'll add you to the signals & mentorship channels.
            </p>
            <a
              href="https://wa.me/263710554856"
              target="_blank"
              rel="noopener noreferrer"
              className="premium-button group mt-6"
            >
              <span>Message the desk</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
