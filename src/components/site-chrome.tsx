"use client";

import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X, MessageCircle } from "lucide-react";

interface TickerItem {
  pair: string;
  price: string;
  change: string;
  up: boolean;
}

export function Ticker() {
  const [tickers, setTickers] = useState<TickerItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Live feed data fetcher loop
  useEffect(() => {
    const fetchLiveData = async () => {
      try {
        const cryptoRes = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true");
        const cryptoData = await cryptoRes.json();

        const liveSet: TickerItem[] = [
          {
            pair: "BTC/USD",
            price: cryptoData?.bitcoin?.usd?.toLocaleString() || "67,420.10",
            change: `${cryptoData?.bitcoin?.usd_24h_change >= 0 ? "+" : ""}${cryptoData?.bitcoin?.usd_24h_change?.toFixed(2)}%`,
            up: cryptoData?.bitcoin?.usd_24h_change >= 0,
          },
          {
            pair: "ETH/USD",
            price: cryptoData?.ethereum?.usd?.toLocaleString() || "3,512.88",
            change: `${cryptoData?.ethereum?.usd_24h_change >= 0 ? "+" : ""}${cryptoData?.ethereum?.usd_24h_change?.toFixed(2)}%`,
            up: cryptoData?.ethereum?.usd_24h_change >= 0,
          },
          {
            pair: "SOL/USD",
            price: cryptoData?.solana?.usd?.toLocaleString() || "172.30",
            change: `${cryptoData?.solana?.usd_24h_change >= 0 ? "+" : ""}${cryptoData?.solana?.usd_24h_change?.toFixed(2)}%`,
            up: cryptoData?.solana?.usd_24h_change >= 0,
          },
          { pair: "EUR/USD", price: "1.1045", change: "+0.12%", up: true },
          { pair: "GBP/USD", price: "1.2820", change: "+0.05%", up: true },
          { pair: "XAU/USD", price: "2,345.10", change: "+1.15%", up: true },
          { pair: "USD/ZAR", price: "18.42", change: "-0.45%", up: false },
        ];

        setTickers(liveSet);
        setLoading(false);
      } catch (error) {
        console.error("Market data fallback active:", error);
      }
    };

    fetchLiveData();
    const interval = setInterval(fetchLiveData, 15000);
    return () => clearInterval(interval);
  }, []);

  const items = [...tickers, ...tickers, ...tickers];

  if (loading || tickers.length === 0) {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/70 backdrop-blur-md h-[37px] flex items-center justify-center text-[10px] uppercase tracking-widest text-muted-foreground/60">
        Streaming Live Markets...
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/70 backdrop-blur-md">
      <div className="mask-fade-edges overflow-hidden">
        <motion.div 
          className="flex w-max gap-10 py-2.5 text-xs"
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{
            duration: 40,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {items.map((t, i) => (
            <div key={i} className="flex items-center gap-2 whitespace-nowrap">
              <span className="text-muted-foreground">{t.pair}</span>
              <span className="font-medium tabular-nums">${t.price}</span>
              <span className={t.up ? "text-emerald-500 tabular-nums" : "text-rose-500 tabular-nums"}>
                {t.change}
              </span>
            </div>
          ))}
        </motion.div>
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 50) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <motion.header 
        variants={{
          visible: { y: 0 },
          hidden: { y: "-150%" },
        }}
        animate={visible ? "visible" : "hidden"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-[37px] left-0 right-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-6xl h-24 items-center justify-between px-6 py-0">
          
          <Link to="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex h-24 w-36 lg:w-48 items-center justify-center relative"
            >
              <img 
                src="/q.png" 
                alt="ChainForge Logo" 
                className="absolute max-w-none h-[140px] w-auto lg:h-[180px] object-contain -my-4" 
              />
            </motion.div>
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

          <div className="flex items-center gap-4">
            {/* "Get Started" button visible only on desktop */}
            <div className="hidden md:block">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-transform hover:scale-[1.02]"
              >
                Get Started
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <button
              className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-border/60 bg-background md:hidden"
            >
              <nav className="flex flex-col gap-4 p-6">
                {links.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    activeOptions={{ exact: l.to === "/" }}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground"
                  >
                    {l.label}
                  </Link>
                ))}
                {/* "Get Started" button moved into the mobile menu */}
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3 text-lg font-medium text-background transition-transform hover:scale-[1.02] mt-4"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* 40% reduction applied cleanly right here */}
      <div className="h-[105px] w-full block pointer-events-none" />

      {/* WhatsApp Quick Chat */}
      <motion.a
        href="https://wa.me/YOUR_PHONE_NUMBER"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition-shadow hover:shadow-emerald-500/20 md:bottom-8 md:right-8"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-7 w-7 fill-current" strokeWidth={2.5} />
      </motion.a>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative mt-32 border-t border-border bg-background/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center">
            <div className="h-48 w-auto relative">
              <img 
                src="/q.png" 
                alt="ChainForge Logo" 
                className="h-full w-full object-contain" 
              />
            </div>
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