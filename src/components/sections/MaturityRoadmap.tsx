import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { MATURITY_LEVELS } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function MaturityRoadmap() {
  const [active, setActive] = useState(0);
  const current = MATURITY_LEVELS[active];
  const ActiveIcon = current.icon;

  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <SectionHeading
            eyebrow="UHA Labs Levels"
            title="The Six Levels of AI Maturity"
            subtitle="A roadmap from simple assistants to fully autonomous digital workforce infrastructure. Select a level to explore."
          />
        </RevealOnScroll>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          {/* Stepper */}
          <RevealOnScroll className="relative">
            <ol className="relative space-y-3">
              {MATURITY_LEVELS.map((lvl, i) => {
                const Icon = lvl.icon;
                const isActive = i === active;
                return (
                  <li key={lvl.level}>
                    <button
                      onClick={() => setActive(i)}
                      className={cn(
                        "flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-300",
                        isActive
                          ? "border-primary/50 bg-secondary/70 shadow-glow"
                          : "border-border bg-card/40 hover:border-primary/30 hover:bg-secondary/40",
                      )}
                      aria-pressed={isActive}
                    >
                      <span
                        className={cn(
                          "grid h-12 w-12 shrink-0 place-items-center rounded-xl text-sm font-bold transition-colors",
                          isActive
                            ? "bg-gradient-primary text-primary-foreground"
                            : "bg-secondary text-muted-foreground",
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs font-medium uppercase tracking-widest text-primary-glow">
                          Level {lvl.level}
                        </span>
                        <span className="block truncate text-base font-semibold text-foreground">
                          {lvl.title}
                        </span>
                      </span>
                      <ArrowRight
                        className={cn(
                          "ml-auto h-4 w-4 shrink-0 transition-all",
                          isActive ? "text-primary opacity-100" : "text-muted-foreground opacity-0",
                        )}
                      />
                    </button>
                  </li>
                );
              })}
            </ol>
          </RevealOnScroll>

          {/* Detail panel */}
          <RevealOnScroll delay={100}>
            <div className="glass-card sticky top-24 flex h-full flex-col justify-center rounded-3xl p-8 shadow-elegant">
              <span className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
                <ActiveIcon className="h-8 w-8" />
              </span>
              <span className="mt-6 text-sm font-medium uppercase tracking-widest text-primary-glow">
                Level {current.level}
              </span>
              <h3 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
                {current.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {current.description}
              </p>

              <div className="mt-8 flex gap-1.5">
                {MATURITY_LEVELS.map((lvl, i) => (
                  <span
                    key={lvl.level}
                    className={cn(
                      "h-1.5 flex-1 rounded-full transition-colors",
                      i <= active ? "bg-gradient-primary" : "bg-border",
                    )}
                  />
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
