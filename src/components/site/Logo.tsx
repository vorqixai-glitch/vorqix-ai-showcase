export function VorqixMark({ className = "size-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      role="img"
      aria-label="Vorqix A.I"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" rx="2" fill="currentColor" />
      <path
        d="M7 9.5L14.2 22.5L21.4 9.5"
        stroke="var(--background)"
        strokeWidth="2.1"
        strokeLinecap="square"
      />
      <circle cx="24" cy="10.5" r="2.1" fill="var(--background)" />
    </svg>
  );
}

export function VorqixWordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <VorqixMark className="size-8 text-ink" />
      <span className="font-display text-[15px] font-semibold tracking-tight">
        Vorqix <span className="text-muted-foreground">A.I</span>
      </span>
      {!compact && (
        <span className="hidden font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground lg:inline">
          / applied intelligence
        </span>
      )}
    </span>
  );
}
