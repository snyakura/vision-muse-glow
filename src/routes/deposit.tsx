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
  AlertCircle
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { PageBackground } from "@/components/page-background";

export const Route = createFileRoute("/deposit")({
  head: () => ({
    meta: [
      { title: "Deposit Capital — ChainForge" },
      {
        name: "description",
        content: "Instant and secure funding for your trading accounts across major brokers.",
      },
    ],
  }),
  component: DepositPage,
});

type BrokerType = "weltrade" | "deriv" | "other";
type PaymentMethodType = "ecocash" | "innbucks" | "fnb_eft";

function DepositPage() {
  // Step 1: User Profile Details
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    whatsapp: "",
  });

  // Step 2 & 3: Selection Handlers
  const [selectedBroker, setSelectedBroker] = useState<BrokerType>("weltrade");
  const [crNumber, setCrNumber] = useState<string>("");
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>("ecocash");
  const [amount, setAmount] = useState<string>("1000");

  // Form Validation Flags
  const isCrInvalid = selectedBroker === "deriv" && crNumber.trim().length > 0 && !crNumber.toLowerCase().startsWith("cr");
  const isFormValid = 
    formData.firstName.trim() !== "" &&
    formData.lastName.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.whatsapp.trim() !== "" &&
    (selectedBroker !== "deriv" || (crNumber.toLowerCase().startsWith("cr") && crNumber.trim().length > 2));

  return (
    <>
      <section className="relative">
        <PageBackground variant="soft" />
        <div className="relative mx-auto max-w-5xl px-6 pt-24 pb-12 text-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.25em] text-primary-glow font-['Montserrat']">Account Funding</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display mt-5 text-5xl md:text-6xl font-['Montserrat']">
              <span className="text-gradient">Deposit</span>{" "}
              <span className="text-accent-gradient italic">Capital.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-2xl text-muted-foreground text-sm md:text-base">
              Move your capital onto the desk with zero friction. We bridge your funds to your trading dashboard instantly.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Responsive Two-Column Layout Syncing Frame with image_2c9ca8.jpg */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-8 lg:grid-cols-3 items-start">
          
          {/* Left Block: Client Operations & Configuration Panels */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* 1. Client Personal Details Identity Form Box */}
            <div className="rounded-3xl border border-border bg-card/20 p-6 backdrop-blur-sm">
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

            {/* 2. Broker Allocation Selection Matrix */}
            <div className="rounded-3xl border border-border bg-card/20 p-6 backdrop-blur-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground font-['Montserrat'] mb-6 flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-glow/20 text-primary-glow text-[10px]">2</span>
                Select Destination Broker
              </h3>

              <div className="grid gap-3 sm:grid-cols-3">
                {(["weltrade", "deriv", "other"] as BrokerType[]).map((broker) => (
                  <button
                    key={broker}
                    type="button"
                    onClick={() => setSelectedBroker(broker)}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border capitalize font-['Montserrat'] font-medium text-sm transition-all relative ${
                      selectedBroker === broker
                        ? "border-primary-glow bg-primary-glow/[0.04] text-foreground"
                        : "border-border bg-card/40 text-muted-foreground hover:border-muted-foreground/40"
                    }`}
                  >
                    <Briefcase className="h-4 w-4 mb-2 opacity-70" />
                    {broker}
                    {selectedBroker === broker && (
                      <CheckCircle2 className="absolute top-2 right-2 h-3.5 w-3.5 text-primary-glow" />
                    )}
                  </button>
                ))}
              </div>

              {/* Conditional Rendering UI: Deriv Account CR Validation Form Box */}
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
                  {isCrInvalid && (
                    <p className="flex items-center gap-1.5 text-xs text-rose-500 font-medium mt-2">
                      <AlertCircle className="h-3.5 w-3.5" />
                      CR Number must begin explicitly with "CR" credentials
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* 3. Transaction Gateways Selection Matrix */}
            <div className="rounded-3xl border border-border bg-card/20 p-6 backdrop-blur-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground font-['Montserrat'] mb-6 flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-glow/20 text-primary-glow text-[10px]">3</span>
                Payment Method
              </h3>

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { id: "ecocash" as PaymentMethodType, label: "EcoCash" },
                  { id: "innbucks" as PaymentMethodType, label: "InnBucks" },
                  { id: "fnb_eft" as PaymentMethodType, label: "FNB EFT" }
                ].map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setSelectedMethod(method.id)}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border font-medium text-sm transition-all relative ${
                      selectedMethod === method.id
                        ? "border-primary-glow bg-primary-glow/[0.04] text-foreground"
                        : "border-border bg-card/40 text-muted-foreground hover:border-muted-foreground/40"
                    }`}
                  >
                    <Smartphone className="h-4 w-4 mb-2 opacity-70" />
                    {method.label}
                    <span className="text-[9px] font-mono text-muted-foreground/60 mt-1">FEE: $1.00</span>
                    {selectedMethod === method.id && (
                      <CheckCircle2 className="absolute top-2 right-2 h-3.5 w-3.5 text-primary-glow" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Capital Pricing Input Allocation Component */}
            <div className="rounded-3xl border border-border bg-card/20 p-6 backdrop-blur-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground font-['Montserrat'] mb-4">
                Amount Setting
              </h3>
              <div className="relative flex items-center rounded-xl border border-border bg-background/50 focus-within:border-primary-glow/60 transition-colors px-4 py-2.5">
                <span className="text-sm font-medium text-muted-foreground mr-1.5">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-transparent text-base font-semibold text-foreground placeholder-muted-foreground/40 outline-none border-none p-0"
                  placeholder="0"
                />
              </div>
            </div>

          </div>

          {/* Right Block: Dynamic Summary & Payment Instruction Terminal Output */}
          <div className="space-y-6 lg:sticky lg:top-36">
            <div className="rounded-3xl border border-border bg-card/30 p-6 backdrop-blur-sm shadow-xl">
              
              <div className="flex items-center justify-between border-b border-border/60 pb-4 mb-5">
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground font-['Montserrat']">
                  Summary
                </h3>
                <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider text-emerald-500 uppercase">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Secure Desk
                </div>
              </div>

              {/* Layout Info List */}
              <div className="space-y-3.5 text-xs border-b border-border/60 pb-5">
                <div className="flex justify-between items-center text-muted-foreground">
                  <span>Target Broker</span>
                  <span className="font-semibold text-foreground capitalize">{selectedBroker}</span>
                </div>
                {selectedBroker === "deriv" && crNumber && (
                  <div className="flex justify-between items-center text-muted-foreground">
                    <span>Account ID</span>
                    <span className="font-mono text-foreground uppercase">{crNumber}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-muted-foreground">
                  <span>Method Gateway</span>
                  <span className="font-semibold text-foreground uppercase">{selectedMethod.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between items-center text-muted-foreground">
                  <span>Gross Funds</span>
                  <span className="font-mono text-foreground">${Number(amount || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-muted-foreground">
                  <span>Service Fee</span>
                  <span className="font-mono text-foreground">$1.00</span>
                </div>
                
                <div className="pt-3 flex justify-between items-baseline">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground">Total Due</span>
                  <span className="text-xl font-bold tracking-tight text-primary-glow font-mono">
                    ${(Number(amount || 0) + 1).toLocaleString()}.00
                  </span>
                </div>
              </div>

              {/* Dynamic Real-Time Compliance Form Instructions Component Box */}
              <div className="mt-5 p-4 rounded-2xl bg-background/50 border border-border/80 text-xs">
                <p className="text-[10px] font-bold uppercase tracking-wider text-primary-glow font-['Montserrat'] mb-3">
                  Verification Protocol
                </p>
                <p className="font-bold text-foreground mb-3 text-xs uppercase tracking-wide">
                  Payment Instructions
                </p>
                
                <ol className="space-y-3 text-muted-foreground list-decimal pl-3.5">
                  <li>
                    <span className="font-semibold text-foreground">SEND FUNDS:</span> Send to <span className="font-mono text-foreground font-bold">078 429 3089</span>.
                    {selectedMethod === "ecocash" && (
                      <span className="block text-[11px] mt-1 bg-secondary/30 text-foreground p-1.5 rounded-lg font-mono">
                        • EcoCash: *151# Send Money 078 429 3089
                      </span>
                    )}
                    {selectedMethod === "innbucks" && (
                      <span className="block text-[11px] mt-1 bg-secondary/30 text-foreground p-1.5 rounded-lg font-mono">
                        • InnBucks: Send Money to 078 429 3089
                      </span>
                    )}
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">RECIPIENT:</span> Confirm name is <span className="font-bold text-foreground">MARC A ZHOU</span>.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">RECEIPT:</span> Save your transaction screenshot.
                  </li>
                  {/* Conditional Logic Rule 4: Removed Binance QR Code requirements if target platform is set to Deriv */}
                  {selectedBroker !== "deriv" && (
                    <li>
                      <span className="font-semibold text-foreground">QR CODE:</span> Save a screenshot of your binance QR code for verification.
                    </li>
                  )}
                </ol>
              </div>

              {/* Action Processing Controller Button Trigger Wrapper */}
              <button
                type="submit"
                disabled={!isFormValid}
                className={`group mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-semibold transition-all ${
                  isFormValid 
                    ? "premium-button hover:scale-[1.01]" 
                    : "bg-muted/20 text-muted-foreground/40 cursor-not-allowed border border-border/50"
                }`}
              >
                <span>Initiate Transaction</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>

            </div>
          </div>

        </div>
      </section>
    </>
  );
}