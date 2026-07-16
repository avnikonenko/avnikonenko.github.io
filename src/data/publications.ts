import type { Publication } from "./types";

export const publications: Publication[] = [
  {
    id: "streamd-jcheminf-2024",
    title: "StreaMD [ADD OR VERIFY: complete article title]",
    authors:
      "Aleksandra Ivanova; [ADD OR VERIFY: complete author list and order]",
    venue: "Journal of Cheminformatics",
    year: 2024,
    volumePages: "[ADD OR VERIFY: volume, article number, pages]",
    doi: "[ADD OR VERIFY: DOI]",
    externalUrl: "[ADD OR VERIFY: publication URL]",
    publicationType: "Software article",
    summary:
      "Software-related publication describing StreaMD, an automated workflow for molecular dynamics simulations and analysis of protein-ligand complexes. Bibliographic details must be verified before public release.",
    highlighted: true,
    associatedProject: "StreaMD",
    citationText:
      "Ivanova A. et al. StreaMD [ADD OR VERIFY: complete title]. Journal of Cheminformatics. 2024. [ADD OR VERIFY: DOI].",
    bibtex: `@article{ivanova_streamd_2024,
  title = {StreaMD [ADD OR VERIFY: complete article title]},
  author = {Ivanova, Aleksandra and [ADD OR VERIFY: complete author list]},
  journal = {Journal of Cheminformatics},
  year = {2024},
  doi = {[ADD OR VERIFY: DOI]}
}`,
  },
  {
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
  },
  {
    id: "mil-qsar-placeholder",
    title:
      "[ADD OR VERIFY: publication title for MIL-QSAR conformational ensemble work]",
    authors:
      "Aleksandra Ivanova; [ADD OR VERIFY: complete author list and order]",
    venue: "[ADD OR VERIFY: journal, conference, thesis chapter, or preprint]",
    year: 2026,
    publicationType: "Other",
    summary:
      "Placeholder for work on multiple-instance learning QSAR with conformational ensembles and chirality-aware 3D pharmacophore descriptors.",
    associatedProject:
      "Multiple-Instance Learning QSAR for Conformational Ensembles",
    citationText:
      "[ADD OR VERIFY: complete citation for MIL-QSAR conformational ensemble work.]",
  },
];
