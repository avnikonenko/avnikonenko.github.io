import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const inputPath = path.resolve("src/data/bibliography/refs.bib");
const outputPath = path.resolve("src/data/publications.ts");

const projectByKey = new Map([
  ["streamd_2024", "StreaMD"],
  ["cache_2024", "CReM-opt"],
  [
    "MIL_Nikonenko",
    "Multiple-Instance Learning QSAR for Conformational Ensembles",
  ],
  [
    "zankov-2021",
    "Multiple-Instance Learning QSAR for Conformational Ensembles",
  ],
]);

const summaryByKey = new Map([
  [
    "streamd_2024",
    "Software publication describing StreaMD, a toolkit for high-throughput molecular dynamics simulations.",
  ],
  [
    "cache_2024",
    "Collaborative CACHE Challenge publication on prospective molecular design for the WDR domain of LRRK2.",
  ],
  [
    "MIL_Nikonenko",
    "Publication related to multiple conformer descriptors for QSAR modeling.",
  ],
  [
    "zankov-2021",
    "Publication on QSAR modeling based on conformation ensembles using a multi-instance learning approach.",
  ],
]);

const highlightedKeys = new Set(["streamd_2024", "zankov-2021"]);
const softwareKeys = new Set(["streamd_2024", "easydock_2023"]);

function readEntries(source) {
  const entries = [];
  let index = 0;

  while (index < source.length) {
    const at = source.indexOf("@", index);
    if (at === -1) break;

    const open = source.indexOf("{", at);
    if (open === -1) break;

    let depth = 0;
    let end = open;
    for (; end < source.length; end += 1) {
      const char = source[end];
      if (char === "{") depth += 1;
      if (char === "}") depth -= 1;
      if (depth === 0) {
        end += 1;
        break;
      }
    }

    entries.push(source.slice(at, end));
    index = end;
  }

  return entries;
}

function parseEntry(raw) {
  const header = raw.match(/^@(\w+)\s*\{\s*([^,]+)\s*,/s);
  if (!header) return null;

  const [, type, key] = header;
  const fieldsText = raw.slice(header[0].length, raw.lastIndexOf("}"));
  const fields = {};
  let index = 0;

  while (index < fieldsText.length) {
    const nameMatch = fieldsText
      .slice(index)
      .match(/^\s*,?\s*([A-Za-z][A-Za-z0-9_-]*)\s*=/);
    if (!nameMatch) break;

    const name = nameMatch[1].toLowerCase();
    index += nameMatch[0].length;

    while (/\s/.test(fieldsText[index] ?? "")) index += 1;

    let value = "";
    if (fieldsText[index] === "{") {
      let depth = 0;
      let start = index + 1;
      index += 1;
      for (; index < fieldsText.length; index += 1) {
        const char = fieldsText[index];
        if (char === "{") depth += 1;
        if (char === "}") {
          if (depth === 0) {
            value = fieldsText.slice(start, index);
            index += 1;
            break;
          }
          depth -= 1;
        }
      }
    } else if (fieldsText[index] === '"') {
      const start = index + 1;
      index += 1;
      for (; index < fieldsText.length; index += 1) {
        if (fieldsText[index] === '"' && fieldsText[index - 1] !== "\\") {
          value = fieldsText.slice(start, index);
          index += 1;
          break;
        }
      }
    } else {
      const start = index;
      while (index < fieldsText.length && fieldsText[index] !== ",") index += 1;
      value = fieldsText.slice(start, index);
    }

    fields[name] = clean(value);
  }

  return {
    type: type.toLowerCase(),
    key: key.trim(),
    fields,
    raw: normalizeRaw(raw),
  };
}

function clean(value) {
  return value
    .replace(/[{}]/g, "")
    .replace(/\\#/g, "#")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeRaw(raw) {
  return raw.trim().replace(/\n{2,}/g, "\n");
}

function formatAuthors(authorField) {
  if (!authorField) return "[ADD OR VERIFY: author list]";

  return authorField
    .split(/\s+and\s+/i)
    .map((author) => author.trim().replace(/\s+/g, " "))
    .filter(Boolean)
    .map((author) => {
      const parts = author
        .split(",")
        .map((part) => part.trim())
        .filter(Boolean);
      if (parts.length >= 2) return `${parts.slice(1).join(" ")} ${parts[0]}`;
      return author;
    })
    .join("; ");
}

function formatVolumePages(fields) {
  const parts = [];
  if (fields.volume) parts.push(`vol. ${fields.volume}`);
  if (fields.number) parts.push(`no. ${fields.number}`);
  if (fields.pages) parts.push(`pp. ${fields.pages}`);
  return parts.join(", ") || undefined;
}

function citationFor(publication) {
  const parts = [
    publication.authors,
    publication.title,
    publication.venue,
    publication.volumePages,
    String(publication.year),
    publication.doi ? `doi:${publication.doi}` : undefined,
  ].filter(Boolean);

  return parts.join(". ") + ".";
}

function toPublication(entry) {
  const { key, fields, raw } = entry;
  const year = Number.parseInt(fields.year, 10);
  const publication = {
    id: key,
    title: fields.title ?? `[ADD OR VERIFY: title for ${key}]`,
    authors: formatAuthors(fields.author),
    venue:
      fields.journal ??
      fields.booktitle ??
      fields.publisher ??
      "[ADD OR VERIFY: venue]",
    year: Number.isFinite(year) ? year : 0,
    volumePages: formatVolumePages(fields),
    doi: fields.doi,
    externalUrl:
      fields.url ?? (fields.doi ? `https://doi.org/${fields.doi}` : undefined),
    publicationType: softwareKeys.has(key)
      ? "Software article"
      : "Journal article",
    summary: summaryByKey.get(key),
    highlighted: highlightedKeys.has(key) || undefined,
    associatedProject: projectByKey.get(key),
    bibtex: raw,
  };

  publication.citationText = citationFor(publication);
  return publication;
}

function stringifyPublication(publication) {
  const lines = ["  {"];
  for (const [key, value] of Object.entries(publication)) {
    if (value === undefined || value === "") continue;
    lines.push(`    ${key}: ${JSON.stringify(value)},`);
  }
  lines.push("  }");
  return lines.join("\n");
}

const bibtex = readFileSync(inputPath, "utf8");
const publications = readEntries(bibtex)
  .map(parseEntry)
  .filter(Boolean)
  .map(toPublication);

publications.push({
  id: "phd-thesis-2026",
  title:
    "From molecular conformation to biological activity: computational methods for the design of small molecules",
  authors: "Aleksandra Ivanova",
  venue: "Ph.D. thesis, Palacký University Olomouc",
  year: 2026,
  publicationType: "Thesis",
  summary:
    "Doctoral thesis on computational methods connecting molecular conformation and biological activity in small-molecule design.",
  highlighted: true,
  citationText:
    "Ivanova A. From molecular conformation to biological activity: computational methods for the design of small molecules. Ph.D. thesis, Palacký University Olomouc, 2026.",
});

publications.sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));

const output = `import type { Publication } from "./types";

// Generated from src/data/bibliography/refs.bib by scripts/import-publications.mjs.
// Edit the BibTeX source and rerun \`npm run import:publications\`.
export const publications: Publication[] = [
${publications.map(stringifyPublication).join(",\n")}
];
`;

writeFileSync(outputPath, output);
console.log(
  `Wrote ${publications.length} publications to ${path.relative(process.cwd(), outputPath)}.`,
);
