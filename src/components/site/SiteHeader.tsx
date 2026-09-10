import { Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useRef, useState } from "react";
import { Github, Search } from "lucide-react";

import { getPortfolio } from "@/lib/github.functions";
import { VorqixWordmark } from "./Logo";

function titleize(slug: string) {
  return slug
    .replace(/[-_]+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function SiteHeader() {
  const fetchPortfolio = useServerFn(getPortfolio);
  const { data } = useQuery({
    queryKey: ["portfolio"],
    queryFn: () => fetchPortfolio(),
    staleTime: 5 * 60_000,
  });

  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return (data?.repos ?? [])
      .filter(
        (r) =>
          r.name.toLowerCase().includes(term) ||
          (r.description ?? "").toLowerCase().includes(term) ||
          (r.language ?? "").toLowerCase().includes(term),
      )
      .slice(0, 6);
  }, [q, data]);

  function go(name: string) {
    setOpen(false);
    setQ("");
    navigate({ to: "/project/$name", params: { name } });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-4">
        <Link to="/" className="shrink-0">
          <VorqixWordmark />
        </Link>

        <div ref={boxRef} className="relative ml-auto w-full max-w-xs">
          <div className="flex items-center gap-2 border border-border bg-card px-3 py-2">
            <Search className="size-3.5 shrink-0 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && results[0]) go(results[0].name);
                if (e.key === "Escape") setOpen(false);
              }}
              placeholder="Search projects…"
              aria-label="Search projects"
              className="w-full bg-transparent font-mono text-[12px] outline-none placeholder:text-muted-foreground/70"
            />
          </div>
          {open && q.trim() !== "" && (
            <div className="absolute right-0 top-full z-50 mt-2 w-full min-w-[18rem] border border-border bg-card shadow-lg">
              {results.length === 0 && (
                <p className="px-4 py-3 font-mono text-[11px] text-muted-foreground">
                  No project matches “{q}”
                </p>
              )}
              {results.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onMouseDown={() => go(r.name)}
                  className="block w-full border-b border-border px-4 py-3 text-left last:border-b-0 hover:bg-secondary"
                >
                  <span className="font-display text-sm font-medium">{titleize(r.name)}</span>
                  <span className="mt-0.5 block truncate font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    {r.language ?? "System"}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <a
          href={data?.profile.url ?? "https://github.com"}
          target="_blank"
          rel="noreferrer"
          className="hidden shrink-0 items-center gap-2 border border-foreground/20 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-foreground transition-colors hover:border-ink hover:bg-ink hover:text-ink-foreground sm:inline-flex"
        >
          <Github className="size-3.5" />
          GitHub
        </a>
      </nav>
    </header>
  );
}
