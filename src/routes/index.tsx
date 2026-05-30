import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Wallet,
  BarChart3,
  ShieldCheck,
  Zap,
  Bitcoin,
  LineChart,
  Globe2,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ChainForge — Forge your wealth with The Forex Mafia" },
      {
        name: "description",
        content:
          "Premium trading signals, instant deposits and seamless withdrawals across Deriv, Weltrade and major brokers. Join the ChainForge family.",
      },
      { property: "og:title", content: "ChainForge — The Forex Mafia" },
      {
        property: "og:description",
        content:
          "Institutional-grade payment infrastructure and AI-driven signals for forex and crypto traders.",
      },
    ],
  }),
  component: Index,
});

const tickers = [
  { pair: "BTC/USD", price: "67,420.10", change: "+1.24%", up: true },
  { pair: "ETH/USD", price: "3,512.88", change: "+0.42%", up: true },
  { pair: "EUR/USD", price: "1.1655", change: "+0.12%", up: true },
  { pair: "GBP/USD", price: "1.3441", change: "+0.05%", up: true },
  { pair: "XAU/USD", price: "2,175.40", change: "+1.15%", up: true },
  { pair: "USD/ZAR", price: "16.22", change: "-0.45%", up: false },
  { pair: "SOL/USD", price: "172.30", change: "-0.18%", up: false },
  { pair: "NAS100", price: "18,240.50", change: "-0.15%", up: false },
];

function Index() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <Ticker />
      <Nav />
      <Hero />
      <Logos />
      <About />
      <Services />
      <Footer />
    </div>
  );
}

