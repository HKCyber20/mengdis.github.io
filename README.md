# Mengdi Shi Academic Portfolio

This site has been migrated from the original Jekyll Academic Pages structure to Astro.

## Local Development

```bash
npm install
npm run dev
```

The production site is configured at:

```text
https://profile.mengdis.com/
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

To publish from Windows:

```powershell
.\deploy-profile.ps1
```

The script builds `dist/`, uploads it to the VPS under `~/sites/profile/releases/<timestamp>`, and updates `~/sites/profile/current`.
