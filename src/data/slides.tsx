import type { SlideData } from "../types";
import { ArchitectureSlide } from "../components/ArchitectureSlide";
import { AgentDetailSlide } from "../components/AgentDetailSlide";
import { AGENTS } from "./agents";

/**
 * Deck structure (matches the Phase-I review Table of Contents):
 *
 *   Title -> Team & Guidance -> Table of Contents ->
 *   01 Introduction / Background
 *   02 Problem Statement
 *   03 Objectives of the Project
 *   04 Scope of the Project
 *   05 Existing System
 *   06 Proposed System
 *   07 Literature Review / Related Work   (2 pages, 5 papers each)
 *   08 UML Diagrams
 *   09 Methodology
 *   10 System Architecture / Block Diagram
 *   11 Modules / Main Features            (3 pages: Vision / Haptic / Voice)
 *   12 Technologies Used
 *   13 Expected Outcome
 *   14 Project Timeline / Work Plan
 *   15 References
 *   16 Conclusion
 *
 * As before: to add a slide, push another SlideData object into the
 * `slides` array — nav dots, the counter, keyboard/swipe nav, and the
 * document-title sync all read its length and titles automatically.
 */

const MODULES_LABEL = "11 · Modules / Main Features";

/**
 * Literature Review source rows, split into two pages of five so each
 * page's table stays legible on one slide. Sourced from the ECHO
 * Literature Review document — condensed to one line per column so the
 * table fits a slide; nothing here is invented, only shortened.
 */
const literatureRowsPage1 = [
  {
    authors: "Widyawan, Saputra & Santosa",
    paper: "INVys: Indoor Navigation System for Persons with Visual Impairment Using RGB-D Camera",
    advantage:
      "Auto-Adaptive Double Thresholding splits Kinect depth into left/middle/right zones for obstacle detection (50.2 mm mean error).",
    limitation:
      "Macro-navigation depends on printed optical glyphs; accuracy drops sharply with distance and camera tilt.",
    relevance:
      "Directly shaped ECHO's left/middle/right obstacle-zone design and motivates markerless localization.",
  },
  {
    authors: "Chen, Liu, Kojima, Huang & Arai",
    paper: "A Wearable Navigation Device for Visually Impaired People Based on Real-Time Semantic Visual Localization",
    advantage:
      "Real-time semantic visual localization (feature tracking + CNN segmentation) speaks scene descriptions at roughly 25 fps with centimetre-level accuracy.",
    limitation:
      "Pure visual odometry drifts over time and needs GPU-class embedded hardware plus IMU/GPS fusion.",
    relevance:
      "Main comparison point for ECHO's localization approach — documented drift and hardware cost inform the trade-off.",
  },
  {
    authors: "Real & Araujo",
    paper: "Navigation Systems for the Blind and Visually Impaired: Past Work, Challenges, and Open Problems",
    advantage:
      "Seven-decade survey of ETAs, sensory substitution, and vision-based localization systems; proposes a positioning–monitoring–interface framework.",
    limitation: "Review-only — no original implementation or comparative evaluation of localization strategies.",
    relevance:
      "Positions ECHO within the research landscape and supports splitting feedback across haptic and audio channels.",
  },
  {
    authors: "Li, Munoz, Rong, Chen, Xiao, Tian, Arditi & Yousuf",
    paper: "Vision-Based Mobile Indoor Assistive Navigation Aid for Blind People (ISANA)",
    advantage:
      "Field-tested CAD-map + visual-positioning-service localization with Kalman-filter obstacle tracking; showed no drift versus raw odometry.",
    limitation:
      "Relies on the discontinued Google Tango platform, a pre-built CAD model, and about 1.5 hours of battery life.",
    relevance:
      "Strongest supporting reference for ECHO's architecture — validates pairing localization with dual-modality feedback.",
  },
  {
    authors: "Costa, Fernandes, Vasconcelos, Coelho, Barroso & Hadjileontiadis",
    paper: "Landmarks Detection to Assist the Navigation of Visually Impaired People",
    advantage:
      "Peano–Hilbert curve + EEMD landmark detection compresses image data to 1D, mapped to a five-direction haptic interface.",
    limitation: "Built for outdoor sidewalks, still needs physically installed markers; validation is only qualitative.",
    relevance: "Confirms landmark-based navigation as an established strategy and informs ECHO's directional haptic scheme.",
  },
];

