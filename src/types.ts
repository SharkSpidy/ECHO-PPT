import type { ReactNode } from "react";

/** One slide in the deck. `content` renders inside the standard
 * `.slide-inner` wrapper; `render` (rare) opts out of that wrapper
 * entirely, e.g. for the title slide's echo-ping hero. */
export interface SlideData {
  /** Used for the accessible label on nav dots, the aria-live
   * announcer, and (optionally) the eyebrow row. */
  title: string;
  content: ReactNode;
  /** Extra className appended to the <section class="slide"> for
   * slide-specific backgrounds (e.g. the title slide's gradient). */
  className?: string;
}
