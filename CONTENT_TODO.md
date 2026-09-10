# Content items requiring review

This file is intentionally not rendered on the public website. Site content is
now taken from `CV_Ivanova.pdf` (September 2026 version); the items below are
what the CV does not settle.

## Open questions

- [ ] Google Scholar profile: the CV links GitHub, LinkedIn, ORCID, and Scopus
      only. Add a Scholar URL to `siteConfig.socialLinks` if one exists.
- [ ] Availability statement in `src/data/site.ts` is the one sentence on the
      site that is not sourced from the CV. Confirm or reword it.
- [ ] CEEC Chemoinformatics 2025: listed in an earlier draft of this file but
      absent from the CV, so it was removed from `src/data/conferences.ts`.
      Re-add with the exact title and format if the presentation happened.
- [ ] Add links for talks and lectures (RDKit UGM 2025 page or slides,
      "Advanced in silico Drug Design" workshop page) — `links: []` today.
- [ ] Add the StreaMD documentation URL if there is one beyond the repository.
- [ ] Add the CReM-opt and CReM-agent publications once the manuscripts appear.
- [ ] Add a MIL-QSAR repository link if the code is public.
- [ ] Decide whether to add a custom domain.
- [ ] Decide whether to add a profile photo. The initials placeholder image was
      removed; the site currently shows no portrait.

## Deployment

- [ ] In GitHub repository settings, set Pages source to GitHub Actions.
- [ ] If deploying as a project site rather than a user site, set
      `BASE_PATH=/<repository-name>/` in the workflow or build environment.

## Resolved from the CV

- [x] GitHub username `avnikonenko`, email `a.ivanova.contact@gmail.com`,
      LinkedIn, ORCID `0000-0002-8064-7845`, and Scopus author ID.
- [x] Public location: Olomouc, Czech Republic.
- [x] `public/CV_Ivanova.pdf` is the current CV, linked directly from the
      navigation ("CV (PDF)"), the landing page, the footer, and the contact
      page. The repository-root copy stays untracked via `.gitignore`.
- [x] StreaMD title, author list, venue, and DOI (10.1186/s13321-024-00918-w).
- [x] Repository URLs for StreaMD, CReM-opt, EasyDock, the ChEMBL datasets
      collection, and the HPC stats scripts.
- [x] CACHE Challenge #1: third place as a team, WDR domain of LRRK2, published
      in J. Chem. Inf. Model. (2024). The unverified "82 compounds synthesized"
      and "8 active binders" figures were removed rather than published.
- [x] AI|ffinity s.r.o. responsibilities (PDB dataset curation and validation,
      docking with Glide), part-time, June-December 2022.
- [x] Degree wording: "Specialist Degree with Honours in Bioengineering and
      Bioinformatics".
- [x] Lectures, talks, and workshops are in `src/data/conferences.ts`. Honors
      and awards are intentionally not shown on the site; the CV PDF carries
      them (Dean's Awards, CACHE third place, ICCS Poster Award, 2026 in silico
      Drug Design Challenge).
- [x] Tubulin and estradiol modeling work is described from the four published
      co-authored studies only.
- [x] Ph.D. thesis record: https://theses.cz/id/ux69av/ (linked from the
      education entry and the thesis publication entry).
