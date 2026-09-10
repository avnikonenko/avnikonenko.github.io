import projectsDoc from "../../PROJECTS.md?raw";
import type { Project } from "./types";
import { parseProjectsDoc } from "@utils/projectsDoc";

/**
 * The project pages are generated from PROJECTS.md. Edit that file (or edit
 * PROJECTS.docx and run `npm run projects:from-docx`) and the site follows —
 * the dev server reloads and the build reads it directly.
 */
export const projects: Project[] = parseProjectsDoc(projectsDoc);
