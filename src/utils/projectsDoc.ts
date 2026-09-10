import type { Project } from "@data/types";

/**
 * Parses PROJECTS.md — the editable source of truth for the project pages.
 * Throws on malformed input so a bad edit fails the build loudly instead of
 * silently dropping content.
 */

const LIST_SECTIONS: Record<
  string,
  "myRole" | "methodology" | "outputsOrValidation"
> = {
  "my role": "myRole",
  methodology: "methodology",
  results: "outputsOrValidation",
};

type Draft = Project & {
  githubRepository?: string;
  documentationLink?: string;
};

function tidy(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

export function parseProjectsDoc(markdown: string): Project[] {
  const projects: Draft[] = [];
  let current: Draft | null = null;
  let section = "";

  for (const rawLine of markdown.split("\n")) {
    const line = rawLine.trim();
    if (!line) continue;

    if (line.startsWith("## ")) {
      const heading = line.slice(3).trim();
      const match = heading.match(/^Project\s*[—–-]\s*(\S+)$/);
      if (!match) {
        throw new Error(
          `PROJECTS.md: expected a heading like "## Project — my-slug", got "${heading}".`,
        );
      }
      current = {
        slug: match[1],
        title: "",
        shortSummary: "",
        scientificProblem: "",
        motivation: "",
        myRole: [],
        methodology: [],
        methodsAndTechnologies: [],
        outputsOrValidation: [],
        publicationLinks: [],
        tags: [],
      };
      projects.push(current);
      section = "";
      continue;
    }

    // Everything before the first project heading is editing guidance.
    if (!current) continue;

    if (line.startsWith("### ")) {
      section = line.slice(4).trim().toLowerCase();
      continue;
    }

    if (line.startsWith("- ")) {
      const item = tidy(line.slice(2));
      const listKey = LIST_SECTIONS[section];
      if (listKey) {
        current[listKey].push(item);
      } else if (section === "software") {
        current.methodsAndTechnologies.push(
          ...item.split(",").map(tidy).filter(Boolean),
        );
      } else if (section === "links") {
        if (/^\(none\)/i.test(item)) continue;
        const link = item.match(/^(.*?)\s*[—–]\s*(https?:\/\/\S+)$/);
        if (!link) {
          // A line without a URL is a plain note, e.g. "not open-source yet".
          current.linkNotes = [...(current.linkNotes ?? []), item];
          continue;
        }
        const [, label, href] = link;
        if (/^github$/i.test(label)) current.githubRepository = href;
        else if (/^documentation$/i.test(label))
          current.documentationLink = href;
        else
          current.publicationLinks.push({
            label,
            href,
            kind: "publication",
          });
      }
      continue;
    }

    const field = line.match(/^(Title|Short summary|Tags):\s*(.*)$/i);
    if (field) {
      const [, label, rest] = field;
      const value = tidy(rest);
      if (/^title$/i.test(label)) current.title = value;
      else if (/^short summary$/i.test(label)) current.shortSummary = value;
      else current.tags = value.split(",").map(tidy).filter(Boolean);
      continue;
    }

    if (section === "scientific problem")
      current.scientificProblem = [current.scientificProblem, tidy(line)]
        .filter(Boolean)
        .join(" ");
    else if (section === "motivation")
      current.motivation = [current.motivation, tidy(line)]
        .filter(Boolean)
        .join(" ");
    else if (section === "software")
      current.methodsAndTechnologies.push(
        ...tidy(line).split(",").map(tidy).filter(Boolean),
      );
  }

  if (projects.length === 0) {
    throw new Error('PROJECTS.md: no "## Project — <slug>" sections found.');
  }

  const slugs = new Set<string>();
  for (const project of projects) {
    if (slugs.has(project.slug)) {
      throw new Error(`PROJECTS.md: duplicate slug "${project.slug}".`);
    }
    slugs.add(project.slug);

    for (const field of ["title", "shortSummary"] as const) {
      if (!project[field]) {
        throw new Error(`PROJECTS.md (${project.slug}): missing ${field}.`);
      }
    }
  }

  return projects;
}
