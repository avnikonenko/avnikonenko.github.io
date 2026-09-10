# Projects

Edit the text under each heading and the site follows: the dev server reloads
and `npm run build` reads this file directly. Rules that keep it parseable:

- Keep every `## Project — <slug>` heading and its slug unchanged. The slug is
  the page URL (`/projects/<slug>/`); tell me separately if one should change.
- Keep the field labels (`Title:`, `Short summary:`, `Tags:`) and the
  `###` section headings as they are.
- Keep list items as `- ` bullets; add or delete bullets freely.
- `Tags` and `Software` are comma-separated single lines.
- Links are `- Label — URL`. Delete the whole line to drop a link.
- Project order in this file becomes the order on the site.
- To edit in Word: `npm run projects:docx`, edit PROJECTS.docx, then
  `npm run projects:from-docx`.

## Project — crem-agent

Title: CReM-agent

Short summary: Autonomous, agent-driven molecular optimization framework powered by CReM and molecular docking.

Tags: AI agents, de novo design, CReM, docking

### Scientific problem

Molecular optimization campaigns involve repeated decisions about which transformations to try next, which are usually made by hand and rarely recorded in a reviewable form.

### Motivation

CReM-agent delegates those decisions to an agent that plans transformation and docking cycles, so the search strategy itself becomes explicit, logged, and reproducible.

### My role

- Lead developer of the agent-driven optimization framework.
- Designed the agent-tool interface between the language model, CReM transformations, and docking.

### Methodology

- Agent-planned cycles of CReM fragment replacement and docking evaluation.
- Structured agent-tool communication with logged intermediate decisions.
- Cheminformatics filtering and prioritization of generated molecules.

### Results

- Manuscript in preparation.

### Software

Python, RDKit, CReM, AutoDock Vina, hosted and local LLMs

### Links

- (none)

## Project — streamd

Title: StreaMD

Short summary: Open-source toolkit for automated setup, execution, and analysis of high-throughput molecular dynamics simulations.

Tags: molecular dynamics, GROMACS, workflow automation, HPC, protein-ligand analysis

### Scientific problem

Protein-ligand molecular dynamics studies require many manual setup and analysis steps, which introduce avoidable errors and make reproduction difficult across systems, ligands, and computing environments.

### Motivation

StreaMD reduces repetitive manual work, keeps simulation protocols consistent, and produces analysis output that can be reviewed across many protein-ligand systems.

### My role

- Lead developer: designed and maintained the workflow for automated molecular dynamics setup, execution, restart handling, and analysis.
- Integrated ligand and cofactor preparation, GROMACS simulation stages, protein-ligand interaction analysis, and endpoint free-energy calculations.
- First author of the accompanying Journal of Cheminformatics publication.

### Methodology

- Ligand, cofactor, protein, and simulation-system preparation.
- Minimization, equilibration, and production stages using GROMACS.
- RMSD, RMSF, radius of gyration, and protein-ligand interaction analysis.
- ProLIF integration for interaction fingerprints and reporting.
- MM/GBSA and MM/PBSA endpoint free-energy calculations where appropriate.
- Checkpoint-based restarts, multi-replica execution, and distributed or HPC execution.

### Results

- Automated simulation directories and checkpoint-aware execution.
- Reproducible analysis tables and plots for simulation stability and protein-ligand interactions.
- Published in Journal of Cheminformatics (2024).

### Software

Python, GROMACS, AmberTools, MDAnalysis, ProLIF, gmx_MMPBSA, Dask, PBS, SLURM

### Links

- GitHub — https://github.com/ci-lab-cz/streamd
- Journal of Cheminformatics (2024) — https://doi.org/10.1186/s13321-024-00918-w

## Project — crem-opt

Title: CReM-opt

Short summary: Docking-guided molecular optimization framework combining CReM fragment replacement, a genetic algorithm, and atom-wise docking score attribution.

Tags: de novo design, CReM, RDKit, docking, CACHE

### Scientific problem

Structure-based molecule generation has to balance chemical transformations, scaffold constraints, docking hypotheses, and practical filtering without overstating the reliability of scoring functions.

### Motivation

The framework supports prospective molecular design by combining fragment-based transformations with docking and cheminformatics filters, while keeping intermediate decisions inspectable and explainable.

### My role

- Developed the optimization workflow: fragment expansion and decoration, scaffold-aware optimization, docking, and molecular filtering.
- Implemented atom-wise docking score attribution to make optimization decisions explainable.
- Applied the workflow to prospective design in CACHE Challenge #1.

