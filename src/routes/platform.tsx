import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { CTASection } from "@/components/sections/CTASection";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Settings, Cpu, ShieldCheck, Zap, Layers, Network } from "lucide-react";

export const Route = createFileRoute("/platform")({
  component: PlatformPage,
});

function PlatformPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Platform"
        title="Operating System for Digital Workforces"
        subtitle="UHA Labs orchestrates thousands of concurrent AI agents and workflows across enterprise systems, scaling operations with zero human friction."
      />

      <section className="relative py-20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Agent Scheduling Engine",
                desc: "Schedule, queue, and dispatch tasks across your digital workforce. Guarantees message delivery and resource optimization.",
                icon: Settings,
              },
              {
                title: "Multi-Agent Coordinator",
                desc: "Orchestrate agent-to-agent negotiation, planning, and coordination. Enables groups of agents to cooperate like teams.",
                icon: Network,
              },
              {
                title: "Holographic Analytics",
                desc: "Real-time stream processing of token metrics, execution latencies, cost thresholds, and agent success rates.",
                icon: Cpu,
              },
              {
                title: "Deterministic Guardrails",
                desc: "Enforce strict compliance checks and security protocols. Every agent call is audited for security, hallucination, and data leakage.",
                icon: ShieldCheck,
              },
              {
                title: "Unified Pipeline Router",
                desc: "Direct data streams dynamically between CRMs, database endpoints, message queues, and external APIs in milliseconds.",
                icon: Zap,
              },
              {
                title: "Scale Infrastructure",
                desc: "Instantly scale operations up or down to handle traffic surges. Zero manual setup or server deployment overhead.",
                icon: Layers,
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
