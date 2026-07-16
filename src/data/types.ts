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
}

export interface Project {
  slug: string;
  title: string;
  shortSummary: string;
  detailedDescription: string;
  scientificProblem: string;
  motivation: string;
  myRole: string[];
  methodology: string[];
  methodsAndTechnologies: string[];
  outputsOrValidation: string[];
  limitations: string[];
  publicationLinks: LinkItem[];
  githubRepository?: string;
  documentationLink?: string;
  conferencePresentationLink?: string;
  image?: string;
  imageAlt?: string;
  featured: boolean;
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
  field?: string[];
  bullets: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location?: string;
  start: string;
  end: string;
  thesis?: string;
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
  year: number;
  title: string;
  type: string;
  links: LinkItem[];
  note?: string;
}
