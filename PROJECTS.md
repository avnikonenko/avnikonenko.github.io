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
- A `Links` line without a URL is kept as a plain note.
- Wrap anything in `**double asterisks**` to highlight it as an important
  detail (results, roles). Tool and method names are highlighted automatically.
- Project order in this file becomes the order on the site.

## Project — crem-agent

Title: CReM-agent

Short summary: Agent-driven molecular optimization combining CReM transformations with molecular docking in a logged, restartable workflow.

Tags: AI agents, de novo design, CReM, docking

### Scientific problem

**Iterative molecular optimization** requires repeated choices about where and how to modify a molecule, while exhaustive scoring is computationally expensive and unconstrained optimization can lead to chemically unrealistic or synthetically unfeasible candidates.

### Motivation

**CReM-agent** explores whether a **language-model agent** can guide these choices while deterministic tools retain control of molecular generation, **docking**, validation, and run state, and **CReM** constrains transformations toward chemically reasonable and more synthetically feasible structures.

### My role

- Proposed the concept and led development of the framework.
- Designed the interface between the agent, **CReM** transformations, molecular validation, and docking.
- Integrated and deployed **local/open-source LLMs** as agent backends.
- Implemented **Bubblewrap-based isolation** to restrict agent access to the execution environment and deterministic tooling.
- Developed run-state, provenance, restart, and docking-budget logic for reproducible optimization.

### Methodology

- The agent proposes hypothesis, molecular sites, transformations, and search steps from the available molecular and docking information.
- **CReM** performs chemically constrained fragment transformations; deterministic code validates candidates and prevents duplicate evaluations.
- **Docking** provides the structure-based objective, while run state and agent actions are stored for inspection and restart.
- Supports **hosted and local LLMs**.

### Results

- **Working framework under active development and evaluation.**
- Manuscript in preparation.

### Software

Python, RDKit, CReM, EasyDock, AutoDock Vina, hosted (Claude code/Codex) and local LLMs

### Links

- not open-source project yet

## Project — streamd

Title: StreaMD

Short summary: Open-source toolkit for automated setup, execution, restart, and analysis of molecular dynamics simulations across many biomolecular complexes.

Tags: molecular dynamics, GROMACS, workflow automation, HPC, protein-ligand analysis

### Scientific problem

Running **molecular dynamics** across **thousands systems** requires repetitive preparation, execution, restart, and analysis steps that are difficult to perform consistently by hand.

### Motivation

**StreaMD** was developed to automate these technically repetitive stages without removing the scientific decisions needed to define an appropriate simulation protocol.

### My role

- Principal developer of StreaMD; developed, tested, and maintained the automated MD workflow.
- Integrated system preparation, **GROMACS** execution, restart handling, trajectory processing, **protein–ligand interaction analysis**, and **endpoint free-energy calculations**.
- First author of the Journal of Cheminformatics publication describing the toolkit.

### Methodology

- Automated preparation of proteins, ligands, cofactors, systems for **GROMACS** simulations.
- Minimization, equilibration, production MD, checkpoint-based restart, and trajectory extension.
- RMSD, RMSF, radius of gyration, trajectory fitting, and **ProLIF** interaction analysis.
- Automated **MM/GBSA** and **MM/PBSA** calculations and aggregation across complexes.
- **CPU/GPU** and distributed execution for multiple systems and replicas.

### Results

- Validated on a benchmark of 624 protein–ligand complexes
- Used as part of the prospective **CACHE Challenge #1** hit-finding workflow.
- Published in Journal of Cheminformatics (2024).
- **100+ GitHub stars**.

### Software

Python, GROMACS, AmberTools, MDAnalysis, ProLIF, gmx_MMPBSA, Dask, PBS, SLURM

### Links

- GitHub — https://github.com/ci-lab-cz/streamd
- Journal of Cheminformatics (2024) — https://doi.org/10.1186/s13321-024-00918-w

## Project — crem-opt

Title: CReM-opt

Short summary: Docking-guided **evolutionary molecular optimization** using chemically constrained **CReM** fragment replacements.

Tags: de novo design, CReM, RDKit, docking

### Scientific problem

**Structure-based optimization** must efficiently explore a large chemical space while keeping generated molecules chemically reasonable and improving a chosen optimization objective.

### Motivation

**CReM-opt** was developed for focused exploration around promising molecules, combining **CReM** transformations with **docking** and user-defined structural or physicochemical constraints.

### My role

- Developed and applied the molecular generation, evolutionary optimization, docking, and prioritization workflow.
- Added **atom-wise docking-score contribution** to support interpretation and guidance of optimization decisions.
- Applied **CReM-opt** in the prospective **CACHE Challenge #1** workflow.

### Methodology

- **CReM** fragment replacement coupled to an evolutionary population-based search.
- Docking through **EasyDock**, using Vina-family methods including **Gnina**.
- Optional physicochemical filters, **scaffold protection**, **pose-RMSD constraints**, and **protein–ligand interaction similarity**.

