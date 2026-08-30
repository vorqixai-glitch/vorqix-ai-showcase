import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode } from "react";
import {
  ArrowUpRight,
  Github,
  Star,
  GitFork,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
} from "lucide-react";

import heliosImg from "@/assets/app-helios.jpg";
import nebulaImg from "@/assets/app-nebula.jpg";
import prismImg from "@/assets/app-prism.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vorqix A.I — Machine Intelligence, Shipped" },
      {
        name: "description",
        content:
          "Vorqix A.I builds open-source AI systems on GitHub and production apps on Lovable. Explore the work.",
      },
      { property: "og:title", content: "Vorqix A.I — Machine Intelligence, Shipped" },
      {
        property: "og:description",
        content:
          "Open-source AI engines on GitHub. Production-grade apps on Lovable. Explore the work of Vorqix A.I.",
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
    icon: Cpu,
    tag: "inference",
    name: "meridian-engine",
    description:
      "A zero-dependency tensor runtime that compiles to 4-bit kernels for edge inference.",
    stars: "24.1k",
    forks: "1.9k",
    stack: ["Rust", "CUDA", "MLIR"],
  },
  {
    icon: Layers,
    tag: "agents",
    name: "cortex-orchestrator",
    description:
      "Deterministic multi-agent orchestration with observable, replayable execution traces.",
    stars: "9.8k",
    forks: "742",
    stack: ["TypeScript", "gRPC", "Redis"],
  },
  {
    icon: Sparkles,
    tag: "vision",
    name: "lumen-diffusion",
    description:
      "Real-time latent diffusion pipeline with a single-command CUDA backend and sub-80ms frames.",
    stars: "5.4k",
    forks: "388",
    stack: ["PyTorch", "CUDA", "ONNX"],
  },
  {
    icon: Terminal,
    tag: "memory",
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
  { value: "38", label: "Public repos" },
  { value: "09", label: "Live apps" },
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
        if (entry.isIntersecting) {
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
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* ambient field */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
        <div className="animate-float-slow absolute -top-48 left-1/2 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-primary/15 blur-[140px]" />
        <div className="animate-float-slow absolute top-[55%] -right-40 h-[420px] w-[420px] rounded-full bg-primary/8 blur-[120px] [animation-delay:-9s]" />
      </div>

      {/* nav */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-3">
            <span className="grid size-8 place-items-center rounded-md bg-primary font-display text-sm font-bold text-primary-foreground shadow-[0_0_24px_-4px_var(--glow)]">
              V
            </span>
            <span className="font-display text-[15px] font-bold tracking-tight">
              VORQIX<span className="text-muted-foreground"> A.I</span>
            </span>
          </a>
          <div className="hidden items-center gap-8 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:flex">
            <a href="#github" className="transition-colors hover:text-foreground">
              GitHub
            </a>
            <a href="#apps" className="transition-colors hover:text-foreground">
              Lovable
            </a>
            <a href="#about" className="transition-colors hover:text-foreground">
              About
            </a>
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-background transition-transform hover:-translate-y-0.5"
          >
            <Github className="size-3.5" />
            Follow
          </a>
        </nav>
      </header>

      {/* hero */}
      <section id="top" className="relative mx-auto max-w-6xl px-6 pt-24 pb-20 md:pt-36 md:pb-28">
        <Reveal>
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            <span className="animate-pulse-dot inline-block size-1.5 rounded-full bg-primary" />
            Machine intelligence · built in the open
          </div>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="mt-8 max-w-[15ch] font-display text-6xl leading-[0.95] font-bold tracking-tight text-balance md:text-8xl">
            Systems that{" "}
            <span className="text-glow text-primary">think</span>,
            <br />
            shipped to{" "}
            <span className="text-glow text-primary">production</span>.
          </h1>
        </Reveal>
        <div className="mt-10 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <Reveal delay={260}>
            <p className="max-w-[46ch] text-base text-pretty text-muted-foreground md:text-lg">
              Vorqix A.I is an independent lab crafting open-source AI engines on
              GitHub and production-grade applications on Lovable. No noise — just
              signal, shipped.
            </p>
          </Reveal>
          <Reveal delay={380}>
            <div className="flex flex-wrap gap-3">
              <a
                href="#github"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.15em] text-primary-foreground shadow-[0_0_32px_-6px_var(--glow)] transition-transform hover:-translate-y-0.5"
              >
                Explore GitHub
                <ArrowUpRight className="size-3.5" />
              </a>
              <a
                href="#apps"
                className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
              >
                View live apps
              </a>
            </div>
          </Reveal>
        </div>

        {/* stats */}
        <Reveal delay={500}>
          <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-card/80 px-6 py-6">
                <div className="font-display text-3xl font-bold tabular-nums md:text-4xl">
                  {s.value}
                </div>
                <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* github projects */}
      <section id="github" className="relative mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <div className="mb-12 flex items-end justify-between border-b border-border pb-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
                <Github className="size-3.5" />
                01 — Open source
              </div>
              <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
                GitHub projects
              </h2>
            </div>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground md:inline-flex"
            >
              View all
              <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {githubProjects.map((p, i) => (
            <Reveal key={p.name} delay={i * 90}>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="group relative block h-full overflow-hidden rounded-xl border border-border bg-card/60 p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_60px_-20px_color-mix(in_oklab,var(--glow)_30%,transparent)]"
              >
                <div className="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-primary/15 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="grid size-9 place-items-center rounded-md border border-border bg-secondary text-primary">
                      <p.icon className="size-4" />
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      {p.tag}
                    </span>
                  </div>
                  <ArrowUpRight className="size-4 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold tracking-tight transition-colors group-hover:text-primary">
                  {p.name}
                </h3>
                <p className="mt-2 max-w-[46ch] text-sm leading-relaxed text-pretty text-muted-foreground">
                  {p.description}
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {p.stack.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] text-muted-foreground"
                      >
                        {t}
                      </span>
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
      <section id="apps" className="relative mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <div className="mb-12 flex items-end justify-between border-b border-border pb-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
                <Sparkles className="size-3.5" />
                02 — Applications
              </div>
              <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
                Built with Lovable
              </h2>
            </div>
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground md:block">
              Production · v2.x
            </span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {lovableApps.map((app, i) => (
            <Reveal key={app.name} delay={i * 110}>
              <a
                href="#apps"
                className="group relative block overflow-hidden rounded-xl border border-border bg-card/60 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_60px_-20px_color-mix(in_oklab,var(--glow)_30%,transparent)]"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="overflow-hidden">
                  <img
                    src={app.image}
                    alt={`${app.name} — ${app.description}`}
                    width={1024}
                    height={768}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg font-bold tracking-tight transition-colors group-hover:text-primary">
                      {app.name}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
                      <span className="animate-pulse-dot inline-block size-1.5 rounded-full bg-primary" />
                      {app.status}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-pretty text-muted-foreground">
                    {app.description}
                  </p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* statement */}
      <section id="about" className="relative mx-auto max-w-6xl px-6 py-28">
        <Reveal>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                03 — Statement
              </div>
            </div>
            <div className="md:col-span-8">
              <p className="max-w-[24ch] font-display text-3xl leading-snug font-medium tracking-tight text-balance md:text-5xl">
                We build the quiet machinery behind intelligent products.{" "}
                <span className="text-muted-foreground">
                  Open where it helps. Precise where it matters.
                </span>
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* footer */}
      <footer className="relative border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
            <div>
              <div className="flex items-center gap-3">
                <span className="grid size-8 place-items-center rounded-md bg-primary font-display text-sm font-bold text-primary-foreground">
                  V
                </span>
                <span className="font-display text-lg font-bold tracking-tight">
                  VORQIX A.I
                </span>
              </div>
              <p className="mt-4 max-w-[36ch] text-sm text-pretty text-muted-foreground">
                Machine intelligence, built in the open.
              </p>
            </div>
            <div className="flex flex-wrap gap-8 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-foreground"
              >
                GitHub
              </a>
              <a href="#apps" className="transition-colors hover:text-foreground">
                Lovable
              </a>
              <a href="#about" className="transition-colors hover:text-foreground">
                About
              </a>
              <a
                href="mailto:hello@vorqix.ai"
                className="transition-colors hover:text-foreground"
              >
                Contact
              </a>
            </div>
          </div>
          <div className="mt-14 flex flex-col justify-between gap-3 border-t border-border pt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/60 md:flex-row">
            <span>© 2026 Vorqix A.I — All rights reserved</span>
            <span>Designed & engineered by Vorqix</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
