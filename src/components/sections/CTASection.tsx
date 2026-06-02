import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RevealOnScroll } from "@/components/RevealOnScroll";

export function CTASection() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="glass-card relative overflow-hidden rounded-3xl px-6 py-16 text-center shadow-elegant sm:px-12">
            <div className="pointer-events-none absolute inset-0 bg-gradient-primary opacity-10" />
            <div className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/30 blur-3xl" />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                Ready to Build Your AI Workforce?
              </h2>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90 sm:w-auto"
                >
                  <Link to="/contact">
                    Schedule a Consultation
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full border-border bg-secondary/40 text-foreground hover:bg-secondary sm:w-auto"
                >
                  <Link to="/contact">Start Your AI Journey</Link>
                </Button>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
