"use client";

import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { 
  ArrowRight, 
  ShieldCheck, 
  User, 
  Mail,
  Phone, 
  Briefcase, 
  Smartphone,
  CheckCircle2,
  Clock
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { PageBackground } from "@/components/page-background";

export const Route = createFileRoute("/withdrawal")({
  head: () => ({
    meta: [
      { title: "Withdraw Capital — ChainForge" },
      {
        name: "description",
        content: "Liquidate your trading profits safely. Fast withdrawals from major brokers to your local rails.",
      },
    ],
  }),
  component: WithdrawalPage,
});

type BrokerType = "weltrade" | "deriv" | "other";
type PayoutMethodType = "ecocash" | "innbucks" | "fnb_eft";

function WithdrawalPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    whatsapp: "",
  });

  const [selectedBroker, setSelectedBroker] = useState<BrokerType>("weltrade");
  const [crNumber, setCrNumber] = useState<string>("");
  const [selectedMethod, setSelectedMethod] = useState<PayoutMethodType>("ecocash");
  const [amount, setAmount] = useState<string>("500");

  const isCrInvalid = selectedBroker === "deriv" && crNumber.trim().length > 0 && !crNumber.toLowerCase().startsWith("cr");
  const isFormValid = 
    formData.firstName.trim() !== "" &&
    formData.lastName.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.whatsapp.trim() !== "" &&
    (selectedBroker !== "deriv" || (crNumber.toLowerCase().startsWith("cr") && crNumber.trim().length > 2)) &&
    Number(amount) > 0;

  return (
    <>
      <section className="relative">
        <PageBackground variant="soft" />
        <div className="relative mx-auto max-w-5xl px-6 pt-24 pb-12 text-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.25em] text-primary-glow font-['Montserrat']">Profit Liquidation</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display mt-5 text-5xl md:text-6xl font-['Montserrat']">
              <span className="text-gradient">Withdraw</span>{" "}
              <span className="text-accent-gradient">Earnings.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-2xl text-muted-foreground text-sm md:text-base">
              Access your trading capital with institutional speed. We process your liquidation requests via the most reliable local and digital rails.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-8 lg:grid-cols-3 items-start">
          
          <div className="lg:col-span-2 space-y-6">
            
            {/* 1. Identity Form */}
            <div className="card-animated rounded-3xl p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground font-['Montserrat'] mb-6 flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-glow/20 text-primary-glow text-[10px]">1</span>
                Personal Details
              </h3>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/70 block mb-1.5">First Name</label>
                  <div className="flex items-center rounded-xl border border-border bg-background/40 px-3 py-2.5 focus-within:border-primary-glow/50 transition-colors">
                    <User className="h-4 w-4 text-muted-foreground mr-2.5" />
                    <input 
                      type="text" 
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="w-full bg-transparent text-sm text-foreground outline-none border-none p-0"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/70 block mb-1.5">Surname</label>
                  <div className="flex items-center rounded-xl border border-border bg-background/40 px-3 py-2.5 focus-within:border-primary-glow/50 transition-colors">
                    <User className="h-4 w-4 text-muted-foreground mr-2.5" />
                    <input 
                      type="text" 
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="w-full bg-transparent text-sm text-foreground outline-none border-none p-0"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/70 block mb-1.5">Email Address</label>
                  <div className="flex items-center rounded-xl border border-border bg-background/40 px-3 py-2.5 focus-within:border-primary-glow/50 transition-colors">
                    <Mail className="h-4 w-4 text-muted-foreground mr-2.5" />
                    <input 
                      type="email" 
                      placeholder="johndoe@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-transparent text-sm text-foreground outline-none border-none p-0"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/70 block mb-1.5">WhatsApp Number</label>
                  <div className="flex items-center rounded-xl border border-border bg-background/40 px-3 py-2.5 focus-within:border-primary-glow/50 transition-colors">
                    <Phone className="h-4 w-4 text-muted-foreground mr-2.5" />
                    <input 
                      type="tel" 
                      placeholder="+263 7xx xxx xxx"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                      className="w-full bg-transparent text-sm text-foreground outline-none border-none p-0"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Source Broker */}
            <div className="card-animated rounded-3xl p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground font-['Montserrat'] mb-6 flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-glow/20 text-primary-glow text-[10px]">2</span>
                Select Source Broker
              </h3>

              <div className="grid gap-3 sm:grid-cols-3">
                {([
                  { id: "weltrade", label: "Weltrade", logo: "https://logo.clearbit.com/weltrade.com" },
                  { id: "deriv", label: "Deriv", logo: "https://logo.clearbit.com/deriv.com" },
                  { id: "other", label: "Other", logo: "https://logo.clearbit.com/metatrader5.com" },
                ] as { id: BrokerType; label: string; logo: string }[]).map((broker) => (
                  <button
                    key={broker.id}
                    onClick={() => setSelectedBroker(broker.id)}
                    className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border font-['Montserrat'] font-medium text-sm transition-all relative ${
                      selectedBroker === broker.id
                        ? "border-primary-glow bg-primary-glow/[0.08] text-foreground shadow-[0_0_25px_rgba(139,92,246,0.25)]"
                        : "border-border bg-background/40 text-muted-foreground hover:border-muted-foreground/40"
                    }`}
                  >
                    <div className="h-9 w-9 flex items-center justify-center rounded-lg bg-background/60 border border-border p-1">
                      <img src={broker.logo} alt={broker.label}
                        className="h-full w-full object-contain"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                    </div>
                    {broker.label}
                    {selectedBroker === broker.id && (
                      <CheckCircle2 className="absolute top-2 right-2 h-3.5 w-3.5 text-primary-glow" />
                    )}
                  </button>
                ))}
              </div>

              {selectedBroker === "deriv" && (
                <div className="mt-5 pt-4 border-t border-border/50">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/70 block mb-2">
                    Deriv CR Number
                  </label>
                  <div className={`flex items-center rounded-xl border px-3 py-2.5 bg-background/40 transition-colors ${
                    isCrInvalid ? "border-rose-500/80 focus-within:border-rose-500" : "border-border focus-within:border-primary-glow/50"
                  }`}>
                    <input 
                      type="text" 
                      placeholder="CR123456"
                      value={crNumber}
                      onChange={(e) => setCrNumber(e.target.value)}
                      className="w-full bg-transparent text-sm text-foreground outline-none border-none p-0 font-mono uppercase tracking-wide"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 3. Payout Method */}
            <div className="card-animated rounded-3xl p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground font-['Montserrat'] mb-6 flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-glow/20 text-primary-glow text-[10px]">3</span>
                Receiving Payout Method
              </h3>

              <div className="grid gap-4 sm:grid-cols-3">
                {([
                  { id: "ecocash", label: "EcoCash", logo: "https://logo.clearbit.com/ecocash.co.zw" },
                  { id: "innbucks", label: "InnBucks", logo: "https://logo.clearbit.com/innbucks.co.zw" },
                  { id: "fnb_eft", label: "FNB EFT", logo: "https://logo.clearbit.com/fnb.co.za" },
                ] as { id: PayoutMethodType; label: string; logo: string }[]).map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border font-medium text-sm transition-all relative ${
                      selectedMethod === method.id
                        ? "border-primary-glow bg-primary-glow/[0.08] text-foreground shadow-[0_0_25px_rgba(139,92,246,0.25)]"
                        : "border-border bg-background/40 text-muted-foreground hover:border-muted-foreground/40"
                    }`}
                  >
                    <div className="h-9 w-9 flex items-center justify-center rounded-lg bg-white/95 p-1">
                      <img src={method.logo} alt={method.label}
                        className="h-full w-full object-contain"
                        onError={(e) => {
                          const t = e.currentTarget as HTMLImageElement;
                          t.style.display = "none";
                          const fb = t.parentElement?.querySelector('.fb') as HTMLElement | null;
                          if (fb) fb.style.display = "flex";
                        }} />
                      <Smartphone className="fb h-5 w-5 text-primary-glow hidden" />
                    </div>
                    {method.label}
                    {selectedMethod === method.id && (
                      <CheckCircle2 className="absolute top-2 right-2 h-3.5 w-3.5 text-primary-glow" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Amount */}
            <div className="card-animated rounded-3xl p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground font-['Montserrat'] mb-4">
                Withdrawal Amount
              </h3>
              <div className="relative flex items-center rounded-xl border border-border bg-background/50 focus-within:border-primary-glow/60 transition-colors px-4 py-2.5">
                <span className="text-sm font-medium text-muted-foreground mr-1.5">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-transparent text-base font-semibold text-foreground outline-none border-none p-0"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6 lg:sticky lg:top-36">
            <div className="card-animated rounded-3xl p-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-border/60 pb-4 mb-5">
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground font-['Montserrat']">Request Summary</h3>
                <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider text-emerald-500 uppercase">
                  <ShieldCheck className="h-3.5 w-3.5" /> Secure Desk
                </div>
              </div>

              <div className="space-y-3.5 text-xs border-b border-border/60 pb-5">
                <div className="flex justify-between items-center text-muted-foreground">
                  <span>Source Broker</span>
                  <span className="font-semibold text-foreground capitalize">{selectedBroker}</span>
                </div>
                {selectedBroker === "deriv" && crNumber && (
                  <div className="flex justify-between items-center text-muted-foreground">
                    <span>Account ID</span>
                    <span className="font-mono text-foreground uppercase">{crNumber}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-muted-foreground">
                  <span>Payout Via</span>
                  <span className="font-semibold text-foreground uppercase">{selectedMethod.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between items-center text-muted-foreground">
                  <span>Gross Withdraw</span>
                  <span className="font-mono text-foreground">${Number(amount || 0).toLocaleString()}.00</span>
                </div>
                <div className="flex justify-between items-center text-muted-foreground">
                  <span>Desk Fee</span>
                  <span className="font-mono text-foreground">$1.50</span>
                </div>
                <div className="flex justify-between items-center text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> ETA</span>
                  <span className="font-mono text-foreground">~15 min</span>
                </div>
                <div className="pt-3 flex justify-between items-baseline">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground">Net Payout</span>
                  <span className="text-xl font-bold tracking-tight text-primary-glow font-mono">
                    ${Math.max(0, Number(amount || 0) - 1.5).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mt-5 p-4 rounded-2xl bg-background/50 border border-border/80 text-xs">
                <p className="text-[10px] font-bold uppercase tracking-wider text-primary-glow font-['Montserrat'] mb-3">Withdrawal Protocol</p>
                <ul className="space-y-3 text-muted-foreground list-disc pl-3.5">
                  <li>Submit this request to the desk.</li>
                  <li>An account manager will contact you on WhatsApp to verify ownership.</li>
                  <li>Transfer the funds to our corporate agent on your broker dashboard.</li>
                  <li>Receive your local payout instantly once confirmed.</li>
                </ul>
              </div>

              <button
                disabled={!isFormValid}
                className={`group mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-semibold transition-all ${
                  isFormValid 
                    ? "premium-button hover:scale-[1.01]" 
                    : "bg-muted/20 text-muted-foreground/40 cursor-not-allowed border border-border/50"
                }`}
              >
                <span>Request Liquidation</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}