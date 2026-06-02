import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { WhySection } from "@/components/sections/WhySection";
import { VisionSection } from "@/components/sections/VisionSection";
import { CTASection } from "@/components/sections/CTASection";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — UHA Labs" },
      {
        name: "description",
        content:
          "UHA Labs is an AI orchestration and digital workforce company helping enterprises move beyond chatbots to AI-powered operational systems that work like teams.",
      },
      { property: "og:title", content: "About — UHA Labs" },
      {
        property: "og:description",
        content:
          "Helping enterprises transition from human-intensive operations to AI-orchestrated digital workforces.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
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
