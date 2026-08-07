import { RevealOnScroll } from "@/components/RevealOnScroll";

export function VisionSection() {
  return (
    <section className="relative overflow-hidden py-28">
      <div className="hero-glow pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <RevealOnScroll>
          <span className="inline-block rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-primary-glow">
            Vision
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Our Mission
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-2xl sm:leading-relaxed">
            To help enterprises transition from human-intensive operations to{" "}
            <span className="text-gradient font-semibold">AI-orchestrated digital workforces</span>{" "}
            that create exponential scale, efficiency, and intelligence.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
