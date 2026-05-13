# Mengdi Shi Academic Portfolio

This site has been migrated from the original Jekyll Academic Pages structure to Astro.

## Local Development

```bash
npm install
npm run dev
```

The site is configured for GitHub Pages at:

```text
https://HKCyber20.github.io/mengdis.github.io/
```

## Build

```bash
npm run build
npm run preview
```

## Content

Astro content now lives under `src/content/`:

- `src/content/pages/about.md`
- `src/content/publications/`
- `src/content/talks/`
- `src/content/education/`
- `src/content/work/`
- `src/content/posts/`

Static files live in `public/` and are copied into the final build unchanged:

- `public/images/`
- `public/files/`
- `public/talkmap/`
- `public/cv/`

The old Jekyll folders are kept in the repository for reference during migration.

## Deployment

The workflow at `.github/workflows/deploy.yml` builds the Astro project and deploys `dist/` to GitHub Pages on every push to `master`.
