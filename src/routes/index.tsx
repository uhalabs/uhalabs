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