function Ticker() {
  const items = [...tickers, ...tickers, ...tickers];
  return (
    <div className="relative z-20 border-b border-border bg-background/60 backdrop-blur-md">
      <div className="mask-fade-edges overflow-hidden">
        <div className="ticker-track flex w-max gap-10 py-2.5 text-xs">
          {items.map((t, i) => (
            <div key={i} className="flex items-center gap-2 whitespace-nowrap">
              <span className="text-muted-foreground">{t.pair}</span>
              <span className="font-medium tabular-nums text-foreground">{t.price}</span>
              <span
                className={`tabular-nums ${t.up ? "text-success" : "text-destructive"}`}
              >
                {t.change}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <header className="relative z-30 mx-auto mt-6 flex max-w-6xl items-center justify-between px-6">
      <a href="#" className="flex items-center gap-2">
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary-glow to-primary shadow-[0_0_24px_-4px_var(--primary)]">
          <span className="text-sm font-bold text-primary-foreground">C</span>
        </div>
        <span className="text-sm font-semibold tracking-wide">CHAINFORGE</span>
      </a>

      <nav className="hidden items-center gap-1 rounded-full border border-border bg-card/60 px-2 py-2 text-sm text-muted-foreground backdrop-blur-md md:flex">
        {["Home", "Services", "AI Analyser", "About"].map((l) => (
          <a
            key={l}
            href={`#${l.toLowerCase().replace(" ", "-")}`}
            className="rounded-full px-4 py-1.5 transition-colors hover:bg-secondary hover:text-foreground"
          >
            {l}
          </a>
        ))}
      </nav>

      <a
        href="#"
        className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-transform hover:scale-[1.02]"
      >
        Get Started
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 bg-hero-glow" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_30%,black,transparent)]" />

      <div className="relative mx-auto max-w-5xl px-6 pt-24 pb-32 text-center md:pt-32 md:pb-40">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Premium Trading Signals Available
        </div>

        <h1 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
          <span className="text-gradient">Forge your wealth</span>
          <br />
          with <span className="text-accent-gradient">The Forex Mafia</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Signal provision and seamless transactions for traders. We assist in funding and
          withdrawing from Deriv, Weltrade, and other brokers. Join the ChainForge family
          and elevate your trading game.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-primary-glow to-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.02]"
          >
            Deposit
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-7 py-3.5 text-sm font-medium text-foreground backdrop-blur-md transition-colors hover:bg-secondary"
          >
            <Wallet className="h-4 w-4" />
            Withdrawal
          </a>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-muted-foreground">
          <Feature icon={<BarChart3 className="h-3.5 w-3.5" />} label="Premium Signals" />
          <Feature icon={<Wallet className="h-3.5 w-3.5" />} label="Funding & Withdrawals" />
          <Feature icon={<ShieldCheck className="h-3.5 w-3.5" />} label="Secure Transactions" />
          <Feature icon={<Zap className="h-3.5 w-3.5" />} label="Instant Processing" />
        </div>
      </div>
    </section>
  );
}

function Feature({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-primary-glow">{icon}</span>
      {label}
    </div>
  );
}

function Logos() {
  const brokers = ["DERIV", "WELTRADE", "BINANCE", "BYBIT", "MT5", "cTRADER", "COINBASE"];
  return (
    <section className="relative border-y border-border bg-background/40">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Trusted across leading brokers & exchanges
        </p>
        <div className="mask-fade-edges mt-6 overflow-hidden">
          <div className="flex items-center justify-center gap-12 text-sm font-semibold tracking-widest text-muted-foreground/70">
            {brokers.map((b) => (
              <span key={b} className="opacity-70 transition-opacity hover:opacity-100">
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-28">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground">
            <Sparkles className="h-3 w-3 text-primary-glow" />
            About ChainForge
          </div>
          <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            <span className="text-gradient">We are the</span>
            <br />
            <span className="text-accent-gradient">Forex Mafia.</span>
          </h2>
        </div>
        <div className="md:col-span-7">
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            ChainForge is a cutting-edge financial technology platform dedicated to
            empowering forex and cryptocurrency traders. We eliminate the friction
            between your capital and your strategy with instant, secure, and hassle-free
            deposits and withdrawals — bridging traditional finance and digital assets so
            your focus stays on the markets, not the logistics.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <Stat label="Vision" value="The world's most trusted payment gateway for the global trading community." />
            <Stat label="Mission" value="Frictionless, secure infrastructure that lets traders execute with speed and precision, 24/7." />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card/40 p-5 backdrop-blur-sm">
      <p className="text-xs uppercase tracking-[0.18em] text-primary-glow">{label}</p>
      <p className="mt-2 text-sm leading-relaxed text-foreground/90">{value}</p>
    </div>
  );
}

function Services() {
  return (
    <section id="services" className="relative mx-auto max-w-6xl px-6 py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-2xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground">
          Elite Services
        </div>
        <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
          <span className="text-gradient">Institutional grade</span>
          <br />
          <span className="text-accent-gradient">financial infrastructure</span>
        </h2>
        <p className="mt-5 text-muted-foreground">
          Two specialised tracks, one frictionless rail. Move capital the way modern
          traders need it to move.
        </p>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2">
        <ServiceCard
          icon={<LineChart className="h-5 w-5" />}
          title="Forex Traders"
          items={[
            { t: "Instant Deposits", d: "Fund MT4, MT5, cTrader and other brokerage accounts without delay." },
            { t: "Fast Withdrawals", d: "Access profits quickly with streamlined withdrawal processing." },
            { t: "Multiple Currencies", d: "USD, EUR, GBP and more — at competitive exchange rates." },
          ]}
        />
        <ServiceCard
          icon={<Bitcoin className="h-5 w-5" />}
          title="Crypto Traders"
          items={[
            { t: "One-Click Transfers", d: "Deposit crypto from your wallet to Binance, Coinbase, Bybit and more." },
            { t: "Direct to Wallet", d: "Withdraw trading gains straight to your secure cold storage." },
            { t: "Multi-Chain Support", d: "Seamless transactions across major blockchain networks." },
          ]}
        />
      </div>

      <div className="mt-10 rounded-3xl border border-border bg-card/40 p-8 backdrop-blur-sm md:p-12">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted-foreground">
              <Globe2 className="h-3 w-3 text-primary-glow" />
              ChainForge Bridge
            </div>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
              Institutional-grade liquidity, on demand.
            </h3>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Deposit USD to any global broker and withdraw profits back to your local
              gateway — settled fast, priced fair.
            </p>
          </div>
          <a
            href="#"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-b from-primary-glow to-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)]"
          >
            Talk to the Team
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: { t: string; d: string }[];
}) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-border bg-card/40 p-8 backdrop-blur-sm transition-colors hover:border-primary/40">
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/20 opacity-0 blur-3xl transition-opacity group-hover:opacity-100" />
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary-glow/30 to-primary/20 text-primary-glow">
          {icon}
        </div>
        <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
      </div>
      <div className="mt-6 divide-y divide-border">
        {items.map((it) => (
          <div key={it.t} className="py-4 first:pt-0 last:pb-0">
            <p className="text-sm font-medium text-foreground">{it.t}</p>
            <p className="mt-1 text-sm text-muted-foreground">{it.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-border bg-background/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 text-sm text-muted-foreground md:flex-row">
        <div className="flex items-center gap-2">
          <div className="grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-primary-glow to-primary">
            <span className="text-xs font-bold text-primary-foreground">C</span>
          </div>
          <span className="font-semibold text-foreground">CHAINFORGE</span>
          <span className="opacity-60">© {new Date().getFullYear()}</span>
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-foreground">Services</a>
          <a href="#" className="hover:text-foreground">AI Analyser</a>
          <a href="#" className="hover:text-foreground">About</a>
          <a href="#" className="hover:text-foreground">Contact</a>
        </div>
      </div>
    </footer>
  );
}
