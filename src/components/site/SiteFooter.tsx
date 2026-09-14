import { Link } from "@tanstack/react-router";
import { VorqixMark } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-3">
              <VorqixMark className="size-8 text-ink-foreground" />
              <span className="font-display text-lg font-semibold tracking-tight">
                Vorqix A.I
              </span>
            </div>
            <p className="mt-4 max-w-[38ch] text-sm text-pretty text-ink-foreground/60">
              Applied intelligence, engineered with intent. Every project listed here is my
              own work — code, architecture and delivery.
            </p>
          </div>
          <div className="flex flex-wrap gap-8 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-foreground/60">
            <Link to="/" hash="work" className="transition-colors hover:text-ink-foreground">
              Work
            </Link>
            <Link
              to="/"
              hash="platforms"
              className="transition-colors hover:text-ink-foreground"
            >
              Platforms
            </Link>
            <Link to="/" hash="about" className="transition-colors hover:text-ink-foreground">
              About
            </Link>
            <Link to="/contact" className="transition-colors hover:text-ink-foreground">
              Contact
            </Link>
          </div>
        </div>
        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-ink-foreground/15 pt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-foreground/40 md:flex-row">
          <span>© {new Date().getFullYear()} Vorqix A.I — All rights reserved</span>
          <span>Designed &amp; engineered by Vorqix</span>
        </div>
      </div>
    </footer>
  );
}
