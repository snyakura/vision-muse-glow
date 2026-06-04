import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageCircle, Send } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { PageBackground } from "@/components/page-background";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — ChainForge" },
      {
        name: "description",
        content: "Talk to the ChainForge team. Onboarding, support and partnerships.",
      },
      { property: "og:title", content: "Contact ChainForge" },
      {
        property: "og:description",
        content: "Reach the desk on Telegram, WhatsApp or email — we usually reply within the hour.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <section className="relative">
      <PageBackground />
      <div className="relative mx-auto max-w-5xl px-6 pt-24 pb-24 text-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-primary-glow">Talk to the team</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="font-display mt-5 text-5xl md:text-7xl">
            <span className="text-gradient">Let's move</span>{" "}
            <span className="text-accent-gradient italic">your capital.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-7 max-w-xl text-muted-foreground md:text-lg">
            Onboarding, deposit assistance, withdrawals and partnerships — pick the channel
            that suits you.
          </p>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-4xl gap-4 md:grid-cols-3">
          <Reveal>
            <Channel
              icon={<Send className="h-5 w-5" />}
              label="Telegram"
              handle="@chainforge_desk"
              href="https://t.me/"
            />
          </Reveal>
          <Reveal delay={0.06}>
            <Channel
              icon={<MessageCircle className="h-5 w-5" />}
              label="WhatsApp"
              handle="+27 00 000 0000"
              href="https://wa.me/"
            />
          </Reveal>
          <Reveal delay={0.12}>
            <Channel
              icon={<Mail className="h-5 w-5" />}
              label="Email"
              handle="desk@chainforge.app"
              href="mailto:desk@chainforge.app"
            />
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <p className="mt-10 text-xs text-muted-foreground">
            Median response time: under 60 minutes, 24/7.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Channel({
  icon,
  label,
  handle,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  handle: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group block rounded-2xl border border-border bg-card/40 p-6 text-left backdrop-blur-sm transition-colors hover:border-primary/40"
    >
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary-glow/30 to-primary/20 text-primary-glow">
          {icon}
        </div>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
      </div>
      <p className="mt-5 text-base font-medium transition-colors group-hover:text-primary-glow">
        {handle}
      </p>
    </a>
  );
}
