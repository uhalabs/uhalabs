import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, CheckCircle2, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Ready to Build Your AI Workforce?"
        subtitle="Tell us about your operations and we'll design an AI orchestration roadmap tailored to your enterprise."
      />

      <section className="relative py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
            <RevealOnScroll className="space-y-6">
              <div className="glass-card rounded-2xl p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                  <Mail className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-foreground">Email us</h3>
                <p className="mt-1 text-sm text-muted-foreground">uahalabs@gmail.com</p>
              </div>
              <div className="glass-card rounded-2xl p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                  <MapPin className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-foreground">Work with us</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Enterprise AI orchestration &amp; digital workforce deployments, worldwide.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={120}>
              <div className="glass-card rounded-3xl p-7 shadow-elegant sm:p-9">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <CheckCircle2 className="h-14 w-14 text-primary-glow" />
                    <h3 className="mt-5 text-2xl font-bold text-foreground">Thank you!</h3>
                    <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                      Your request has been received. Our team will reach out to schedule your
                      strategy call shortly.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSubmitted(true);
                    }}
                    className="space-y-5"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full name</Label>
                        <Input id="name" name="name" required placeholder="Jane Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Work email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="jane@company.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" name="company" placeholder="Company name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">What would you like to automate?</Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={4}
                        placeholder="Tell us about your operations and goals..."
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90"
                    >
                      Schedule a Consultation
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </form>
                )}
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </>
  );
}
