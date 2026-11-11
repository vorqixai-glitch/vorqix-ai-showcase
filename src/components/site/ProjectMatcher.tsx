import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowUpRight, Loader2, Sparkles } from "lucide-react";

import { recommendProjects, type Recommendation } from "@/lib/github.functions";

function titleize(slug: string) {
  return slug.replace(/[-_]+/g, " ").trim().replace(/\b\w/g, (c) => c.toUpperCase());
}

export function ProjectMatcher() {
  const run = useServerFn(recommendProjects);
  const [brief, setBrief] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ summary: string; picks: Recommendation[] } | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (loading || brief.trim().length < 5) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      setResult(await run({ data: { brief } }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="match" className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
              AI project match
            </div>
            <h2 className="mt-4 font-display text-4xl font-medium tracking-tight text-balance md:text-5xl">
              Describe what you want to build.
            </h2>
            <p className="mt-5 max-w-[42ch] text-base leading-relaxed text-pretty text-muted-foreground">
              Tell us the idea in plain words. An AI-powered assistant reads every project in the
              index and points you to the ones closest to what you need.
            </p>
          </div>

          <div className="md:col-span-7">
            <form onSubmit={submit} className="border border-border bg-card">
              <textarea
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                maxLength={1000}
                rows={4}
                placeholder="e.g. A tool that turns product specs into pixel-perfect landing pages…"
                aria-label="Describe what you want to build"
                className="block w-full resize-none bg-transparent p-5 text-base outline-none placeholder:text-muted-foreground/70"
              />
              <div className="flex items-center justify-between border-t border-border px-5 py-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {brief.length}/1000
                </span>
                <button
                  type="submit"
                  disabled={loading || brief.trim().length < 5}
                  className="inline-flex items-center gap-2 bg-ink px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-foreground transition-colors hover:bg-primary disabled:opacity-40"
                >
                  {loading ? <Loader2 className="size-3.5 animate-spin" /> : <Sparkles className="size-3.5" />}
                  {loading ? "Matching…" : "Find matches"}
                </button>
              </div>
            </form>

            {error && (
              <p role="alert" className="mt-5 border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
                {error}
              </p>
            )}

            {result && (
              <div className="mt-6" aria-live="polite">
                <p className="text-base leading-relaxed text-pretty">{result.summary}</p>
                <ul className="mt-5 space-y-px border border-border bg-border">
                  {result.picks.map((p) => (
                    <li key={p.name}>
                      <Link
                        to="/project/$name"
                        params={{ name: p.name }}
                        className="group flex items-start justify-between gap-6 bg-card p-5 transition-colors hover:bg-background"
                      >
                        <span>
                          <span className="font-display text-lg font-medium tracking-tight">
                            {titleize(p.name)}
                          </span>
                          <span className="mt-1 block text-sm text-pretty text-muted-foreground">
                            {p.reason}
                          </span>
                        </span>
                        <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
