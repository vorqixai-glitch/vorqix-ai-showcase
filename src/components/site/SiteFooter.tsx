import { Link } from "@tanstack/react-router";
import { VorqixMark } from "./Logo";
import { useI18n } from "@/lib/i18n";

export function SiteFooter() {
  const { t } = useI18n();

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
              {t("footer.blurb")}
            </p>
          </div>
          <div className="flex flex-wrap gap-8 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-foreground/60">
            <Link to="/" hash="work" className="transition-colors hover:text-ink-foreground">
              {t("footer.work")}
            </Link>
            <Link
              to="/"
              hash="platforms"
              className="transition-colors hover:text-ink-foreground"
            >
              {t("footer.platforms")}
            </Link>
            <Link to="/" hash="about" className="transition-colors hover:text-ink-foreground">
              {t("footer.about")}
            </Link>
            <Link to="/contact" className="transition-colors hover:text-ink-foreground">
              {t("footer.contact")}
            </Link>
          </div>
        </div>
        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-ink-foreground/15 pt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-foreground/40 md:flex-row">
          <span>
            © {new Date().getFullYear()} Vorqix A.I — {t("footer.rights")}
          </span>
          <span>{t("footer.credit")}</span>
        </div>
      </div>
    </footer>
  );
}
