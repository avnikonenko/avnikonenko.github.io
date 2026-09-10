import type { ExperienceItem } from "./types";

export const experience: ExperienceItem[] = [
  {
    role: "Researcher",
    organization:
      "Institute of Molecular and Translational Medicine, Palacký University Olomouc",
    location: "Olomouc, Czech Republic",
    start: "2026",
    end: "present",
    field: [
      "computational drug discovery",
      "molecular modeling",
      "scientific software development",
    ],
    bullets: [
      "Computational drug discovery research using molecular dynamics simulations, molecular docking, binding free-energy analysis, QSAR modeling, and de novo molecular design.",
      "Development of Python-based workflows and open-source tools for reproducible molecular modeling, including StreaMD and CReM-opt.",
    ],
  },
  {
    role: "Ph.D. Researcher",
    organization:
      "Institute of Molecular and Translational Medicine, Palacký University Olomouc",
    location: "Olomouc, Czech Republic",
    start: "2019",
    end: "2026",
    field: [
      "computational chemistry",
      "molecular and translational medicine",
      "small-molecule design",
    ],
    bullets: [
      "Doctoral research on computational methods linking molecular conformation to biological activity in small-molecule design, supervised by Dr. Pavel Polishchuk.",
      "Built workflow automation for simulation setup, execution, restart handling, analysis, and reporting on local and high-performance computing systems.",
      "Contributed computational chemistry support to collaborative medicinal chemistry studies, resulting in co-authored publications.",
    ],
  },
  {
    role: "Computer Scientist (part-time)",
    organization: "AI|ffinity s.r.o.",
    location: "Czech Republic",
    start: "June 2022",
    end: "December 2022",
    bullets: [
      "Curated and validated protein structure (PDB) datasets for molecular dynamics and machine-learning pipelines.",
      "Performed molecular docking using Glide.",
    ],
  },
  {
    role: "Laboratory Assistant",
    organization:
      "Laboratory of Chemistry and Biochemistry, Volgograd State University",
    location: "Volgograd, Russia",
    start: "2017",
    end: "2019",
    bullets: [
      "Supported routine experimental procedures, including sample preparation, handling of laboratory equipment, and maintenance of laboratory materials.",
    ],
  },
];
