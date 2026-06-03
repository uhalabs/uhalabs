import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { CTASection } from "@/components/sections/CTASection";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Code, Terminal, Brain, HardDrive, Share2, Workflow } from "lucide-react";

export const Route = createFileRoute("/technology")({
  component: TechnologyPage,
});

function TechnologyPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Technology"
        title="High-Fidelity Multi-Agent Neural Core"
        subtitle="Designed for complex reasoning, autonomous coordination, and deterministic execution at the absolute edge of scale."
      />

      <section className="relative py-20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Agent Execution Planner",
                desc: "Our neural planners decompose high-level directives into logical task-trees. Dynamically updates steps in reaction to environment inputs.",
                icon: Workflow,
              },
              {
                title: "Orchestration Runtime",
                desc: "Custom compiled execution environment optimizing agent contexts. Minimizes latency and guarantees reliable API orchestration.",
                icon: Terminal,
              },
              {
                title: "Semantic Router",
                desc: "Vector-driven classification routing requests directly to specialized agent teams based on semantic matching.",
                icon: Brain,
              },
              {
                title: "GPU Memory Cache",
                desc: "Highly-optimized context caching system saving tokens and cutting system latency. Sub-10ms response times for repeat workflows.",
                icon: HardDrive,
              },
              {
                title: "Mesh Integrations",
                desc: "Dynamic connectors bridging core agents with legacy ERP systems, enterprise communication grids, and data warehouses.",
                icon: Share2,
              },
              {
                title: "Deterministic Engine",
                desc: "Integrates programmatic logic with neural intelligence. Combines LLMs with typed, strict validations to eliminate hallucinations.",
                icon: Code,
              },
            ].map((feature, i) => (
              <RevealOnScroll key={feature.title} delay={i * 80}>
                <div className="glass-card flex flex-col justify-between h-full p-6 sm:p-8 rounded-2xl border border-border/40 hover:border-primary-glow/40 transition-all duration-300 hover:-translate-y-1">
                  <div>
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-secondary text-primary-glow">
                      <feature.icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 text-xl font-bold text-white">{feature.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
