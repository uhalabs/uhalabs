import {
  PhoneCall,
  Headphones,
  ShieldCheck,
  UserPlus,
  RotateCcw,
  Target,
  FileText,
  Activity,
} from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { RevealOnScroll } from "@/components/RevealOnScroll";

const CAPABILITIES = [
  { icon: PhoneCall, label: "Answer calls" },
  { icon: Headphones, label: "Handle customer support" },
  { icon: ShieldCheck, label: "Perform compliance checks" },
  { icon: UserPlus, label: "Manage onboarding" },
  { icon: RotateCcw, label: "Execute recovery workflows" },
  { icon: Target, label: "Qualify leads" },
  { icon: FileText, label: "Generate reports" },
  { icon: Activity, label: "Monitor operations" },
];

export function FutureSection() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <SectionHeading
            eyebrow="The Future"
            title="The Future Is AI Orchestration"
            subtitle="The next generation of companies will not simply use AI tools. They will orchestrate AI systems that operate as digital workforces — all working together."
          />
        </RevealOnScroll>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CAPABILITIES.map((item, i) => (
            <RevealOnScroll key={item.label} delay={i * 60}>
              <div className="glass-card group flex h-full items-center gap-4 rounded-2xl p-5 transition-colors duration-300 hover:border-primary/40">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                  <item.icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-medium text-foreground">{item.label}</span>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
