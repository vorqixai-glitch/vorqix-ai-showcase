// One-off maintenance endpoint: pushes curated descriptions to GitHub and
// sets private repos to public. Invoked once during setup, then removed.
import { createFileRoute } from "@tanstack/react-router";
import { REPO_DESCRIPTIONS } from "@/lib/repo-descriptions";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/github";
const OWNER = "vorqixai-glitch";

export const Route = createFileRoute("/api/public/sync-repos")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (request.headers.get("x-sync-key") !== "vorqix-one-off-sync") {
          return new Response("Unauthorized", { status: 401 });
        }
        const lovableKey = process.env["LOVABLE_API_KEY"];
        const connectionKey = process.env["GITHUB_API_KEY"];
        if (!lovableKey || !connectionKey) {
          return Response.json({ error: "missing keys" }, { status: 500 });
        }

        const results: { repo: string; status: number }[] = [];
        for (const [name, description] of Object.entries(REPO_DESCRIPTIONS)) {
          const res = await fetch(
            `${GATEWAY_URL}/repos/${OWNER}/${encodeURIComponent(name)}`,
            {
              method: "PATCH",
              headers: {
                Accept: "application/vnd.github+json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${lovableKey}`,
                "X-Connection-Api-Key": connectionKey,
              },
              body: JSON.stringify({ description, private: false }),
            },
          );
          results.push({ repo: name, status: res.status });
          if (!res.ok) {
            console.error(`sync failed for ${name} [${res.status}]: ${await res.text()}`);
          }
        }
        return Response.json({ results });
      },
    },
  },
});
