## UHA Labs — Premium AI Orchestration SaaS Site

A dark, futuristic, enterprise-grade marketing site with smooth animations, glassmorphism, and an interactive maturity roadmap. Built on the existing TanStack Start stack with file-based routing and per-route SEO.

### Architecture: routes
The landing page holds the full narrative; the footer's main nav items become real, SEO-indexable routes (not hash anchors).

```text
src/routes/
  __root.tsx          -> shared shell: header nav + footer + sitewide meta/JSON-LD
  index.tsx           -> / (full landing: hero → problem → future → levels → solutions → industries → OXYBFSAI → why → vision → CTA)
  solutions.tsx       -> /solutions (12 solution cards, expanded)
  oxybfsai.tsx        -> /oxybfsai (BFSI platform deep-dive)
  industries.tsx      -> /industries (12 industry cards)
  about.tsx           -> /about (mission/vision + why UHA Labs)
  contact.tsx         -> /contact (strategy-call / consultation form)
```

Each route gets its own `head()` with unique title, description, og:title, og:description. Root holds viewport, og:site_name, and an Organization JSON-LD block. Canonical tags on leaf routes only.

### Design system (`src/styles.css`)
- Dark premium theme as default. Tokens in oklch:
  - `--background` near-black navy, `--foreground` soft white
  - `--primary` electric blue, `--primary-glow` brighter cyan-blue
  - Gradient tokens: `--gradient-hero`, `--gradient-primary` (deep blue → electric blue)
  - Glass tokens: `--glass-bg`, `--glass-border`, plus `--shadow-glow` and `--shadow-elegant`
- Glassmorphism utility classes (frosted card backgrounds, subtle borders, backdrop blur).
- Reuse existing animation utilities (fade-in, scale-in) and add scroll-reveal + gradient-shift keyframes.

### Components (`src/components/`)
- `Header` — sticky glass nav, logo, links (Home/Solutions/OXYBFSAI/Industries/About/Contact), "Book a Strategy Call" button, mobile drawer.
- `Footer` — brand + tagline + link columns.
- `Hero` — headline "One Engineer. Infinite Scale.", subheadline, two CTAs, animated futuristic visual (generated hero image + layered glass dashboard/orchestration accents with subtle motion).
- `ProblemSection`, `FutureSection` — narrative blocks with animated bullet lists.
- `MaturityRoadmap` — **interactive** 6-level roadmap (Levels 1–6). Clickable/hover steps along a connected path; selecting a level reveals its description in a glass detail panel. Responsive: horizontal stepper on desktop, vertical timeline on mobile.
- `SolutionsGrid` — 12 glass cards with icons + hover glow.
- `IndustriesGrid` — 12 industry cards.
- `OxybfsaiSection` — BFSI platform highlight with 8 feature chips.
- `WhySection` — 8 differentiator points.
- `VisionSection` — mission statement, centered emphasis.
- `CTASection` — "Ready to Build Your AI Workforce?" with two buttons.
- Reusable `RevealOnScroll` wrapper (IntersectionObserver) for entrance animations.
- `SectionHeading` for consistent eyebrow + headline styling.

### Hero & visual assets
- Generate one futuristic hero image (AI agents connected through orchestration workflows, dashboards, voice systems, dark blue/electric palette) saved to `src/assets/`, imported as an ES6 image, layered with glass UI accents and gradient glows. Lucide icons for solution/industry/feature cards.

### Content mapping
All copy from the brief is used verbatim: tagline, hero, Problem, Future, the six levels, 12 solutions, 12 industries, OXYBFSAI (8 features), 8 "Why" points, Vision/Mission, CTA, footer.

### SEO & quality
- Per-route metadata + Organization JSON-LD; single H1 per page; semantic HTML; alt text on the hero image; responsive across breakpoints; lazy-friendly imports.

### Technical notes
- All colors via semantic tokens — no hardcoded color classes in components.
- `<Link>` from `@tanstack/react-router` for nav; create route files before linking.
- Smooth animations via Tailwind utilities + Motion (added if needed) for the roadmap interaction, kept restrained for performance.
- Replace the placeholder `index.tsx` entirely.
