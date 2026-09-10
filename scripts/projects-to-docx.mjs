/**
 * PROJECTS.md -> PROJECTS.docx, for editing in Word or LibreOffice.
 *
 *   npm run projects:docx
 */
import { readFile } from "node:fs/promises";
import { writeDocx } from "./lib/projects-doc.mjs";

const source = process.argv[2] ?? "PROJECTS.md";
const destination = process.argv[3] ?? "PROJECTS.docx";

await writeDocx(await readFile(source, "utf8"), destination);
console.log(`Wrote ${destination} from ${source}.`);
