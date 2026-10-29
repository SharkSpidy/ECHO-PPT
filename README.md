# ECHO Deck – Project Phase I, Second Review

A single Vite + React + TypeScript slideshow for the second review of **ECHO: AI-Powered Navigation
Assistant for Visually Impaired Users**. All content (text, tables, figures) comes from the
*ECHO Project Phase I report*.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

## Deck structure (31 slides)

Title · Team & Guidance · Table of Contents · 01 Introduction · 02 Problem Statement ·
03 Objectives · 04 Scope · 05 Existing System · 06 Literature Review (4 pages) ·
07 Proposed System · 08 Methodology · 09 System Architecture (Fig 4.1) ·
10 UML Diagrams (use-case, sequence, activity, class) · 11 Modules (overview + Vision / Haptic / Voice) ·
12 System Components · 13 Expected Outcome · 14 Snapshots (UI, wristband + top view, setup) ·
15 SDG Mapping · 16 Conclusion · 17 References

## Navigating

- **Arrow keys / Page Up / Page Down**, the **‹ ›** buttons, the **dots**, or a **swipe** move through the deck.
- On the **Architecture** slide, click an agent (Vision / Haptic / Voice) to jump to its detail slide;
  each detail slide has a **Back to Architecture** button.

## Where things live

- `src/data/slides.tsx` – the slide list (add a slide by pushing another object).
- `src/data/literature.ts` – literature review rows (Table 2.2 of the report).
- `src/data/agents.ts` – the three agents' pipelines.
- `public/images/` – all figures from the report (Fig 4.1–4.9) and the AISAT logo.
