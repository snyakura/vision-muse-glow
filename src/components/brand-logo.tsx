"use client";

import { useState } from "react";
import { ImageOff } from "lucide-react";

/**
 * Unified, premium logo presentation used everywhere a brand mark appears.
 * - Glassmorphism tile with subtle ring
 * - Hover: scale 1.05, soft purple glow, smooth ease
 * - Sharp on all DPRs (decoding=async, loading=lazy)
 * - Graceful placeholder when an asset is low-quality / missing
 */
export function BrandLogo({
  src,
  alt,
  size = "md",
  variant = "tile",
  needsEnhanced = false,
  className = "",
}: {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "tile" | "bare" | "chip";
  needsEnhanced?: boolean;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  const sizeMap = {
    sm: "h-10 w-10 p-1.5",
    md: "h-14 w-14 p-2",
    lg: "h-20 w-20 p-2.5",
    xl: "h-28 w-28 p-3",
  } as const;

  const imgSize = {
    sm: "h-6",
    md: "h-9",
    lg: "h-12",
    xl: "h-16",
  } as const;

  if (variant === "bare") {
    return failed || needsEnhanced ? (
      <PlaceholderLogo alt={alt} className={className} />
    ) : (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`object-contain transition-transform duration-300 ease-out hover:scale-[1.05] ${className}`}
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <div
      className={`group relative flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] transition-all duration-300 ease-out hover:scale-[1.05] hover:border-primary-glow/40 hover:bg-white/[0.07] hover:shadow-[0_0_30px_-6px_rgba(139,92,246,0.55)] ${sizeMap[size]} ${className}`}
    >
      <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_120%,rgba(139,92,246,0.30),transparent_60%)]" />
      {failed || needsEnhanced ? (
        <PlaceholderLogo alt={alt} compact />
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={`${imgSize[size]} w-auto max-w-full object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]`}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

function PlaceholderLogo({
  alt,
  compact = false,
  className = "",
}: {
  alt: string;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div
      title={`${alt} — enhanced asset required`}
      className={`flex flex-col items-center justify-center gap-1 text-center text-[9px] uppercase tracking-widest text-muted-foreground/70 ${
        compact ? "" : "h-full w-full rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-3"
      } ${className}`}
    >
      <ImageOff className="h-4 w-4 text-muted-foreground/50" />
      <span className="font-mono leading-tight">{alt}</span>
    </div>
  );
}
