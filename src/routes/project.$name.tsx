import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, ArrowUpRight, GitFork, Github, Star } from "lucide-react";

import { getRepoDetail } from "@/lib/github.functions";
import { REPO_DESCRIPTIONS } from "@/lib/repo-descriptions";

const GITHUB_OWNER = "vorqixai-glitch";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/project/$name")({
  head: ({ params }) => {
    const pretty = params.name
      .replace(/[-_]+/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    const title = `${pretty} — Project by Vorqix A.I`;
    const description =
      REPO_DESCRIPTIONS[params.name] ??
      `${pretty}: an engineering project by Vorqix A.I — architecture overview, README, stack breakdown and source code.`;
    const url = `https://vorqix-project-gallery.lovable.app/project/${params.name}`;
    const image = `https://opengraph.githubassets.com/1/${GITHUB_OWNER}/${params.name}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: image },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareSourceCode",
            name: pretty,
            description,
            url,
            image,
            author: { "@type": "Organization", name: "Vorqix A.I" },
            codeRepository: `https://github.com/${GITHUB_OWNER}/${params.name}`,
          }),
        },
      ],
    };
  },
  component: ProjectPage,
});

function titleize(slug: string) {
  return slug.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function ProjectPage() {
  const { name } = Route.useParams();
  const fetchDetail = useServerFn(getRepoDetail);
  const { data, isLoading, error } = useQuery({
    queryKey: ["repo-detail", name],
    queryFn: () => fetchDetail({ data: { name } }),
    staleTime: 5 * 60_000,
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="mx-auto max-w-5xl px-6 py-14 md:py-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          All projects
        </Link>

        {isLoading && (
          <div className="mt-10 space-y-5">
            <div className="h-12 w-2/3 animate-pulse bg-card" />
            <div className="h-64 animate-pulse bg-card" />
          </div>
        )}

        {error && (
          <p className="mt-10 border border-destructive/40 bg-destructive/5 p-6 font-mono text-[12px] text-destructive">
            Could not load this project. {(error as Error).message}
          </p>
        )}

        {data && (
          <>
            <header className="mt-8 border-b border-foreground/15 pb-10">
              <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
                {data.repo.language ?? "System"} · Powered by Vorqix A.I
              </div>
              <h1 className="mt-5 font-display text-4xl font-medium tracking-tight text-balance md:text-6xl">
                {titleize(data.repo.name)}
              </h1>
              <p className="mt-5 max-w-[62ch] text-base leading-relaxed text-pretty text-muted-foreground">
                {data.repo.description ?? "An engineering project under active development."}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={data.repo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-ink px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-foreground transition-colors hover:bg-primary"
                >
                  <Github className="size-3.5" />
                  Learn more on GitHub
                  <ArrowUpRight className="size-3.5" />
                </a>
                {data.repo.homepage && (
                  <a
                    href={data.repo.homepage}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 border border-foreground/20 px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors hover:border-foreground"
                  >
                    Visit project
                    <ArrowUpRight className="size-3.5" />
                  </a>
                )}
                <span className="ml-auto flex items-center gap-5 font-mono text-[12px] tabular-nums text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Star className="size-3.5 text-primary" />
                    {data.repo.stars}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <GitFork className="size-3.5" />
                    {data.repo.forks}
                  </span>
                </span>
              </div>
            </header>

            {data.screenshots.length > 0 && (
              <div className="mt-12 border border-border bg-card">
                <img
                  src={data.screenshots[0]}
                  alt={`${titleize(data.repo.name)} project preview`}
                  loading="lazy"
                  className="w-full"
                />
              </div>
            )}

            {data.repo.topics.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {data.repo.topics.map((t) => (
                  <span
                    key={t}
                    className="border border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            {data.languages.length > 0 && (
              <section className="mt-14">
                <h2 className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                  Stack breakdown
                </h2>
                <div className="mt-5 space-y-3">
                  {data.languages.slice(0, 6).map((l) => (
                    <div key={l.name} className="flex items-center gap-4">
                      <span className="w-32 shrink-0 font-mono text-[11px] uppercase tracking-[0.16em]">
                        {l.name}
                      </span>
                      <span className="h-1.5 flex-1 bg-secondary">
                        <span
                          className="block h-full bg-primary"
                          style={{ width: `${l.percent}%` }}
                        />
                      </span>
                      <span className="w-14 text-right font-mono text-[11px] tabular-nums text-muted-foreground">
                        {l.percent}%
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="mt-14 border-t border-border pt-10">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                README
              </h2>
              {data.readme ? (
                <div className="markdown mt-6 max-w-none text-[15px] leading-relaxed">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.readme}</ReactMarkdown>
                </div>
              ) : (
                <p className="mt-6 border border-border bg-card p-8 text-sm text-muted-foreground">
                  This project has no README yet. Full source and commit history are on
                  GitHub.
                </p>
              )}
            </section>
          </>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
