import { Link } from "@tanstack/react-router";
import { Hexagon } from "lucide-react";
import { NAV_LINKS } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link to="/" className="flex items-center gap-2" aria-label="UHA Labs home">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-primary shadow-glow">
                <Hexagon className="h-5 w-5 text-primary-foreground" />
              </span>
              <span className="text-lg font-semibold tracking-tight text-foreground">
                UHA <span className="text-gradient">Labs</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Building Digital Workforces for the AI Era.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-12 gap-y-3 sm:grid-cols-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-12 border-t border-border/60 pt-6 text-sm text-muted-foreground">
          © {new Date().getFullYear()} UHA Labs. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
