import { useEffect, useRef, useState } from "react";
import { Languages, Check } from "lucide-react";

import { LOCALES, useI18n } from "@/lib/i18n";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0]!;

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={t("nav.language")}
        aria-expanded={open}
        className="inline-flex items-center gap-2 border border-foreground/20 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-foreground transition-colors hover:border-ink hover:bg-ink hover:text-ink-foreground"
      >
        <Languages className="size-3.5" />
        {current.short}
      </button>

      {open && (
        <div className="absolute end-0 top-full z-50 mt-2 w-44 border border-border bg-card shadow-lg">
          {LOCALES.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => {
                setLocale(l.code);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between gap-3 border-b border-border px-4 py-2.5 text-start text-sm last:border-b-0 hover:bg-secondary"
            >
              <span>{l.label}</span>
              {l.code === locale && <Check className="size-3.5 text-primary" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
