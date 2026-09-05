import { createServerFn } from "@tanstack/react-start";
import { REPO_DESCRIPTIONS } from "./repo-descriptions";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/github";

export type Repo = {
  id: number;
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stars: number;
  forks: number;
  isPrivate: boolean;
  updatedAt: string;
};

export type Profile = {
  login: string;
  name: string | null;
  avatarUrl: string;
  url: string;
  bio: string | null;
  publicRepos: number;
  followers: number;
  createdAt: string;
};

export type PortfolioData = {
  profile: Profile;
  repos: Repo[];
  totalRepos: number;
  languages: string[];
};

async function ghRaw(path: string, accept = "application/vnd.github+json") {
  const lovableKey = process.env["LOVABLE_API_KEY"];
  const connectionKey = process.env["GITHUB_API_KEY"];
  if (!lovableKey || !connectionKey) {
    throw new Error("GitHub connection is not configured on the server.");
  }

  return fetch(`${GATEWAY_URL}${path}`, {
    headers: {
      Accept: accept,
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": connectionKey,
    },
  });
}

async function gh(path: string) {
  const res = await ghRaw(path);
  if (!res.ok) {
    const body = await res.text();
    console.error(`GitHub gateway failed [${res.status}]: ${body}`);
    throw new Error(`GitHub request failed [${res.status}]: ${body}`);
  }
  return res.json();
}


export const getPortfolio = createServerFn({ method: "GET" }).handler(
  async (): Promise<PortfolioData> => {
    const [profileRaw, reposRaw] = await Promise.all([
      gh("/user"),
      gh("/user/repos?per_page=100&sort=updated&affiliation=owner"),
    ]);

    const repos: Repo[] = (reposRaw as any[])
      .map((r) => ({
        id: r.id,
        name: r.name,
        description:
          r.description && r.description.trim() !== ""
            ? r.description
            : (REPO_DESCRIPTIONS[r.name] ?? null),
        url: r.html_url,
        homepage: r.homepage && r.homepage.trim() !== "" ? r.homepage : null,
        language: r.language,
        topics: Array.isArray(r.topics) ? r.topics.slice(0, 4) : [],
        stars: r.stargazers_count ?? 0,
        forks: r.forks_count ?? 0,
        isPrivate: Boolean(r.private),
        updatedAt: r.pushed_at ?? r.updated_at,
      }))
      .sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));

    const languages = Array.from(
      new Set(repos.map((r) => r.language).filter((l): l is string => Boolean(l))),
    ).sort();

    const p = profileRaw as any;

    return {
      profile: {
        login: p.login,
        name: p.name ?? null,
        avatarUrl: p.avatar_url,
        url: p.html_url,
        bio: p.bio ?? null,
        publicRepos: p.public_repos ?? 0,
        followers: p.followers ?? 0,
        createdAt: p.created_at,
      },
      repos,
      totalRepos: repos.length,
      languages,
    };
  },
);
