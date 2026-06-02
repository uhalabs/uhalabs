import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { SolutionsGrid } from "@/components/sections/SolutionsGrid";
import { CTASection } from "@/components/sections/CTASection";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Solutions — UHA Labs AI Systems" },
      {
        name: "description",
        content:
          "Explore UHA Labs AI solutions: recovery, voice automation, contact center automation, compliance monitoring, support, collections, analytics, and more.",
      },
      { property: "og:title", content: "Solutions — UHA Labs AI Systems" },
      {
        property: "og:description",
        content:
          "Purpose-built AI solutions that automate enterprise operations end to end.",
      },
      { property: "og:url", content: "/solutions" },
    ],
    links: [{ rel: "canonical", href: "/solutions" }],
  }),
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
