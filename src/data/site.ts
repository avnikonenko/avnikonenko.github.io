import type { LinkItem } from "./types";

export const siteConfig = {
  name: "Aleksandra Ivanova",
  title: "Computational Chemist and Scientific Software Developer",
  headline:
    "Computational Chemist | Molecular Modeling, Cheminformatics and Scientific Software Development",
  siteUrl: import.meta.env.PUBLIC_SITE_URL ?? "https://avnikonenko.github.io",
  description:
    "Academic and scientific portfolio for Aleksandra Ivanova, a computational chemist focused on molecular modeling, cheminformatics, computer-aided drug design, and reproducible scientific software.",
  location: "Czech Republic [ADD OR VERIFY: preferred public location]",
  availability:
    "Open to appropriate research, postdoctoral, pharmaceutical or biotechnology industry, and scientific-software opportunities; open for relocation [ADD OR VERIFY: availability statement].",
  githubUsername: "avnikonenko",
  emailDisplay: "[ADD OR VERIFY: professional email]",
  emailHref: "",
  socialLinks: [
    { label: "GitHub", href: "https://github.com/avnikonenko", kind: "github" },
    {
      label: "LinkedIn",
      href: "[ADD OR VERIFY: LinkedIn URL]",
      kind: "profile",
    },
    {
      label: "Google Scholar",
      href: "[ADD OR VERIFY: Google Scholar URL]",
      kind: "profile",
    },
    { label: "ORCID", href: "[ADD OR VERIFY: ORCID URL]", kind: "profile" },
  ] satisfies LinkItem[],
  cvPdf: "/Aleksandra_Ivanova_CV.pdf",
  ogImage: "/images/og-image.svg",
};

export const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about/" },
  { label: "Experience", href: "/experience/" },
  { label: "Projects", href: "/projects/" },
  { label: "Publications", href: "/publications/" },
  { label: "CV", href: "/cv/" },
  { label: "Contact", href: "/contact/" },
];
