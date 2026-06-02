import { SectionHeading } from "@/components/SectionHeading";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { INDUSTRIES } from "@/lib/site-data";

interface IndustriesGridProps {
  showHeading?: boolean;
}

export function IndustriesGrid({ showHeading = true }: IndustriesGridProps) {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {showHeading && (
          <RevealOnScroll>
            <SectionHeading
              eyebrow="Industries"
              title="Built for Regulated, High-Stakes Industries"
              subtitle="From financial services to government, we deploy AI workforces where reliability and compliance matter most."
            />
          </RevealOnScroll>
        )}

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {INDUSTRIES.map((item, i) => (
            <RevealOnScroll key={item.title} delay={(i % 4) * 70}>
              <div className="glass-card group flex h-full flex-col items-center gap-3 rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/40">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-secondary text-primary-glow transition-colors duration-300 group-hover:bg-gradient-primary group-hover:text-primary-foreground">
                  <item.icon className="h-6 w-6" />
                </span>
                <span className="text-sm font-medium text-foreground">{item.title}</span>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
