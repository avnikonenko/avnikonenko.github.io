/**
 * Parses skills-cloud.md — the editable source for the home page cloud.
 * Throws on malformed input so a bad edit fails the build loudly.
 */
const SIZES: Record<string, 1 | 2 | 3> = { large: 1, medium: 2, small: 3 };

export interface CloudKeyword {
  text: string;
  tier: 1 | 2 | 3;
}

export function parseSkillsCloudDoc(markdown: string): CloudKeyword[] {
  const groups = new Map<1 | 2 | 3, string[]>();
  let tier: 1 | 2 | 3 | null = null;

  for (const rawLine of markdown.split("\n")) {
    const line = rawLine.trim();
    if (!line) continue;

    if (line.startsWith("## ")) {
      const heading = line.slice(3).trim().toLowerCase();
      const size = SIZES[heading];
      if (!size) {
        throw new Error(
          `skills-cloud.md: expected "## Large", "## Medium" or "## Small", got "${line.slice(3).trim()}".`,
        );
      }
      tier = size;
      if (!groups.has(tier)) groups.set(tier, []);
      continue;
    }

    // Bullets before the first size heading are the editing instructions.
    if (tier && line.startsWith("- ")) {
      groups.get(tier)?.push(line.slice(2).replace(/\s+/g, " ").trim());
    }
  }

  if (groups.size === 0) {
    throw new Error(
      'skills-cloud.md: no "## Large|Medium|Small" sections found.',
    );
  }

  // Interleave the groups so sizes and colours mix across the cloud.
  const lists = [1, 2, 3]
    .map((size) => groups.get(size as 1 | 2 | 3) ?? [])
    .filter((list) => list.length > 0);

  const cloud: CloudKeyword[] = [];
  for (let position = 0; ; position += 1) {
    const round = lists.filter((list) => list[position]);
    if (round.length === 0) break;
    for (const list of round) {
      const tierOf = ([1, 2, 3] as const).find(
        (size) => groups.get(size) === list,
      );
      cloud.push({ text: list[position], tier: tierOf ?? 2 });
    }
  }

  if (cloud.length === 0) {
    throw new Error("skills-cloud.md: no keywords found under the headings.");
  }

  return cloud;
}
