import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { OxybfsaiSection } from "@/components/sections/OxybfsaiSection";
import { CTASection } from "@/components/sections/CTASection";

export const Route = createFileRoute("/oxybfsai")({
  head: () => ({
    meta: [
      { title: "OXYBFSAI — Enterprise AI Platform for BFSI" },
      {
        name: "description",
        content:
          "OXYBFSAI enables financial institutions to deploy AI recovery, compliance intelligence, call centers, collections, regulatory intelligence, and multi-agent operations.",
      },
      { property: "og:title", content: "OXYBFSAI — Enterprise AI Platform for BFSI" },
      {
        property: "og:description",
        content:
          "AI-powered recovery, compliance, voice, and digital workforce solutions for financial institutions.",
      },
      { property: "og:url", content: "/oxybfsai" },
    ],
    links: [{ rel: "canonical", href: "/oxybfsai" }],
  }),
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
