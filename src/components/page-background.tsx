export function PageBackground({ variant = "default" }: { variant?: "default" | "soft" }) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className={
          variant === "soft"
            ? "absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(ellipse_50%_60%_at_50%_0%,oklch(0.55_0.22_250_/_0.35),transparent_70%)]"
            : "absolute inset-x-0 top-0 h-[900px] bg-hero-glow"
        }
      />
      <div className="absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_20%,black,transparent)]" />
    </div>
  );
}
