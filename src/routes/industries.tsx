import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { IndustriesGrid } from "@/components/sections/IndustriesGrid";
import { CTASection } from "@/components/sections/CTASection";

export const Route = createFileRoute("/industries")({
  component: IndustriesPage,
});

function IndustriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Industries"
        title="Built for Regulated, High-Stakes Industries"
        subtitle="From financial services to government, we deploy AI workforces where reliability, security, and compliance matter most."
      />
      <IndustriesGrid showHeading={false} />
      <CTASection />
    </>
  );
}
