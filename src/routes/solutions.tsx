import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { SolutionsGrid } from "@/components/sections/SolutionsGrid";
import { CTASection } from "@/components/sections/CTASection";

export const Route = createFileRoute("/solutions")({
  component: SolutionsPage,
});

function SolutionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Solutions"
        title="AI Systems for Every Operation"
        subtitle="Purpose-built AI solutions that plug into your business and start working from day one — across support, voice, compliance, recovery, and intelligence."
      />
      <SolutionsGrid showHeading={false} />
      <CTASection />
    </>
  );
}
