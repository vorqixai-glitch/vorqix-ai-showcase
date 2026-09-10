export type ExternalProject = {
  name: string;
  description: string;
  url: string;
  tags?: string[];
};

export type ExternalPlatform = {
  id: "replit" | "emergent";
  label: string;
  blurb: string;
  projects: ExternalProject[];
};

/**
 * Real, hand-supplied project links for platforms without a public listing API.
 * Add entries here and they appear on the landing page automatically.
 */
export const EXTERNAL_PLATFORMS: ExternalPlatform[] = [
  {
    id: "replit",
    label: "Replit",
    blurb: "Live prototypes and services running on Replit.",
    projects: [],
  },
  {
    id: "emergent",
    label: "Emergent",
    blurb: "Agent-built applications shipped on Emergent.",
    projects: [],
  },
];
