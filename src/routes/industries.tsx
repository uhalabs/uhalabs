import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { IndustriesGrid } from "@/components/sections/IndustriesGrid";
import { CTASection } from "@/components/sections/CTASection";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries — UHA Labs" },
      {
        name: "description",
        content:
          "UHA Labs deploys AI workforces across Financial Services, Insurance, NBFCs, FinTech, Healthcare, Retail, Logistics, Telecom, Government, and more.",
      },
      { property: "og:title", content: "Industries — UHA Labs" },
      {
        property: "og:description",
        content:
          "AI orchestration built for regulated, high-stakes industries.",
      },
      { property: "og:url", content: "/industries" },
    ],
    links: [{ rel: "canonical", href: "/industries" }],
  }),
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