### Results

- Used prospectively as part of the team's **CACHE Challenge #1** hit-finding workflow.
- Presented at **RDKit UGM 2025**
- Manuscript in preparation.

### Software

Python, RDKit, CReM, EasyDock, AutoDock Vina, Gnina, pandas, NumPy

### Links

- GitHub — https://github.com/ci-lab-cz/crem-opt
- CACHE Challenge #1 (J. Chem. Inf. Model., 2024) — https://doi.org/10.1021/acs.jcim.4c01267

## Project — mil-qsar-conformers

Title: MIL-based QSAR modeling

Short summary: **Conformational-ensemble QSAR** using **multi-instance learning** and **chirality-aware 3D pharmacophore** descriptors.

Tags: QSAR, conformers, multi-instance learning, 3D pharmacophores, RDKit

### Scientific problem

Single-conformer 3D QSAR depends on choosing one molecular geometry even though the biologically relevant conformation is usually unknown.

### Motivation

The study tested whether representing each molecule by an ensemble of conformers could retain useful 3D and stereochemical information without selecting a single presumed bioactive conformation.

### My role

- Implemented the **conformational-ensemble modeling** approach and prepared and curated the **chiral/achiral** datasets.
- Built and evaluated **QSAR models**, interpreted the results, and contributed to manuscript preparation.
- Automated collection of **stereochemically sensitive activity datasets**.
- First author of the Molecular Informatics publication.

### Methodology

- Generation of conformational ensembles for each molecule.
- Chirality-aware, alignment-independent **3D pharmacophore descriptors**.
- MIL-k-means, MIL-max, and related ensemble representations.
- Comparison with **single-conformer 3D models** and strong **2D QSAR** baselines.

### Results

- Published in Molecular Informatics (2021).

### Software

Python, RDKit, pmapper, scikit-learn, NumPy, pandas, Matplotlib

### Links

- Molecular Informatics (2021) — https://doi.org/10.1002/minf.202060030
- Related J. Chem. Inf. Model. study (2021) — https://doi.org/10.1021/acs.jcim.1c00692

## Project — chembl-datasets-collection

Title: ChEMBL datasets collection

Short summary: Automated retrieval and preprocessing of **ChEMBL bioactivity data** for **QSAR** modeling.

Tags: cheminformatics, data curation, ChEMBL, QSAR

### Scientific problem

**ChEMBL** contains heterogeneous assay annotations and activity records that require consistent filtering and preprocessing before **QSAR** modeling.

### Motivation

The pipeline was built to make repeated extraction of task-specific bioactivity datasets faster and reproducible.

### My role

- Developed the data-retrieval and preprocessing pipeline.
- Implemented filtering for **specific activity modes**, including agonists, antagonists, and inverse agonists.

### Methodology

- Programmatic extraction of **ChEMBL** bioactivity records.
- **Activity-type filtering**, **structure preprocessing**, and **dataset quality control**.
- **Automatic dataset standardization** for downstream QSAR modeling.

### Results

- Produced reusable, reproducible datasets for ligand-based modeling tasks.

### Software

Python, RDKit, pandas, SQL, API

### Links

- GitHub — https://github.com/avnikonenko/ChEMBL-Datasets-Collection

## Project — hpc-stats-scripts

Title: HPC stats scripts

Short summary: Utilities for summarizing **CPU**, **GPU**, **memory**, and **efficiency** for **SLURM** and **PBS** scheduled jobs.

Tags: HPC, SLURM, PBS, tooling

### Scientific problem

Requested **HPC** resources can differ substantially from actual usage, while scheduler accounting output is cumbersome to inspect across many jobs.

### Motivation

The scripts were developed to make resource utilization easy to review when **profiling** and sizing **computational workloads**.

### My role

- Developed the monitoring and reporting utilities.

### Methodology

- Parse **SLURM** and **PBS** accounting information.
- Summarize **CPU**, **GPU**, **memory**, **runtime**, and resource-efficiency metrics.

### Results

- Provides compact utilization summaries for **profiling HPC jobs** and adjusting future resource requests.

### Software

Nvidia-ml-py3, NumPY, Matplotlib, Python, Bash, SLURM, PBS, GPU

### Links

- GitHub — https://github.com/avnikonenko/hpc-stats-scripts

## Project — cache-challenge-1

Title: CACHE Challenge #1. Team participation

Short summary: Prospective hit finding for the ligand-naive **LRRK2-WDR** domain using **de novo design**, **docking**, **molecular dynamics**, and **MM/GBSA**.

Tags: CACHE, de novo design, LRRK2, docking, molecular dynamics

### Scientific problem

**CACHE Challenge #1** asked participants to identify binders for the **WDR domain** of **LRRK2** when no known ligands and only an apo protein structure were available.

### Motivation

**The blinded challenge** provided a prospective test of computational hit-finding methods because submitted compounds were purchased and experimentally measured by the organizers.

### My role

