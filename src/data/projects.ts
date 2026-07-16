import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "streamd",
    title: "StreaMD",
    shortSummary:
      "Automated workflow for molecular dynamics simulations and analysis of protein-ligand complexes.",
    detailedDescription:
      "StreaMD is presented as a reproducible GROMACS-based workflow for preparing, running, restarting, and analyzing molecular dynamics simulations of protein-ligand complexes. The project emphasizes automation, auditability, multi-replica execution, and scalable screening rather than treating any single simulation output as definitive experimental evidence.",
    scientificProblem:
      "Protein-ligand molecular dynamics studies often require many manual setup and analysis steps, which can introduce avoidable errors and make reproduction difficult across systems, ligands, and computing environments.",
    motivation:
      "The workflow is intended to reduce repetitive manual work, support consistent simulation protocols, and produce analysis outputs that can be reviewed across protein-ligand systems.",
    myRole: [
      "Developed and maintained scientific workflow code for automated molecular dynamics setup, execution, restart handling, and analysis.",
      "Integrated ligand and cofactor preparation, GROMACS simulation stages, protein-ligand interaction analysis, and endpoint free-energy calculations.",
      "Worked on reproducibility, checkpoint-based restarts, multi-replica execution, and distributed or HPC-oriented execution patterns.",
    ],
    methodology: [
      "Ligand, cofactor, protein, and simulation-system preparation.",
      "Minimization, equilibration, and production simulation stages using GROMACS.",
      "RMSD, RMSF, radius of gyration, and protein-ligand interaction analysis.",
      "ProLIF integration for interaction fingerprints and reporting.",
      "MM/GBSA and MM/PBSA calculations where appropriate for endpoint free-energy estimation.",
      "Checkpoint-based restarts and multi-replica execution.",
      "Dask, PBS, and related distributed execution support for scalable workflows.",
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
      "Apptainer [ADD OR VERIFY: exact packaging/runtime support]",
      "GitHub Actions [ADD OR VERIFY: exact CI coverage]",
    ],
    outputsOrValidation: [
      "Automated simulation directories and checkpoint-aware execution.",
      "Reproducible analysis tables and plots for simulation stability and protein-ligand interactions.",
      "Associated Journal of Cheminformatics publication, with complete citation and DOI pending verification.",
    ],
    limitations: [
      "Molecular dynamics simulations sample finite time scales and depend on force-field choices, preparation quality, and starting structures.",
      "MM/GBSA and MM/PBSA estimates are endpoint approximations and should be interpreted as decision-support signals, not direct experimental measurements.",
      "Workflow automation improves reproducibility but does not remove the need for scientific inspection of inputs, trajectories, and outliers.",
    ],
    publicationLinks: [
      {
        label: "Journal of Cheminformatics publication [ADD OR VERIFY: link]",
        href: "[ADD OR VERIFY: publication URL]",
        kind: "publication",
      },
    ],
    githubRepository: "[ADD OR VERIFY: StreaMD GitHub repository]",
    documentationLink: "[ADD OR VERIFY: StreaMD documentation link]",
    image: "/images/streamd-workflow.svg",
    imageAlt:
      "Schematic StreaMD workflow from protein-ligand input through preparation, simulation, analysis, and reports.",
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
      "Molecular optimization and de novo design workflow combining fragment-based transformations, genetic algorithms, and docking.",
    detailedDescription:
      "CReM-opt is presented as a cheminformatics and molecular-design workflow for iterative molecule generation, docking-guided prioritization, and analysis. The page intentionally marks prospective design results and challenge metrics for confirmation before publication.",
    scientificProblem:
      "Structure-based molecule generation must balance chemical transformations, scaffold constraints, docking hypotheses, and practical filtering without overstating the reliability of scoring functions.",
    motivation:
      "The workflow supports prospective molecular design by combining fragment-based transformations with docking and cheminformatics filters while keeping intermediate decisions inspectable.",
    myRole: [
      "Worked on workflow development for fragment expansion, decoration, scaffold-aware optimization, docking, and molecular filtering.",
      "Applied cheminformatics analysis to generated molecules and docking-guided optimization cycles.",
      "Contributed to prospective molecular design work connected with the CACHE challenge, with exact public metrics marked for verification.",
    ],
    methodology: [
      "Fragment-based molecular transformations using CReM.",
      "Genetic-algorithm optimization loops.",
      "AutoDock Vina or Gnina docking for structure-based scoring and pose hypotheses.",
      "Scaffold protection, fragment expansion, decoration, and iterative filtering.",
      "Explainable docking concepts and analysis of molecule-pose changes across optimization cycles.",
      "Cheminformatics-based filtering, diversity analysis, and prioritization.",
    ],
    methodsAndTechnologies: [
      "Python",
      "RDKit",
      "CReM",
      "AutoDock Vina",
      "Gnina",
      "pandas",
      "NumPy",
      "scikit-learn [ADD OR VERIFY: exact ML usage]",
    ],
    outputsOrValidation: [
      "[ADD OR VERIFY: 82 compounds synthesized.]",
      "[ADD OR VERIFY: 8 active binders.]",
      "[ADD OR VERIFY: team ranked third in a CACHE challenge involving the WDR domain of LRRK2.]",
      "Docking and cheminformatics outputs were treated as hypotheses for prioritization, not proof of activity.",
    ],
    limitations: [
      "Docking scores and generated poses are hypotheses and require experimental and medicinal chemistry review.",
      "Fragment-based transformations can create synthetically or pharmacologically unattractive molecules unless filtering and expert inspection are applied.",
      "Prospective validation metrics should be published only with exact challenge context, assay definition, and confirmed data.",
    ],
    publicationLinks: [
      {
        label: "[ADD OR VERIFY: CReM-opt publication or preprint link]",
        href: "[ADD OR VERIFY: CReM-opt publication URL]",
        kind: "publication",
      },
    ],
    githubRepository: "[ADD OR VERIFY: CReM-opt GitHub repository]",
    documentationLink: "[ADD OR VERIFY: CReM-opt documentation link]",
    conferencePresentationLink:
      "[ADD OR VERIFY: RDKit UGM or CACHE presentation link]",
    image: "/images/crem-opt-cycle.svg",
    imageAlt:
      "Schematic CReM-opt optimization cycle with seed molecules, fragment transformations, docking and filtering, and selection.",
    featured: true,
    tags: ["de novo design", "CReM", "RDKit", "docking", "CACHE"],
  },
  {
    slug: "mil-qsar-conformers",
    title: "Multiple-Instance Learning QSAR for Conformational Ensembles",
    shortSummary:
      "Research on molecular conformational ensembles represented with multiple-instance learning and three-dimensional pharmacophore descriptors.",
    detailedDescription:
      "This project investigates when three-dimensional conformational information improves QSAR classification compared with two-dimensional fingerprints. Molecules are treated as bags of conformers, and conformer-level descriptors are summarized through multiple-instance learning strategies.",
    scientificProblem:
      "A single 2D molecular representation may miss conformation-dependent pharmacophore patterns, but naively adding 3D conformers can also add noise and computational cost.",
    motivation:
      "The project evaluates whether chirality-aware three-dimensional pharmacophore descriptors and multiple-instance learning can capture useful conformational signal in QSAR classification tasks.",
    myRole: [
      "Developed and evaluated conformational-ensemble representations for QSAR classification.",
      "Compared MIL-based 3D pharmacophore approaches with two-dimensional fingerprints.",
      "Analyzed cases where three-dimensional information improved or did not improve predictive performance.",
    ],
    methodology: [
      "Conformer ensemble generation and curation.",
      "Chirality-aware three-dimensional pharmacophore quadruplet descriptors.",
      "MIL-max and MIL-k-means representations.",
      "QSAR classification and model evaluation.",
      "Comparison with two-dimensional fingerprints and analysis of dataset-dependent performance.",
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
      "[ADD OR VERIFY: associated publication, thesis chapter, or repository link.]",
    ],
    limitations: [
      "3D conformer quality and ensemble coverage strongly affect descriptor usefulness.",
      "Three-dimensional descriptors do not automatically outperform strong 2D baselines.",
      "Performance claims require dataset, split strategy, metric, and statistical context.",
    ],
    publicationLinks: [
      {
        label: "[ADD OR VERIFY: MIL-QSAR publication or thesis link]",
        href: "[ADD OR VERIFY: MIL-QSAR URL]",
        kind: "publication",
      },
    ],
    githubRepository: "[ADD OR VERIFY: MIL-QSAR repository]",
    image: "/images/mil-qsar.svg",
    imageAlt:
      "Schematic showing a molecule represented as a bag of conformers for multiple-instance learning QSAR.",
    featured: true,
    tags: [
      "QSAR",
      "conformers",
      "multiple-instance learning",
      "3D pharmacophores",
      "RDKit",
    ],
  },
  {
    slug: "molecular-modeling-studies",
    title: "Additional Molecular Modeling Studies",
    shortSummary:
      "Flexible section for structure-based computational chemistry applications and collaborations.",
    detailedDescription:
      "This page collects additional molecular modeling applications that can be expanded after publication permissions and exact details are verified. It is designed to avoid exposing unpublished confidential information.",
    scientificProblem:
      "Computational chemistry collaborations often require method selection, careful interpretation, and clear separation of publishable results from confidential or preliminary work.",
    motivation:
      "The section provides a maintainable place for tubulin and colchicine-site ligand studies, estradiol dimer projects, protein-ligand interaction analysis, and other structure-based design work once details are approved for public release.",
    myRole: [
      "Applied molecular docking, molecular dynamics, and protein-ligand interaction analysis in project-specific scientific contexts.",
      "Prepared figures, analysis summaries, and computational evidence for collaborators where appropriate.",
      "Kept unpublished or confidential details out of public summaries until approved.",
    ],
    methodology: [
      "Ligand and protein preparation.",
      "Docking and pose inspection.",
      "Molecular dynamics simulations where scientifically justified.",
      "Protein-ligand interaction analysis and comparison across analogues.",
      "Project-specific interpretation with medicinal chemistry or experimental context.",
    ],
    methodsAndTechnologies: [
      "GROMACS",
      "AutoDock Vina",
      "Gnina",
      "Glide and Maestro",
      "PyMOL",
      "Chimera or ChimeraX",
      "RDKit",
    ],
    outputsOrValidation: [
      "[ADD OR VERIFY: tubulin and colchicine-site ligand study details.]",
      "[ADD OR VERIFY: estradiol dimer project details.]",
      "[ADD OR VERIFY: public links to publications, posters, or collaborator-approved summaries.]",
    ],
    limitations: [
      "This page intentionally omits unpublished confidential information.",
      "Project-specific conclusions should be added only with verified publication or disclosure status.",
    ],
    publicationLinks: [],
    image: "/images/og-image.svg",
    imageAlt:
      "Scientific portfolio preview graphic used as a neutral placeholder.",
    featured: false,
    tags: ["molecular modeling", "collaboration", "protein-ligand analysis"],
  },
];
