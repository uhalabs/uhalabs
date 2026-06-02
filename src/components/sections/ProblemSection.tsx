import { TrendingDown, Clock, Layers, Frown } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { RevealOnScroll } from "@/components/RevealOnScroll";

const PROBLEMS = [
  { icon: TrendingDown, label: "Costs increase" },
  { icon: Layers, label: "Operations become complex" },
  { icon: Clock, label: "Response times slow down" },
  { icon: Frown, label: "Customer experience suffers" },
];

export function ProblemSection() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <SectionHeading
            eyebrow="The Problem"
            title="Businesses Are Still Scaling With Headcount"
            subtitle="Most organizations rely on manual operations, repetitive workflows, fragmented systems, and human-intensive processes."
          />
        </RevealOnScroll>

        <div className="mx-auto mt-14 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROBLEMS.map((item, i) => (
            <RevealOnScroll key={item.label} delay={i * 80}>
              <div className="glass-card h-full rounded-2xl p-6 text-center transition-transform duration-300 hover:-translate-y-1">
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-destructive/15 text-destructive">
                  <item.icon className="h-6 w-6" />
                </span>
                <p className="mt-4 text-sm font-medium text-foreground">{item.label}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={120}>
          <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted-foreground">
            As businesses grow, the gap between ambition and operational capacity
            keeps widening — and headcount alone can't close it.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
