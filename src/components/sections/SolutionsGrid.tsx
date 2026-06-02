import { SectionHeading } from "@/components/SectionHeading";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SOLUTIONS } from "@/lib/site-data";

interface SolutionsGridProps {
  showHeading?: boolean;
}

export function SolutionsGrid({ showHeading = true }: SolutionsGridProps) {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {showHeading && (
          <RevealOnScroll>
            <SectionHeading
              eyebrow="Solutions"
              title="AI Systems for Every Operation"
              subtitle="Purpose-built AI solutions that plug into your business and start working from day one."
            />
          </RevealOnScroll>
        )}

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SOLUTIONS.map((item, i) => (
            <RevealOnScroll key={item.title} delay={(i % 3) * 80} as="article">
              <div className="glass-card group h-full rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow transition-transform duration-300 group-hover:scale-110">
                  <item.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
