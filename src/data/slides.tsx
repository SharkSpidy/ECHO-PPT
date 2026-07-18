import type { SlideData } from "../types";

/**
 * Literature Review source data, rendered as a pure table (Authors / Paper /
 * Method / Advantage / Disadvantage) rather than the earlier timeline layout
 * — kept as its own array so rows can be added/edited without touching markup.
 *
 * "authors" and "paper" (the actual paper title) were looked up from each
 * source's publication record — the array used to key rows off the PDF
 * filename instead, which isn't useful to a reader.
 */
const literatureRows: { authors: string; paper: string; method: string; advantage: string; disadvantage: string }[] = [
  {
    authors: "Real, S.; Araujo, A.",
    paper: "Navigation Systems for the Blind and Visually Impaired: Past Work, Challenges, and Open Problems",
    method: "Traditional Electronic Travel Aids (ETAs) and sensory substitution devices",
    advantage: "Provides the foundational background for assistive navigation and highlights key limitations",
    disadvantage: "Less focused on real-time indoor scene understanding",
  },
  {
    authors: "Jóhannesson, Ó.I.; Balan, O.; Unnthorsson, R.; Moldoveanu, A.; Kristjánsson, Á.",
    paper: "The Sound of Vision Project: On the Feasibility of an Audio-Haptic Representation of the Environment, for the Visually Impaired",
    method: "Combined audio-haptic feedback",
    advantage: "Shows that spatial guidance can be conveyed effectively without relying on visual input alone",
    disadvantage: "Requires additional wearable haptic hardware",
  },
  {
    authors: "Chen, Z.; Liu, X.; Kojima, M.; Huang, Q.; Arai, T.",
    paper: "A Wearable Navigation Device for Visually Impaired People Based on the Real-Time Semantic Visual SLAM System",
    method: "Real-time semantic Visual SLAM on a wearable RGB-D camera",
    advantage: "Closest to ECHO's core approach: wearable, real-time scene understanding",
    disadvantage: "Still computationally demanding for continuous real-time use",
  },
  {
    authors: "Bilal Salih, H.E.; Takeda, K.; Kobayashi, H.; Kakizawa, T.; Kawamoto, M.; Zempo, K.",
    paper: "Use of Auditory Cues and Other Strategies as Sources of Spatial Information for People with Visual Impairment When Navigating Unfamiliar Environments",
    method: "Study of natural auditory cue reliance in VI navigation",
    advantage: "Supports the use of minimal, intuitive voice guidance",
    disadvantage: "Does not provide a complete technical system",
  },
  {
    authors: "Valipoor, M.; de Antonio, A.; Cabrera, J.",
    paper: "Analysis and Design Framework for the Development of Indoor Scene Understanding Assistive Solutions for the Person with Visual Impairment/Blindness",
    method: "Indoor scene understanding and on-demand feedback design principles",
    advantage: "Provides a strong design framework for unobtrusive, context-aware assistance",
    disadvantage: "Requires careful timing and trigger design",
  },
];

/**
 * The deck's content, one entry per slide, in presentation order.
 *
 * To add a slide: push another SlideData object into this array — the
 * rest of the app (dots, counter, keyboard nav, swipe nav) reads its
 * length and titles automatically, nothing else needs to change.
 *
 * A few alternate/extra slides from the original design (a more
 * vibrant title treatment, a technical SLAM deep-dive, an extended
 * literature grid) are sketched at the bottom of this file as
 * commented-out entries — uncomment and splice one in if you want it.
 */
