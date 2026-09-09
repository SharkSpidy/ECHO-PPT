import { createContext, useContext } from "react";

/**
 * Lets slide *content* (e.g. the Architecture slide's clickable agent
 * nodes) jump the presentation to another slide by title, without every
 * slide needing to know its own numeric index. `App` provides the real
 * implementation; nothing renders correctly without it, so `useSlideNav`
 * throws a clear error if a slide is ever rendered outside `<Stage>`.
 */
interface SlideNavValue {
  goTo: (title: string) => void;
}

export const SlideNavContext = createContext<SlideNavValue | null>(null);

export function useSlideNav(): SlideNavValue {
  const ctx = useContext(SlideNavContext);
  if (!ctx) {
    throw new Error("useSlideNav must be used within the deck's <SlideNavContext.Provider>");
  }
  return ctx;
}
