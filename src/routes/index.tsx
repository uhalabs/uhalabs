import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { FutureSection } from "@/components/sections/FutureSection";
import { MaturityRoadmap } from "@/components/sections/MaturityRoadmap";
import { SolutionsGrid } from "@/components/sections/SolutionsGrid";
import { IndustriesGrid } from "@/components/sections/IndustriesGrid";
import { OxybfsaiSection } from "@/components/sections/OxybfsaiSection";
import { WhySection } from "@/components/sections/WhySection";
import { VisionSection } from "@/components/sections/VisionSection";
import { CTASection } from "@/components/sections/CTASection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "UHA Labs — Building Digital Workforces for the AI Era" },
      {
        name: "description",
        content:
          "One Engineer. Infinite Scale. UHA Labs designs AI orchestration systems that automate operations, voice, compliance, support, recovery, and enterprise intelligence.",
      },
      { property: "og:title", content: "UHA Labs — Building Digital Workforces for the AI Era" },
      {
        property: "og:description",
        content:
          "AI orchestration and digital workforce systems for enterprise operations.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <FutureSection />
      <MaturityRoadmap />
      <SolutionsGrid />
      <IndustriesGrid />
      <OxybfsaiSection />
      <WhySection />
      <VisionSection />
      <CTASection />
    </>
  );
}
