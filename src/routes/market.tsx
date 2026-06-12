"use client";

import { useEffect, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Activity, CalendarClock, LineChart, Newspaper } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { PageBackground } from "@/components/page-background";

export const Route = createFileRoute("/market")({
  head: () => ({
    meta: [
      { title: "Live Market — ChainForge" },
      {
        name: "description",
        content:
          "Live forex market dashboard — economic calendar, market heatmap, forex sentiment and breaking news in one institutional view.",
      },
      { property: "og:title", content: "Live Market — ChainForge" },
      {
        property: "og:description",
        content:
          "Live calendar, heatmap and forex sentiment, refreshed in real time.",
      },
    ],
  }),
  component: MarketPage,
});

/** Mount a TradingView widget by injecting their script with a config payload. */
function TVWidget({
  script,
  config,
  height = 460,
  containerId,
}: {
  script: string;
  config: Record<string, unknown>;
  height?: number;
  containerId?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    host.innerHTML = "";
    const wrapper = document.createElement("div");
    wrapper.className = "tradingview-widget-container__widget";
    if (containerId) wrapper.id = containerId;
    host.appendChild(wrapper);
    const s = document.createElement("script");
    s.src = script;
    s.async = true;
    s.type = "text/javascript";
    s.innerHTML = JSON.stringify(config);
    host.appendChild(s);
    return () => {
      if (host) host.innerHTML = "";
    };
  }, [script, JSON.stringify(config), height, containerId]);

  return (
    <div
      ref={ref}
      className="tradingview-widget-container"
      style={{ height, width: "100%" }}
    />
  );
}

function MarketPage() {
  const tvTheme = {
    colorTheme: "dark",
    isTransparent: true,
    locale: "en",
    width: "100%",
  };

  return (
    <>
      <section className="relative">
        <PageBackground variant="soft" />
        <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-10 text-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.25em] text-primary-glow font-['Montserrat']">
              Live Market
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display mt-5 text-5xl md:text-6xl font-['Montserrat']">
              <span className="text-gradient">Market pulse</span>{" "}
              <span className="text-accent-gradient">in real time.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-2xl text-muted-foreground text-sm md:text-base">
              Economic calendar, forex sentiment and live heatmap — streamed
              live from the wires the desk watches every session.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 space-y-6">
        <Reveal>
          <div className="card-animated rounded-3xl p-4 md:p-6">
            <Header
              icon={<CalendarClock className="h-4 w-4" />}
              label="Economic Calendar"
              tag="Forex Factory style"
            />
            <TVWidget
              height={520}
              script="https://s3.tradingview.com/external-embedding/embed-widget-events.js"
              config={{
                ...tvTheme,
                importanceFilter: "0,1",
                currencyFilter: "USD,EUR,GBP,JPY,AUD,CAD,CHF,NZD,CNY,ZAR",
              }}
            />
          </div>
        </Reveal>

        <div className="grid gap-6">
          <Reveal>
            <div className="card-animated rounded-3xl p-4 md:p-6">
              <Header
                icon={<Activity className="h-4 w-4" />}
                label="Forex Heatmap"
                tag="Sentiment & strength"
              />
              <TVWidget
                height={420}
                script="https://s3.tradingview.com/external-embedding/embed-widget-forex-heat-map.js"
                config={{
                  ...tvTheme,
                  currencies: ["EUR", "USD", "JPY", "GBP", "CHF", "AUD", "CAD", "NZD"],
                  backgroundColor: "rgba(8,6,18,0)",
                }}
              />
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="card-animated rounded-3xl p-4 md:p-6">
            <Header
              icon={<Newspaper className="h-4 w-4" />}
              label="Top Stories"
              tag="Wire feed"
            />
            <TVWidget
              height={460}
              script="https://s3.tradingview.com/external-embedding/embed-widget-timeline.js"
              config={{
                ...tvTheme,
                feedMode: "all_symbols",
                displayMode: "regular",
              }}
            />
          </div>
        </Reveal>

        <p className="text-center text-[10px] uppercase tracking-[0.25em] text-muted-foreground/60 font-mono">
          Live data via TradingView · Calendar mirrors Forex Factory / TradeDays · Sentiment in line with Myfxbook outlooks
        </p>
      </section>
    </>
  );
}

function Header({
  icon,
  label,
  tag,
}: {
  icon: React.ReactNode;
  label: string;
  tag: string;
}) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-foreground font-['Montserrat']">
        <span className="text-primary-glow">{icon}</span>
        {label}
      </div>
      <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/70">
        {tag}
      </span>
    </div>
  );
}