- Developed and applied **CReM-opt** for molecular generation and local optimization.
- Applied **StreaMD** in the **MD/MM-GBSA** part of the workflow.
- Performed **Glide** docking and contributed to strategy discussions and analysis of the results.
- Co-author of the collaborative CACHE publication.

### Methodology

- **CReM-based de novo** generation and optimization of candidate molecules.
- Physicochemical and structural filtering followed by c**onsensus docking**.
- MD-based analysis and **MM/GBSA** rescoring of prioritized compounds.
- **Similarity-based search of the Enamine REAL database** to retrieve commercially accessible analogs of prioritized designs.
- Experimental testing was performed independently by the CACHE organizers.

### Results

- Our Round 1 workflow produced **8 SPR binders among 82 compounds tested**; one compound of interest was additionally supported by **19F-NMR**.
- Hit expansion produced two additional binders, with the best measured KD of 71 µM.
- The workflow was among **the third-place teams** in the aggregated **CACHE Challenge #1** ranking.

### Software

Python, RDKit, CReM, StreaMD, AutoDock Vina, Gnina, Glide, GROMACS, gmx_MMPBSA

### Links

- CACHE Challenge #1 (J. Chem. Inf. Model., 2024) — https://doi.org/10.1021/acs.jcim.4c01267

## Project — tubulin-sar-studies

Title: Tubulin inhibitor SAR studies

Short summary: **Docking**, **molecular dynamics**, and **interaction analysis** used to interpret **experimental SAR** for tubulin-targeting compound series.

Tags: molecular modeling, tubulin, protein-ligand analysis, collaboration

### Scientific problem

Understanding the experimental **SAR** of tubulin-targeting compounds required a structural explanation of how linker composition and molecular modifications affect their binding and dynamics in the colchicine-binding site.

### Motivation

The computational work was used to test plausible binding hypotheses and examine whether ligand dynamics, persistent contacts, and linker geometry could explain experimentally observed **SAR**.

### My role

- Performed **molecular docking**, **molecular dynamics** simulations, trajectory analysis, and **MM/PBSA** calculations for tubulin–ligand complexes.
- Analyzed protein–ligand interactions with **ProLIF** and interpreted the results alongside experimental activity data.
- Parameterized boron-containing colchicine–BODIPY ligands using **Gaussian-derived RESP charges**.
- Co-author of four publications arising from these collaborations.

### Methodology

- Collection and analysis of docking poses generated with **AutoDock Vina**.
- **Explicit-solvent molecular dynamics** simulations of selected complexes in **GROMACS**.
- RMSD and frame-wise protein–ligand interaction analysis with **ProLIF**, including **water-bridge analysis**.
- **MM/PBSA** calculations for selected compound series.
- **Quantum-chemical derivation of partial charges** for boron-containing ligands.

### Results

- Co-author of 4 publications

### Software

GROMACS, AmberTools, AutoDock Vina, ProLIF, gmx_MMPBSA, Gaussian, RDKit, PyMOL, Chimera

### Links

- Colchicine-BODIPY Probes: Evidence for the Involvement of Intracellular Membranes in the Targeting of Colchicine to Tubulin (ACS Pharmacol. Transl. Sci., 2025) — https://doi.org/10.1021/acsptsci.4c00730
- Click estradiol dimers with novel aromatic bridging units: synthesis and anticancer evaluation (J. Enzyme Inhib. Med. Chem., 2024) — https://doi.org/10.1080/14756366.2024.2367139
- Triazole-based estradiol dimers prepared via CuAAC from 17α-ethinyl estradiol with five-atom linkers causing G2/M arrest and tubulin inhibition (Bioorg. Chem., 2023) — https://doi.org/10.1016/j.bioorg.2022.106334
- Anticancer 5-arylidene-2-(4-hydroxyphenyl)aminothiazol-4(5H)-ones as tubulin inhibitors (Arch. Pharm., 2022) — https://doi.org/10.1002/ardp.202200419

## Project — easydock

Title: EasyDock

Short summary: Contribution to a **scalable** and **restartable** **molecular docking platform**, my contribution was focused on the **AutoDock Vina** workflow.

Tags: docking, AutoDock Vina, workflow automation, Python

### Scientific problem

**Large docking campaigns** need consistent preparation, efficient execution, and persistent result storage so interrupted calculations can be resumed.

### Motivation

**EasyDock** was developed as a scriptable docking layer that can be reused across virtual-screening and molecular-design workflows.

### My role

- Implemented the Python-based **AutoDock Vina** workflow within **EasyDock**.
- Co-author of the Journal of Cheminformatics publication describing the platform.

### Methodology

- Automated ligand preparation via **Meeko** and **AutoDock Vina** execution.
- Database-backed storage of docking inputs, poses, scores, and run state.
- Parallel execution suitable for larger docking campaigns.

### Results

- Co-author of a publication in Journal of Cheminformatics (2023).

### Software

Python, RDKit, AutoDock Vina, SQLite, Dask

### Links

- GitHub — https://github.com/ci-lab-cz/easydock
