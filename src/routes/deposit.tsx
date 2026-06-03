"use client";

import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { 
  ArrowRight, 
  ShieldCheck, 
  User, 
  Mail, 
  Phone, 
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Building2,
  Wallet
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

type Broker = "weltrade" | "deriv" | "other";
type PaymentMethod = "ecocash" | "innbucks" | "fnb_eft";

function DepositPage() {
  // Step 1: Client Details
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  // Step 2: Broker Selection
  const [broker, setBroker] = useState<Broker>("weltrade");
  const [crNumber, setCrNumber] = useState("");
  const [crError, setCrError] = useState("");

  // Step 3: Amount & Payment Method
  const [amount, setAmount] = useState<string>("1000");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("ecocash");

  // CR Number Real-time Validation
  const handleCrChange = (val: string) => {
    setCrNumber(val);
    if (val && !val.toLowerCase().startsWith("cr")) {
      setCrError("Error: Deriv account number must start with 'CR' (e.g., CR12345)");
    } else {
      setCrError("");
    }
  };

  // Dynamic Text Generator for WhatsApp Link redirect
  const getWhatsAppMessage = () => {
    const baseMsg = `Hi, I want to make a deposit.\n\n*Details:*\nName: ${name} ${surname}\nEmail: ${email}\nWhatsApp: ${whatsapp}\n\n*Broker:* ${broker.toUpperCase()}${broker === 'deriv' ? ` (${crNumber})` : ''}\n*Method:* ${paymentMethod.toUpperCase()}\n*Amount:* $${amount}\n*Service Fee:* $1\n*Total:* $${Number(amount || 0) + 1}`;
    return encodeURIComponent(baseMsg);
  };

  const isFormValid = 
    name && surname && email && whatsapp && amount && 
    (broker !== "deriv" || (crNumber && !crError));

  return (
    <>
      <section className="relative">
        <PageBackground variant="soft" />
        <div className="relative mx-auto max-w-5xl px-6 pt-24 pb-12 text-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.25em] text-black font-['Montserrat']">Account Funding</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display mt-5 text-5xl md:text-6xl font-['Montserrat']">
              <span className="text-black">Deposit</span>{" "}
              <span className="text-black italic">Capital.</span>
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-8 lg:grid-cols-3 items-start">
          
          {/* LEFT COLUMN: Input Workspaces */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* STEP 1: Personal Information */}
            <div className="rounded-3xl border border-border bg-card/20 p-6 backdrop-blur-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground font-['Montserrat'] mb-6 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-100 text-black text-xs">1</span>
                Personal Details
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-widest text-black block mb-2">First Name</label>
                  <div className="relative flex items-center rounded-2xl border border-border bg-background/50 focus-within:border-primary-glow/60 px-4 py-3">
                    <User className="h-4 w-4 text-black mr-2" />
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John" className="w-full bg-transparent text-sm font-medium outline-none border-none p-0 text-black" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-widest text-black block mb-2">Surname</label>
                  <div className="relative flex items-center rounded-2xl border border-border bg-background/50 focus-within:border-primary-glow/60 px-4 py-3">
                    <User className="h-4 w-4 text-black mr-2" />
                    <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} placeholder="Doe" className="w-full bg-transparent text-sm font-medium outline-none border-none p-0 text-black" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-widest text-black block mb-2">Email Address</label>
                  <div className="relative flex items-center rounded-2xl border border-border bg-background/50 focus-within:border-primary-glow/60 px-4 py-3">
                    <Mail className="h-4 w-4 text-black mr-2" />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" className="w-full bg-transparent text-sm font-medium outline-none border-none p-0 text-black" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-widest text-black block mb-2">WhatsApp Number</label>
                  <div className="relative flex items-center rounded-2xl border border-border bg-background/50 focus-within:border-primary-glow/60 px-4 py-3">
                    <Phone className="h-4 w-4 text-black mr-2" />
                    <input type="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="+263 77..." className="w-full bg-transparent text-sm font-medium outline-none border-none p-0 text-black" />
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 2: Broker Configuration */}
            <div className="rounded-3xl border border-border bg-card/20 p-6 backdrop-blur-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-black font-['Montserrat'] mb-6 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-100 text-black text-xs">2</span>
                Select Trading Broker
              </h3>
              <div className="grid gap-4 sm:grid-cols-3 mb-6">
                {(["weltrade", "deriv", "other"] as Broker[]).map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBroker(b)}
                    className={`p-4 rounded-2xl border text-left font-semibold text-sm font-['Montserrat'] capitalize transition-all relative ${
                      broker === b ? "border-black bg-neutral-50" : "border-border bg-card/40 hover:border-border/80"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Building2 className={`h-5 w-5 ${broker === b ? "text-black" : "text-black"}`} />
                      {b}
                    </div>
                    {broker === b && <CheckCircle2 className="absolute top-4 right-4 h-4 w-4 text-black" />}
                  </button>
                ))}
              </div>

              {broker === "deriv" && (
                <Reveal>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-black block">Deriv CR Number</label>
                    <div className={`relative flex items-center rounded-2xl border bg-background/50 px-4 py-3 transition-colors ${crError ? 'border-red-500/60 focus-within:border-red-500' : 'border-border focus-within:border-primary-glow/60'}`}>
                      <input 
                        type="text" 
                        value={crNumber} 
                        onChange={(e) => handleCrChange(e.target.value)} 
                        placeholder="CR123456" 
                        className="w-full bg-transparent text-sm font-semibold text-black outline-none border-none p-0 placeholder-black/30"
                      />
                    </div>
                    {crError && (
                      <p className="text-xs text-black flex items-center gap-1.5 font-mono mt-1 animate-pulse">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {crError}
                      </p>
                    )}
                  </div>
                </Reveal>
              )}
            </div>

            {/* STEP 3: Payment Gateway & Allocation */}
            <div className="rounded-3xl border border-border bg-card/20 p-6 backdrop-blur-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-black font-['Montserrat'] mb-6 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-100 text-black text-xs">3</span>
                Payment Method & Amount
              </h3>
              
              <div className="mb-6">
                <label className="text-[10px] font-mono uppercase tracking-widest text-black block mb-2">Amount (USD)</label>
                <div className="relative flex items-center rounded-2xl border border-border bg-background/50 focus-within:border-primary-glow/60 px-4 py-3">
                  <span className="text-lg font-medium text-black mr-2">$</span>
                  <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full bg-transparent text-lg font-semibold text-black outline-none border-none p-0" placeholder="0.00" />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { id: "ecocash" as PaymentMethod, t: "EcoCash" },
                  { id: "innbucks" as PaymentMethod, t: "InnBucks" },
                  { id: "fnb_eft" as PaymentMethod, t: "FNB EFT" }
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id)}
                    className={`p-4 rounded-2xl border text-left font-semibold text-sm font-['Montserrat'] transition-all relative ${
                      paymentMethod === m.id ? "border-black bg-neutral-50" : "border-border bg-card/40 hover:border-border/80"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Wallet className={`h-5 w-5 ${paymentMethod === m.id ? "text-black" : "text-black"}`} />
                      {m.t}
                    </div>
                    {paymentMethod === m.id && <CheckCircle2 className="absolute top-4 right-4 h-4 w-4 text-black" />}
                  </button>
                ))}
              </div>
            </div>

            {/* STEP 4: Live Payment Instructions Desk */}
            <div className="rounded-3xl border border-primary-glow/30 bg-primary-glow/[0.02] p-6 backdrop-blur-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-black font-['Montserrat'] mb-4">
                Payment Instructions
              </h3>
              
              {paymentMethod !== "fnb_eft" ? (
                // EcoCash & InnBucks protocols
                <div className="space-y-4 text-sm text-black leading-relaxed">
                  <p className="font-semibold text-black">Please follow these steps to fund your account via mobile wallet:</p>
                  <ol className="space-y-3 list-decimal list-inside font-sans">
                    <li>
                      <span className="font-medium text-black">SEND FUNDS:</span> Send to <span className="font-mono text-black font-bold bg-muted/20 px-1.5 py-0.5 rounded">078 429 3089</span>.
                      {paymentMethod === "ecocash" && (
                        <span className="block text-xs text-black font-mono ml-5 mt-1">• EcoCash dial: *151# Send Money to 078 429 3089</span>
                      )}
                      {paymentMethod === "innbucks" && (
                        <span className="block text-xs text-black font-mono ml-5 mt-1">• InnBucks mobile application or retail counter express code channel</span>
                      )}
                    </li>
                    <li><span className="font-medium text-black">RECIPIENT:</span> Confirm legal account name reads <span className="font-bold text-black">MARC A ZHOU</span>.</li>
                    <li><span className="font-medium text-black">RECEIPT:</span> Take a clean screenshot of your successful processing transaction confirmation screen.</li>
                    {broker !== "deriv" && (
                      <li><span className="font-medium text-black">QR CODE:</span> Save a clean screenshot of your Binance QR code layout framework for cross-verification.</li>
                    )}
                  </ol>
                </div>
              ) : (
                // FNB EFT custom protocol
                <div className="space-y-4 text-sm text-black leading-relaxed">
                  <p className="font-semibold text-black text-xs uppercase tracking-wider font-mono">
                    Ensure the banking details are entered precisely to bypass systemic delays.
                  </p>
                  <ol className="space-y-3 list-decimal list-inside font-sans">
                    <li><span className="font-medium text-black">Log in to your Banking App:</span> Fire up your official FNB App or web enterprise dashboard framework.</li>
                    <li>
                      <span className="font-medium text-black">Make a Payment:</span> Complete an explicit transfer directly into this commercial configuration:
                      <div className="my-3 p-4 rounded-xl border border-border bg-background/60 space-y-2 font-mono text-xs text-black">
                        <div><span className="text-black text-[10px] uppercase block">Account Name</span><span className="font-bold">MAZ FX (PVT) LTD</span></div>
                        <div><span className="text-black text-[10px] uppercase block">Account Number</span><span className="font-bold tracking-wider">63051409861</span></div>
                        <div><span className="text-black text-[10px] uppercase block">Account Type</span><span>FNB Business Account</span></div>
                      </div>
                    </li>
                    <li><span className="font-medium text-black">Use a Reference:</span> Type your full <span className="text-black font-medium">Full Name</span> or specific account <span className="text-black font-medium">Trading ID</span> as the direct wire verification note reference field.</li>
                    <li><span className="font-medium text-black">Capture Proof:</span> Snag an official screenshot statement of completion or archive the secure transactional system PDF ledger.</li>
                    <li><span className="font-medium text-black">Verification:</span> Ready the proof files for manual compliance verification on the secure workspace network channels.</li>
                  </ol>
                </div>
              )}

              {/* High-visibility Urgent Red Notice Block */}