export const slides: SlideData[] = [
  {
    title: "Title",
    content: (
      <>
        <p className="eyebrow">Final Year Project — Assistive Technology</p>
        <h1>
          ECHO
          <br />
          AI-Powered Navigation Assistant
          <br />
          for Visually Impaired Users
        </h1>
        <p className="subtitle">
          Promoting independence and accessibility through computer vision,
          Visual SLAM, and real-time AI voice guidance.
        </p>
      </>
    ),
  },
  {
    title: "Introduction",
    content: (
      <>
        <p className="eyebrow">01 · Introduction</p>
        <h2>What is ECHO?</h2>
        <p>
          ECHO is a prototype indoor navigation system for visually impaired
          (VI) users. A single camera performs visual localization, detects
          landmarks and obstacles, and figures out exactly where the user is
          along a pre-mapped route — then speaks real-time voice instructions
          to guide them safely around what's in their way.
        </p>
        <div className="card-grid">
          <div className="card">
            <h3>Computer Vision</h3>
            <p>Detects landmarks, obstacles, and scene context from a single camera feed.</p>
          </div>
          <div className="card">
            <h3>Visual SLAM</h3>
            <p>Localizes the user's position along a pre-mapped indoor route in real time.</p>
          </div>
          <div className="card">
            <h3>AI Voice Guidance</h3>
            <p>Converts spatial understanding into clear, timely spoken directions.</p>
          </div>
          <div className="card">
            <h3>Obstacle Avoidance</h3>
            <p>Continuously re-routes guidance to keep the user clear of hazards.</p>
          </div>
        </div>
      </>
    ),
  },
  {
    title: "Problem Statement",
    content: (
      <>
        <p className="eyebrow">02 · Problem Statement</p>
        <span className="problem-flag">The gap in mobility today</span>
        <h2>Traditional aids can't tell you what's around you.</h2>
        <ul className="list-clean">
          <li>Visually impaired individuals face significant hurdles navigating unfamiliar indoor spaces.</li>
          <li>
            White canes and guide dogs are excellent at obstacle contact, but cannot provide scene
            understanding, detect upper-body obstacles, or convey spatial awareness of landmarks.
          </li>
          <li>Without contextual information about a space, users experience anxiety that limits independent mobility.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Motivation",
    content: (
      <>
        <p className="eyebrow">03 · Motivation</p>
        <h2>Why build ECHO?</h2>
        <ul className="list-clean">
          <li>To bridge the gap between traditional mobility aids and modern AI.</li>
          <li>To foster true independence for the visually impaired, rather than dependence on assistance.</li>
          <li>
            To provide not just obstacle detection, but genuine "scene understanding" — what is
            around them, and what kind of room they're in.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "Hardware & Software Requirements",
    content: (
      <>
        <p className="eyebrow">04 · Hardware &amp; Software Requirements</p>
        <h2>Estimated requirements to build ECHO</h2>
        <div className="card-grid">
          <div className="card">
            <h3>Hardware</h3>
            <ul className="list-clean">
              <li>Portable laptop or mini-PC with Intel i5/i7 or Ryzen 5/7 processor.</li>
              <li>8 GB RAM minimum, 16 GB recommended for smoother SLAM processing.</li>
              <li>RGB or RGB-D camera for scene capture and localization.</li>
              <li>Speaker or earphone for voice guidance output.</li>
              <li>Optional wearable device for future haptic feedback.</li>
            </ul>
          </div>
          <div className="card">
            <h3>Software</h3>
            <ul className="list-clean">
              <li>Python for AI modules, computer vision, and voice processing.</li>
              <li>OpenCV and Visual SLAM libraries for mapping and localization.</li>
              <li>React + TypeScript for the presentation and interface components.</li>
              <li>Vite for frontend development and fast local testing.</li>
              <li>Optional cloud or local speech synthesis APIs for voice instructions.</li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    title: "Literature Review",
    className: "slide--wide",
    content: (
      <>
        <p className="eyebrow">05 · Literature Review</p>
        <h2>Building on prior research</h2>

        <div className="lit-table-wrap">
          <table className="lit-table">
            <thead>
              <tr>
                <th>Authors</th>
                <th>Paper</th>
                <th>Method</th>
                <th>Advantage</th>
                <th>Disadvantage</th>
              </tr>
            </thead>
            <tbody>
              {literatureRows.map((row) => (
                <tr key={row.paper}>
                  <td className="lit-authors">{row.authors}</td>
                  <td className="lit-paper">{row.paper}</td>
                  <td>{row.method}</td>
                  <td>{row.advantage}</td>
                  <td>{row.disadvantage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    title: "Conclusion & Future Scope",
    content: (
      <>
        <p className="eyebrow">06 · Conclusion &amp; Future Scope</p>
        <h2>A reliable, low-cognitive-load path forward</h2>
        <p>
          ECHO provides a reliable, low-cognitive-load, and accessible navigation tool for visually
          impaired users in indoor environments — grounded in real-time computer vision, Visual
          SLAM, and voice guidance.
        </p>
        <div className="card-grid">
          <div className="card">
            <h3>Dynamic map generation</h3>
            <p>Moving beyond pre-mapped routes toward on-the-fly indoor mapping.</p>
          </div>
          <div className="card">
            <h3>Wearable smart devices</h3>
            <p>Integrating with smart bands for optional haptic feedback.</p>
          </div>
          <div className="card">
            <h3>Unfamiliar environments</h3>
            <p>Scaling navigation to spaces the system has never seen before.</p>
          </div>
        </div>
      </>
    ),
  },
];

/* ============================================================================
   ALTERNATE / EXTRA SLIDES (not included in the deck by default)
   ----------------------------------------------------------------------------
   These mirror the commented-out slides in the original single-file HTML
   version. To use one, copy its object into the `slides` array above at the
   position you want it to appear.

   1) Vibrant title slide — same copy as the default title slide, but with
      `className: "slide--title-vibrant"` for a gradient-filled headline and
      warm/cool glow background (styles already defined in index.css).

   2) Technical deep-dive — "Semantic Visual SLAM vs. Traditional SLAM",
      using a two-column `.compare-grid` / `.compare-col` layout plus a
      `.pipeline-steps` row for ECHO's processing pipeline. Intended for a
      more technical audience, right after the Literature Review slide.

   3) Extended literature grid — one `.card` per source with room for
      methodology notes/sample sizes, as an alternative to the condensed
      timeline for audiences who want the full per-source detail.
   ========================================================================= */
