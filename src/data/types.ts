import type { IconName } from "@utils/icons";

export type LinkKind =
  | "github"
  | "publication"
  | "documentation"
  | "package"
  | "slides"
  | "profile"
  | "email";

export interface LinkItem {
  label: string;
  href: string;
  kind?: LinkKind;
  icon?: IconName;
}

export interface Project {
  slug: string;
  title: string;
  shortSummary: string;
  scientificProblem: string;
  motivation: string;
  myRole: string[];
  methodology: string[];
  methodsAndTechnologies: string[];
  outputsOrValidation: string[];
  publicationLinks: LinkItem[];
  githubRepository?: string;
  documentationLink?: string;
  conferencePresentationLink?: string;
  tags: string[];
}

export interface Publication {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: number;
  volumePages?: string;
  doi?: string;
  externalUrl?: string;
  publicationType:
    | "Journal article"
    | "Software article"
    | "Conference abstract"
    | "Preprint"
    | "Thesis"
    | "Other";
  summary?: string;
  highlighted?: boolean;
  associatedProject?: string;
  citationText?: string;
  bibtex?: string;
}

export interface ExperienceItem {
  role: string;
  organization: string;
  location?: string;
  start: string;
  end: string;
  bullets: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location?: string;
  start: string;
  end: string;
  thesis?: string;
  thesisUrl?: string;
  status?: string;
  notes?: string[];
}

export interface SkillGroup {
  title: string;
  skills: string[];
}

export interface ConferenceItem {
  event: string;
  location: string;
  year: string;
  title: string;
  type: string;
  links: LinkItem[];
  note?: string;
}
