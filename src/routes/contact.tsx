import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

const TITLE = "Contact — Vorqix A.I";
const DESCRIPTION =
  "Get in touch with Vorqix A.I — applied intelligence, systems engineering and shipped software. Email, LinkedIn and GitHub.";
const URL = "https://vorqix-project-gallery.lovable.app/contact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Vorqix A.I",
          url: "https://vorqix-project-gallery.lovable.app",
          email: "hello@vorqix.ai",
          description: DESCRIPTION,
        }),
      },
    ],
  }),
  component: ContactPage,
});

const CHANNELS = [
  {
    label: "Email",
    value: "hello@vorqix.ai",
    href: "mailto:hello@vorqix.ai",
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/company/vorqix-ai",
    href: "https://www.linkedin.com/company/vorqix-ai",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    value: "github.com/vorqixai-glitch",
    href: "https://github.com/vorqixai-glitch",
    icon: Github,
  },
];

function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
          Contact
        </p>
        <h1 className="mt-5 max-w-[18ch] font-display text-4xl font-medium tracking-tight text-balance md:text-6xl">
          Let&apos;s build something worth shipping.
        </h1>
        <p className="mt-6 max-w-[60ch] text-base leading-relaxed text-pretty text-muted-foreground">
          Open to engineering roles, contract work and collaboration. The fastest route is
          email — I answer everything myself.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-3">
          {CHANNELS.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="group flex flex-col gap-4 bg-card p-8 transition-colors hover:bg-secondary"
            >
              <c.icon className="size-4 text-primary" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {c.label}
              </span>
              <span className="inline-flex items-center gap-1.5 font-display text-base font-medium tracking-tight break-all">
                {c.value}
                <ArrowUpRight className="size-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
              </span>
            </a>
          ))}
        </div>

        <section className="mt-20 grid grid-cols-1 gap-10 border-t border-foreground/15 pt-12 md:grid-cols-[14rem_1fr]">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
            About
          </h2>
          <div className="max-w-[62ch] space-y-5 text-base leading-relaxed text-pretty">
            <p>
              Vorqix A.I is my engineering practice: applied intelligence built with intent
              rather than novelty. I design, write and ship the whole stack — data models,
              services, interfaces and the deployment around them.
            </p>
            <p>
              The project index on this site is generated live from my own repositories, so
              it reflects what I am actually working on rather than a curated highlight
              reel. Finished systems, running experiments and work in progress all appear.
            </p>
            <p className="text-muted-foreground">
              Interests: applied machine intelligence, automation platforms, developer
              tooling and systems that hold up under real use.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
