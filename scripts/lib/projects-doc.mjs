/** Shared helpers for moving PROJECTS.md between Markdown and Word. */
import { execFile } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

const run = promisify(execFile);

export const INTRO = `# Projects

Edit the text under each heading and the site follows: the dev server reloads
and \`npm run build\` reads this file directly. Rules that keep it parseable:

- Keep every \`## Project — <slug>\` heading and its slug unchanged. The slug is
  the page URL (\`/projects/<slug>/\`); tell me separately if one should change.
- Keep the field labels (\`Title:\`, \`Short summary:\`, \`Tags:\`) and the
  \`###\` section headings as they are.
- Keep list items as \`- \` bullets; add or delete bullets freely.
- \`Tags\` and \`Software\` are comma-separated single lines.
- Links are \`- Label — URL\`. Delete the whole line to drop a link.
- Project order in this file becomes the order on the site.
- To edit in Word: \`npm run projects:docx\`, edit PROJECTS.docx, then
  \`npm run projects:from-docx\`.`;

const LIST_SECTIONS = [
  ["My role", "myRole"],
  ["Methodology", "methodology"],
  ["Results", "outputsOrValidation"],
];

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function tidy(value) {
  return value.replace(/\s+/g, " ").trim();
}

function decode(value) {
  return tidy(
    value
      .replace(/<[^>]+>/g, "")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'"),
  );
}

/** Canonical PROJECTS.md text for a parsed project list. */
export function toMarkdown(projects) {
  const out = [INTRO, ""];

  for (const project of projects) {
    out.push(`## Project — ${project.slug}`, "");
    out.push(`Title: ${project.title}`, "");
    out.push(`Short summary: ${project.shortSummary}`, "");
    out.push(`Tags: ${project.tags.join(", ")}`, "");
    out.push("### Scientific problem", "", project.scientificProblem, "");
    out.push("### Motivation", "", project.motivation, "");

    for (const [heading, key] of LIST_SECTIONS) {
      out.push(`### ${heading}`, "");
      for (const item of project[key]) out.push(`- ${item}`);
      out.push("");
    }

    out.push("### Software", "", project.methodsAndTechnologies.join(", "), "");
    out.push("### Links", "");
    const links = [];
    if (project.githubRepository)
      links.push(["GitHub", project.githubRepository]);
    if (project.documentationLink)
      links.push(["Documentation", project.documentationLink]);
    for (const link of project.publicationLinks)
      links.push([link.label, link.href]);
    if (links.length === 0) links.push(["(none)", ""]);
    for (const [label, href] of links)
      out.push(href ? `- ${label} — ${href}` : `- ${label}`);
    out.push("");
  }

  return `${out
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trimEnd()}\n`;
}

/** Minimal Markdown-to-HTML for the shapes this document uses. */
export function markdownToHtml(markdown) {
  const body = [];
  let list = null;

  const closeList = () => {
    if (list) {
      body.push(`<ul>${list.join("")}</ul>`);
      list = null;
    }
  };

  for (const raw of markdown.split("\n")) {
    const line = raw.trim();
    if (!line) {
      closeList();
      continue;
    }

    const inline = (value) =>
      escapeHtml(value).replace(/`([^`]+)`/g, "<i>$1</i>");

    if (line.startsWith("### ")) {
      closeList();
      body.push(`<h3>${inline(line.slice(4))}</h3>`);
    } else if (line.startsWith("## ")) {
      closeList();
      body.push(`<h2>${inline(line.slice(3))}</h2>`);
    } else if (line.startsWith("# ")) {
      closeList();
      body.push(`<h1>${inline(line.slice(2))}</h1>`);
    } else if (line.startsWith("- ")) {
      list ??= [];
      list.push(`<li>${inline(line.slice(2))}</li>`);
    } else {
      closeList();
      body.push(`<p>${inline(line)}</p>`);
    }
  }
  closeList();

  return `<!doctype html><html><head><meta charset="utf-8"><title>Projects</title></head><body>${body.join(
    "",
  )}</body></html>`;
}

async function convert(inputPath, target, extension) {
  const dir = await mkdtemp(path.join(tmpdir(), "projects-doc-"));
  try {
    await run("soffice", [
      "--headless",
      `-env:UserInstallation=file://${path.join(dir, "profile")}`,
      "--convert-to",
      target,
      "--outdir",
      dir,
      path.resolve(inputPath),
    ]);
    const produced = path.join(
      dir,
      `${path.basename(inputPath, path.extname(inputPath))}.${extension}`,
    );
    return await readFile(produced);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

/** Render Markdown to a .docx via LibreOffice. */
export async function writeDocx(markdown, destination) {
  const dir = await mkdtemp(path.join(tmpdir(), "projects-docx-"));
  try {
    const source = path.join(dir, "PROJECTS.html");
    await writeFile(source, markdownToHtml(markdown), "utf8");
    await writeFile(
      destination,
      await convert(source, "docx:MS Word 2007 XML", "docx"),
    );
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

/** Read a .docx back into project objects. */
export async function readDocx(source) {
  const html = (
    await convert(source, "html:HTML (StarWriter)", "html")
  ).toString("utf8");
  const events = [
    ...html.matchAll(/<(h1|h2|h3|li|p)\b[^>]*>([\s\S]*?)<\/\1>/gi),
  ]
    .map(([, tag, content]) => ({
      kind: tag.toLowerCase(),
      text: decode(content),
    }))
    .filter((event) => event.text);

  // Re-emit as Markdown so a single parser stays authoritative.
  const lines = [];
  for (const { kind, text } of events) {
    if (kind === "h2") lines.push("", `## ${text}`, "");
    else if (kind === "h3") lines.push("", `### ${text}`, "");
    else if (kind === "li") lines.push(`- ${text}`);
    else if (kind === "h1") lines.push("", `# ${text}`, "");
    else lines.push("", text, "");
  }
  return lines.join("\n");
}
