import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { WhySection } from "@/components/sections/WhySection";
import { VisionSection } from "@/components/sections/VisionSection";
import { CTASection } from "@/components/sections/CTASection";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Beyond Chatbots. Toward Digital Workforces."
        subtitle="UHA Labs is an AI orchestration and digital workforce company. We help businesses build AI-powered operational systems that work like teams."
      />
      <VisionSection />
      <WhySection />
      <CTASection />
    </>
  );
}
