import { Link } from "@tanstack/react-router";
import { Check, ArrowRight, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/SectionHeading";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { OXYBFSAI_FEATURES } from "@/lib/site-data";

interface OxybfsaiSectionProps {
  showCta?: boolean;
}

export function OxybfsaiSection({ showCta = true }: OxybfsaiSectionProps) {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <RevealOnScroll>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-primary-glow">
              <Layers className="h-3.5 w-3.5" />
              AI Platform
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Enterprise AI Platform for Operations
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              UHA Labs enables enterprises to deploy AI-powered orchestration
              systems, compliance intelligence, operational automation,
              customer support, voice agents, reporting engines, and digital
              workforce solutions at scale.
            </p>

            {showCta && (
              <Button
                asChild
                size="lg"
                className="mt-8 bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90"
              >
                <Link to="/platform">
                  Explore Platform
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </RevealOnScroll>

          <RevealOnScroll delay={120}>
            <div className="glass-card rounded-3xl p-7 shadow-elegant">
              <p className="text-sm font-medium uppercase tracking-widest text-primary-glow">
                Platform Capabilities
              </p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {OXYBFSAI_FEATURES.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 rounded-xl bg-secondary/40 p-3 text-sm font-medium text-foreground"
                  >
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-gradient-primary text-primary-foreground">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