const literatureRowsPage2 = [
  {
    authors: "Barontini, Catalano, Pallottino, Leporini & Bianchi",
    paper: "Integrating Wearable Haptics and Obstacle Avoidance for the Visually Impaired in Indoor Navigation",
    advantage:
      "User-centred CUFF device gives squeeze and skin-stretch cues; Safe/Right/Left obstacle zoning reached 97% directional accuracy.",
    limitation: "Can't distinguish moving from stationary obstacles, and fails in the dark since it relies on RGB only.",
    relevance:
      "Corroborates ECHO's hands-free haptic wristband and zoned obstacle structure; informs camera-range and update-rate specs.",
  },
  {
    authors: "Paratore & Leporini",
    paper: "Exploiting the Haptic and Audio Channels to Improve Orientation and Mobility Apps for the Visually Impaired",
    advantage:
      "GeoJSON map layer pairs distinct vibration patterns with per-category text-to-speech; users preferred combined haptic + audio feedback.",
    limitation:
      "Users reliably told apart only 3–4 of 6 vibration patterns; targets outdoor GPS pre-visit exploration, not real-time indoor use.",
    relevance: "Supports ECHO's dual audio + haptic design and warns against an overly large vibration vocabulary.",
  },
  {
    authors: "Kavitha, Rishi Kiran, Niteesh & Praveen",
    paper: "Multiple Object Recognition Using OpenCV",
    advantage: "HSV colour-space analysis with cascaded HAAR-feature classifiers in OpenCV reached about 98% detection accuracy live.",
    limitation:
      "Limited to a small predefined object set; uses dated cascade classifiers rather than modern deep learning, and isn't VI-specific.",
    relevance: "Supports OpenCV as a viable, low-cost foundation for ECHO's detection component.",
  },
  {
    authors: "Valipoor, de Antonio & Cabrera",
    paper:
      "Analysis and Design Framework for the Development of Indoor Scene Understanding Assistive Solutions for the Person with Visual Impairment/Blindness",
    advantage:
      "Systematic framework defines use cases (scene description, object finding, obstacle avoidance, text reading) and a reference architecture.",
    limitation:
      "Framework-only, with no working implementation; leaves open problems like LLM scene-description hallucination unresolved.",
    relevance: "Justifies ECHO's indoor-only scope and its focus on obstacle avoidance and route-following.",
  },
  {
    authors: "Hou, Zhao, Wang & Liu",
    paper: "Knowledge Driven Indoor Object-Goal Navigation Aid for Visually Impaired People",
    advantage:
      "Helmet-mounted RGB-D system uses a learned object-relation knowledge graph with visual localization to guide users to target objects.",
    limitation: "Needs a full visual mapping pipeline and Jetson-class GPU hardware, with roughly 258 ms of mapping latency per frame.",
    relevance: "Useful contrast case — reinforces that ECHO's simpler route-following task does not need full mapping infrastructure.",
  },
];

