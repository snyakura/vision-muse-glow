export function PageBackground({ variant = "default" }: { variant?: "default" | "soft" }) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Color blooms layered over the global aurora */}
      <div className="absolute -top-32 left-[5%] h-[420px] w-[420px] rounded-full bg-[oklch(0.62_0.28_295_/_0.45)] blur-[120px]" />
      <div className="absolute -top-24 right-[8%] h-[380px] w-[380px] rounded-full bg-[oklch(0.65_0.27_330_/_0.4)] blur-[120px]" />
      <div className="absolute top-[40%] left-[-10%] h-[360px] w-[360px] rounded-full bg-[oklch(0.55_0.26_240_/_0.35)] blur-[140px]" />
      <div className="absolute top-[55%] right-[-8%] h-[340px] w-[340px] rounded-full bg-[oklch(0.6_0.25_200_/_0.3)] blur-[140px]" />
      {variant === "default" && (
        <div className="absolute inset-x-0 top-0 h-[700px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,oklch(0.6_0.28_300_/_0.25),transparent_70%)]" />
      )}
      <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_65%_55%_at_50%_25%,black,transparent)]" />
    </div>
  );
}