<div className="mt-6 border-2 border-red-500 bg-red-950/40 rounded-2xl p-5 shadow-[0_0_15px_rgba(239,68,68,0.2)] animate-pulse">
  <div className="flex items-start gap-3">
    <AlertCircle className="h-5 w-5 text-black shrink-0 mt-0.5" />
    <div>
      <p className="text-sm font-black tracking-wide text-black uppercase font-mono">
        IMPORTANT: Don't forget to attach your proof of payment image {paymentMethod !== "fnb_eft" && broker !== "deriv" && "and QR code screenshot"} once redirected to WhatsApp!
      </p>
      <p className="text-xs text-black mt-1 font-sans">
        Your deposit will not be processed by the finance desk until these attachments are sent.
      </p>
    </div>
  </div>
</div>
            </div>

          </div>

          {/* RIGHT COLUMN: Real-time Ledger Summary Sticky Board */}
          <div className="space-y-6 lg:sticky lg:top-36">
            <div className="rounded-3xl border border-border bg-card/30 p-6 backdrop-blur-sm shadow-xl">
              <div className="flex items-center justify-between border-b border-border/60 pb-4 mb-5">
                <h3 className="text-sm font-bold uppercase tracking-wider text-black font-['Montserrat']">Summary</h3>
                <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider text-black uppercase">
                  <ShieldCheck className="h-3.5 w-3.5" /> Secure Desk
                </div>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="flex justify-between items-center text-black">
                  <span>Client Info</span>
                  <span className="font-medium text-black max-w-[150px] truncate">
                    {name || surname ? `${name} ${surname}` : "—"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-black">
                  <span>Target Broker</span>
                  <span className="font-medium text-black uppercase tracking-wider">{broker}</span>
                </div>
                {broker === "deriv" && crNumber && (
                  <div className="flex justify-between items-center text-black">
                    <span>ID Reference</span>
                    <span className="font-mono text-black font-bold">{crNumber}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-black">
                  <span>Funding Channel</span>
                  <span className="font-medium text-black uppercase">{paymentMethod.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between items-center text-black">
                  <span>Gross Allocation</span>
                  <span className="font-mono text-black">${Number(amount || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-black">
                  <span>Fixed Flat Fee</span>
                  <span className="font-mono text-black">$1.00</span>
                </div>
                
                <div className="border-t border-border/60 my-4 pt-4 flex justify-between items-baseline">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-black">Total Required</span>
                  <span className="text-2xl font-bold tracking-tight text-black font-mono">
                    ${(Number(amount || 0) + 1).toLocaleString()}.00
                  </span>
                </div>
              </div>

              {/* Primary Dispatch Action Button */}
              <a
                href={isFormValid ? `https://wa.me/263784293089?text=${getWhatsAppMessage()}` : "#"}
                target={isFormValid ? "_blank" : "_self"}
                rel="noreferrer"
                className={`group mt-6 w-full inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-all ${
                  isFormValid 
                    ? "bg-black hover:scale-[1.01] cursor-pointer" 
                    : "bg-muted text-black opacity-50 cursor-not-allowed"
                }`}
                onClick={(e) => { if(!isFormValid) e.preventDefault(); }}
              >
                Request Settlement Desk
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 text-white" />
              </a>

              {!isFormValid && (
                <p className="mt-3 text-center text-[10px] text-black font-mono">
                  Fill in all fields correctly to open desk link.
                </p>
              )}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}