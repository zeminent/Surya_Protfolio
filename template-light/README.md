# SuryaTeja Pathuri — Portfolio (Light Editorial template)

A second design of the portfolio with a completely different look & feel from the
dark cinematic version: **warm paper background, serif display typography, an
electric-blue accent, a skills marquee, and clean scroll-reveal animations** —
no glow/bokeh. Same content and the same hero video.

Next.js (App Router) · React · CSS Modules. No GSAP/Three.js — animations use
CSS + IntersectionObserver, so it's lightweight.

## Run it

This is a **separate** Next.js project from the dark template, so it has its own
dependencies. From inside this folder:

```bash
npm install
npm run dev -- -p 3001
# open http://localhost:3001
```

Using port 3001 lets it run at the same time as the original (which uses 3000).

## Structure

```
app/
  layout.js        # metadata
  globals.css      # design tokens (colors, fonts), reveal utility
  page.js          # composes <Hero /> + <Sections />
components/
  Hero/            # framed video, name, marquee, sound toggle
  Sections/        # Who I Am, Technical Skills, Education, Projects, footer
public/
  hero.mp4         # the 4K hero video
```

## Customizing

Theme colors and fonts are CSS variables in `app/globals.css`
(`--paper`, `--ink`, `--accent`, `--font-serif`, …). Content lives as arrays at
the top of `components/Sections/Sections.jsx` and `components/Hero/Hero.jsx`.
