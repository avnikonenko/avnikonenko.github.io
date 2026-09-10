import type { LinkItem } from "./types";

export const siteConfig = {
  name: "Aleksandra Ivanova",
  title: "Computational Chemist and Scientific Software Developer",
  headline:
    "Computational chemist — molecular modeling, cheminformatics, and scientific software",
  siteUrl: import.meta.env.PUBLIC_SITE_URL ?? "https://avnikonenko.github.io",
  description:
    "Personal site of Aleksandra Ivanova, computational chemist working on molecular modeling, cheminformatics, computer-aided drug design, and reproducible scientific software.",
  location: "Olomouc, Czech Republic",
  availability:
    "Open to research, postdoctoral, pharmaceutical or biotechnology industry, and scientific-software roles in computational chemistry and drug discovery.",
  githubUsername: "avnikonenko",
  emailDisplay: "a.ivanova.contact@gmail.com",
  emailHref: "mailto:a.ivanova.contact@gmail.com",
  socialLinks: [
    {
      label: "GitHub",
      href: "https://github.com/avnikonenko",
      kind: "github",
      icon: "github",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/aleksandra-ivanova-628974242",
      kind: "profile",
      icon: "linkedin",
    },
    {
      label: "ORCID",
      href: "https://orcid.org/0000-0002-8064-7845",
      kind: "profile",
      icon: "orcid",
    },
    {
      label: "Scopus",
      href: "https://www.scopus.com/authid/detail.uri?authorId=57889776600",
      kind: "profile",
      icon: "scopus",
    },
  ] satisfies LinkItem[],
  cvPdf: "/CV_Ivanova.pdf",
  ogImage: "/icon-512.png",
};

export const navigation = [
  { label: "About", href: "/about/" },
  { label: "Experience", href: "/experience/" },
  { label: "Projects", href: "/projects/" },
  { label: "Publications", href: "/publications/" },
  { label: "Contact", href: "/contact/" },
  { label: "CV", href: siteConfig.cvPdf },
];