### Methodology

- Fragment-based molecular transformations using CReM.
- Genetic-algorithm optimization loops with an AI agent in the loop.
- AutoDock Vina or Gnina docking for structure-based scoring and pose hypotheses.
- Scaffold protection, fragment expansion, decoration, and iterative filtering.
- Atom-wise attribution of docking scores across optimization cycles.
- Cheminformatics filtering, diversity analysis, and prioritization.

### Results

- Applied in CACHE Challenge #1 on the WDR domain of LRRK2, where the team placed third.
- Presented as a talk at the RDKit User Group Meeting 2025 in Prague.
- Poster Award at the 12th International Conference on Chemical Structures (2022).
- Docking and cheminformatics output is treated as hypotheses for prioritization, not proof of activity.

### Software

Python, RDKit, CReM, AutoDock Vina, Gnina, pandas, NumPy

### Links

- GitHub — https://github.com/ci-lab-cz/crem-opt
- CACHE Challenge #1 (J. Chem. Inf. Model., 2024) — https://doi.org/10.1021/acs.jcim.4c01267

## Project — mil-qsar-conformers

Title: MIL-based QSAR modeling

Short summary: Conformer-based multi-instance learning approach for molecular activity prediction, with automated collection of activity-cliff datasets.

Tags: QSAR, conformers, multi-instance learning, 3D pharmacophores, RDKit

### Scientific problem

A single 2D molecular representation can miss conformation-dependent pharmacophore patterns, but naively adding 3D conformers also adds noise and computational cost.

### Motivation

The work evaluates whether chirality-aware three-dimensional pharmacophore descriptors and multi-instance learning capture useful conformational signal in QSAR classification.

### My role

- Developed and evaluated conformational-ensemble representations for QSAR classification.
- Automated the collection of activity-cliff datasets, including stereoisomers with differential biological activity.
- First author of the Molecular Informatics publication; contributed dataset curation and docking to a related study.

### Methodology

- Conformer ensemble generation and curation.
- Chirality-aware three-dimensional pharmacophore quadruplet descriptors.
- MIL-max and MIL-k-means representations.
- QSAR classification, model evaluation, and comparison with 2D fingerprints.

### Results

- Benchmarking of conformational-ensemble representations against 2D baselines.
- Dataset-specific analysis of when 3D descriptors provide useful signal.
- Published in Molecular Informatics (2021) and, as a related study, in J. Chem. Inf. Model. (2021).

### Software

Python, RDKit, scikit-learn, NumPy, pandas, Matplotlib

### Links

- Molecular Informatics (2021) — https://doi.org/10.1002/minf.202060030
- J. Chem. Inf. Model. (2021) — https://doi.org/10.1021/acs.jcim.1c00692

## Project — chembl-datasets-collection

Title: ChEMBL datasets collection

Short summary: Automated pipeline for retrieving and preprocessing bioactivity datasets from ChEMBL for specific activity types.

Tags: cheminformatics, data curation, ChEMBL, QSAR

### Scientific problem

Assembling comparable bioactivity datasets from ChEMBL requires consistent filtering by activity type, assay, and data quality.

### Motivation

The pipeline makes dataset assembly repeatable, so QSAR experiments can be rerun on freshly extracted data.

### My role

- Developed the retrieval and preprocessing pipeline.
- Implemented filtering tailored to activity types such as agonists, antagonists, and inverse agonists.

### Methodology

- Programmatic extraction from the ChEMBL database.
- Activity-type-specific filtering and unit normalization.
- Structure standardization and quality control of assembled datasets.

### Results

- Reproducible bioactivity datasets used for QSAR modeling experiments.

### Software

Python, RDKit, pandas, SQL

### Links

- GitHub — https://github.com/avnikonenko/ChEMBL-Datasets-Collection

## Project — hpc-stats-scripts

Title: HPC stats scripts

Short summary: Utilities for monitoring SLURM and PBS job efficiency and CPU, GPU, and memory usage in HPC environments.

Tags: HPC, SLURM, PBS, tooling

### Scientific problem

Long simulation campaigns waste allocation when jobs request resources they never use, and scheduler accounting output is not easy to read.

### Motivation

The scripts summarize job efficiency so simulation requests can be sized from measured usage rather than habit.

### My role

- Developed the monitoring and reporting utilities.

### Methodology

