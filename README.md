# Echo Deck

A Vite + React + TypeScript project with two independent pages:

| Route         | What it is                                                         | Source        |
| ------------- | ------------------------------------------------------------------- | ------------- |
| `/`           | Interactive system architecture dashboard (click an agent for its internal pipeline) | `src/`        |
| `/deck.html`  | The ECHO pitch deck slideshow                                       | `src-deck/`   |

The two pages are wired together with plain links (**"View the pitch deck"** on the
dashboard, **"← Architecture"** on the deck) so you can jump between them, but they are
otherwise fully isolated: separate React trees, separate `main.tsx` entry points, and
separate stylesheets (Tailwind v4 for the dashboard, hand-written CSS for the deck).
That isolation is intentional — it means neither page's global styles (resets, `h1`/`p`
rules, `overflow: hidden`, etc.) can leak into the other, even though they ship in the
same project and the same `npm run build`.

## Getting started

```bash
npm install
npm run dev      # serves both / and /deck.html
npm run build    # outputs dist/index.html and dist/deck.html
npm run preview  # preview the production build
```

## Project structure

```
index.html          entry HTML for the dashboard
deck.html            entry HTML for the pitch deck
src/                 dashboard: App.tsx, index.css (Tailwind)
src-deck/             deck: App.tsx, components/, data/, hooks/, index.css
vite.config.ts        registers both HTML files as build entry points
```

## Stack

- Vite 8 (multi-page build via `build.rollupOptions.input`)
- React 19 + TypeScript
- Tailwind CSS v4 (`@tailwindcss/vite`) for the dashboard
- [lucide-react](https://lucide.dev/) icons for the dashboard
