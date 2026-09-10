/**
 * PROJECTS.docx -> PROJECTS.md, after editing in Word or LibreOffice.
 * The site reads PROJECTS.md, so this is what publishes Word edits.
 *
 *   npm run projects:from-docx
 */
import { writeFile } from "node:fs/promises";
import { readDocx, toMarkdown } from "./lib/projects-doc.mjs";
import { parseProjectsDoc } from "../src/utils/projectsDoc.ts";

const source = process.argv[2] ?? "PROJECTS.docx";
const destination = process.argv[3] ?? "PROJECTS.md";

const projects = parseProjectsDoc(await readDocx(source));
await writeFile(destination, toMarkdown(projects), "utf8");
console.log(
  `Wrote ${destination} from ${source} (${projects.length} projects: ${projects
    .map((project) => project.slug)
    .join(", ")}).`,
);
