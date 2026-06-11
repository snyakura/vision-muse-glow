import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Upload, Sparkles, Loader2, ImageIcon, ArrowRight, X } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { PageBackground } from "@/components/page-background";
import { analyseChart } from "@/lib/analyse-chart.functions";

export const Route = createFileRoute("/ai-analyser")({
  head: () => ({
    meta: [
      { title: "AI Analyser — ChainForge" },
      {
        name: "description",
        content:
          "Upload any trading chart and get an instant multi-timeframe AI breakdown — bias, levels, entries and risk.",
      },
    ],
  }),
  component: AIAnalyser,
});

function AIAnalyser() {
  const run = useServerFn(analyseChart);
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);

  const onFile = (file: File | null) => {
    setError(null);
    setAnalysis(null);
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file.");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setError("Image must be under 8 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const analyse = async () => {
    if (!preview) return;
    setLoading(true);
    setError(null);
    setAnalysis(null);
    try {
      const res = await run({ data: { imageDataUrl: preview, notes: notes || undefined } });
      setAnalysis(res.analysis);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong.";
      if (msg.includes("429")) setError("Rate limit reached — try again in a moment.");
      else if (msg.includes("402")) setError("AI credits exhausted. Please top up to continue.");
      else setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setPreview(null);
    setAnalysis(null);
    setError(null);
    setNotes("");
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <>
      <section className="relative">
        <PageBackground />
        <div className="relative mx-auto max-w-5xl px-6 pt-24 pb-12 text-center">
          <Reveal>
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur-md">
              <Sparkles className="h-3 w-3 text-primary-glow" />
              Powered by THE FOREX MAFIA Intelligence
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display mt-7 text-5xl leading-[1.05] md:text-7xl">
              <span className="text-gradient">Upload a chart.</span>{" "}
              <span className="text-accent-gradient">Get the read.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-2xl text-muted-foreground md:text-lg">
              Drop in a screenshot from TradingView, MT4 or your broker — our AI returns
              structure, bias, key levels and a structured trade plan in seconds.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 pb-24">
        <Reveal>
          <div className="rounded-[2.5rem] border border-border bg-card/40 p-3 shadow-[var(--shadow-soft)] backdrop-blur-md md:p-4">
            <div className="grid gap-3 md:grid-cols-2">
              {/* LEFT — editorial panel */}
              <div className="flex flex-col justify-between rounded-[2rem] bg-background/40 p-8 md:p-12">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-primary-glow">
                    Real-time Chart Intelligence
                  </p>
                  <h2 className="font-display mt-6 text-4xl leading-[1.05] md:text-5xl">
                    <span className="text-gradient">Accelerate</span>{" "}
                    <span className="text-muted-foreground">your read on</span>
                    <br />
                    <span className="text-muted-foreground">any</span>{" "}
                    <span className="text-gradient">Market Setup</span>
                  </h2>
                  <p className="mt-6 max-w-md text-muted-foreground">
                    ChainForge slides into your workflow with zero setup — just upload your
                    chart, add optional context, and let the desk do the heavy lifting.
                  </p>
                </div>

                <div className="mt-12 border-t border-border pt-8">
                  <div className="font-display text-3xl leading-none text-muted-foreground">"</div>
                  <p className="mt-2 max-w-md text-sm text-foreground">
                    With ChainForge, our prop desk reviews ten times more setups —
                    structured, ranked and ready to execute.
                  </p>
                  <div className="mt-5">
                    <p className="text-sm font-medium">Garrett Morgan</p>
                    <p className="text-xs text-muted-foreground">Senior Trader, Proprietary Desk</p>
                  </div>
                </div>
              </div>

              {/* RIGHT — analyser panel */}
              <div className="relative overflow-hidden rounded-[2rem] bg-[oklch(0.11_0.02_250)] p-5 md:p-6">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,oklch(0.55_0.22_250_/_0.25),transparent_70%)]" />

                {/* Tabs */}
                <div className="relative flex items-center gap-1 border-b border-white/5 pb-3 text-xs">
                  <span className="flex items-center gap-1.5 rounded-md bg-white/5 px-2.5 py-1 text-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary-glow pulse-dot" />
                    AI Analyser
                  </span>
                  <span className="rounded-md px-2.5 py-1 text-muted-foreground">Forex</span>
                  <span className="rounded-md px-2.5 py-1 text-muted-foreground">Crypto</span>
                  <span className="rounded-md px-2.5 py-1 text-muted-foreground">Indices</span>
                </div>

                {/* Workspace */}
                <div className="relative mt-4 space-y-4">
                  {!preview ? (
                    <label
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        onFile(e.dataTransfer.files?.[0] ?? null);
                      }}
                      className="group flex aspect-[4/3] cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.02] text-center transition-colors hover:border-primary/50 hover:bg-white/[0.04]"
                    >
                      <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => onFile(e.target.files?.[0] ?? null)}
                      />
                      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary-glow/30 to-primary/20 text-primary-glow">
                        <Upload className="h-6 w-6" />
                      </div>
                      <p className="mt-5 font-medium">Drop your chart screenshot</p>
                      <p className="mt-1.5 text-xs text-muted-foreground">
                        PNG / JPG · up to 8 MB · TradingView, MT4, broker screenshots
                      </p>
                      <span className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs">
                        <ImageIcon className="h-3 w-3" />
                        Browse files
                      </span>
                    </label>
                  ) : (
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40">
                      <img
                        src={preview}
                        alt="Chart upload"
                        className="aspect-[4/3] w-full object-contain"
                      />
                      <button
                        onClick={reset}
                        className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-black/60 text-white backdrop-blur transition-colors hover:bg-black/80"
                        aria-label="Remove"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}

                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Optional context — pair, timeframe, what you're seeing..."
                    rows={2}
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary/50 focus:outline-none"
                  />

                  {error && (
                    <div className="rounded-xl border border-destructive/40 bg-destructive/10 px-3.5 py-2.5 text-xs text-destructive-foreground">
                      {error}
                    </div>
                  )}

                  {analysis && (
                    <div className="max-h-72 overflow-y-auto rounded-2xl border border-white/10 bg-black/30 p-4 text-sm leading-relaxed text-foreground/90">
                      <pre className="whitespace-pre-wrap font-sans">{analysis}</pre>
                    </div>
                  )}
                </div>

                {/* Footer actions */}
                <div className="relative mt-4 flex items-center justify-between gap-3 border-t border-white/5 pt-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-success" />
                    Secure & private
                  </div>
                  <button
                    onClick={analyse}
                    disabled={!preview || loading}
                    className="group inline-flex items-center gap-2 rounded-full btn-lively px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Analysing…
                      </>
                    ) : (
                      <>
                        Analyse with AI
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Capability strip */}
        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {[
            { n: "15s", l: "Average response" },
            { n: "80+", l: "Instruments supported" },
            { n: "98.4%", l: "Uptime" },
            { n: "24/7", l: "Always on" },
          ].map((s, i) => (
            <Reveal key={s.l} delay={i * 0.06}>
              <div className="rounded-2xl border border-border bg-card/40 p-6 backdrop-blur-sm">
                <p className="font-display text-4xl text-accent-gradient">{s.n}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {s.l}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
