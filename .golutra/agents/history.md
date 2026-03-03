# History

## Description
- Record each Git change or local file change summary.
- Each entry includes reason, impact scope, and related links (put links in Notes when applicable).
- If owner is not specified, default to `<project-name>-agent-1`.
- Use datetime format `YYYY-MM-DD HH:MM` (24h).

## Mandatory Action
- MUST: When this table reaches 50 entries, compress the records into shorter and more general summaries, keeping stable and reusable change points.

## Record Template
| Date Time | Type | Summary | Reason | Impact Scope | Owner Id | Notes |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| 2026-03-03 15:12 | local-file-change | Cleaned public template remnants, fixed navigation/CV/talkmap links, and narrowed talkmap workflow commits. | Remove Academic Pages defaults that leak into production and fix broken or unsafe publishing paths. | Navigation, archive visibility, sample posts/publications/portfolio output, talkmap embedding, GitHub Actions workflow. | 01KJS7FR96RN9TM4AY5V6V036W | Validation: permalink conflict scan returned `NO_CONFLICTS`; `bundle install` timed out twice so full Jekyll build remains unverified locally. |
