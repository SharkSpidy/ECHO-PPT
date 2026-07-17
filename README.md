# ECHO — Presentation Deck (Vite + React + TypeScript)

A React/TS port of the ECHO navigation-assistant slideshow. Same design
tokens, motion, and accessibility behavior as the original single-file
HTML version, now split into components + a custom hook.

## Run it

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview   # optional: preview the production build locally
```

## Project structure

```
src/
  main.tsx              entry point, mounts <App />
  App.tsx                stage layout: brand mark, counter, sr-live region,
                          slide list, nav controls
  index.css              all design tokens + styles (ported 1:1 from the
                          original <style> block)
  types.ts                shared SlideData type
  data/
    slides.tsx            slide content — one object per slide; add a
                           slide by pushing another entry here
  hooks/
    useSlideshow.ts        current index, exit-direction animation state,
                           keyboard (arrows/PageUp/PageDown/Home/End) and
                           swipe navigation
  components/
    Slide.tsx              a single <section class="slide">, handles
                           is-active / exit-left / exit-right classes
    EchoPing.tsx            the signature sonar-ping hero graphic
    NavControls.tsx         prev/next buttons + dot indicator
```

## Adding or editing slides

Edit `src/data/slides.tsx`. Each entry is:

```ts
{
  title: "Section name",      // used by nav-dot labels, aria-live, tab title
  content: <>...JSX...</>,     // rendered inside the centered .slide-inner column
  className: "optional-extra-class",
}
```

The bottom of that file sketches three alternate slides carried over from
the original design (a more vibrant title treatment, a technical SLAM
deep-dive, and an extended literature-review grid) — copy one into the
array if you want to use it; their styles already exist in `index.css`.

## Accessibility notes

- Keyboard: `→`/`PageDown` next, `←`/`PageUp` previous, `Home`/`End` jump
  to first/last slide.
- Touch: swipe left/right to navigate.
- `prefers-reduced-motion` disables slide-drift and ping animations.
- Slide changes are announced via a visually-hidden `aria-live` region.
