import type { SkillGroup } from "./types";

export const skills: SkillGroup[] = [
  {
    title: "Programming",
    skills: ["Python", "Bash", "R", "Cython", "SQL", "LaTeX"],
  },
  {
    title: "Drug discovery and CADD",
    skills: [
      "molecular docking",
      "molecular dynamics simulations",
      "binding free-energy calculations (MM/GBSA, MM/PBSA, FEP, ABFE)",
      "QSAR",
      "de novo molecular design",
      "protein-ligand interaction analysis",
      "automated preprocessing and quality control of chemical datasets",
    ],
  },
  {
    title: "Modeling and cheminformatics software",
    skills: [
      "RDKit",
      "MDAnalysis",
      "ProLIF",
      "CReM",
      "GROMACS",
      "OpenMM",
      "Amber",
      "AutoDock Vina",
      "Gnina",
      "Glide and Maestro",
      "gmx_MMPBSA",
      "A3FE",
      "ChemFP",
      "Gaussian",
      "MCPB.py",
      "PyMOL",
      "Chimera",
    ],
  },
  {
    title: "Python ecosystem",
    skills: [
      "scikit-learn",
      "pandas",
      "NumPy",
      "Matplotlib",
      "Plotly",
      "Streamlit",
    ],
  },
  {
    title: "High-performance computing",
    skills: [
      "Dask",
      "PBS",
      "SLURM",
      "multiprocessing",
      "GNU parallel",
      "code performance profiling",
    ],
  },
  {
    title: "Software development",
    skills: [
      "Git and GitHub",
      "package distribution (PyPI, conda-forge)",
      "environment management (conda, venv)",
      "containerization (Docker, Apptainer)",
      "REST API design",
      "reproducible workflows",
      "unit and integration testing",
    ],
  },
  {
    title: "LLMs and AI agents",
    skills: [
      "agent-driven scientific workflows",
      "hosted and local open-source LLMs",
      "prompt design",
      "tool integration",
      "structured agent-tool communication",
    ],
  },
];
