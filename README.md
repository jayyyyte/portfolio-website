# Data Engineer Portfolio

Simple Astro portfolio for an aspiring Data Engineer. The site is intentionally static, fast, and content-driven so recruiters can quickly scan skills, projects, case studies, and contact links.

## Stack

- Astro
- Tailwind CSS
- Markdown content collections for case studies
- TypeScript data files for profile and projects

## Project Structure

- `src/data/profile.ts` - name, links, hero copy, skills, and resume highlights
- `src/data/projects.ts` - project summaries, pipeline details, tech stack, and links
- `src/content/case-studies/` - markdown case studies
- `src/pages/` - Astro pages for Home, Projects, Case Studies, and About

## Commands

```bash
npm install
npm run dev
npm run typecheck
npm run build
```

## Content Notes

Project and case study entries currently include clearly marked draft content. Replace the draft descriptions, TODO links, repository URLs, dataset details, and outcomes with real project information before sharing the portfolio with recruiters.

To add a new case study:

1. Add a markdown file in `src/content/case-studies/`.
2. Add or update the matching project in `src/data/projects.ts`.
3. Use the sections from `CASE_STUDY_TEMPLATE.md` to keep the writeup specific.
