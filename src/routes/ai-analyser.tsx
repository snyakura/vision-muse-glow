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

        setTimeout(() => {
          setIsAnalyzing(false);
          setAnalysisResult({
            asset: "BTC/USDT",
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
    <div className="min-h-screen bg-neutral-50 text-neutral-900 selection:bg-neutral-900/10 [font-family:'Montserrat',sans-serif]">
      {/* Dynamic font injection so Montserrat works out-of-the-box */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&display=swap');
      `}</style>

      <PageBackground />

      {/* --- REPLICATED WORKSPACE SECTION FROM image_015b1f.png --- */}
      <section className="mx-auto max-w-6xl px-4 pt-16 pb-24 md:px-6">
        <Reveal>
          {/* Main Container Wrapper - Soft, clean layout structure */}
          <div className="grid md:grid-cols-12 gap-8 items-center rounded-[2.5rem] bg-white border border-neutral-200/60 p-6 md:p-10 shadow-sm">
            
            {/* LEFT SIDE: Typography & Copy Layout */}
            <div className="md:col-span-5 flex flex-col justify-between h-full py-4 space-y-12 md:space-y-0">
              <div>
                <span className="text-xs font-semibold tracking-wider text-black uppercase">
                  Multi-Timeframe Engine
                </span>
                <h1 className="mt-4 text-4xl font-light tracking-tight text-black md:text-5xl leading-[1.15]">
                  Accelerate your path to total <span className="font-semibold text-black">Market Intelligence</span>
                </h1>
                <p className="mt-6 text-sm leading-relaxed text-black max-w-sm font-medium">
                  ChainForge slides into your trading stack with zero infrastructure changes—just drop your chart, run the vision model, and execute with precision.
                </p>
              </div>

              {/* Bottom Testimonial/Quote Block matching image layout */}
              <div className="pt-8 border-t border-neutral-100 relative">
                <span className="absolute -top-3 left-0 text-4xl text-black font-serif leading-none">“</span>
                <p className="text-xs leading-relaxed text-black font-medium pl-4">
                  With ChainForge, our desk runs on autopilot technical heuristics—scanned, cross-referenced, and calculated through advanced machine learning vision models.
                </p>
                <div className="mt-3 pl-4">
                  <p className="text-[11px] font-bold text-black">ChainForge Intelligence</p>
                  <p className="text-[10px] text-black font-medium uppercase tracking-wider">Vision v4.0 Network Node</p>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: The Dark Floating Application Screen */}
            <div className="md:col-span-7 bg-neutral-50 rounded-3xl border border-neutral-200 shadow-2xl p-6 md:p-8 flex flex-col justify-between min-h-[500px]">
              
              {/* Terminal Tab Bar Row */}
              <div className="flex items-center justify-between border-b border-neutral-900 pb-4">
                <div className="flex items-center gap-2">
                  <div className="inline-flex items-center gap-1.5 rounded-md bg-neutral-900 border border-neutral-800 px-2.5 py-1 text-[11px] font-medium text-neutral-200">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>AI-Vision-Feed</span>
                  </div>
                  <span className="text-[11px] font-medium text-black cursor-pointer hidden sm:inline transition-colors uppercase tracking-wider">
                    Macro Context
                  </span>
                  <span className="text-[11px] font-medium text-black cursor-pointer hidden sm:inline transition-colors uppercase tracking-wider">
                    Backtest Log
                  </span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-neutral-800" />
                  <div className="w-2 h-2 rounded-full bg-neutral-800" />
                  <div className="w-2 h-2 rounded-full bg-neutral-800" />
                </div>
              </div>

              {/* Core Dynamic Content / Display Area */}
              <div className="my-auto py-8 w-full">
                
                {/* STATE 1: Default Awaiting File Upload */}
                {!image && !isAnalyzing && (
                  <div className="flex flex-col items-center justify-center text-center">
                    <label className="group flex flex-col items-center justify-center cursor-pointer max-w-sm w-full p-8 rounded-2xl border border-dashed border-neutral-800 bg-neutral-950/40 hover:border-neutral-700 hover:bg-neutral-950/80 transition-all duration-300">
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                      
                      <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 group-hover:text-white transition-colors mb-4">
                        <Upload className="w-5 h-5 stroke-[1.5]" />
                      </div>
                      
                      <p className="text-xs font-semibold uppercase tracking-widest text-black">
                        Upload Chart Snapshot
                      </p>
                      <p className="mt-1.5 text-[11px] text-black font-medium">
                        Drag & drop or browse (PNG, JPG)
                      </p>
                    </label>
                  </div>
                )}

                {/* STATE 2: Loading / Analysis Processing */}
                {isAnalyzing && (
                  <div className="flex flex-col items-center justify-center py-10 space-y-4">
                    <Loader2 className="h-7 w-7 text-neutral-400 animate-spin stroke-[1.5]" />
                    <div className="text-center space-y-1.5">
                      <p className="text-xs text-black tracking-widest uppercase font-semibold animate-pulse">Running Multi-TF Heuristics</p>
                      <p className="text-[10px] text-black font-medium">Parsing candlestick structure & patterns...</p>
                    </div>
                  </div>
                )}

                {/* STATE 3: Real-Time Results Telemetry Stream */}
                {analysisResult && (
                  <div className="space-y-6 text-xs text-black animate-fade-in">
                    
                    {/* Upper Asset and Bias metadata block */}
                    <div className="flex justify-between items-center border-b border-neutral-900 pb-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="font-semibold text-neutral-200 tracking-widest uppercase">{analysisResult.asset}</span>
                      </div>
                      <span className="text-[10px] px-2.5 py-0.5 rounded bg-neutral-200 border border-neutral-300 text-black font-bold tracking-widest uppercase">
                        {analysisResult.bias}
                      </span>
                    </div>

                    {/* Breakdown section styling closely resembling the code blocks */}
                    <div className="bg-neutral-100 rounded-xl p-4 border border-neutral-200 space-y-2">
                      <p className="text-[10px] text-black uppercase tracking-widest font-semibold">Pattern Breakdown</p>
                      <p className="text-base text-black font-medium tracking-tight font-sans">{analysisResult.pattern}</p>
                      <p className="text-[11px] text-black font-medium">
                        Timeframe Confluence: <span className="text-black">{analysisResult.timeframe}</span>
                      </p>
                    </div>

                    {/* Entry/SL/TP Structured Row */}
                    <div className="grid grid-cols-3 gap-4 border-t border-b border-neutral-900 py-4 text-center sm:text-left">
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-black font-semibold block">Entry Trigger</span>
                        <span className="text-black font-semibold text-sm mt-1 block">{analysisResult.levels.entry}</span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-black font-semibold block">Invalidation (SL)</span>
                        <span className="text-black font-semibold text-sm mt-1 block">{analysisResult.levels.sl}</span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-black font-semibold block">Target (TP)</span>
                        <span className="text-black font-semibold text-sm mt-1 block">{analysisResult.levels.tp}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Action Control Bar matching image layout */}
              <div className="flex justify-between items-center border-t border-neutral-900 pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] text-black uppercase tracking-widest font-medium">
                    {analysisResult ? `Confidence: ${analysisResult.confidence}` : "Model Terminal Ready"}
                  </span>
                </div>

                {analysisResult ? (
                  <button
                    onClick={resetAnalyser}
                    className="inline-flex items-center justify-center rounded-full bg-white text-black font-semibold tracking-wider uppercase text-[10px] px-5 py-2.5 hover:bg-neutral-200 transition-colors shadow-sm"
                  >
                    Clear Input Feed →
                  </button>
                ) : (
                  <button className="opacity-40 cursor-not-allowed inline-flex items-center justify-center rounded-full bg-neutral-200 border border-neutral-300 text-black font-semibold tracking-wider uppercase text-[10px] px-5 py-2.5">
                    Awaiting Upload
                  </button>
                )}
              </div>

            </div>
          </div>
        </Reveal>
      </section>

      {/* --- STATS GRID SECTION --- */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { n: "98.4%", l: "Uptime" },
            { n: "15m", l: "Scan cadence" },
            { n: "80+", l: "Instruments" },
            { n: "24/7", l: "Coverage" },
          ].map((s, i) => (
            <Reveal key={s.l} delay={i * 0.06}>
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <p className="text-3xl font-light tracking-tight text-black">{s.n}</p>
                <p className="mt-2 text-[10px] uppercase tracking-widest text-black font-semibold">{s.l}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* --- TECHNICAL FEATURE MATRIX --- */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
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
              <div className="group relative h-full overflow-hidden rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm transition-all hover:border-neutral-300">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-neutral-50 text-neutral-700 border border-neutral-200/50">
                  {f.icon}
                </div>
                <p className="mt-5 font-semibold text-xs uppercase tracking-wider text-black">{f.t}</p>
                <p className="mt-2 text-xs text-black leading-relaxed font-medium">{f.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* --- FOOTER ACCESS CTA --- */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-neutral-200 bg-white p-10 md:p-14 text-center shadow-sm">
            <div className="relative">
              <h3 className="text-3xl md:text-4xl font-light tracking-tight text-black">
                Subscribe to the <span className="font-semibold text-black">signal feed.</span>
              </h3>
              <p className="mx-auto mt-4 max-w-xl text-xs text-black tracking-wide font-medium">
                Live alerts on Telegram, Discord and email — included with every ChainForge account.
              </p>
              <Link
                to="/contact"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-7 py-3.5 text-xs uppercase tracking-widest font-semibold text-white hover:bg-neutral-800 transition-colors"
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