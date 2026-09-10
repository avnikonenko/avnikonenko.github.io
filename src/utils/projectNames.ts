/**
 * Tool and project names that should read as names when they appear in prose.
 * Longest first, so "CReM-opt" wins over "CReM" at the same position.
 */
const projectNames = ["CReM-agent", "CReM-opt", "StreaMD", "EasyDock", "CReM"];

// Bounded by non-letters so "GenCReM" is not partially matched.
const pattern = new RegExp(
  `(?<![A-Za-z])(${projectNames.join("|")})(?![A-Za-z])`,
  "g",
);

export interface ProseSegment {
  text: string;
  isProject: boolean;
}

export function splitProjectNames(text: string): ProseSegment[] {
  return text
    .split(pattern)
    .filter(Boolean)
    .map((part) => ({ text: part, isProject: projectNames.includes(part) }));
}
