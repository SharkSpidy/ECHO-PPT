import type { SlideData } from "../types";

/**
 * Literature Review source data, rendered as a pure table (Paper / Method /
 * Advantage / Disadvantage) rather than the earlier timeline layout — kept
 * as its own array so rows can be added/edited without touching markup.
 */
const literatureRows: { paper: string; method: string; advantage: string; disadvantage: string }[] = [
  {
    paper: "sensors-19-03404-v2",
    method: "Traditional Electronic Travel Aids (ETAs) & sensory substitution devices",
    advantage: "Provides direct obstacle-contact feedback",
    disadvantage: "Overwhelms users with simultaneous feedback, causing cognitive overload",
  },
  {
    paper: "brainsci-06-00020",
    method: "Combined audio-haptic feedback",
    advantage: "Improves spatial resolution vs. audio-only guidance",
    disadvantage: "Requires additional wearable haptic hardware",
  },
  {
    paper: "10209_2023_Article_973",
    method: "Follow-up audio-haptic feedback study",
    advantage: "Confirms reduced cognitive load with combined feedback",
    disadvantage: "Findings limited to controlled study conditions",
  },
  {
    paper: "sensors-21-01536-v2",
    method: "Real-time semantic Visual SLAM on wearable RGB-D camera",
    advantage: "Enables 3D scene understanding without heavy processing hardware",
    disadvantage: "Still computationally demanding for continuous real-time use",
  },
  {
    paper: "ijerph-19-03151",
    method: "Study of natural auditory cue reliance in VI navigation",
    advantage: "Identifies need for minimal, on-demand audio feedback",
    disadvantage: "Does not propose a deployable technical system",
  },
  {
    paper: "s00530-024-01350-8",
    method: "On-demand feedback design principles",
    advantage: "Avoids masking ambient / natural sound cues",
    disadvantage: "Requires precise trigger-timing to stay unobtrusive",
  },
  {
    paper: "IEEE 10664580",
    method: "Supporting assistive-navigation reference",
    advantage: "Corroborates core design direction",
    disadvantage: "Limited implementation detail for direct reuse",
  },
  {
    paper: "T&F 02564602.2020.1819893",
    method: "Supporting assistive-navigation reference",
    advantage: "Adds cross-domain validation of approach",
    disadvantage: "Not focused specifically on indoor navigation",
  },
  {
    paper: "MDPI 14/9/3945",
    method: "Supporting assistive-navigation reference",
    advantage: "Reinforces feasibility of sensor-fusion approach",
    disadvantage: "Scope narrower than ECHO's full pipeline",
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
    title: "Literature Review",
    className: "slide--wide",
    content: (
      <>
        <p className="eyebrow">04 · Literature Review</p>
        <h2>Building on prior research</h2>

        <div className="lit-table-wrap">
          <table className="lit-table">
            <thead>
              <tr>
                <th>Paper</th>
                <th>Method</th>
                <th>Advantage</th>
                <th>Disadvantage</th>
              </tr>
            </thead>
            <tbody>
              {literatureRows.map((row) => (
                <tr key={row.paper}>
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
        <p className="eyebrow">05 · Conclusion &amp; Future Scope</p>
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
