"use client";

import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { 
  ArrowRight, 
  Wallet, 
  ShieldCheck, 
  TrendingUp, 
  Landmark, 
  Smartphone, 
  DollarSign, 
  User, 
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Building2
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { PageBackground } from "@/components/page-background";

export const Route = createFileRoute("/withdrawal")({
  head: () => ({
    meta: [
      { title: "Withdraw Profits — ChainForge" },
      {
        name: "description",
        content: "Fast, reliable withdrawals. Bridge your trading profits back to your bank or wallet.",
      },
    ],
  }),
  component: WithdrawalPage,
});

type Method = "ecocash" | "innbucks" | "fnb" | "cash" | "";

function WithdrawalPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  
  // Form State
  const [clientId, setClientId] = useState("");
  const [clientName, setClientName] = useState("");
  const [method, setMethod] = useState<Method>("");
  const [amount, setAmount] = useState("");
  const [accountNumber, setAccountNumber] = useState(""); // EcoCash / InnBucks / FNB

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) setStep((prev) => (prev + 1) as 1 | 2 | 3);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep((prev) => (prev - 1) as 1 | 2 | 3);
  };

  const isStep1Valid = clientId && clientName;
  const isStep2Valid = method && amount && (method === "cash" || accountNumber);

  return (
    <>
      <section className="relative">
        <PageBackground variant="soft" />
        <div className="relative mx-auto max-w-5xl px-6 pt-24 pb-12 text-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.25em] text-primary-glow font-['Montserrat']">Capital Access</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display mt-5 text-5xl md:text-6xl font-['Montserrat']">
              <span className="text-gradient">Withdraw</span>{" "}
              <span className="text-accent-gradient italic">Profits.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-2xl text-muted-foreground text-sm md:text-base">
              Securely access your trading returns. Review your transaction protocol, structure your payout path, and finalize settlement details instantly.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Two-Column Structured Workspace Grid matching Deposit layout */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-8 lg:grid-cols-3 items-start">
          
          {/* LEFT BLOCK: Multi-step forms (Spans 2 columns on large viewports) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Step Navigation Tabs */}
            <div className="rounded-2xl border border-border bg-card/10 p-4 backdrop-blur-sm flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
              <span className={`px-3 py-1.5 rounded-lg transition-colors ${step === 1 ? "text-primary-glow bg-primary-glow/[0.05] font-bold" : ""}`}>1. Identification</span>
              <span className="text-muted-foreground/40">•</span>
              <span className={`px-3 py-1.5 rounded-lg transition-colors ${step === 2 ? "text-primary-glow bg-primary-glow/[0.05] font-bold" : ""}`}>2. Method & Allocation</span>
              <span className="text-muted-foreground/40">•</span>
              <span className={`px-3 py-1.5 rounded-lg transition-colors ${step === 3 ? "text-primary-glow bg-primary-glow/[0.05] font-bold" : ""}`}>3. Verification Protocol</span>
            </div>

            {/* STEP 1: Client Identification */}
            {step === 1 && (
              <div className="rounded-3xl border border-border bg-card/20 p-6 backdrop-blur-sm animate-fade-in">
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground font-['Montserrat'] mb-6 flex items-center gap-2">
                  <User className="h-4 w-4 text-primary-glow" /> Client Identification
                </h3>
                <form onSubmit={handleNextStep} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/70 block">Client ID / Account Number</label>
                    <div className="relative flex items-center rounded-2xl border border-border bg-background/50 focus-within:border-primary-glow/60 transition-colors px-4 py-3">
                      <input
                        type="text"
                        required
                        placeholder="e.g., CF-98765"
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                        className="w-full bg-transparent text-sm font-medium outline-none border-none p-0 text-foreground"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/70 block">Full Name</label>
                    <div className="relative flex items-center rounded-2xl border border-border bg-background/50 focus-within:border-primary-glow/60 transition-colors px-4 py-3">
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full bg-transparent text-sm font-medium outline-none border-none p-0 text-foreground"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-primary-glow to-primary px-6 py-4 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.01]"
                  >
                    Continue to Financial Details
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </form>
              </div>
            )}

            {/* STEP 2: Financial Payout Setup */}
            {step === 2 && (
              <div className="rounded-3xl border border-border bg-card/20 p-6 backdrop-blur-sm animate-fade-in space-y-6">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-foreground font-['Montserrat'] mb-6">
                    Select Payout Method
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      { id: "ecocash", label: "EcoCash Wallet", d: "Local mobile settlement desk", icon: <Smartphone className="h-5 w-5" /> },
                      { id: "innbucks", label: "InnBucks Wallet", d: "Fast counter-based retrieval", icon: <Wallet className="h-5 w-5" /> },
                      { id: "fnb", label: "FNB EFT Transfer", d: "Direct institutional bank clearing", icon: <Landmark className="h-5 w-5" /> },
                      { id: "cash", label: "Cash Payout Desk", d: "Physical cash vault payout", icon: <DollarSign className="h-5 w-5" /> },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setMethod(item.id as Method)}
                        className={`group relative text-left w-full rounded-2xl border p-5 transition-all outline-none ${
                          method === item.id
                            ? "border-primary-glow bg-primary-glow/[0.04]"
                            : "border-border bg-card/40 hover:border-border/80"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors ${
                            method === item.id ? "bg-primary-glow/20 text-primary-glow" : "bg-muted/10 text-muted-foreground group-hover:text-foreground"
                          }`}>
                            {item.icon}
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm tracking-tight text-foreground font-['Montserrat']">{item.label}</h4>
                            <p className="text-xs text-muted-foreground mt-0.5">{item.d}</p>
                          </div>
                        </div>
                        {method === item.id && (
                          <CheckCircle2 className="absolute top-4 right-4 h-4 w-4 text-primary-glow" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {method && (
                  <form onSubmit={handleNextStep} className="space-y-6 pt-4 border-t border-border/60">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/70 block">Amount to Withdraw (USD)</label>
                      <div className="relative flex items-center rounded-2xl border border-border bg-background/50 focus-within:border-primary-glow/60 transition-colors px-4 py-3">
                        <span className="text-lg font-medium text-muted-foreground mr-2">$</span>
                        <input
                          type="number"
                          required
                          placeholder="0.00"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="w-full bg-transparent text-lg font-semibold text-foreground outline-none border-none p-0"
                        />
                      </div>
                    </div>

                    {method !== "cash" && (
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/70 block">
                          {method === "fnb" ? "Bank Account Number" : "Registered Mobile Number"}
                        </label>
                        <div className="relative flex items-center rounded-2xl border border-border bg-background/50 focus-within:border-primary-glow/60 transition-colors px-4 py-3">
                          <input
                            type="text"
                            required
                            placeholder={method === "fnb" ? "e.g., 62000000000" : "e.g., 077XXXXXXX"}
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            className="w-full bg-transparent text-sm font-medium outline-none border-none p-0 text-foreground"
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex gap-4 pt-2">
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="flex items-center gap-2 px-6 py-4 rounded-2xl border border-border text-sm font-semibold hover:bg-card/40 transition-colors"
                      >
                        <ArrowLeft className="h-4 w-4" /> Back
                      </button>
                      <button
                        type="submit"
                        disabled={!isStep2Valid}
                        className="flex-1 group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-primary-glow to-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] disabled:opacity-50 disabled:pointer-events-none transition-transform hover:scale-[1.01]"
                      >
                        Review Protocol
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* STEP 3: Verification Instructions Panel */}
            {step === 3 && (
              <div className="rounded-3xl border border-border bg-card/20 p-6 backdrop-blur-sm animate-fade-in space-y-8">
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-primary-glow font-['Montserrat'] capitalize">
                    {method === "fnb" ? "FNB EFT" : method} Verification Protocol
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    To finalize and receive your funds cleanly from the desk, run through these mandatory compliance steps:
                  </p>
                  
                  <ol className="space-y-4 text-sm text-muted-foreground list-none pl-0">
                    <li className="flex gap-3">
                      <span className="text-primary-glow font-mono font-bold">1.</span>
                      <div>
                        <strong className="text-foreground block text-xs uppercase tracking-wider font-['Montserrat']">Request Withdrawal</strong>
                        <p className="text-xs mt-0.5">Initiate the specific extraction amount framework directly through your internal member portal dashboard.</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary-glow font-mono font-bold">2.</span>
                      <div>
                        <strong className="text-foreground block text-xs uppercase tracking-wider font-['Montserrat']">Provide Destination Details</strong>
                        <p className="text-xs mt-0.5">Double check that your designated credentials (Account Name, Routing Number, or Wallet Node) match your system profile metrics perfectly.</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary-glow font-mono font-bold">3.</span>
                      <div>
                        <strong className="text-foreground block text-xs uppercase tracking-wider font-['Montserrat']">Wait for Processing</strong>
                        <p className="text-xs mt-0.5">Our accounting desk will process the outbound wire from the <span className="text-foreground font-semibold">MAZ FX (PVT) LTD</span> corporate vault account (63051409861) straight to your receiver line.</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary-glow font-mono font-bold">4.</span>
                      <div>
                        <strong className="text-foreground block text-xs uppercase tracking-wider font-['Montserrat']">Confirm Receipt</strong>
                        <p className="text-xs mt-0.5">Once the ledger logs your asset deployment state as "Complete", execute a check on your external personal dashboard app to see if balances updated.</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary-glow font-mono font-bold">5.</span>
                      <div>
                        <strong className="text-foreground block text-xs uppercase tracking-wider font-['Montserrat']">Record Keeping</strong>
                        <p className="text-xs mt-0.5">Grab a pristine screenshot copy of the incoming balance receipt to verify the transaction finalized successfully.</p>
                      </div>
                    </li>
                  </ol>
                </div>

                {/* Mad High-Visibility Pure Crimson Red Notice Block */}
                <div className="border-2 border-red-500 bg-red-950/40 rounded-2xl p-5 shadow-[0_0_15px_rgba(239,68,68,0.25)] animate-pulse">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-black tracking-wide text-red-500 uppercase font-mono">
                        IMPORTANT: Don't forget to attach your proof of transfer image once redirected to WhatsApp!
                      </p>
                      <p className="text-xs text-red-400/80 mt-1 font-sans">
                        Settlement desk clearing agents require this verification file before executing ledger balance approvals.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="flex items-center gap-2 px-6 py-4 rounded-2xl border border-border text-sm font-semibold hover:bg-card/40 transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                  <a
                    href={`https://wa.me/YOUR_NUMBER?text=Hi,%20I'm%20confirming%20my%20withdrawal%20request%20for%20$${amount}%20via%20${method.toUpperCase()}.%20ID:%20${clientId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-emerald-500 to-emerald-600 px-8 py-4 text-sm font-semibold text-white shadow-xl transition-transform hover:scale-[1.01]"
                  >
                    Redirect to WhatsApp
                    <CheckCircle2 className="h-4 w-4" />
                  </a>
                </div>
              </div>
            )}

          </div>

          {/* RIGHT BLOCK: Order checklist & Real-time Live Summary Board */}
          <div className="space-y-6 lg:sticky lg:top-36">
            <div className="rounded-3xl border border-border bg-card/30 p-6 backdrop-blur-sm shadow-xl">
              <div className="flex items-center justify-between border-b border-border/60 pb-4 mb-5">
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground font-['Montserrat']">
                  Summary
                </h3>
                <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider text-emerald-500 uppercase">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Encrypted
                </div>
              </div>

              {/* Dynamic Summary Ledger Metrics */}
              <div className="space-y-3.5 text-xs">
                <div className="flex justify-between items-center text-muted-foreground">
                  <span>Client ID</span>
                  <span className="font-mono text-foreground tracking-tight font-medium">{clientId || "—"}</span>
                </div>
                <div className="flex justify-between items-center text-muted-foreground">
                  <span>Beneficiary</span>
                  <span className="font-medium text-foreground max-w-[140px] truncate">{clientName || "—"}</span>
                </div>
                <div className="flex justify-between items-center text-muted-foreground">
                  <span>Payout Track</span>
                  <span className="font-medium text-foreground uppercase">{method ? method : "Unselected"}</span>
                </div>
                {accountNumber && method !== "cash" && (
                  <div className="flex justify-between items-center text-muted-foreground">
                    <span>Account / Node</span>
                    <span className="font-mono text-foreground tracking-wider bg-muted/10 px-1 py-0.5 rounded text-[10px] truncate max-w-[130px]">
                      {accountNumber}
                    </span>
                  </div>
                )}
                
                <div className="border-t border-border/60 my-4 pt-4 flex justify-between items-baseline">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground">Net Cashout</span>
                  <span className="text-2xl font-bold tracking-tight text-primary-glow font-mono">
                    ${amount ? Number(amount).toLocaleString() : "0"}.00
                  </span>
                </div>
              </div>

              <p className="mt-4 text-center text-[10px] text-muted-foreground/60 leading-relaxed">
                Vault clearing limits active — all cashout vectors must comply with standard KYC internal balance parameters.
              </p>
            </div>

            {/* Sub-Policy Info Block matching Deposit alignment */}
            <div className="rounded-2xl border border-border/50 bg-card/10 p-5 text-xs text-muted-foreground space-y-2">
              <h5 className="font-bold uppercase tracking-wider text-foreground text-[10px] font-['Montserrat']">
                Desk Liquidation Policy
              </h5>
              <p className="leading-relaxed text-[11px]">
                Secured institutional-grade capital deployment pipelines ensure payouts process seamlessly within standard compliance operating hours.
              </p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}