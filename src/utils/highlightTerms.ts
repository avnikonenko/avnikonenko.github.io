/**
 * Terms that should stand out when they appear in prose, in three categories so
 * each can carry its own colour:
 *
 *   tool    - tool and project names, matched automatically
 *   method  - key method terms, matched automatically
 *   detail  - anything wrapped in **double asterisks** in PROJECTS.md, for
 *             results and roles worth pulling out of a sentence
 *
 * Longest first within each list, so "CReM-opt" wins over "CReM".
 */
const toolNames = ["CReM-agent", "CReM-opt", "StreaMD", "EasyDock", "CReM"];

const methodTerms = [
  "de novo molecular design",
  "high-performance computing",
  "binding free-energy",
  "molecular dynamics",
  "molecular docking",
  "machine-learning",
  "QSAR modeling",
];

// Bounded by non-letters so "GenCReM" is not partially matched.
const termPattern = new RegExp(
  `(?<![A-Za-z])(${[...toolNames, ...methodTerms].join("|")})(?![A-Za-z])`,
  "g",
);

const detailPattern = /\*\*([^*]+)\*\*/g;

export type HighlightKind = "tool" | "method" | "detail";

export interface ProseSegment {
  text: string;
  kind?: HighlightKind;
}

function splitTerms(text: string): ProseSegment[] {
  return text
    .split(termPattern)
    .filter(Boolean)
    .map((part) => {
      if (toolNames.includes(part))
        return { text: part, kind: "tool" as const };
      if (methodTerms.includes(part))
        return { text: part, kind: "method" as const };
      return { text: part };
    });
}

export function splitHighlightedTerms(text: string): ProseSegment[] {
  // Split on the explicit **detail** markers first; term matching then runs
  // over the parts between them.
  return text
    .split(detailPattern)
    .flatMap((part, index) =>
      index % 2 === 1
        ? [{ text: part, kind: "detail" as const }]
        : splitTerms(part),
    )
    .filter((segment) => segment.text);
}

/** Plain text for metadata: drops the ** markers without rendering them. */
export function stripHighlightMarkers(text: string): string {
  return text.replace(detailPattern, "$1");
}
