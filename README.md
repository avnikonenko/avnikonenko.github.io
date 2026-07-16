# Aleksandra Ivanova academic portfolio

Static academic and scientific portfolio website for Aleksandra Ivanova, built for GitHub Pages.

The site presents computational chemistry, cheminformatics, molecular modeling, CADD, scientific software, publications, projects, experience, education, CV, and contact information. Content is intentionally stored in typed data files so publications, projects, skills, and profile details can be edited without changing page-layout code.

## Technology stack

- Astro
- TypeScript
- Scoped Astro components and global CSS
- Minimal client-side JavaScript for theme switching, mobile navigation, publication filtering, citation copy, and print
- GitHub Actions deployment to GitHub Pages
- ESLint, Prettier, Astro check, a static internal-link check, and Playwright smoke tests

## Prerequisites

- Node.js 22.12 or newer
- npm

## Local development

```bash
npm install
npm run dev
```

The local dev server usually runs at `http://localhost:4321`.

## Checks and build

```bash
npm run check
npm run lint
npm run format
npm run build
npm run preview
```

End-to-end smoke tests:

```bash
npx playwright install chromium
npm run build
npm run test:e2e
```

The build command also runs `scripts/check-internal-links.mjs` against the generated `dist/` directory.

## GitHub Pages deployment

This repository is configured for GitHub Pages through `.github/workflows/deploy.yml`.

Repository settings:

1. Open GitHub repository settings.
2. Go to **Pages**.
3. Set **Source** to **GitHub Actions**.
4. Push to the `main` branch.

For the GitHub user site `https://avnikonenko.github.io`, the workflow uses:

```bash
PUBLIC_SITE_URL=https://avnikonenko.github.io
BASE_PATH=/
```

For a project site such as `https://avnikonenko.github.io/repository-name/`, set:

```bash
PUBLIC_SITE_URL=https://avnikonenko.github.io
BASE_PATH=/repository-name/
```

Astro uses `BASE_PATH` for internal links and assets.

## Where to edit content

- Main site settings and social links: `src/data/site.ts`
- Professional profile text: `src/data/profile.ts`
- Experience: `src/data/experience.ts`
- Education: `src/data/education.ts`
- Projects: `src/data/projects.ts`
- Publications: `src/data/publications.ts`
- Skills: `src/data/skills.ts`
- Conferences and presentations: `src/data/conferences.ts`

All uncertain details are marked with `[ADD OR VERIFY: ...]`. The central review checklist is `CONTENT_TODO.md`.

## CV PDF

Replace:

```text
public/Aleksandra_Ivanova_CV.pdf
```

with the final public CV. The CV page links to this file and still builds if a different PDF is added later, but the link should be checked before deployment.

## Project images

Project diagrams live in:

```text
public/images/
```

Update the `image` and `imageAlt` fields in `src/data/projects.ts`. Use original diagrams or approved public assets only. The current SVG diagrams are schematic placeholders and avoid chemical structures that could be interpreted as exact molecules.

## Custom domain

If a custom domain is added later:

1. Add a `public/CNAME` file containing the domain.
2. Update `PUBLIC_SITE_URL` in the GitHub Actions workflow.
3. Configure DNS according to GitHub Pages documentation.
4. Rebuild and confirm canonical URLs, sitemap, and Open Graph URLs.

## Privacy and security

The default site includes no analytics, tracking pixels, backend, database, contact form, or API keys. External links opened in new tabs use `rel="noopener noreferrer"`. Do not add private phone numbers, home addresses, secrets, or unpublished confidential scientific details.

## Dependency maintenance

Run:

```bash
npm audit
npm outdated
```

Review updates before applying them. Avoid adding new dependencies unless they materially improve maintainability, accessibility, or validation.

## Troubleshooting

- `npm ci` fails in GitHub Actions: make sure `package-lock.json` is committed.
- Pages deploys but assets are missing: check `BASE_PATH`. User sites normally use `/`; project sites use `/<repository-name>/`.
- Publication links show placeholders: update `src/data/publications.ts` and `CONTENT_TODO.md`.
- The CV download is stale: replace `public/Aleksandra_Ivanova_CV.pdf`.
- Playwright cannot find a browser locally: run `npx playwright install chromium`.