- Collection of scheduler accounting data from SLURM and PBS.
- Aggregation of CPU, GPU, and memory utilization per job.
- Reporting of job efficiency for review.

### Results

- Job efficiency summaries used to size simulation resource requests.

### Software

Python, Bash, SLURM, PBS

### Links

- GitHub — https://github.com/avnikonenko/hpc-stats-scripts

## Project — cache-challenge-1

Title: CACHE Challenge #1

Short summary: Docking-guided de novo molecule generation and MD-based evaluation of hits for the WDR domain of LRRK2; the team placed third.

Tags: CACHE, de novo design, LRRK2, docking, molecular dynamics

### Scientific problem

The WDR domain of LRRK2, a Parkinson's disease associated protein, is a difficult target with no established small-molecule chemical probe, which makes prospective hit finding a genuine test of computational methods.

### Motivation

CACHE is a blinded benchmark: participants submit predictions that are then synthesized and assayed by the organizers, so the challenge measures prospective performance rather than retrospective enrichment.

### My role

- Developed and applied a docking-guided de novo molecule generation workflow using CReM-opt.
- Performed molecular dynamics evaluation of the identified hits.
- Co-author of the collaborative challenge publication in J. Chem. Inf. Model. (2024).

### Methodology

- De novo generation with CReM fragment replacement under docking guidance.
- Docking-based prioritization of generated molecules.
- Molecular dynamics simulations to assess the stability of predicted binding modes.
- Cheminformatics filtering before submission.

### Results

- Third place as a team, with hits carried through experimental validation by the challenge organizers.
- Results published as part of the collaborative CACHE Challenge #1 report (2024).

### Software

Python, RDKit, CReM, AutoDock Vina, GROMACS, MDAnalysis

### Links

- CACHE Challenge #1 (J. Chem. Inf. Model., 2024) — https://doi.org/10.1021/acs.jcim.4c01267

## Project — tubulin-sar-studies

Title: Tubulin inhibitor SAR studies

Short summary: Computational chemistry support for collaborative medicinal chemistry studies on tubulin inhibitors, colchicine-site ligands, and estradiol dimers.

Tags: molecular modeling, tubulin, protein-ligand analysis, collaboration

### Scientific problem

Interpreting structure-activity relationships in tubulin-targeting series requires binding hypotheses, interaction analysis, and parameters for chemically unusual ligands.

### Motivation

Computational evidence complements synthesis and cell-based assays by explaining which interactions plausibly drive the observed differences between analogues.

### My role

- Performed molecular docking, molecular dynamics simulations, and free-energy calculations for ligand series.
- Carried out ProLIF-based protein-ligand interaction analysis across analogues.
- Parameterized boron-containing molecules using Gaussian.
- Co-author of four publications arising from these collaborations (2021-2025).

### Methodology

- Ligand and protein preparation, docking, and pose inspection.
- Molecular dynamics simulations of selected complexes.
- Interaction fingerprint analysis and comparison across analogues.
- Quantum-chemical parameterization of non-standard ligand chemistry.

### Results

- Binding hypotheses and interaction analyses used in four peer-reviewed publications.
- Computational evidence interpreted alongside synthesis and biological evaluation by collaborators.

### Software

GROMACS, AutoDock Vina, Gnina, Glide and Maestro, ProLIF, Gaussian, PyMOL, RDKit

### Links

- Colchicine-BODIPY probes (ACS Pharmacol. Transl. Sci., 2025) — https://doi.org/10.1021/acsptsci.4c00730

## Project — easydock

Title: EasyDock

Short summary: Python-based AutoDock Vina workflow implemented as part of a scalable, customizable molecular docking tool.

Tags: docking, AutoDock Vina, workflow automation, Python

### Scientific problem

Large docking campaigns need consistent ligand preparation, reproducible execution, and result storage that survives interruption.

### Motivation

EasyDock packages docking as a scriptable, restartable workflow that scales from a laptop to an HPC queue.

### My role

- Implemented the Python-based AutoDock Vina workflow within the tool.
- Co-author of the accompanying Journal of Cheminformatics publication (2023).

### Methodology

- Automated ligand preparation and protonation handling.
- AutoDock Vina docking execution with database-backed result storage.
- Parallel and distributed execution on HPC schedulers.

### Results

- Published in Journal of Cheminformatics (2023).
- Used as the docking layer in downstream design workflows, including CReM-opt.

### Software

Python, RDKit, AutoDock Vina, SQLite, Dask

### Links

- GitHub — https://github.com/ci-lab-cz/easydock
