import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-orchestration.jpg";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div className="hero-glow pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8">
        <div className="animate-fade-in text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-primary-glow">
            <Sparkles className="h-3.5 w-3.5" />
            AI Orchestration &amp; Digital Workforce
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            One Engineer.
            <br />
            <span className="text-gradient">Infinite Scale.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">
            We design and build AI orchestration systems that automate business
            operations, voice interactions, compliance workflows, customer
            support, recovery processes, and enterprise intelligence.
          </p>

          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
            <Button
              asChild
              size="lg"
              className="w-full bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90 sm:w-auto"
            >
              <Link to="/contact">
                Book a Strategy Call
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full border-border bg-secondary/40 text-foreground hover:bg-secondary sm:w-auto"
            >
              <Link to="/solutions">Explore Solutions</Link>
            </Button>
          </div>
        </div>

        <div className="animate-fade-in relative">
          <div className="absolute inset-0 -z-10 rounded-3xl bg-primary/20 blur-3xl" />
          <div className="glass-card animate-float overflow-hidden rounded-3xl shadow-elegant">
            <img
              src={heroImage}
              alt="Futuristic AI agents connected through orchestration workflows, dashboards, voice systems and compliance engines"
              width={1536}
              height={1024}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
