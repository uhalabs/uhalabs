import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { OxybfsaiSection } from "@/components/sections/OxybfsaiSection";
import { CTASection } from "@/components/sections/CTASection";

export const Route = createFileRoute("/oxybfsai")({
  component: OxybfsaiPage,
});

function OxybfsaiPage() {
  return (
    <>
      <PageHeader
        eyebrow="OXYBFSAI"
        title="Enterprise AI Platform for BFSI"
        subtitle="A dedicated digital workforce platform purpose-built for banking, financial services, and insurance."
      />
      <OxybfsaiSection showCta={false} />
      <CTASection />
    </>
  );
}
