# Joel Nirmal — Portfolio

A personal portfolio site for **Joel Nirmal Oommen**, a software engineer working across machine learning, NLP, and full-stack development.

Built as a fast, animated, single-page site with a dark, modern aesthetic.

## Tech stack

| Area       | Choice                                          |
| ---------- | ----------------------------------------------- |
| Framework  | Next.js 16 (App Router) + React 19 + TypeScript |
| Styling    | Tailwind CSS v4 (CSS `@theme` tokens)           |
| Animation  | Motion (`motion/react`)                         |
| Icons      | lucide-react + custom inline brand SVGs         |
| Fonts      | Bricolage Grotesque · Hanken Grotesk · JetBrains Mono (`next/font`) |
| Forms      | Formspree                                       |
| Hosting    | Vercel                                          |

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build (also type-checks)
npm run start    # serve the production build
npm run lint
```

## Project structure

```
src/
├── app/
│   ├── layout.tsx          # fonts, metadata, navbar/footer, scroll progress
│   ├── page.tsx            # section composition
│   ├── globals.css         # design tokens + reusable classes
│   ├── opengraph-image.tsx # generated social share image
│   ├── icon.tsx            # generated favicon
│   ├── robots.ts / sitemap.ts
├── components/
│   ├── Navbar.tsx, Footer.tsx, Reveal.tsx, CountUp.tsx,
│   ├── Headshot.tsx, ProjectCard.tsx, ContactForm.tsx,
│   ├── ScrollProgress.tsx, BackToTop.tsx, icons.tsx
│   └── sections/           # Hero, About, Skills, Projects, Experience, Contact
└── lib/
    ├── site.ts             # name, links, CV path, Formspree id, site URL
    ├── projects.ts         # project data
    └── utils.ts            # cn() helper
```

## Customising

- **Personal details, links, CV, Formspree id, site URL** → `src/lib/site.ts`
- **Projects** → `src/lib/projects.ts`
- **Skills** → `src/components/sections/Skills.tsx`
- **Experience / education** → `src/components/sections/Experience.tsx`
- **Colours & fonts** → `@theme` block in `src/app/globals.css`
- **Photo** → replace `public/headshot.png`
- **CV** → replace `public/Joel-Nirmal-CV.pdf`

> After connecting a custom domain on Vercel, update `url` in `src/lib/site.ts`
> (or set `NEXT_PUBLIC_SITE_URL`) so metadata, sitemap, and robots use it.

## Deploy

Push to GitHub and import the repo on [Vercel](https://vercel.com) — it auto-detects
Next.js and deploys on every push.
