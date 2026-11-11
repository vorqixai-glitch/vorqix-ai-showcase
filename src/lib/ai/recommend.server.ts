import { createOpenAI } from "@ai-sdk/openai";
import { Output, streamText } from "ai";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";

import type { Repo } from "../github.functions";
import { createLovableAiGatewayRunIdFetch, getLovableAiGatewayRunId } from "./run-id.server";

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1";
const MODEL = "openai/gpt-6-astra";

const schema = z.object({
  summary: z.string(),
  picks: z.array(z.object({ name: z.string(), reason: z.string() })),
});

export async function recommend(brief: string, repos: Repo[]) {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) throw new Error("The AI assistant is not configured yet.");

  const request = getRequest();
  const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(request));
  const provider = createOpenAI({
    baseURL: GATEWAY_URL,
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: runIdFetch.fetch,
  });

  const catalog = repos
    .map((r) => `- ${r.name} | ${r.language ?? "n/a"} | ${r.topics.join(", ")} | ${r.description ?? ""}`)
    .join("\n");

  const result = streamText({
    model: provider.responses(MODEL),
    instructions:
      "You match a visitor's project idea to existing projects in the Vorqix A.I portfolio. " +
      "Only recommend projects from the catalog, using their exact name. Pick 1-4 of the most relevant, best first. " +
      "For each, give one concise sentence on why it fits. The summary is one or two sentences addressed to the visitor. " +
      "If nothing fits well, return the closest single project and say so honestly. Reply in the visitor's language.",
    messages: [{ role: "user", content: `Catalog:\n${catalog}\n\nVisitor wants to build:\n${brief}` }],
    output: Output.object({ schema }),
    abortSignal: request.signal,
    providerOptions: {
      openai: {
        store: false,
        forceReasoning: true,
        reasoningEffort: "low",
        reasoningSummary: "auto",
        include: ["reasoning.encrypted_content"],
      },
    },
  });

  let out: z.infer<typeof schema>;
  try {
    out = await result.output;
  } catch (err: any) {
    const status = err?.statusCode ?? err?.lastError?.statusCode;
    console.error("AI recommend failed", status, err?.responseBody ?? err?.message);
    if (status === 429) throw new Error("The assistant is busy right now. Please try again in a minute.");
    if (status === 402 || status === 403) throw new Error("The assistant is temporarily unavailable.");
    throw new Error("The assistant could not respond. Please try again.");
  }

  const names = new Set(repos.map((r) => r.name));
  return { summary: out.summary, picks: out.picks.filter((p) => names.has(p.name)).slice(0, 4) };
}
