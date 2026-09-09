# Echo Deck

A single Vite + React + TypeScript slideshow: the ECHO pitch deck, with the system
architecture folded in as slides 05–08.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

## Navigating

- **Arrow keys / Page Up / Page Down**, the **‹ ›** buttons, the **dots**, or a **swipe**
  move through the deck in order, same as before.
- Slide 05, **Architecture**, is a map of the whole system — battery + Kinect on the left,
  the Raspberry Pi / Message Broker in the middle, the three agents, then the Haptic
  Glove and In-Ear Module on the right.
- **Click any agent node** on that slide and the deck jumps straight to that agent's
  dedicated detail slide (06 Vision, 07 Haptic, 08 Voice), each showing its four-stage
  pipeline (Input → Process → Process → Output).
- Each agent slide has a **"Back to Architecture"** button at the top, or just keep using
  the normal deck navigation — they're real slides, not a modal, so paging forward/back
  and the slide counter/dots all account for them correctly.

## How the click-through works

`src/context/SlideNavContext.ts` exposes a single `goTo(title)` function, provided by
`App.tsx` (which already owns the slideshow's `current` index and `goToSlide`). Any
slide's content can call `useSlideNav().goTo("Vision Agent")` to jump there — that's how
the Architecture slide's agent buttons and each detail slide's back button work, without
either needing to know numeric slide indices.

Agent content (icons, pipeline steps, colors) lives once in `src/data/agents.ts` and is
shared by both `ArchitectureSlide.tsx` (the node list) and `AgentDetailSlide.tsx` (the
pipeline), so editing an agent's description or adding a pipeline step only needs to
happen in one place.

## Project structure

```
src/
  App.tsx                        slideshow shell + SlideNavContext.Provider
  index.css                      all styling (design tokens + every slide's CSS)
  context/SlideNavContext.ts     goTo(title) navigation, shared via context
  data/
    slides.tsx                   the deck, one entry per slide, in order
    agents.ts                    shared agent metadata (icons, pipeline, colors)
  components/
    Slide.tsx, NavControls.tsx, EchoPing.tsx   (deck chrome, unchanged)
    ArchitectureSlide.tsx        slide 05: clickable system map
    AgentDetailSlide.tsx         slides 06–08: one agent's pipeline
```

## Stack

- Vite 8, React 19, TypeScript
- [lucide-react](https://lucide.dev/) for icons
- Plain CSS with custom properties for theming — no Tailwind, no external UI kit
