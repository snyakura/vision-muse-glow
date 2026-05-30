import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

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

export function Ticker() {
  const items = [...tickers, ...tickers, ...tickers];
  return (
    <div className="relative z-30 border-b border-border bg-background/70 backdrop-blur-md">
      <div className="mask-fade-edges overflow-hidden">
        <div className="ticker-track flex w-max gap-10 py-2.5 text-xs">
          {items.map((t, i) => (
            <div key={i} className="flex items-center gap-2 whitespace-nowrap">
              <span className="text-muted-foreground">{t.pair}</span>
              <span className="font-medium tabular-nums">{t.price}</span>
              <span className={t.up ? "text-success tabular-nums" : "text-destructive tabular-nums"}>
                {t.change}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/ai-analyser", label: "AI Analyser" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary-glow to-primary shadow-[0_0_24px_-4px_var(--primary)]">
            <span className="text-sm font-bold text-primary-foreground">C</span>
          </div>
          <span className="text-sm font-semibold tracking-wide">CHAINFORGE</span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-border bg-card/60 px-2 py-1.5 text-sm text-muted-foreground backdrop-blur-md md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-full px-4 py-1.5 transition-colors hover:text-foreground data-[status=active]:bg-secondary data-[status=active]:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/contact"
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-transform hover:scale-[1.02]"
        >
          Get Started
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative mt-32 border-t border-border bg-background/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary-glow to-primary">
              <span className="text-sm font-bold text-primary-foreground">C</span>
            </div>
            <span className="font-semibold">CHAINFORGE</span>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Institutional-grade payment infrastructure and AI-driven trading intelligence
            for the global forex and crypto community.
          </p>
        </div>
        <FooterCol
          title="Platform"
          items={[
            { label: "Services", to: "/services" },
            { label: "AI Analyser", to: "/ai-analyser" },
            { label: "Bridge", to: "/services" },
          ]}
        />
        <FooterCol
          title="Company"
          items={[
            { label: "About", to: "/about" },
            { label: "Contact", to: "/contact" },
          ]}
        />
        <FooterCol
          title="Resources"
          items={[
            { label: "Signals", to: "/ai-analyser" },
            { label: "Brokers", to: "/services" },
          ]}
        />
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-6 py-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} ChainForge. All rights reserved.</p>
          <p>Trading involves risk. Not financial advice.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { label: string; to: "/" | "/services" | "/ai-analyser" | "/about" | "/contact" }[];
}) {
  return (
    <div className="md:col-span-2">
      <p className="text-xs uppercase tracking-[0.2em] text-primary-glow">{title}</p>
      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
        {items.map((it) => (
          <li key={it.label}>
            <Link to={it.to} className="transition-colors hover:text-foreground">
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
