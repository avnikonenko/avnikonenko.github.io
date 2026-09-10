import cloudDoc from "../../skills-cloud.md?raw";
import { parseSkillsCloudDoc, type CloudKeyword } from "@utils/skillsCloudDoc";

/**
 * The home page cloud is generated from skills-cloud.md. Edit that file and
 * the site follows — the dev server reloads and the build reads it directly.
 */
export const skillsCloud: CloudKeyword[] = parseSkillsCloudDoc(cloudDoc);
