import { useEffect, useMemo } from "react";
import { Slide } from "./components/Slide";
import { EchoPing } from "./components/EchoPing";
import { NavControls } from "./components/NavControls";
import { useSlideshow } from "./hooks/useSlideshow";
import { slides } from "./data/slides";

function App() {
  const { current, exiting, goToSlide, goNext, goPrev, clearExiting } = useSlideshow(
    slides.length
  );

  const titles = useMemo(() => slides.map((s) => s.title), []);

  const total = slides.length;
  const pad = (n: number) => String(n).padStart(2, "0");
  const announcement = `Slide ${current + 1} of ${total}: ${slides[current].title}`;

  // Keep the document title in sync with the active slide, same spirit
  // as the original's aria-live announcer but for the browser tab too.
  useEffect(() => {
    document.title = `ECHO — ${slides[current].title}`;
  }, [current]);

  return (
    <>
      <div className="kicker-brand">
        <span>ECHO</span> · navigation for the blind
      </div>

      <div className="slide-counter" aria-hidden="true">
        {pad(current + 1)} / {pad(total)}
      </div>

      <div className="sr-only" aria-live="polite">
        {announcement}
      </div>

      <main className="stage">
        {slides.map((slide, i) => (
          <Slide
            key={slide.title}
            title={slide.title}
            isActive={i === current}
            exitDirection={exiting && exiting.index === i ? exiting.direction : null}
            onExitTransitionEnd={() => clearExiting(i)}
            className={slide.className}
            decoration={i === 0 ? <EchoPing /> : undefined}
          >
            {slide.content}
          </Slide>
        ))}
      </main>

      <NavControls titles={titles} current={current} onGoTo={goToSlide} onPrev={goPrev} onNext={goNext} />
    </>
  );
}

export default App;
