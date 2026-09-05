import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  Github,
  Star,
  GitFork,
  Search,
  RefreshCw,
  Lock,
  Globe,
} from "lucide-react";

import { getPortfolio, type Repo } from "@/lib/github.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vorqix A.I — Machine Intelligence, Engineered" },
      {
        name: "description",
        content:
          "Vorqix A.I is an independent studio engineering AI systems, automation tooling and production software. Browse the live repository index.",
      },
      { property: "og:title", content: "Vorqix A.I — Machine Intelligence, Engineered" },
      {
        property: "og:description",
        content:
          "A live index of the systems, tools and applications engineered by Vorqix A.I.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/* ---------------------------- helpers ---------------------------- */

function titleize(slug: string) {
  return slug
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function relative(iso: string) {
  const diff = Date.now() - Date.parse(iso);
  const day = 86_400_000;
  if (diff < day) return "today";
  const d = Math.round(diff / day);
  if (d < 30) return `${d}d ago`;
  const m = Math.round(d / 30);
  if (m < 12) return `${m}mo ago`;
  return `${Math.round(m / 12)}y ago`;
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ------------------------------ page ------------------------------ */

function Index() {
  const fetchPortfolio = useServerFn(getPortfolio);
  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ["portfolio"],
    queryFn: () => fetchPortfolio(),
    staleTime: 5 * 60_000,
  });

  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState<string | null>(null);
  const [sort, setSort] = useState<"recent" | "name" | "stars">("recent");
  const [limit, setLimit] = useState(9);

  const repos: Repo[] = data?.repos ?? [];

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = repos.filter((r) => {
      const matchesQuery =
        q === "" ||
        r.name.toLowerCase().includes(q) ||
        (r.description ?? "").toLowerCase().includes(q) ||
        (r.language ?? "").toLowerCase().includes(q);
      const matchesLang = !language || r.language === language;
      return matchesQuery && matchesLang;
    });
    const sorted = [...filtered];
    if (sort === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "stars") sorted.sort((a, b) => b.stars - a.stars);
    return sorted;
  }, [repos, query, language, sort]);

  const shown = visible.slice(0, limit);

  const stats = [
    { value: String(data?.totalRepos ?? "—"), label: "Projects shipped" },
    { value: String(data?.languages.length ?? "—"), label: "Languages in play" },
    {
      value: String(repos.filter((r) => r.homepage).length || "—"),
      label: "Live deployments",
    },
    {
      value: data ? `${new Date(data.profile.createdAt).getFullYear()}` : "—",
      label: "Building since",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* nav */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-3">
            <span className="grid size-8 place-items-center bg-ink font-display text-sm font-semibold text-ink-foreground">
              V
            </span>
            <span className="font-display text-[15px] font-semibold tracking-tight">
              Vorqix <span className="text-muted-foreground">A.I</span>
            </span>
          </a>
          <div className="hidden items-center gap-9 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:flex">
            <a href="#work" className="transition-colors hover:text-foreground">
              Work
            </a>
            <a href="#index" className="transition-colors hover:text-foreground">
              Index
            </a>
            <a href="#about" className="transition-colors hover:text-foreground">
              Studio
            </a>
          </div>
          <a
            href={data?.profile.url ?? "https://github.com"}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border border-foreground/20 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-foreground transition-colors hover:border-ink hover:bg-ink hover:text-ink-foreground"
          >
            <Github className="size-3.5" />
            Profile
          </a>
        </nav>
      </header>

      {/* hero */}
      <section id="top" className="mx-auto max-w-6xl px-6 pt-20 pb-16 md:pt-32 md:pb-24">
        <Reveal>
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
            <span className="inline-block h-px w-10 bg-primary" />
            Independent AI studio
          </div>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="mt-10 max-w-[18ch] font-display text-5xl leading-[1.02] font-medium tracking-tight text-balance md:text-7xl">
            Machine intelligence,{" "}
            <em className="text-primary not-italic md:italic">engineered</em> with intent —
            and shipped.
          </h1>
        </Reveal>
        <div className="mt-12 flex flex-col justify-between gap-10 border-t border-border pt-10 md:flex-row md:items-end">
          <Reveal delay={240}>
            <p className="max-w-[52ch] text-base leading-relaxed text-pretty text-muted-foreground md:text-lg">
              {data?.profile.bio ??
                "Vorqix A.I designs and builds AI systems, automation tooling and production software. Everything below is pulled live from the studio's working repositories — no mockups, no placeholders."}
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="flex flex-wrap gap-3">
              <a
                href="#work"
                className="inline-flex items-center gap-2 bg-ink px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-foreground transition-colors hover:bg-primary"
              >
                Explore the work
                <ArrowUpRight className="size-3.5" />
              </a>
              <a
                href="#index"
                className="inline-flex items-center gap-2 border border-foreground/20 px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.15em] text-foreground transition-colors hover:border-foreground"
              >
                Full index
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={480}>
          <div className="mt-20 grid grid-cols-2 border border-border md:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`px-6 py-7 ${i % 2 === 1 ? "border-l border-border" : ""} ${i > 1 ? "border-t border-border md:border-t-0" : ""} ${i > 0 ? "md:border-l md:border-border" : ""}`}
              >
                <div className="font-display text-3xl font-medium tabular-nums md:text-4xl">
                  {s.value}
                </div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* work / live index */}
      <section id="work" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <div className="mb-10 flex items-end justify-between border-b border-foreground/15 pb-6">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
                I. The work
              </div>
              <h2 className="mt-4 font-display text-4xl font-medium tracking-tight md:text-5xl">
                Live project index
              </h2>
            </div>
            <button
              type="button"
              onClick={() => refetch()}
              disabled={isFetching}
              className="inline-flex items-center gap-2 border border-foreground/20 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground disabled:opacity-50"
            >
              <RefreshCw className={`size-3.5 ${isFetching ? "animate-spin" : ""}`} />
              Sync
            </button>
          </div>
        </Reveal>

        {/* controls */}
        <div id="index" className="mb-10 flex flex-col gap-5">
          <div className="flex items-center gap-3 border border-border bg-card px-4 py-3">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setLimit(9);
              }}
              placeholder="Search projects, languages, descriptions…"
              aria-label="Search projects"
              className="w-full bg-transparent font-mono text-[13px] outline-none placeholder:text-muted-foreground/70"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <FilterChip active={language === null} onClick={() => setLanguage(null)}>
              All
            </FilterChip>
            {(data?.languages ?? []).map((l) => (
              <FilterChip
                key={l}
                active={language === l}
                onClick={() => {
                  setLanguage(language === l ? null : l);
                  setLimit(9);
                }}
              >
                {l}
              </FilterChip>
            ))}
            <span className="ml-auto flex items-center gap-2">
              {(["recent", "stars", "name"] as const).map((s) => (
                <FilterChip key={s} active={sort === s} onClick={() => setSort(s)}>
                  {s}
                </FilterChip>
              ))}
            </span>
          </div>
        </div>

        {error && (
          <div className="border border-destructive/40 bg-destructive/5 p-6 font-mono text-[12px] text-destructive">
            Could not load the project index. {(error as Error).message}
          </div>
        )}

        {isLoading && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-56 animate-pulse border border-border bg-card" />
            ))}
          </div>
        )}

        {!isLoading && !error && (
          <>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {shown.map((r, i) => (
                <Reveal key={r.id} delay={Math.min(i, 5) * 60}>
                  <a
                    href={r.homepage ?? r.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex h-full flex-col border border-border bg-card p-8 transition-all duration-300 hover:border-foreground/40 hover:bg-background"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-baseline gap-4">
                        <span className="font-mono text-[11px] tabular-nums text-primary">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                          {r.language ?? "System"}
                        </span>
                      </div>
                      <ArrowUpRight className="size-4 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                    </div>
                    <h3 className="mt-8 font-display text-2xl font-medium tracking-tight md:text-[1.7rem]">
                      {titleize(r.name)}
                    </h3>
                    <p className="mt-3 max-w-[48ch] flex-1 text-sm leading-relaxed text-pretty text-muted-foreground">
                      {r.description ?? "An internal system under active development."}
                    </p>
                    <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5 font-mono text-[11px] text-muted-foreground">
                      <span className="inline-flex items-center gap-2">
                        <span className="grid size-4 place-items-center bg-ink font-display text-[8px] font-semibold text-ink-foreground">
                          V
                        </span>
                        <span className="uppercase tracking-[0.18em] text-foreground/80">
                          Powered by Vorqix A.I
                        </span>
                        <span className="text-muted-foreground/60">·</span>
                        {r.isPrivate ? (
                          <>
                            <Lock className="size-3.5" /> Private
                          </>
                        ) : (
                          <>
                            <Globe className="size-3.5 text-primary" /> Public
                          </>
                        )}
                        <span className="text-muted-foreground/60">·</span>
                        {relative(r.updatedAt)}
                      </span>
                      <span className="flex items-center gap-4 tabular-nums">
                        <span className="inline-flex items-center gap-1.5">
                          <Star className="size-3.5 text-primary" />
                          {r.stars}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <GitFork className="size-3.5" />
                          {r.forks}
                        </span>
                      </span>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>

            {visible.length === 0 && (
              <p className="border border-border bg-card p-10 text-center font-mono text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
                No projects match that filter
              </p>
            )}

            {limit < visible.length && (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={() => setLimit((l) => l + 9)}
                  className="inline-flex items-center gap-2 border border-foreground/20 px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors hover:bg-ink hover:text-ink-foreground"
                >
                  Load more — {visible.length - limit} remaining
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* statement */}
      <section id="about" className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <Reveal>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
              <div className="md:col-span-4">
                <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                  II. The studio
                </div>
              </div>
              <div className="md:col-span-8">
                <p className="max-w-[26ch] font-display text-3xl leading-snug font-medium tracking-tight text-balance md:text-[2.6rem]">
                  We build the quiet machinery behind intelligent products.{" "}
                  <span className="text-muted-foreground">
                    Precise where it matters. Shipped where it counts.
                  </span>
                </p>
                <a
                  href="mailto:hello@vorqix.ai"
                  className="mt-10 inline-flex items-center gap-2 border-b border-foreground/30 pb-1 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  Start a conversation
                  <ArrowUpRight className="size-3.5" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* footer */}
      <footer className="bg-ink text-ink-foreground">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
            <div>
              <div className="flex items-center gap-3">
                <span className="grid size-8 place-items-center bg-ink-foreground font-display text-sm font-semibold text-ink">
                  V
                </span>
                <span className="font-display text-lg font-semibold tracking-tight">
                  Vorqix A.I
                </span>
              </div>
              <p className="mt-4 max-w-[36ch] text-sm text-pretty text-ink-foreground/60">
                Machine intelligence, engineered with intent.
              </p>
            </div>
            <div className="flex flex-wrap gap-8 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-foreground/60">
              <a href="#work" className="transition-colors hover:text-ink-foreground">
                Work
              </a>
              <a href="#index" className="transition-colors hover:text-ink-foreground">
                Index
              </a>
              <a href="#about" className="transition-colors hover:text-ink-foreground">
                Studio
              </a>
              <a
                href="mailto:hello@vorqix.ai"
                className="transition-colors hover:text-ink-foreground"
              >
                Contact
              </a>
            </div>
          </div>
          <div className="mt-14 flex flex-col justify-between gap-3 border-t border-ink-foreground/15 pt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-foreground/40 md:flex-row">
            <span>© 2026 Vorqix A.I — All rights reserved</span>
            <span>Designed &amp; engineered by Vorqix</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors ${
        active
          ? "border-ink bg-ink text-ink-foreground"
          : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
