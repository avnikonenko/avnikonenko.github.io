import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "streamd",
    title: "StreaMD",
    shortSummary:
      "Open-source toolkit for automated setup, execution, and analysis of high-throughput molecular dynamics simulations.",
    scientificProblem:
      "Protein-ligand molecular dynamics studies require many manual setup and analysis steps, which introduce avoidable errors and make reproduction difficult across systems, ligands, and computing environments.",
    motivation:
      "StreaMD reduces repetitive manual work, keeps simulation protocols consistent, and produces analysis output that can be reviewed across many protein-ligand systems.",
    myRole: [
      "Lead developer: designed and maintained the workflow for automated molecular dynamics setup, execution, restart handling, and analysis.",
      "Integrated ligand and cofactor preparation, GROMACS simulation stages, protein-ligand interaction analysis, and endpoint free-energy calculations.",
      "First author of the accompanying Journal of Cheminformatics publication.",
    ],
    methodology: [
      "Ligand, cofactor, protein, and simulation-system preparation.",
      "Minimization, equilibration, and production stages using GROMACS.",
      "RMSD, RMSF, radius of gyration, and protein-ligand interaction analysis.",
      "ProLIF integration for interaction fingerprints and reporting.",
      "MM/GBSA and MM/PBSA endpoint free-energy calculations where appropriate.",
      "Checkpoint-based restarts, multi-replica execution, and distributed or HPC execution.",
    ],
    methodsAndTechnologies: [
      "Python",
      "GROMACS",
      "AmberTools",
      "MDAnalysis",
      "ProLIF",
      "gmx_MMPBSA",
      "Dask",
      "PBS",
      "SLURM",
    ],
    outputsOrValidation: [
      "Automated simulation directories and checkpoint-aware execution.",
      "Reproducible analysis tables and plots for simulation stability and protein-ligand interactions.",
      "Published in Journal of Cheminformatics (2024).",
    ],
    limitations: [
      "Molecular dynamics samples finite time scales and depends on force-field choice, preparation quality, and starting structures.",
      "MM/GBSA and MM/PBSA estimates are endpoint approximations and are decision-support signals, not experimental measurements.",
      "Automation improves reproducibility but does not remove the need to inspect inputs, trajectories, and outliers.",
    ],
    publicationLinks: [
      {
        label: "Journal of Cheminformatics (2024)",
        href: "https://doi.org/10.1186/s13321-024-00918-w",
        kind: "publication",
      },
    ],
    githubRepository: "https://github.com/ci-lab-cz/streamd",
    featured: true,
    tags: [
      "molecular dynamics",
      "GROMACS",
      "workflow automation",
      "HPC",
      "protein-ligand analysis",
    ],
  },
  {
    slug: "crem-opt",
    title: "CReM-opt",
    shortSummary:
      "Docking-guided molecular optimization framework combining CReM fragment replacement, a genetic algorithm, and atom-wise docking score attribution.",
    scientificProblem:
      "Structure-based molecule generation has to balance chemical transformations, scaffold constraints, docking hypotheses, and practical filtering without overstating the reliability of scoring functions.",
    motivation:
      "The framework supports prospective molecular design by combining fragment-based transformations with docking and cheminformatics filters, while keeping intermediate decisions inspectable and explainable.",
    myRole: [
      "Developed the optimization workflow: fragment expansion and decoration, scaffold-aware optimization, docking, and molecular filtering.",
      "Implemented atom-wise docking score attribution to make optimization decisions explainable.",
      "Applied the workflow to prospective design in CACHE Challenge #1.",
    ],
    methodology: [
      "Fragment-based molecular transformations using CReM.",
      "Genetic-algorithm optimization loops with an AI agent in the loop.",
      "AutoDock Vina or Gnina docking for structure-based scoring and pose hypotheses.",
      "Scaffold protection, fragment expansion, decoration, and iterative filtering.",
      "Atom-wise attribution of docking scores across optimization cycles.",
      "Cheminformatics filtering, diversity analysis, and prioritization.",
    ],
    methodsAndTechnologies: [
      "Python",
      "RDKit",
      "CReM",
      "AutoDock Vina",
      "Gnina",
      "pandas",
      "NumPy",
    ],
    outputsOrValidation: [
      "Applied in CACHE Challenge #1 on the WDR domain of LRRK2, where the team placed third.",
      "Presented as a talk at the RDKit User Group Meeting 2025 in Prague.",
      "Poster Award at the 12th International Conference on Chemical Structures (2022).",
      "Docking and cheminformatics output is treated as hypotheses for prioritization, not proof of activity.",
    ],
    limitations: [
      "Docking scores and generated poses are hypotheses and require experimental and medicinal chemistry review.",
      "Fragment-based transformations can produce synthetically or pharmacologically unattractive molecules unless filtering and expert inspection are applied.",
      "The method manuscript is in preparation, so published methodological detail is currently limited.",
    ],
    publicationLinks: [
      {
        label: "CACHE Challenge #1 (J. Chem. Inf. Model., 2024)",
        href: "https://doi.org/10.1021/acs.jcim.4c01267",
        kind: "publication",
      },
    ],
    githubRepository: "https://github.com/ci-lab-cz/crem-opt",
    featured: true,
    tags: ["de novo design", "CReM", "RDKit", "docking", "CACHE"],
  },
  {
    slug: "cache-challenge-1",
    title: "CACHE Challenge #1",
    shortSummary:
      "Docking-guided de novo molecule generation and MD-based evaluation of hits for the WDR domain of LRRK2; the team placed third.",
    scientificProblem:
      "The WDR domain of LRRK2, a Parkinson's disease associated protein, is a difficult target with no established small-molecule chemical probe, which makes prospective hit finding a genuine test of computational methods.",
    motivation:
      "CACHE is a blinded benchmark: participants submit predictions that are then synthesized and assayed by the organizers, so the challenge measures prospective performance rather than retrospective enrichment.",
    myRole: [
      "Developed and applied a docking-guided de novo molecule generation workflow using CReM-opt.",
      "Performed molecular dynamics evaluation of the identified hits.",
      "Co-author of the collaborative challenge publication in J. Chem. Inf. Model. (2024).",
    ],
    methodology: [
      "De novo generation with CReM fragment replacement under docking guidance.",
      "Docking-based prioritization of generated molecules.",
      "Molecular dynamics simulations to assess the stability of predicted binding modes.",
      "Cheminformatics filtering before submission.",
    ],
    methodsAndTechnologies: [
      "Python",
      "RDKit",
      "CReM",
      "AutoDock Vina",
      "GROMACS",
      "MDAnalysis",
    ],
    outputsOrValidation: [
      "Third place as a team, with hits carried through experimental validation by the challenge organizers.",
      "Results published as part of the collaborative CACHE Challenge #1 report (2024).",
    ],
    limitations: [
      "Prospective hit rates in a blinded challenge depend on the target, the assay, and the compound selection made by the organizers.",
      "Docking and simulation evidence supported prioritization; binding was established experimentally, not computationally.",
    ],
    publicationLinks: [
      {
        label: "CACHE Challenge #1 (J. Chem. Inf. Model., 2024)",
        href: "https://doi.org/10.1021/acs.jcim.4c01267",
        kind: "publication",
      },
    ],
    featured: true,
    tags: ["CACHE", "de novo design", "LRRK2", "docking", "molecular dynamics"],
  },
  {
    slug: "crem-agent",
    title: "CReM-agent",
    shortSummary:
      "Autonomous, agent-driven molecular optimization framework powered by CReM and molecular docking.",
    scientificProblem:
      "Molecular optimization campaigns involve repeated decisions about which transformations to try next, which are usually made by hand and rarely recorded in a reviewable form.",
    motivation:
      "CReM-agent delegates those decisions to an agent that plans transformation and docking cycles, so the search strategy itself becomes explicit, logged, and reproducible.",
    myRole: [
      "Lead developer of the agent-driven optimization framework.",
      "Designed the agent-tool interface between the language model, CReM transformations, and docking.",
    ],
    methodology: [
      "Agent-planned cycles of CReM fragment replacement and docking evaluation.",
      "Structured agent-tool communication with logged intermediate decisions.",
      "Cheminformatics filtering and prioritization of generated molecules.",
    ],
    methodsAndTechnologies: [
      "Python",
      "RDKit",
      "CReM",
      "AutoDock Vina",
      "hosted and local LLMs",
    ],
    outputsOrValidation: ["Manuscript in preparation."],
    limitations: [
      "Work in progress; no public code release or publication yet.",
      "Agent-driven search inherits the limitations of the underlying docking scores.",
    ],
    publicationLinks: [],
    featured: true,
    tags: ["AI agents", "de novo design", "CReM", "docking"],
  },
  {
    slug: "mil-qsar-conformers",
    title: "MIL-based QSAR modeling",
    shortSummary:
      "Conformer-based multi-instance learning approach for molecular activity prediction, with automated collection of activity-cliff datasets.",
    scientificProblem:
      "A single 2D molecular representation can miss conformation-dependent pharmacophore patterns, but naively adding 3D conformers also adds noise and computational cost.",
    motivation:
      "The work evaluates whether chirality-aware three-dimensional pharmacophore descriptors and multi-instance learning capture useful conformational signal in QSAR classification.",
    myRole: [
      "Developed and evaluated conformational-ensemble representations for QSAR classification.",
      "Automated the collection of activity-cliff datasets, including stereoisomers with differential biological activity.",
      "First author of the Molecular Informatics publication; contributed dataset curation and docking to a related study.",
    ],
    methodology: [
      "Conformer ensemble generation and curation.",
      "Chirality-aware three-dimensional pharmacophore quadruplet descriptors.",
      "MIL-max and MIL-k-means representations.",
      "QSAR classification, model evaluation, and comparison with 2D fingerprints.",
    ],
    methodsAndTechnologies: [
      "Python",
      "RDKit",
      "scikit-learn",
      "NumPy",
      "pandas",
      "Matplotlib",
    ],
    outputsOrValidation: [
      "Benchmarking of conformational-ensemble representations against 2D baselines.",
      "Dataset-specific analysis of when 3D descriptors provide useful signal.",
      "Published in Molecular Informatics (2021) and, as a related study, in J. Chem. Inf. Model. (2021).",
    ],
    limitations: [
      "Conformer quality and ensemble coverage strongly affect descriptor usefulness.",
      "Three-dimensional descriptors do not automatically outperform strong 2D baselines.",
      "Performance claims require dataset, split strategy, metric, and statistical context.",
    ],
    publicationLinks: [
      {
        label: "Molecular Informatics (2021)",
        href: "https://doi.org/10.1002/minf.202060030",
        kind: "publication",
      },
      {
        label: "J. Chem. Inf. Model. (2021)",
        href: "https://doi.org/10.1021/acs.jcim.1c00692",
        kind: "publication",
      },
    ],
    featured: true,
    tags: [
      "QSAR",
      "conformers",
      "multi-instance learning",
      "3D pharmacophores",
      "RDKit",
    ],
  },
  {
    slug: "tubulin-sar-studies",
    title: "Tubulin inhibitor SAR studies",
    shortSummary:
      "Computational chemistry support for collaborative medicinal chemistry studies on tubulin inhibitors, colchicine-site ligands, and estradiol dimers.",
    scientificProblem:
      "Interpreting structure-activity relationships in tubulin-targeting series requires binding hypotheses, interaction analysis, and parameters for chemically unusual ligands.",
    motivation:
      "Computational evidence complements synthesis and cell-based assays by explaining which interactions plausibly drive the observed differences between analogues.",
    myRole: [
      "Performed molecular docking, molecular dynamics simulations, and free-energy calculations for ligand series.",
      "Carried out ProLIF-based protein-ligand interaction analysis across analogues.",
      "Parameterized boron-containing molecules using Gaussian.",
      "Co-author of four publications arising from these collaborations (2021-2025).",
    ],
    methodology: [
      "Ligand and protein preparation, docking, and pose inspection.",
      "Molecular dynamics simulations of selected complexes.",
      "Interaction fingerprint analysis and comparison across analogues.",
      "Quantum-chemical parameterization of non-standard ligand chemistry.",
    ],
    methodsAndTechnologies: [
      "GROMACS",
      "AutoDock Vina",
      "Gnina",
      "Glide and Maestro",
      "ProLIF",
      "Gaussian",
      "PyMOL",
      "RDKit",
    ],
    outputsOrValidation: [
      "Binding hypotheses and interaction analyses used in four peer-reviewed publications.",
      "Computational evidence interpreted alongside synthesis and biological evaluation by collaborators.",
    ],
    limitations: [
      "Conclusions are tied to the specific ligand series and assays reported in each publication.",
      "Unpublished collaborative detail is intentionally omitted.",
    ],
    publicationLinks: [
      {
        label: "Colchicine-BODIPY probes (ACS Pharmacol. Transl. Sci., 2025)",
        href: "https://doi.org/10.1021/acsptsci.4c00730",
        kind: "publication",
      },
    ],
    featured: false,
    tags: [
      "molecular modeling",
      "tubulin",
      "protein-ligand analysis",
      "collaboration",
    ],
  },
  {
    slug: "easydock",
    title: "EasyDock",
    shortSummary:
      "Python-based AutoDock Vina workflow implemented as part of a scalable, customizable molecular docking tool.",
    scientificProblem:
      "Large docking campaigns need consistent ligand preparation, reproducible execution, and result storage that survives interruption.",
    motivation:
      "EasyDock packages docking as a scriptable, restartable workflow that scales from a laptop to an HPC queue.",
    myRole: [
      "Implemented the Python-based AutoDock Vina workflow within the tool.",
      "Co-author of the accompanying Journal of Cheminformatics publication (2023).",
    ],
    methodology: [
      "Automated ligand preparation and protonation handling.",
      "AutoDock Vina docking execution with database-backed result storage.",
      "Parallel and distributed execution on HPC schedulers.",
    ],
    methodsAndTechnologies: [
      "Python",
      "RDKit",
      "AutoDock Vina",
      "SQLite",
      "Dask",
    ],
    outputsOrValidation: [
      "Published in Journal of Cheminformatics (2023).",
      "Used as the docking layer in downstream design workflows, including CReM-opt.",
    ],
    limitations: [
      "Docking scores rank hypotheses; they do not quantify binding affinity.",
      "Result quality depends on receptor preparation and binding-site definition.",
    ],
    publicationLinks: [],
    githubRepository: "https://github.com/ci-lab-cz/easydock",
    featured: false,
    tags: ["docking", "AutoDock Vina", "workflow automation", "Python"],
  },
  {
    slug: "chembl-datasets-collection",
    title: "ChEMBL datasets collection",
    shortSummary:
      "Automated pipeline for retrieving and preprocessing bioactivity datasets from ChEMBL for specific activity types.",
    scientificProblem:
      "Assembling comparable bioactivity datasets from ChEMBL requires consistent filtering by activity type, assay, and data quality.",
    motivation:
      "The pipeline makes dataset assembly repeatable, so QSAR experiments can be rerun on freshly extracted data.",
    myRole: [
      "Developed the retrieval and preprocessing pipeline.",
      "Implemented filtering tailored to activity types such as agonists, antagonists, and inverse agonists.",
    ],
    methodology: [
      "Programmatic extraction from the ChEMBL database.",
      "Activity-type-specific filtering and unit normalization.",
      "Structure standardization and quality control of assembled datasets.",
    ],
    methodsAndTechnologies: ["Python", "RDKit", "pandas", "SQL"],
    outputsOrValidation: [
      "Reproducible bioactivity datasets used for QSAR modeling experiments.",
    ],
    limitations: [
      "Data quality is bounded by the underlying ChEMBL annotations and assay heterogeneity.",
    ],
    publicationLinks: [],
    githubRepository:
      "https://github.com/avnikonenko/ChEMBL-Datasets-Collection",
    featured: false,
    tags: ["cheminformatics", "data curation", "ChEMBL", "QSAR"],
  },
  {
    slug: "hpc-stats-scripts",
    title: "HPC stats scripts",
    shortSummary:
      "Utilities for monitoring SLURM and PBS job efficiency and CPU, GPU, and memory usage in HPC environments.",
    scientificProblem:
      "Long simulation campaigns waste allocation when jobs request resources they never use, and scheduler accounting output is not easy to read.",
    motivation:
      "The scripts summarize job efficiency so simulation requests can be sized from measured usage rather than habit.",
    myRole: ["Developed the monitoring and reporting utilities."],
    methodology: [
      "Collection of scheduler accounting data from SLURM and PBS.",
      "Aggregation of CPU, GPU, and memory utilization per job.",
      "Reporting of job efficiency for review.",
    ],
    methodsAndTechnologies: ["Python", "Bash", "SLURM", "PBS"],
    outputsOrValidation: [
      "Job efficiency summaries used to size simulation resource requests.",
    ],
    limitations: [
      "Depends on the accounting data the scheduler exposes on a given cluster.",
    ],
    publicationLinks: [],
    githubRepository: "https://github.com/avnikonenko/hpc-stats-scripts",
    featured: false,
    tags: ["HPC", "SLURM", "PBS", "tooling"],
  },
];
