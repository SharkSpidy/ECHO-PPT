import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

const r = (path: string) => fileURLToPath(new URL(path, import.meta.url))

// https://vite.dev/config/
// Two independent pages, each with its own React tree and its own CSS:
//   /            -> the interactive architecture dashboard (src/)
//   /deck.html   -> the ECHO pitch deck slideshow (src-deck/)
// Kept as separate HTML entry points (rather than merged into one SPA) so
// the dashboard's Tailwind styles and the deck's hand-written global CSS
// never collide.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: r('./index.html'),
        deck: r('./deck.html'),
      },
    },
  },
})
