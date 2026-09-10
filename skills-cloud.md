# Skills cloud

The keyword cloud drawn on the home page. Edit this file and the site follows:
the dev server reloads and `npm run build` reads it directly. Rules that keep
it parseable:

- Keep the three size headings: `## Large`, `## Medium`, `## Small`.
- One keyword per `- ` bullet. Add, reword or delete bullets freely.
- Size comes from the heading a keyword sits under; colours walk the rainbow
  automatically, and the three groups are interleaved so sizes and colours mix
  across the cloud.
- Keep keywords short. Long phrases stretch the drawing out of shape.
- The full skill wording lives in `src/data/skills.ts`, which feeds the Skills
  table on the About page. This file only drives the cloud.

## Large

- Python
- molecular dynamics
- Bash
- molecular docking
- QSAR
- LLMs
- de novo molecular design
- GROMACS
- RDKit

## Medium

- scikit-learn
- MDAnalysis
- pandas
- ProLIF
- NumPy
- CReM
- Matplotlib
- SQL
- OpenMM
- Amber
- AutoDock Vina
- Gnina
- Glide and Maestro
- gmx_MMPBSA
- A3FE
- PyMOL

## Small

- Dask
- Git and GitHub
- prompt design
- PBS/SLURM
- tool integration
- reproducible workflows
- multiprocessing
- code performance profiling
- Streamlit