function LiteratureTable({ rows, page }: { rows: typeof literatureRowsPage1; page: "1 of 2" | "2 of 2" }) {
  return (
    <>
      <p className="eyebrow">07 · Literature Review / Related Work — Page {page}</p>
      <h2>Building on prior research</h2>
      <div className="lit-table-wrap">
        <table className="lit-table">
          <thead>
            <tr>
              <th>Authors</th>
              <th>Paper</th>
              <th>Advantage</th>
              <th>Limitation</th>
              <th>Relevance to ECHO</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.paper}>
                <td className="lit-authors">{row.authors}</td>
                <td className="lit-paper">{row.paper}</td>
                <td>{row.advantage}</td>
                <td>{row.limitation}</td>
                <td>{row.relevance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function UMLDiagramSlide({ title, image, description }: { title: string; image: string; description: string }) {
  return (
    <>
      <p className="eyebrow">08 · UML Diagrams</p>
      <h2>{title}</h2>
      <p className="subtitle uml-description">{description}</p>
      <div className="uml-diagram-frame">
        <img className="uml-diagram" src={image} alt={`${title} UML diagram`} />
      </div>
    </>
  );
}

/** Existing-system comparison rows — general categories of prior art
 * (not individual papers; see Literature Review for those), grounded in
 * the Problem Statement and the Literature Review source document. */
const existingSystemRows = [
  {
    approach: "White Cane / Guide Dog",
    strength: "Reliable obstacle contact; inexpensive, trusted, and requires no charging.",
    limitation: "No scene understanding; misses upper-body and overhead obstacles.",
    relevance: "Baseline",
  },
  {
    approach: "Electronic Travel Aids (ETAs)",
    strength: "Extend detection range beyond arm's length using ultrasonic/sonar sensing.",
    limitation: "Convey distance only — no spatial or landmark context.",
    relevance: "Baseline",
  },
  {
    approach: "GPS-Based Navigation Apps",
    strength: "Effective, well-adopted guidance outdoors.",
    limitation: "GPS is unavailable indoors, along with tactile paving cues.",
    relevance: "Comparison",
  },
  {
    approach: "Marker / Landmark-Based Systems",
    strength: "Simple, low-cost localization using printed or physical markers.",
    limitation: "Accuracy drops sharply with distance and camera tilt; needs installed infrastructure.",
    relevance: "Closest prior art",
  },
  {
    approach: "Full Visual Localization Systems",
    strength: "Rich, real-time scene description with centimetre-level accuracy.",
    limitation: "Accumulates drift over time and needs GPU-class embedded hardware.",
    relevance: "Comparison",
  },
];

/** Two-column numbered index used by the Table of Contents slide. */
const tocEntries = [
  "Introduction / Background",
  "Problem Statement",
  "Objectives of the Project",
  "Scope of the Project",
  "Existing System",
  "Proposed System",
  "Literature Review / Related Work",
  "UML Diagrams",
  "Methodology",
  "System Architecture / Block Diagram",
  "Modules / Main Features",
  "Technologies Used",
  "Expected Outcome",
  "Project Timeline / Work Plan",
  "References",
  "Conclusion",
];

/** References list, sourced from the same Literature Review document as
 * the Literature Review slides. */
const references = [
  "Widyawan, A. B. Saputra & P. I. Santosa, \u201cINVys: Indoor Navigation System for Persons with Visual Impairment Using RGB-D Camera.\u201d",
  "Z. Chen, X. Liu, M. Kojima, Q. Huang & T. Arai, \u201cA Wearable Navigation Device for Visually Impaired People Based on Real-Time Semantic Visual Localization.\u201d",
  "S. Real & A. Araujo, \u201cNavigation Systems for the Blind and Visually Impaired: Past Work, Challenges, and Open Problems.\u201d",
  "B. Li, J. P. Munoz, X. Rong, Q. Chen, J. Xiao, Y. Tian, A. Arditi & M. Yousuf, \u201cVision-Based Mobile Indoor Assistive Navigation Aid for Blind People (ISANA).\u201d",
  "P. Costa, H. Fernandes, P. Vasconcelos, P. Coelho, J. Barroso & L. Hadjileontiadis, \u201cLandmarks Detection to Assist the Navigation of Visually Impaired People.\u201d",
  "G. Barontini, M. G. Catalano, L. Pallottino, B. Leporini & M. Bianchi, \u201cIntegrating Wearable Haptics and Obstacle Avoidance for the Visually Impaired in Indoor Navigation.\u201d",
  "S. Paratore & B. Leporini, \u201cExploiting the Haptic and Audio Channels to Improve Orientation and Mobility Apps for the Visually Impaired.\u201d",
  "M. Kavitha, V. Rishi Kiran, K. Niteesh & J. Praveen, \u201cMultiple Object Recognition Using OpenCV.\u201d",
  "M. Valipoor, A. de Antonio & J. Cabrera, \u201cAnalysis and Design Framework for the Development of Indoor Scene Understanding Assistive Solutions for the Person with Visual Impairment/Blindness.\u201d",
  "Q. Hou, R. Zhao, S. Wang & Y. Liu, \u201cKnowledge Driven Indoor Object-Goal Navigation Aid for Visually Impaired People.\u201d",
];

export const slides: SlideData[] = [
  // ---------------------------------------------------------------- Title
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
          Indoor navigation · Computer vision · VPR · AI voice guidance
        </p>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--text-muted)",
            fontSize: "0.9rem",
            marginTop: "1.5rem",
          }}
        >
          Guided by Ms. Sweety Joy
        </p>
      </>
    ),
  },

  // -------------------------------------------------------- Team & Guide
  {
    title: "Team & Guidance",
    content: (
      <>
        <p className="eyebrow">Project Team</p>
        <h2>Team &amp; Guidance</h2>
        <div className="card-grid">
          <div className="card">
            <h3>Team Member 01</h3>
            <p>Delna Maria Joseph (AIK23CS052)</p>
          </div>
          <div className="card">
            <h3>Team Member 02</h3>
            <p>Diya S (AIK23CS054)</p>
          </div>
          <div className="card">
            <h3>Team Member 03</h3>
            <p>Joseph Shibu (AIK23CS079)</p>
          </div>
        </div>
        <div className="card" style={{ marginTop: "1.1rem", borderLeft: "3px solid var(--accent)" }}>
          <h3 style={{ color: "var(--accent)" }}>Project Guide</h3>
          <p>Ms. Sweety Joy</p>
        </div>
      </>
    ),
  },

  // ------------------------------------------------------ Table of Contents
  {
    title: "Table of Contents",
    className: "slide--wide",
    content: (
      <>
        <p className="eyebrow">Review Structure</p>
        <h2>Table of Contents</h2>
        <div className="toc-grid">
          {tocEntries.map((entry, i) => (
            <div className="toc-item" key={entry}>
              <span className="toc-num">{String(i + 1).padStart(2, "0")}</span>
              <span>{entry}</span>
            </div>
          ))}
        </div>
      </>
    ),
  },

  // ---------------------------------------------- 01 Introduction / Background
  {
    title: "Introduction",
    content: (
      <>
        <p className="eyebrow">01 · Introduction / Background</p>
        <h2>What is ECHO?</h2>
        <p>
          Prototype indoor navigation system for visually impaired (VI) users.
        </p>
        <div className="card-grid">
          <div className="card">
            <h3>Computer Vision</h3>
            <p>Landmarks · Obstacles · Scene context · Single camera feed</p>
          </div>
          <div className="card">
            <h3>Visual Place Recognition (VPR)</h3>
            <p>Real-time position · Pre-mapped indoor route</p>
          </div>
          <div className="card">
            <h3>AI Voice Guidance</h3>
            <p>Spatial understanding · Timely spoken directions</p>
          </div>
          <div className="card">
            <h3>Obstacle Avoidance</h3>
            <p>Continuous hazard detection · Safe route guidance</p>
          </div>
        </div>
      </>
    ),
  },

  // ------------------------------------------------------- 02 Problem Statement
  {
    title: "Problem Statement",
    content: (
      <>
        <p className="eyebrow">02 · Problem Statement</p>
        <span className="problem-flag">The gap in mobility today</span>
        <h2>Traditional aids can't tell you what's around you.</h2>
        <ul className="list-clean">
          <li>Unfamiliar indoor spaces create major mobility barriers.</li>
          <li>
            White canes and guide dogs: obstacle contact; limited scene understanding, upper-body
            obstacle detection, and landmark awareness.
          </li>
          <li>Limited spatial context increases anxiety and reduces independent mobility.</li>
        </ul>
      </>
    ),
  },

  // -------------------------------------------------- 03 Objectives of the Project
  {
    title: "Objectives",
    content: (
      <>
        <p className="eyebrow">03 · Objectives of the Project</p>
        <h2>What ECHO sets out to do</h2>
        <div className="card-grid">
          <div className="card">
            <h3>Real-Time Obstacle Detection</h3>
            <p>Landmarks · Obstacles · Scene context · Wearable camera</p>
          </div>
          <div className="card">
            <h3>Indoor Localization</h3>
            <p>Real-time VPR localization on pre-mapped indoor routes</p>
          </div>
          <div className="card">
            <h3>Clear Voice Guidance</h3>
            <p>Timely spoken directions · Low cognitive load</p>
          </div>
          <div className="card">
            <h3>Redundant Haptic Feedback</h3>
            <p>Obstacle proximity cues · Haptic Wristband · Multisensory alerts</p>
          </div>
          <div className="card">
            <h3>Self-Contained Wearable Hardware</h3>
            <p>Local agents · Single wearable housing · No cloud dependency</p>
          </div>
        </div>
      </>
    ),
  },

  // -------------------------------------------------------- 04 Scope of the Project
  {
    title: "Scope",
    content: (
      <>
        <p className="eyebrow">04 · Scope of the Project</p>
        <h2>Scope of the Project</h2>
        <div className="card-grid">
          <div className="card">
            <h3>Environment</h3>
            <p>Indoor pre-mapped corridors and rooms</p>
          </div>
          <div className="card">
            <h3>Hardware Fit</h3>
            <p>Kinect · Haptic Wristband · In-ear audio · Laptop or mini-PC</p>
          </div>
          <div className="card">
            <h3>Feedback Channels</h3>
            <p>Combined voice guidance and haptic vibration</p>
          </div>
        </div>
        <p style={{ marginTop: "1.5rem", fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--accent-2)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
          Core MVP
        </p>
        <p style={{ fontWeight: 600, fontSize: "1.2rem" }}>
          Kinect → landmark/obstacle detection → VPR localization → voice + haptic guidance
        </p>
        <ul className="list-clean" style={{ marginTop: "1rem" }}>
          <li>Out of scope: dynamic map generation for unmapped spaces.</li>
          <li>Out of scope: expanded smart-band integrations.</li>
          <li>Out of scope: completely unfamiliar environments.</li>
        </ul>
      </>
    ),
  },

  // ------------------------------------------------------------- 05 Existing System
  {
    title: "Existing System",
    className: "slide--wide",
    content: (
      <>
        <p className="eyebrow">05 · Existing System</p>
        <h2>Existing System – Current Approaches</h2>
        <div className="lit-table-wrap">
          <table className="lit-table">
            <thead>
              <tr>
                <th>Approach</th>
                <th>Strength</th>
                <th>Limitation</th>
                <th>Relevance</th>
                <th>Decision</th>
              </tr>
            </thead>
            <tbody>
              {existingSystemRows.map((row) => (
                <tr key={row.approach}>
                  <td className="lit-authors">{row.approach}</td>
                  <td>{row.strength}</td>
                  <td>{row.limitation}</td>
                  <td>{row.relevance}</td>
                  <td className="lit-paper">
                    {row.relevance === "Closest prior art" ? "Adapt" : "Compare against"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    ),
  },

  // ------------------------------------------------------------- 06 Proposed System
  {
    title: "Proposed System",
    content: (
      <>
        <p className="eyebrow">06 · Proposed System</p>
        <h2>Proposed System – ECHO</h2>
        <div className="pipeline-steps">
          <span className="pipeline-step">1 · Sensing (camera)</span>
          <span className="pipeline-step">2 · Vision Agent</span>
          <span className="pipeline-step">3 · Message Broker</span>
          <span className="pipeline-step">4 · Haptic Agent</span>
          <span className="pipeline-step">4 · Voice Agent</span>
          <span className="pipeline-step">5 · Wearable Output</span>
        </div>
        <p style={{ marginTop: "1.75rem", fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--accent-2)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
          Architecture Principle
        </p>
        <h2 style={{ fontSize: "1.4rem" }}>One on-device vision pipeline, two independent feedback agents</h2>
        <ul className="list-clean" style={{ maxWidth: "820px" }}>
          <li>Vision Agent: camera feed → occupancy grid → local Message Broker.</li>
          <li>Haptic and Voice Agents: independent subscriptions and alerts.</li>
          <li>Independent channels: one delay or failure does not block the other.</li>
        </ul>
      </>
    ),
  },

  // ------------------------------------------------ 07 Literature Review (2 pages)
  {
    title: "Literature Review I",
    className: "slide--wide",
    content: <LiteratureTable rows={literatureRowsPage1} page="1 of 2" />,
  },
  {
    title: "Literature Review II",
    className: "slide--wide",
    content: <LiteratureTable rows={literatureRowsPage2} page="2 of 2" />,
  },

  // ------------------------------------------------------------ 08 UML Diagrams
  {
    title: "Use-Case Diagram",
    className: "slide--wide",
    content: (
      <UMLDiagramSlide
        title="Use-Case Diagram"
        image="/images/usecase.png"
        description="Actors · System interactions · Assistive navigation workflow"
      />
    ),
  },
  {
    title: "Sequence Diagram",
    className: "slide--wide",
    content: (
      <UMLDiagramSlide
        title="Sequence Diagram"
        image="/images/sequence.png"
        description="Sensing · Agent processing · User feedback"
      />
    ),
  },
  {
    title: "Activity Diagram",
    className: "slide--wide",
    content: (
      <UMLDiagramSlide
        title="Activity Diagram"
        image="/images/activity.png"
        description="Detection · Interpretation · Navigation event communication"
      />
    ),
  },
  {
    title: "Class Diagram",
    className: "slide--wide",
    content: (
      <UMLDiagramSlide
        title="Class Diagram"
        image="/images/class.png"
        description="Core software classes · Relationships · Modular architecture"
      />
    ),
  },

  // -------------------------------------------------------------- 09 Methodology
  {
    title: "Methodology",
    content: (
      <>
        <p className="eyebrow">09 · Methodology</p>
        <h2>Methodology</h2>
        <p>Shared agent pipeline: Input → Process → Output</p>
        <div className="card-grid">
          <div className="card">
            <h3>Input</h3>
            <p>Message Broker or raw sensor stream · Current spatial state</p>
          </div>
          <div className="card">
            <h3>Process</h3>
            <p>Point cloud → occupancy grid · Distance → vibration · Hazard → speech</p>
          </div>
          <div className="card">
            <h3>Output</h3>
            <p>Motor driver · In-ear audio panner · Message Broker</p>
          </div>
        </div>
        <p className="subtitle" style={{ marginTop: "1.5rem" }}>
          Section 11: Agent-specific input → process → output pipelines
        </p>
      </>
    ),
  },

  // ------------------------------------------- 10 System Architecture / Block Diagram
  {
    title: "Architecture",
    className: "slide--wide",
    content: <ArchitectureSlide />,
  },

  // -------------------------------------------------------- 11 Modules / Main Features
  ...AGENTS.map((agent) => ({
    title: agent.slideTitle,
    content: <AgentDetailSlide agent={agent} sectionLabel={MODULES_LABEL} />,
  })),

  // ------------------------------------------------------------ 12 Technologies Used
  {
    title: "Technologies",
    content: (
      <>
        <p className="eyebrow">12 · Technologies Used</p>
        <h2>Technologies Used</h2>
        <div className="card-grid">
          <div className="card">
            <h3>Hardware</h3>
            <ul className="list-clean">
              <li>Laptop or mini-PC · Intel i5/i7 or Ryzen 5/7</li>
              <li>8 GB RAM minimum · 16 GB recommended for VPR</li>
              <li>Kinect · RGB-D capture and localization</li>
              <li>Speaker or earphone · Voice output</li>
              <li>Haptic Wristband · ESP32 / Arduino control</li>
            </ul>
          </div>
          <div className="card">
            <h3>Software</h3>
            <ul className="list-clean">
              <li>Python · AI modules, computer vision, voice processing</li>
              <li>OpenCV + VPR libraries · Recognition and localization</li>
              <li>React + TypeScript · Presentation and interface</li>
              <li>Vite · Frontend development and local testing</li>
              <li>Cloud or local speech synthesis APIs · Optional</li>
            </ul>
          </div>
        </div>
      </>
    ),
  },

  // -------------------------------------------------------------- 13 Expected Outcome
  {
    title: "Expected Outcome",
    content: (
      <>
        <p className="eyebrow">13 · Expected Outcome</p>
        <h2>Expected Outcome</h2>
        <div className="card-grid">
          <div className="card">
            <h3>Reliable Navigation</h3>
            <p>Low-cognitive-load indoor navigation · Computer vision · VPR · Voice guidance</p>
          </div>
          <div className="card">
            <h3>Real-Time Hazard Avoidance</h3>
            <p>Continuous obstacle detection and route adjustment</p>
          </div>
          <div className="card">
            <h3>Greater Independence</h3>
            <p>Reduced reliance on sighted assistance · Familiar indoor spaces</p>
          </div>
          <div className="card">
            <h3>A Foundation to Build On</h3>
            <p>Foundation for dynamic mapping, wearable integrations, and unfamiliar environments</p>
          </div>
        </div>
        <p className="subtitle" style={{ marginTop: "1.5rem" }}>
          Success criterion: complements traditional aids such as the cane or guide dog
        </p>
      </>
    ),
  },

  // ---------------------------------------------------- 14 Project Timeline / Work Plan
  {
    title: "Timeline",
    content: (
      <>
        <p className="eyebrow">14 · Project Timeline / Work Plan</p>
        <h2>Project Timeline / Work Plan</h2>
        <div className="card-grid">
          <div className="card">
            <h3>Stage 1</h3>
            <p>Wearable housing · Camera · Battery · Enclosure wiring</p>
          </div>
          <div className="card">
            <h3>Stage 2</h3>
            <p>Point-cloud generation · 2D occupancy grid pipeline</p>
          </div>
          <div className="card">
            <h3>Stage 3</h3>
            <p>Distance-to-vibration mapping · Wristband integration</p>
          </div>
          <div className="card">
            <h3>Stage 4</h3>
            <p>Hazard filtering · Offline TTS · 3D audio panning</p>
          </div>
          <div className="card">
            <h3>Stage 5</h3>
            <p>Three-agent integration · Local Message Broker</p>
          </div>
          <div className="card">
            <h3>Stage 6</h3>
            <p>Indoor route trials · Guidance timing refinement</p>
          </div>
        </div>
      </>
    ),
  },

  // -------------------------------------------------------------------- 15 References
  {
    title: "References",
    className: "slide--wide",
    content: (
      <>
        <p className="eyebrow">15 · References</p>
        <h2>References</h2>
        <div className="toc-grid">
          {references.map((ref, i) => (
            <div className="toc-item" key={ref}>
              <span className="toc-num">[{i + 1}]</span>
              <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{ref}</span>
            </div>
          ))}
        </div>
      </>
    ),
  },

  // ------------------------------------------------------------------- 16 Conclusion
  {
    title: "Conclusion",
    content: (
      <>
        <p className="eyebrow">16 · Conclusion</p>
        <h2>Reliable, low-cognitive-load indoor navigation</h2>
        <ul className="list-clean">
          <li>Computer vision · VPR · Voice guidance</li>
          <li>Obstacle awareness · Accessible user support</li>
          <li>Indoor, pre-mapped route focus</li>
        </ul>
        <div className="card-grid">
          <div className="card">
            <h3>Dynamic map generation</h3>
            <p>On-the-fly indoor mapping beyond pre-mapped routes</p>
          </div>
          <div className="card">
            <h3>Night Vision</h3>
            <p>IR camera integration for low-light navigation</p>
          </div>
          <div className="card">
            <h3>Unfamiliar environments</h3>
            <p>Navigation in previously unseen spaces</p>
          </div>
        </div>
      </>
    ),
  },
];
