# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an academic portfolio website built with Jekyll, based on the Academic Pages template. It's deployed via GitHub Pages and showcases research publications, talks, teaching, and professional information.

## Development Commands

### Local Development
```bash
# Install Ruby dependencies
bundle install

# Run local development server (auto-reloads on Markdown/HTML changes)
jekyll serve -l -H localhost
# or
bundle exec jekyll serve -l -H localhost

# Access at: http://localhost:4000
```

**Note:** Changes to `_config.yml` require stopping and restarting Jekyll.

### Docker Development
```bash
chmod -R 777 .
docker compose up
```

### JavaScript Build
```bash
# Build minified JavaScript
npm run build:js

# Watch for JS changes and rebuild
npm run watch:js
```

## Site Architecture

### Configuration
- `_config.yml`: Main site configuration including author info, social links, collections, and Jekyll settings
- Site uses Chinese comments in config for bilingual documentation
- Base URL: `/mengdis.github.io` (configured for GitHub Pages subdirectory)

### Content Collections
Jekyll collections are the core content structure:

- `_publications/`: Research papers (categorized as books/manuscripts/conferences via `category` front matter)
- `_talks/`: Conference presentations and invited talks
- `_teaching/`: Teaching materials and courses
- `_portfolio/`: Project portfolios
- `_education/`: Educational background
- `_posts/`: Blog posts (standard Jekyll posts)
- `_pages/`: Static pages (about, CV, etc.)

### Front Matter Requirements

**Publications:**
```yaml
title: "Paper Title"
collection: publications
category: conferences  # or manuscripts, books
permalink: /publication/YYYY-MM-DD-slug
excerpt: 'Brief description'
date: YYYY-MM-DD
venue: 'Conference/Journal Name'
paperurl: 'https://...'
citation: 'Full citation string'
```

**Talks:**
```yaml
title: "Talk Title"
collection: talks
type: "Talk"
permalink: /talks/YYYY-MM-DD-slug
venue: "Event Name"
date: YYYY-MM-DD
location: "City, Country"
```

### Key Directories
- `_includes/`: Reusable HTML components (author profile, navigation, analytics)
- `_layouts/`: Page templates (single, archive, talk, cv-layout)
- `_sass/`: Sass stylesheets
- `assets/js/`: JavaScript files (minified to `main.min.js`)
- `images/`: Static images including author avatar
- `files/`: Downloadable files (PDFs, etc.) accessible at `/files/filename.pdf`

### Layouts
- `single`: Default for most content (posts, publications, teaching)
- `talk`: Specialized layout for talks collection
- `cv-layout`: For CV/resume pages
- `archive`: For listing collections

## Important Notes

- Site is bilingual (English content, Chinese config comments)
- Author profile sidebar controlled by `author_profile: true` in front matter
- Publication categories map to display titles in `_config.yml` under `publication_category`
- Permalinks follow pattern: `/:collection/:path/`
- GitHub Pages compatible (uses whitelisted plugins only)
