import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Brain, Activity, Target, Sparkles, TrendingUp, Upload, Loader2, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { PageBackground } from "@/components/page-background";

export const Route = createFileRoute("/ai-analyser")({
  head: () => ({
    meta: [
      { title: "AI Analyser — ChainForge" },
      {
        name: "description",
        content: "Multi-timeframe AI market intelligence across forex, indices and crypto — delivered in real time.",
      },
      { property: "og:title", content: "AI Analyser — ChainForge" },
      {
        property: "og:description",
        content: "Machine-learning models scan every major chart every 15 minutes — surfacing high-conviction setups.",
      },
    ],
  }),
  component: AIAnalyser,
});

function AIAnalyser() {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setIsAnalyzing(true);
        setAnalysisResult(null);

        // Simulate 3 seconds of high-end model crunching
        setTimeout(() => {
          setIsAnalyzing(false);
          setAnalysisResult({
            asset: "BTC/USDT (Estimated)",
            pattern: "Bullish Flag Breakout",
            confidence: "89%",
            timeframe: "1H / 4H Confluence",
            bias: "BULLISH",
            levels: { entry: "$67,200", sl: "$65,800", tp: "$71,500" },
          });
        }, 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetAnalyser = () => {
    setImage(null);
    setAnalysisResult(null);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/20">
      <PageBackground />

      {/* --- HERO HEADER --- */}
      <section className="relative mx-auto max-w-7xl px-6 pt-20 pb-12 text-center md:pt-28">
        <Reveal>
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/50 px-4 py-1.5 text-xs text-neutral-400 backdrop-blur-md">
            <Sparkles className="h-3 w-3 text-neutral-200" />
            Powered by ChainForge Intelligence
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="font-display mt-6 text-5xl font-light tracking-tight md:text-7xl">
            An AI desk <span className="italic text-neutral-400">that never sleeps.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-6 max-w-2xl text-sm text-neutral-400 md:text-base tracking-wide">
            Our analyser ingests price action, macro flow and on-chain data across 80+
            instruments and surfaces high-conviction setups — every fifteen minutes,
            every day.
          </p>
        </Reveal>
      </section>

      {/* --- FULL-BLEED WORKSPACE INTERFACE --- */}
      <section className="mx-auto max-w-7xl px-4 pb-24 md:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-neutral-800 bg-[#080808] shadow-2xl">
            <div className="grid md:grid-cols-2 min-h-[620px]">
              
              {/* LEFT SIDE: Brand Identity & Interactive Upload/Preview Zone */}
              <div className="relative flex flex-col justify-between p-8 md:p-12 border-b md:border-b-0 md:border-r border-neutral-900 bg-[#050505]">
                {/* Brand Header */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-widest uppercase text-neutral-400 font-mono">
                    System // Chart.Input
                  </span>
                </div>

                {/* Star-burst Geometric Crosshair / Upload & Preview Trigger */}
                <div className="relative my-auto flex flex-col items-center justify-center w-full py-8">
                  {!image ? (
                    <label className="group relative flex flex-col items-center justify-center w-full max-w-md aspect-square cursor-pointer">
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                      
                      {/* Geometric background alignment lines */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10 group-hover:opacity-25 transition-opacity duration-500">
                        <div className="absolute w-full h-[1px] bg-white transform rotate-45" />
                        <div className="absolute w-full h-[1px] bg-white transform -rotate-45" />
                        <div className="absolute w-full h-[1px] bg-white" />
                        <div className="absolute h-full w-[1px] bg-white" />
                      </div>

                      {/* Explicit Minimalist Star Burst Emblem */}
                      <div className="relative w-36 h-36 flex items-center justify-center text-white mb-8 group-hover:scale-105 transition-transform duration-500 ease-out">
                        <div className="absolute w-14 h-[2px] bg-white transform -translate-x-12" />
                        <div className="absolute w-14 h-[2px] bg-white transform translate-x-12" />
                        <div className="absolute w-[2px] h-14 bg-white transform -translate-y-12" />
                        <div className="absolute w-[2px] h-14 bg-white transform translate-y-12" />
                        <div className="absolute w-10 h-[2px] bg-white transform rotate-45 -translate-x-7 -translate-y-7" />
                        <div className="absolute w-10 h-[2px] bg-white transform rotate-45 translate-x-7 translate-y-7" />
                        <div className="absolute w-10 h-[2px] bg-white transform -rotate-45 -translate-x-7 translate-y-7" />
                        <div className="absolute w-10 h-[2px] bg-white transform -rotate-45 translate-x-7 -translate-y-7" />
                      </div>

                      <div className="text-center z-10">
                        <p className="font-medium text-sm text-neutral-300 tracking-wider uppercase font-mono group-hover:text-white transition-colors">Upload chart screenshot</p>
                        <p className="mt-2 text-xs text-neutral-500 font-mono">Drag & drop or click to browse (PNG, JPG)</p>
                      </div>
                    </label>
                  ) : (
                    <div className="relative rounded-xl overflow-hidden w-full max-w-lg aspect-video border border-neutral-800 bg-black flex items-center justify-center group shadow-inner">
                      <img src={image} alt="Uploaded chart preview" className="w-full h-full object-cover opacity-50 transition-opacity group-hover:opacity-40 duration-300" />
                      
                      {isAnalyzing && (
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center">
                          <Loader2 className="h-8 w-8 text-white animate-spin stroke-[1.5]" />
                          <p className="mt-4 text-xs tracking-widest text-neutral-400 font-mono animate-pulse">RUNNING MULTI-TIMEFRAME HEURISTICS...</p>
                        </div>
                      )}
                      
                      {!isAnalyzing && (
                        <button 
                          onClick={resetAnalyser}
                          className="absolute bottom-4 right-4 bg-neutral-900/90 hover:bg-white hover:text-black text-white text-[10px] tracking-widest uppercase font-mono px-3 py-1.5 rounded border border-neutral-800 transition-all duration-200"
                        >
                          Clear Input
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer Meta */}
                <div className="text-[10px] text-neutral-600 font-mono tracking-wider">
                  © CHAINFORGE INTELLIGENCE SYNDICATE V2.6
                </div>
              </div>

              {/* RIGHT SIDE: Dynamic Telemetry Analytics Processing Feed */}
              <div className="relative flex flex-col justify-between p-8 md:p-12 bg-[#0a0a0a]">
                
                {/* Secondary Header Utility Info */}
                <div className="flex items-center justify-between text-[10px] tracking-widest text-neutral-500 uppercase font-mono border-b border-neutral-900/60 pb-4">
                  <span>Vision Model Engine v4.0</span>
                  <span className="text-neutral-400">Status: Operational</span>
                </div>

                {/* Core Live Processing Display */}
                <div className="my-auto w-full max-w-xl mx-auto py-6">
                  
                  {/* DEFAULT STATE: Awaiting data stream */}
                  {!image && !isAnalyzing && (
                    <div className="space-y-6 py-8 text-center md:text-left">
                      <div className="space-y-2">
                        <h2 className="text-3xl font-light tracking-tight text-white font-display">Awaiting chart input...</h2>
                        <p className="text-xs text-neutral-500 font-mono max-w-md tracking-wide">
                          Upload a technical snapshot into the telemetry matrix on the left side to instantly parse price action nodes.
                        </p>
                      </div>
                      
                      <div className="pt-6 border-t border-neutral-900 max-w-sm mx-auto md:mx-0">
                        <div className="flex items-center gap-4 text-xs text-neutral-600 font-mono">
                          <div className="w-2 h-2 rounded-full bg-neutral-800 animate-ping" />
                          <span>Telemetry Feed: Idle / Listening</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* LOADING STATE: Heavy processing simulation */}
                  {isAnalyzing && (
                    <div className="space-y-8 py-6 font-mono">
                      <div className="space-y-3">
                        <div className="h-2.5 bg-neutral-900 rounded w-1/4 animate-pulse" />
                        <div className="h-10 bg-neutral-900 rounded w-4/5 animate-pulse" />
                      </div>
                      <div className="space-y-3 pt-6 border-t border-neutral-900">
                        <div className="h-3 bg-neutral-900 rounded w-full animate-pulse" />
                        <div className="h-3 bg-neutral-900 rounded w-5/6 animate-pulse" />
                        <div className="h-3 bg-neutral-900 rounded w-2/3 animate-pulse" />
                      </div>
                    </div>
                  )}

                  {/* COMPLETED SETUP STATE: Clean, high-conviction execution output */}
                  {analysisResult && (
                    <div className="space-y-8 py-4 animate-fade-in">
                      <div className="flex items-center justify-between border-b border-neutral-900 pb-5">
                        <div className="flex items-center gap-2.5">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                          <span className="text-xs font-mono text-neutral-300 uppercase tracking-widest font-semibold">{analysisResult.asset}</span>
                        </div>
                        <span className="bg-emerald-500/10 text-emerald-400 font-mono text-[10px] px-3 py-1 rounded-full border border-emerald-500/20 tracking-widest font-bold">
                          {analysisResult.bias}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-mono">Pattern Breakdown</span>
                        <h4 className="text-4xl font-light tracking-tight text-white font-display pt-1">{analysisResult.pattern}</h4>
                        <p className="text-xs font-mono text-neutral-400 pt-1">
                          Cadence / Multi-TF: <span className="text-white font-medium">{analysisResult.timeframe}</span>
                        </p>
                      </div>

                      {/* Levels Tracking Execution Grid */}
                      <div className="grid grid-cols-3 gap-4 border-t border-b border-neutral-900 py-6 font-mono text-xs">
                        <div>
                          <p className="text-neutral-500 text-[9px] uppercase tracking-widest">Entry Trigger</p>
                          <p className="font-semibold text-white mt-1.5 text-base tracking-tight">{analysisResult.levels.entry}</p>
                        </div>
                        <div>
                          <p className="text-neutral-500 text-[9px] uppercase tracking-widest">Invalidation (SL)</p>
                          <p className="font-semibold text-rose-500 mt-1.5 text-base tracking-tight">{analysisResult.levels.sl}</p>
                        </div>
                        <div>
                          <p className="text-neutral-500 text-[9px] uppercase tracking-widest">Target (TP)</p>
                          <p className="font-semibold text-emerald-400 mt-1.5 text-base tracking-tight">{analysisResult.levels.tp}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2 font-mono text-xs text-neutral-400 uppercase tracking-wider">
                          <Sparkles className="h-4 w-4 text-neutral-400" />
                          <span>Confidence Metric:</span>
                        </div>
                        <span className="text-3xl font-light font-display text-white tracking-tighter">{analysisResult.confidence}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Permanent Performance Terminal Status Metric */}
                <div className="flex justify-between items-center pt-4 border-t border-neutral-900/60 text-[10px] font-mono text-neutral-500">
                  <span>ML Matrix Node: Activated</span>
                  <span>Latency: 14ms</span>
                </div>
              </div>

            </div>
          </div>
        </Reveal>
      </section>

      {/* --- HARD METRICS GRID SECTION --- */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { n: "98.4%", l: "Uptime" },
            { n: "15m", l: "Scan cadence" },
            { n: "80+", l: "Instruments" },
            { n: "24/7", l: "Coverage" },
          ].map((s, i) => (
            <Reveal key={s.l} delay={i * 0.06}>
              <div className="rounded-2xl border border-neutral-900 bg-[#050505] p-6 text-center md:text-left">
                <p className="font-display text-4xl font-light text-white">{s.n}</p>
                <p className="mt-2 text-[10px] font-mono uppercase tracking-widest text-neutral-500">{s.l}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* --- TECHNICAL FEATURE MATRIX --- */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: <Brain className="h-5 w-5" />, t: "Pattern recognition", d: "Transformer models trained on 12 years of multi-asset price data." },
            { icon: <Activity className="h-5 w-5" />, t: "Macro context", d: "Cross-references economic calendar, COT data and ETF flows in real time." },
            { icon: <Target className="h-5 w-5" />, t: "Entry, SL & TP", d: "Every signal arrives with structured execution — no guesswork." },
            { icon: <TrendingUp className="h-5 w-5" />, t: "Backtested edge", d: "Every model is walk-forward validated before going live." },
            { icon: <Sparkles className="h-5 w-5" />, t: "Confidence scoring", d: "Each setup is scored 0–100 so you size with intent." },
            { icon: <Activity className="h-5 w-5" />, t: "Risk guardrails", d: "Automatic exposure caps across correlated instruments." },
          ].map((f, i) => (
            <Reveal key={f.t} delay={i * 0.05}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-neutral-900 bg-[#050505] p-7 transition-colors hover:border-neutral-800">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-neutral-900 text-neutral-300">
                  {f.icon}
                </div>
                <p className="mt-5 font-medium text-sm uppercase tracking-wider font-mono text-neutral-200">{f.t}</p>
                <p className="mt-2 text-xs text-neutral-400 leading-relaxed font-sans">{f.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* --- FOOTER ACCESS CTA --- */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-neutral-900 bg-gradient-to-br from-[#050505] to-black p-10 md:p-14 text-center">
            <div className="relative">
              <h3 className="font-display text-3xl md:text-5xl font-light tracking-tight text-white">
                Subscribe to the <span className="italic text-neutral-400">signal feed.</span>
              </h3>
              <p className="mx-auto mt-4 max-w-xl text-xs font-mono text-neutral-500 tracking-wide">
                Live alerts on Telegram, Discord and email — included with every ChainForge account.
              </p>
              <Link
                to="/contact"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-xs font-mono uppercase tracking-widest font-semibold text-black hover:bg-neutral-200 transition-colors"
              >
                Request access
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 stroke-[2.5]" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}