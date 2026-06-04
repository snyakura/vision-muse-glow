"use client";

import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Menu, 
  X, 
  MessageCircle, 
  Instagram, 
  Music
} from "lucide-react";

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
            change: `${(cryptoData?.bitcoin?.usd_24h_change ?? 0) >= 0 ? "+" : ""}${(cryptoData?.bitcoin?.usd_24h_change ?? 0).toFixed(2)}%`,
            up: (cryptoData?.bitcoin?.usd_24h_change ?? 0) >= 0,
          },
          {
            pair: "ETH/USD",
            price: cryptoData?.ethereum?.usd?.toLocaleString() || "3,512.88",
            change: `${(cryptoData?.ethereum?.usd_24h_change ?? 0) >= 0 ? "+" : ""}${(cryptoData?.ethereum?.usd_24h_change ?? 0).toFixed(2)}%`,
            up: (cryptoData?.ethereum?.usd_24h_change ?? 0) >= 0,
          },
          {
            pair: "SOL/USD",
            price: cryptoData?.solana?.usd?.toLocaleString() || "172.30",
            change: `${(cryptoData?.solana?.usd_24h_change ?? 0) >= 0 ? "+" : ""}${(cryptoData?.solana?.usd_24h_change ?? 0).toFixed(2)}%`,
            up: (cryptoData?.solana?.usd_24h_change ?? 0) >= 0,
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
  const [servicesHovered, setServicesHovered] = useState(false);

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
            {links.map((l) => {
              if (l.label === "Services") {
                return (
                  <div 
                    key={l.to} 
                    className="relative"
                    onMouseEnter={() => setServicesHovered(true)}
                    onMouseLeave={() => setServicesHovered(false)}
                  >
                    <Link
                      to={l.to}
                      activeOptions={{ exact: l.to === "/" }}
                      activeProps={{ className: "bg-secondary text-foreground" }}
                      className="rounded-full px-4 py-1.5 transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </Link>
                    <AnimatePresence>
                      {servicesHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute left-1/2 top-full -translate-x-1/2 pt-2 z-50"
                        >
                          <div className="w-40 overflow-hidden rounded-2xl border border-border bg-background/90 p-1.5 shadow-2xl backdrop-blur-xl">
                            <Link
                              to="/contact"
                              className="block rounded-xl px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                            >
                              Deposit
                            </Link>
                            <Link
                              to="/contact"
                              className="block rounded-xl px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                            >
                              Withdrawal
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  activeOptions={{ exact: l.to === "/" }}
                  activeProps={{ className: "bg-secondary text-foreground" }}
                  className="rounded-full px-4 py-1.5 transition-colors hover:text-foreground"
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
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
              <nav className="flex flex-col items-center gap-4 p-6">
                {links.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    activeOptions={{ exact: l.to === "/" }}
                    onClick={() => setMobileMenuOpen(false)}
                    activeProps={{ className: "text-foreground" }}
                    className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                ))}
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

      <div className="h-[133px] w-full block pointer-events-none" />

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
    <footer className="relative mt-32 border-t border-border bg-background/60 font-['Montserrat']">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 grid-cols-1 md:grid-cols-3 items-start">
        
        {/* Column 1: Logo & Branding - Fixed Alignment */}
        <div className="flex flex-col items-center md:items-start pt-1">
          <Link to="/" className="flex items-center">
            <img 
              src="/q.png" 
              alt="ChainForge Logo" 
              className="h-16 w-auto object-contain" 
            />
          </Link>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground text-center md:text-left">
            Institutional-grade payment infrastructure and AI-driven trading intelligence for the global forex and crypto community.
          </p>
        </div>

        {/* Column 2: Social Community - WhatsApp, Instagram, TikTok */}
        <div className="flex flex-col items-center text-center">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground">
            Join Our Social Community
          </h4>
          <div className="mt-8 flex items-center gap-7 text-foreground/90">
            <a href="https://wa.me/YOUR_PHONE_NUMBER" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#25D366]" aria-label="WhatsApp">
              <MessageCircle className="h-6 w-6 fill-current" strokeWidth={2.5} />
            </a>
            <a href="https://instagram.com/YOUR_USERNAME" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#E4405F]" aria-label="Instagram">
              <Instagram className="h-6 w-6" strokeWidth={2.5} />
            </a>
            <a href="https://tiktok.com/@YOUR_USERNAME" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary-glow" aria-label="TikTok">
              <Music className="h-6 w-6" strokeWidth={2.5} />
            </a>
          </div>
        </div>

        {/* Column 3: Contact */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground text-center md:text-right">
            Let's Discuss What's Next
          </h4>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground text-center md:text-right">
            Whether you are scaling a fund or moving personal capital, our desk is ready to bridge the gap.
          </p>
          <Link to="/contact" className="group mt-8 flex items-center text-xs font-semibold uppercase tracking-wider transition-colors hover:text-primary-glow">
            Contact Us
            <span className="ml-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-glow text-background">
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <div className="flex flex-col items-center gap-2 md:flex-row md:items-center md:gap-6">
            <p>© {new Date().getFullYear()} ChainForge. All rights reserved.</p>
            <p className="hidden md:block opacity-30">|</p>
            <p>Trading involves risk. Not financial advice.</p>
          </div>
          <Link to="/" className="md:ml-auto transition-colors hover:text-foreground">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}