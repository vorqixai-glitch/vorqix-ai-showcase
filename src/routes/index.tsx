import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode } from "react";
import { ArrowUpRight, Github, Star, GitFork } from "lucide-react";

import heliosImg from "@/assets/app-helios.jpg";
import nebulaImg from "@/assets/app-nebula.jpg";
import prismImg from "@/assets/app-prism.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vorqix A.I — Machine Intelligence, Engineered" },
      {
        name: "description",
        content:
          "Vorqix A.I is an independent studio engineering open-source AI systems on GitHub and production applications on Lovable.",
      },
      { property: "og:title", content: "Vorqix A.I — Machine Intelligence, Engineered" },
      {
        property: "og:description",
        content:
          "Open-source AI systems on GitHub. Production applications on Lovable. The work of Vorqix A.I.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/* ------------------------------ data ------------------------------ */

const githubProjects = [
  {
    index: "01",
    tag: "Inference",
    name: "meridian-engine",
    description:
      "A zero-dependency tensor runtime that compiles to 4-bit kernels for edge inference.",
    stars: "24.1k",
    forks: "1.9k",
    stack: ["Rust", "CUDA", "MLIR"],
  },
  {
    index: "02",
    tag: "Agents",
    name: "cortex-orchestrator",
    description:
      "Deterministic multi-agent orchestration with observable, replayable execution traces.",
    stars: "9.8k",
    forks: "742",
    stack: ["TypeScript", "gRPC", "Redis"],
  },
  {
    index: "03",
    tag: "Vision",
    name: "lumen-diffusion",
    description:
      "Real-time latent diffusion pipeline with a single-command CUDA backend and sub-80ms frames.",
    stars: "5.4k",
    forks: "388",
    stack: ["PyTorch", "CUDA", "ONNX"],
  },
  {
    index: "04",
    tag: "Memory",
    name: "vectorfield-db",
    description:
      "An embedded vector store with HNSW indexing, tuned for dense retrieval at scale.",
    stars: "12.7k",
    forks: "910",
    stack: ["Rust", "SIMD", "SQLite"],
  },
];

const lovableApps = [
  {
    name: "Helios Analytics",
    status: "Live",
    description: "Real-time model observability for production LLM fleets.",
    image: heliosImg,
  },
  {
    name: "Nebula Copilot",
    status: "Live",
    description: "A context-aware coding companion with persistent memory.",
    image: nebulaImg,
  },
  {
    name: "Prism Studio",
    status: "Beta",
    description: "A text-to-image atelier with fine-grained style control.",
    image: prismImg,
  },
];

const stats = [
  { value: "52k+", label: "GitHub stars" },
  { value: "38", label: "Public repositories" },
  { value: "09", label: "Live applications" },
  { value: "04", label: "Years building" },
];

/* --------------------------- reveal hook --------------------------- */

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
      { threshold: 0.15 },
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
            <a href="#github" className="transition-colors hover:text-foreground">
              GitHub
            </a>
            <a href="#apps" className="transition-colors hover:text-foreground">
              Lovable
            </a>
            <a href="#about" className="transition-colors hover:text-foreground">
              Studio
            </a>
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border border-foreground/20 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-foreground transition-colors hover:bg-ink hover:text-ink-foreground hover:border-ink"
          >
            <Github className="size-3.5" />
            Follow
          </a>
        </nav>
      </header>

      {/* hero */}
      <section id="top" className="mx-auto max-w-6xl px-6 pt-20 pb-16 md:pt-32 md:pb-24">
        <Reveal>
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
            <span className="inline-block h-px w-10 bg-primary" />
            Independent AI studio — est. 2022
          </div>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="mt-10 max-w-[18ch] font-display text-5xl leading-[1.02] font-medium tracking-tight text-balance md:text-7xl">
            Machine intelligence,{" "}
            <em className="text-primary not-italic md:italic">engineered</em> with
            intent — and shipped.
          </h1>
        </Reveal>
        <div className="mt-12 flex flex-col justify-between gap-10 border-t border-border pt-10 md:flex-row md:items-end">
          <Reveal delay={240}>
            <p className="max-w-[52ch] text-base leading-relaxed text-pretty text-muted-foreground md:text-lg">
              Vorqix A.I designs and builds open-source AI systems on GitHub and
              production-grade applications on Lovable. Every project is measured
              by one standard: does it hold up in the real world.
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="flex flex-wrap gap-3">
              <a
                href="#github"
                className="inline-flex items-center gap-2 bg-ink px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-foreground transition-colors hover:bg-primary"
              >
                Explore the work
                <ArrowUpRight className="size-3.5" />
              </a>
              <a
                href="#apps"
                className="inline-flex items-center gap-2 border border-foreground/20 px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.15em] text-foreground transition-colors hover:border-foreground"
              >
                Live applications
              </a>
            </div>
          </Reveal>
        </div>

        {/* stats */}
        <Reveal delay={480}>
          <div className="mt-20 grid grid-cols-2 border border-border md:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`px-6 py-7 ${i % 2 === 1 ? "border-l border-border" : ""} ${i > 1 ? "border-t border-border md:border-t-0" : ""} ${i > 0 ? "md:border-l md:border-border" : ""} ${i === 2 ? "md:border-l" : ""}`}
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

      {/* github projects */}
      <section id="github" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <div className="mb-14 flex items-end justify-between border-b border-foreground/15 pb-6">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
                I. Open source
              </div>
              <h2 className="mt-4 font-display text-4xl font-medium tracking-tight md:text-5xl">
                Selected repositories
              </h2>
            </div>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground md:inline-flex"
            >
              github.com/vorqix
              <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {githubProjects.map((p, i) => (
            <Reveal key={p.name} delay={i * 80}>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col border border-border bg-card p-8 transition-all duration-300 hover:border-foreground/40 hover:bg-background"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[11px] tabular-nums text-primary">
                      {p.index}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                      {p.tag}
                    </span>
                  </div>
                  <ArrowUpRight className="size-4 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
                </div>
                <h3 className="mt-8 font-display text-2xl font-medium tracking-tight md:text-[1.7rem]">
                  {p.name}
                </h3>
                <p className="mt-3 max-w-[48ch] flex-1 text-sm leading-relaxed text-pretty text-muted-foreground">
                  {p.description}
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
                  <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-muted-foreground">
                    {p.stack.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 font-mono text-[11px] tabular-nums text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Star className="size-3.5 text-primary" />
                      {p.stars}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <GitFork className="size-3.5" />
                      {p.forks}
                    </span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* lovable apps */}
      <section id="apps" className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Reveal>
            <div className="mb-14 flex items-end justify-between border-b border-foreground/15 pb-6">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
                  II. Applications
                </div>
                <h2 className="mt-4 font-display text-4xl font-medium tracking-tight md:text-5xl">
                  Built with Lovable
                </h2>
              </div>
              <span className="hidden font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground md:block">
                In production
              </span>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {lovableApps.map((app, i) => (
              <Reveal key={app.name} delay={i * 100}>
                <a
                  href="#apps"
                  className="group block border border-border bg-card transition-all duration-300 hover:border-foreground/40"
                >
                  <div className="overflow-hidden border-b border-border">
                    <img
                      src={app.image}
                      alt={`${app.name} — ${app.description}`}
                      width={1024}
                      height={768}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-lg font-medium tracking-tight">
                        {app.name}
                      </h3>
                      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                        <span className="animate-pulse-dot inline-block size-1.5 rounded-full bg-primary" />
                        {app.status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-pretty text-muted-foreground">
                      {app.description}
                    </p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* statement */}
      <section id="about" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <Reveal>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                III. The studio
              </div>
            </div>
            <div className="md:col-span-8">
              <p className="max-w-[26ch] font-display text-3xl leading-snug font-medium tracking-tight text-balance md:text-[2.6rem]">
                We build the quiet machinery behind intelligent products.{" "}
                <span className="text-muted-foreground">
                  Open where it helps. Precise where it matters.
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
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-ink-foreground"
              >
                GitHub
              </a>
              <a href="#apps" className="transition-colors hover:text-ink-foreground">
                Lovable
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
            <span>Designed & engineered by Vorqix</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
