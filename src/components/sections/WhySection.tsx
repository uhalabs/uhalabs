import { Check } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { WHY_POINTS } from "@/lib/site-data";

export function WhySection() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <SectionHeading
            eyebrow="Why UHA Labs"
            title="We Don't Build Chatbots. We Build Digital Workforces."
          />
        </RevealOnScroll>

        <div className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-2">
          {WHY_POINTS.map((point, i) => (
            <RevealOnScroll key={point} delay={(i % 2) * 80}>
              <div className="glass-card flex items-center gap-4 rounded-2xl p-5 transition-colors duration-300 hover:border-primary/40">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-primary text-primary-foreground shadow-glow">
                  <Check className="h-5 w-5" />
                </span>
                <span className="text-base font-medium text-foreground">{point}</span>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
