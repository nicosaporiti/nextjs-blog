# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Next.js static blog built on the "Learn Next.js" starter template. Spanish-language blog featuring posts about programming, Bitcoin, and technology with Lightning Network donation integration.

## Commands

- `npm run dev` - Development server with hot reload
- `npm run build` - Production build
- `npm run export` - Static export (no Node.js server required)
- `npm run deploy` - Combined build + export for static hosting
- `npm run start` - Production server

No testing or linting scripts are configured.

## Architecture

### Content System
- Blog posts are markdown files in `/posts/` with YAML front matter
- `lib/posts.js` handles all post processing: reading files, parsing front matter (gray-matter), converting markdown to HTML (remark)
- Posts are statically generated at build time using `getStaticProps()` and `getStaticPaths()`

### Post Front Matter Schema
```yaml
---
title: "Post Title"
date: "YYYY-MM-DD"
author: "Author Name"
image: "OG image URL"
resume: "Short excerpt"
lnurl: "Lightning Network LNURL"
---
```

### Key Directories
- `/pages/` - Next.js file-based routing; `/pages/posts/[id].js` handles dynamic post routes
- `/components/` - React components with CSS Modules (`.module.css`)
- `/lib/posts.js` - Core post data processing functions
- `/public/.well-known/lnurlp/` - Lightning Network payment metadata

### Styling
- CSS Modules for component-scoped styles
- Global styles in `/styles/global.css` (dark theme, background #303135)
- Utility classes in `/styles/utils.module.css`

### Special Features
- `wordCounter.js` - Reading time calculator (160 WPM)
- `tipButton.js` - Bitcoin donation button linking to payments.saporiti.cl
- Google Analytics (GA4) embedded in layout
