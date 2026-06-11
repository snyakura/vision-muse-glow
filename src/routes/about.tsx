import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { PageBackground } from "@/components/page-background";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — ChainForge" },
      {
        name: "description",
        content:
          "ChainForge is a fintech platform empowering forex and crypto traders with frictionless capital movement.",
      },
      { property: "og:title", content: "About ChainForge" },
      {
        property: "og:description",
        content:
          "Bridging traditional finance and digital assets so traders focus on the markets, not the logistics.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="relative">
        <PageBackground variant="soft" />
        <div className="relative mx-auto max-w-5xl px-6 pt-24 pb-16 text-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.25em] text-primary-glow">About ChainForge</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display mt-5 text-5xl md:text-7xl">
              <span className="text-gradient">We are</span>{" "}
              <span className="text-accent-gradient">the Forex Mafia.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-7 max-w-2xl text-muted-foreground md:text-lg">
              A fintech platform built by traders, for traders. We eliminate the friction
              between your capital and your strategy.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="rounded-3xl border border-border bg-card/40 p-8 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-primary-glow">Vision</p>
              <p className="font-display mt-4 text-2xl md:text-3xl">
                <span className="text-gradient">The world's most trusted</span>{" "}
                <span className="text-accent-gradient">payment gateway</span>{" "}
                <span className="text-gradient">for the global trading community.</span>
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="rounded-3xl border border-border bg-card/40 p-8 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-primary-glow">Mission</p>
              <p className="font-display mt-4 text-2xl md:text-3xl">
                <span className="text-gradient">Frictionless, secure, rapid</span>{" "}
                <span className="text-accent-gradient">financial infrastructure</span>{" "}
                <span className="text-gradient">— so traders execute with precision, 24/7.</span>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <Reveal>
          <div className="space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            <p>
              ChainForge is a cutting-edge financial technology platform dedicated to
              empowering forex and cryptocurrency traders. We provide instant, secure,
              hassle-free deposit and withdrawal solutions — bridging traditional finance
              and the digital asset world.
            </p>
            <p>
              Whether you're moving funds between a bank account, a trading account or a
              digital wallet, ChainForge ensures your focus stays on the markets, not on
              the logistics of moving your money.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { n: "20K+", l: "Trusted traders" },
            { n: "$120M+", l: "Capital bridged" },
            { n: "12", l: "Countries served" },
          ].map((s, i) => (
            <Reveal key={s.l} delay={i * 0.06}>
              <div className="rounded-2xl border border-border bg-card/40 p-8 backdrop-blur-sm">
                <p className="font-display text-5xl text-accent-gradient">{s.n}</p>
                <p className="mt-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">{s.l}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 rounded-[2rem] border border-border bg-gradient-to-br from-card/80 to-background p-10 md:flex-row md:items-center md:p-14">
            <h3 className="font-display text-3xl md:text-4xl">
              <span className="text-gradient">Join the</span>{" "}
              <span className="text-accent-gradient">family.</span>
            </h3>
            <a
              href="https://wa.me/263782048523"
              target="_blank"
              rel="noopener noreferrer"
              className="premium-button group"
            >
              <span>Get in touch</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
