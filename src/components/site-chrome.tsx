"use client";

import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Menu, 
  X, 
  MessageSquare 
} from "lucide-react";

interface TickerItem {
  pair: string;
  price: string;
  change: string;
  up: boolean;
}

/* ==========================================
   1. TICKER COMPONENT
   ========================================== */
export function Ticker() {
  const [tickers, setTickers] = useState<TickerItem[]>([]);
  const [loading, setLoading] = useState(true);

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
    <div className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/70 backdrop-blur-md h-[37px]">
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

/* ==========================================
   2. SITE HEADER COMPONENT
   ========================================== */
const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/ai-analyser", label: "AI Analyser" },
  { to: "/blog", label: "Blog" },
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
        <div className="mx-auto flex max-w-6xl h-28 items-center justify-between px-6 py-0">
          
          <Link to="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
            <motion.div 
              whileHover={{ scale: 1.04 }}
              className="flex h-28 items-center justify-center relative"
            >
              <img 
                src="/q.png" 
                alt="ChainForge Logo" 
                className="h-20 w-auto object-contain filter drop-shadow-[0_0_24px_rgba(139,92,246,0.35)]" 
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
                      activeOptions={{ exact: (l.to as string) === "/" }}
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
                              to="/deposit"
                              className="block rounded-xl px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                            >
                              Deposit
                            </Link>
                            <Link
                              to="/withdrawal"
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

      {/* Main layout push spacer layout element */}
      <div className="h-[133px] w-full block pointer-events-none" />

      {/* WhatsApp Quick Floating Action Button */}
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
        <svg 
          viewBox="0 0 24 24" 
          className="h-6 w-6 fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.742.002-2.596-1.006-5.036-2.842-6.873-1.836-1.836-4.271-2.844-6.863-2.845-5.438 0-9.862 4.371-9.866 9.743-.001 1.705.452 3.37 1.309 4.848l-.997 3.646 3.734-.973zm10.743-6.52c-.279-.14-1.65-.814-1.906-.906-.255-.093-.44-.14-.626.14-.185.28-.717.906-.879 1.092-.162.186-.324.208-.603.068-.279-.14-1.18-.435-2.249-1.39-1.325-1.182-1.417-1.406-1.556-1.639-.14-.232-.015-.358.1-.498.105-.127.232-.279.349-.418.116-.14.155-.232.232-.387.078-.155.039-.29-.02-.43-.058-.14-.523-1.26-.717-1.724-.189-.456-.382-.393-.523-.4l-.447-.008c-.155 0-.406.058-.619.29-.213.232-.813.795-.813 1.94 0 1.145.833 2.251.949 2.406.116.155 1.64 2.504 3.974 3.511 1.765.763 2.464.887 3.348.756.54-.08 1.65-.674 1.882-1.326.233-.652.233-1.21.162-1.325-.07-.115-.256-.185-.535-.325z"/>
        </svg>
      </motion.a>
    </>
  );
}

/* ==========================================
   3. SITE FOOTER COMPONENT
   ========================================== */
export function SiteFooter() {
  return (
    <footer className="relative mt-32 border-t border-border bg-background/80 backdrop-blur-md font-['Montserrat']">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 grid-cols-1 md:grid-cols-3 items-start">
        
        {/* Column 1: Logo & Branding */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <Link to="/" className="flex items-center transition-opacity hover:opacity-90">
            <img 
              src="/q.png" 
              alt="ChainForge Logo" 
              className="h-52 w-auto object-contain filter drop-shadow-[0_0_30px_rgba(139,92,246,0.35)] md:-ml-2" 
            />
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground text-center md:text-left">
            Institutional-grade payment infrastructure and AI-driven trading intelligence for the global forex and crypto community.
          </p>
        </div>

        {/* Column 2: Social Community - Brand Layout */}
        <div className="flex flex-col items-center justify-center md:pt-8">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/80">
            Join Our Social Community
          </h4>
          <div className="mt-6 flex items-center gap-10">
            {/* WhatsApp Brand Icon */}
            <a 
              href="https://wa.me/YOUR_PHONE_NUMBER" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group p-4 rounded-full bg-secondary/50 text-muted-foreground transition-all duration-300 hover:text-[#25D366] hover:bg-[#25D366]/10 hover:scale-110"
              aria-label="WhatsApp"
            >
              <svg 
                viewBox="0 0 24 24" 
                className="h-6 w-6 fill-current transition-transform group-hover:rotate-6"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.454 5.709 1.455h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
            
            {/* TikTok Brand Icon */}
            <a 
              href="https://tiktok.com/@YOUR_USERNAME" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group p-4 rounded-full bg-secondary/50 text-muted-foreground transition-all duration-300 hover:text-[#00f2fe] hover:bg-[#00f2fe]/10 hover:scale-110"
              aria-label="TikTok"
            >
              <svg 
                viewBox="0 0 24 24" 
                className="h-6 w-6 fill-current transition-transform group-hover:-rotate-6"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.03 1.6 4.25.91. graphics 1.05 2.19 1.76 3.58 2.02v3.74c-1.32-.3-2.52-1.01-3.42-2.02-.07 2.66-.04 5.32-.06 7.98-.12 3.14-2.12 6.05-5.18 6.84-2.99.85-6.42-.45-7.74-3.21-1.51-2.95-.44-6.93 2.45-8.54 1.34-.78 2.94-.96 4.46-.57.02 1.34.01 2.68.01 4.02-1-.27-2.11-.08-2.93.59-.97.74-1.29 2.11-.8 3.24.43 1.13 1.66 1.88 2.87 1.67 1.25-.13 2.29-1.22 2.38-2.48.05-4.49.02-8.99.03-13.49-.01-1.34-.01-2.68-.01-4.02z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Column 3: Contact */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right md:pt-8">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/80">
            Let's Discuss What's Next
          </h4>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Whether you are scaling a fund or moving personal capital, our desk is ready to bridge the gap.
          </p>
          <Link to="/contact" className="group mt-6 flex items-center text-xs font-semibold uppercase tracking-wider transition-colors hover:text-primary-glow">
            Contact Us
            <span className="ml-3 flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-background transition-transform group-hover:scale-105">
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/60 bg-black/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-6 text-xs text-muted-foreground md:flex-row">
          <div className="flex flex-col items-center gap-2 md:flex-row md:gap-6">
            <p>© {new Date().getFullYear()} ChainForge. All rights reserved.</p>
            <p className="hidden md:block opacity-20">|</p>
            <p className="text-center md:text-left opacity-80">Trading involves risk. Not financial advice.</p>
          </div>
          <Link to="/privacy" className="transition-colors hover:text-foreground underline-offset-4 hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}