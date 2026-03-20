# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Next.js static blog built on the "Learn Next.js" starter template. Spanish-language blog featuring posts about programming, Bitcoin, and technology with Lightning Network donation integration. Uses a monochromatic "Geist Monolith" design system with light/dark mode.

## Commands

- `npm run dev` - Development server with hot reload
- `npm run build` - Production build (includes RSS generation)
- `npm run start` - Production server

No testing or linting scripts are configured.

## Architecture

### Content System
- Blog posts are markdown files in `/posts/` with YAML front matter
- `lib/posts.js` handles all post processing: reading files, parsing front matter (gray-matter), converting markdown to HTML (remark + remark-slug + remark-gfm)
- Posts are statically generated at build time using `getStaticProps()` and `getStaticPaths()`
- `extractHeadings()` parses h2/h3 from HTML for Table of Contents
- `getRelatedPosts()` returns posts from same category

### Post Front Matter Schema
```yaml
---
title: "Post Title"
date: "YYYY-MM-DD"
author: "Author Name"
image: "OG image URL"
resume: "Short excerpt"
category: "Category Name"
tags: ["Tag1", "Tag2"]
lnurl: "Lightning Network LNURL"
---
```

### Key Directories
- `/pages/` - Next.js file-based routing
  - `/pages/posts/[id].js` - Dynamic post routes with TOC and related posts
  - `/pages/projects/index.js` - Projects bento grid page
  - `/pages/about/index.js` - About page
- `/components/` - React components using Tailwind CSS
  - `/components/sidebar/` - Sidebar components (popularTopics, newsletterSignup, socialConnect)
- `/lib/posts.js` - Core post data processing functions
- `/public/.well-known/lnurlp/` - Lightning Network payment metadata

### Styling
- **Tailwind CSS v4** via `@tailwindcss/postcss`
- Design tokens defined in `styles/global.css` using `@theme` directive and CSS custom properties
- Light/dark mode toggled via `[data-theme]` attribute on `<html>`
- `.prose-monolith` class for markdown content styling
- No CSS Modules - all styling via Tailwind utility classes

### Theme System
- `contexts/themeContext.js` provides `{ theme, toggleTheme }`
- Persisted in localStorage, falls back to system preference
- Flash prevention via inline script in `_document.js`

### Special Features
- `wordCounter.js` - Reading time calculator (160 WPM)
- `tipButton.js` - Bitcoin donation button linking to payments.saporiti.cl
- `tableOfContents.js` - Sticky TOC with Intersection Observer for active heading
- Google Analytics (GA4) embedded in `_app.js`
- RSS feed generated at build time via `scripts/generate-rss.js`
