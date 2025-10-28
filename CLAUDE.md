# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint
```

The development server runs on **http://localhost:8080**.

## 📋 Available Scripts

- `npm run dev` - Start Vite development server with hot reload
- `npm run build` - Build production bundle
- `npm run build:dev` - Build in development mode (for testing)
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the production build locally

**Note**: There are no test scripts configured for this project.

## 🏗️ Project Architecture

This is a **Vite + React + TypeScript** portfolio website for Zeeshan Ahmad. The site is a static site that renders blog posts dynamically at runtime from markdown files.

### Technology Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite 5
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Routing**: React Router DOM (client-side routing)
- **Data Fetching**: TanStack React Query (@tanstack/react-query)
- **Blog Content**: Markdown files processed with gray-matter
- **Form Handling**: React Hook Form + Zod validation
- **SEO**: React Helmet Async
- **UI Components**: Radix UI primitives with custom styling

### Core Architecture Patterns

**1. Provider Pattern**
The app uses multiple React providers stacked in `/src/main.tsx`:
- `HelmetProvider` - for document head management
- `QueryClientProvider` - for TanStack Query
- `BrowserRouter` - for client-side routing
- `ThemeProvider` - for dark/light mode
- `TooltipProvider` - for UI tooltips

**2. Blog System**
- Blog posts are stored as markdown files in the `/blogs` directory
- Posts are dynamically loaded at runtime (not pre-rendered)
- `/src/utils/blogUtils.ts` handles markdown parsing with gray-matter
- Available posts are listed in the `availablePosts` array in blogUtils.ts
- Reading time is automatically calculated

**3. Theme System**
- Dark/light mode implemented via `/src/contexts/ThemeContext.tsx`
- Theme class applied to `document.documentElement`
- Theme preference persisted in localStorage
- Supports smooth transitions between themes

## 📁 Directory Structure

```
/src
├── App.tsx                 # Main routing configuration
├── main.tsx                # App entry point with all providers
├── components/
│   ├── ui/                 # shadcn/ui components (Radix-based)
│   ├── Navigation.tsx      # Site navigation
│   ├── HeroSection.tsx     # Homepage hero
│   ├── AboutSection.tsx    # About section
│   ├── PortfolioSection.tsx # Portfolio/projects showcase
│   ├── ExperienceSection.tsx # Work experience timeline
│   ├── ContactSection.tsx  # Contact information
│   └── ThemeToggle.tsx     # Dark/light mode toggle
├── pages/
│   ├── Index.tsx           # Homepage (all sections)
│   ├── Blog.tsx            # Blog listing page
│   ├── BlogPost.tsx        # Individual blog post page
│   └── NotFound.tsx        # 404 page
├── contexts/
│   └── ThemeContext.tsx    # Theme management context
├── lib/
│   └── utils.ts            # Utility functions (cn() for className merging)
├── utils/
│   └── blogUtils.ts        # Blog post utilities (markdown loading, parsing)
├── hooks/                  # Custom React hooks
└── assets/                 # Static assets (images, icons)
```

## 🔑 Key Files

### Routing Configuration
**`/src/App.tsx`** - Defines all routes:
- `/` - Index page (single page app with all sections)
- `/blog` - Blog listing
- `/blog/:slug` - Individual blog posts
- `*` - 404 page

### Blog Implementation
**`/src/utils/blogUtils.ts`** - Core blog utilities:
- `getAllPosts()` - Fetch all blog posts
- `getPostBySlug(slug)` - Fetch single post by slug
- `calculateReadingTime(content)` - Auto-calculate reading time
- `formatDate(dateString)` - Format dates for display

**`/blogs/*.md`** - Blog post markdown files with frontmatter:
```yaml
---
title: "Post Title"
author: "Zeeshan Ahmad"
published_date: "2024-01-01"
excerpt: "Brief description"
tags: ["tag1", "tag2"]
featured: false
---
```

### Styling & UI
**`/src/lib/utils.ts`** - Contains `cn()` function for merging Tailwind classes
**`/tailwind.config.ts`** - Tailwind configuration with shadcn/ui theme
**`/src/index.css`** - Global styles and CSS variables

## 🎨 Component Library

The project uses **shadcn/ui** which is built on Radix UI primitives. All components are in `/src/components/ui/`. Key components include:

- Dialog, Sheet, Popover (overlay components)
- Navigation, Tabs (navigation components)
- Card, Badge, Button (content components)
- Calendar, DatePicker (data entry components)
- Chart (data visualization with Recharts)
- Tooltip, Toast (feedback components)

Components are customized via Tailwind CSS variables defined in `/src/index.css`.

## ⚙️ Configuration Files

- **`/vite.config.ts`** - Vite configuration with:
  - React SWC plugin
  - Node polyfills for browser compatibility
  - Static copy plugin for blog files
  - Path aliases (`@` → `./src`)

- **`/tsconfig.json`** - TypeScript configuration (extends base configs)
- **`/tsconfig.app.json`** - App-specific TS config
- **`/tsconfig.node.json`** - Node/build TS config
- **`/eslint.config.js`** - ESLint with React and TypeScript rules

## 🌐 Blog Post Management

### Adding a New Blog Post

1. Create a new markdown file in `/blogs/` directory
2. Add frontmatter with required fields (title, author, published_date, excerpt)
3. Add the slug (filename without .md) to the `availablePosts` array in `/src/utils/blogUtils.ts`
4. Write your content in markdown below the frontmatter

### Blog Post Features

- **Automatic Reading Time**: Calculated from word count
- **Date Formatting**: Handled via `formatDate()` utility
- **Markdown Rendering**: Using react-markdown with GitHub Flavored Markdown
- **SEO**: React Helmet Async for page titles and meta tags

## 🎯 Development Notes

- **No Tests**: Project doesn't have a testing setup (no Jest, Vitest, or testing library)
- **Static Site**: Blog posts are loaded at runtime from static markdown files
- **No Backend**: Pure frontend application
- **Deployment**: Set up for Netlify (badge in README.md)
- **Alias**: Use `@` import alias (configured in vite.config.ts) instead of relative paths

## 🔍 Code Quality

- **ESLint**: Configured in `/eslint.config.js` with:
  - React hooks rules
  - React refresh plugin
  - TypeScript ESLint
  - Standard recommended rules

To lint the codebase:
```bash
npm run lint
```

## 📱 Responsive Design

The site is fully responsive using Tailwind CSS with:
- Mobile-first approach
- Breakpoint system (sm, md, lg, xl, 2xl)
- shadcn/ui components are already responsive
