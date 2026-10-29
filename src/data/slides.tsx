import type { ReactNode } from "react";
import type { SlideData } from "../types";
import { ArchitectureSlide } from "../components/ArchitectureSlide";
import { AgentDetailSlide } from "../components/AgentDetailSlide";
import { AGENTS } from "./agents";
import { literature, type LiteratureRow } from "./literature";

/**
 * Deck structure (Project Phase I — Second Review). Every statement,
 * table and image comes from the ECHO Project Phase I report.
 *
 *   Title -> Team & Guidance -> Table of Contents ->
 *   01 Introduction / Background
 *   02 Problem Statement
 *   03 Objectives of the Project
 *   04 Scope of the Project
 *   05 Existing System
 *   06 Literature Review / Related Work   (4 pages)
 *   07 Proposed System
 *   08 Methodology
 *   09 System Architecture / Block Diagram
 *   10 UML Diagrams                       (use-case, sequence, activity, class)
 *   11 Modules / Main Features            (overview + Vision / Haptic / Voice)
 *   12 System Components / Technologies
 *   13 Expected Outcome
 *   14 Snapshots                          (UI, wristband + top view, setup)
 *   15 SDG Mapping
 *   16 Conclusion
 *   17 References
 *
 * To add a slide, push another SlideData object into the `slides` array —
 * nav dots, the counter, keyboard/swipe nav, and the document-title sync
 * all read its length and titles automatically.
 */

const MODULES_LABEL = "11 · Modules / Main Features";

/* ------------------------------------------------------------------ helpers */

/** Diagram on a white frame (the report's diagrams are drawn on white). */
function Figure({ src, alt, caption, className }: { src: string; alt: string; caption: string; className?: string }) {
  return (
    <figure className={`figure ${className ?? ""}`}>
      <div className="uml-diagram-frame">
        <img className="uml-diagram" src={src} alt={alt} />
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

/** Text on one side, figure on the other. */
function Split({ children, figure, reverse }: { children: ReactNode; figure: ReactNode; reverse?: boolean }) {
  return (
    <div className={`split${reverse ? " split--reverse" : ""}`}>
      {reverse ? figure : null}
      <div className="split-text">{children}</div>
      {reverse ? null : figure}
    </div>
  );
}

function LiteratureTable({ rows, page }: { rows: LiteratureRow[]; page: number }) {
  return (
    <>
      <p className="eyebrow">06 · Literature Review / Related Work — Page {page} of 4</p>
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
              <tr key={row.ref}>
                <td className="lit-authors">
                  {row.ref} {row.authors}
                </td>
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

/** Table 2.1 of the report. */
const existingSystemRows = [
  {
    approach: "White Cane / Guide Dog",
    strength: "Reliable obstacle contact; inexpensive, trusted and needs no charging.",
    limitation: "No scene understanding; misses upper-body and overhead obstacles.",
    decision: "Baseline – compare against",
  },
  {
    approach: "Electronic Travel Aids (ETAs)",
    strength: "Extend detection range beyond arm's length using ultrasonic/sonar sensing.",
    limitation: "Convey distance only – no spatial or landmark context.",
    decision: "Baseline – compare against",
  },
  {
    approach: "GPS-Based Navigation Apps",
    strength: "Effective, well-adopted guidance outdoors.",
    limitation: "GPS is unavailable indoors, as are tactile paving cues.",
    decision: "Comparison – compare against",
  },
  {
    approach: "Marker / Landmark-Based Systems",
    strength: "Simple, low-cost localisation using printed or physical markers.",
    limitation: "Accuracy drops sharply with distance and camera tilt; needs installed infrastructure.",
    decision: "Closest prior art – adapt",
  },
  {
    approach: "Full Visual Localisation Systems",
    strength: "Rich, real-time scene description with centimetre-level accuracy.",
    limitation: "Accumulates drift over time and needs GPU-class embedded hardware.",
    decision: "Comparison – compare against",
  },
];

const tocEntries = [
  "Introduction / Background",
  "Problem Statement",
  "Objectives of the Project",
  "Scope of the Project",
  "Existing System",
  "Literature Review / Related Work",
  "Proposed System",
  "Methodology",
  "System Architecture",
  "UML Diagrams",
  "Modules / Main Features",
  "System Components / Technologies",
  "Expected Outcome",
  "Snapshots",
  "SDG Mapping",
  "Conclusion",
  "References",
];

const references = [
  "Widyawan, A. B. Saputra and P. I. Santosa, “INVys: Indoor Navigation System for Persons with Visual Impairment Using RGB-D Camera.”",
  "Z. Chen, X. Liu, M. Kojima, Q. Huang and T. Arai, “A Wearable Navigation Device for Visually Impaired People Based on Real-Time Semantic Visual Localization.”",
  "S. Real and A. Araujo, “Navigation Systems for the Blind and Visually Impaired: Past Work, Challenges, and Open Problems.”",
  "B. Li, J. P. Munoz, X. Rong, Q. Chen, J. Xiao, Y. Tian, A. Arditi and M. Yousuf, “Vision-Based Mobile Indoor Assistive Navigation Aid for Blind People (ISANA).”",
  "P. Costa, H. Fernandes, P. Vasconcelos, P. Coelho, J. Barroso and L. Hadjileontiadis, “Landmarks Detection to Assist the Navigation of Visually Impaired People.”",
  "G. Barontini, M. G. Catalano, L. Pallottino, B. Leporini and M. Bianchi, “Integrating Wearable Haptics and Obstacle Avoidance for the Visually Impaired in Indoor Navigation.”",
  "S. Paratore and B. Leporini, “Exploiting the Haptic and Audio Channels to Improve Orientation and Mobility Apps for the Visually Impaired.”",
  "M. Kavitha, V. Rishi Kiran, K. Niteesh and J. Praveen, “Multiple Object Recognition Using OpenCV.”",
  "M. Valipoor, A. de Antonio and J. Cabrera, “Analysis and Design Framework for the Development of Indoor Scene Understanding Assistive Solutions for the Person with Visual Impairment/Blindness.”",
  "Q. Hou, R. Zhao, S. Wang and Y. Liu, “Knowledge Driven Indoor Object-Goal Navigation Aid for Visually Impaired People.”",
];

const eyebrowAccent = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.85rem",
  color: "var(--accent-2)",
  letterSpacing: "0.06em",
  textTransform: "uppercase" as const,
};

/* -------------------------------------------------------------------- slides */

export const slides: SlideData[] = [
  // ---------------------------------------------------------------- Title
  {
    title: "Title",
    content: (
      <>
        <p className="eyebrow">Project Phase I · Second Review</p>
        <h1>
          ECHO
          <br />
          AI-Powered Navigation Assistant
          <br />
          for Visually Impaired Users
        </h1>
        <p className="subtitle">Indoor navigation · Computer vision · VPR · AI voice guidance</p>
        <div className="title-meta">
          <img className="title-logo" src="/images/aisat-logo.png" alt="AISAT logo" />
          <div>
            <p className="title-meta-line">Department of Computer Science and Engineering</p>
            <p className="title-meta-line title-meta-muted">AISAT Kalamassery, Kochi · 2026-2027</p>
            <p className="title-meta-line title-meta-muted">Guided by Asst. Prof. Ms. Sweety Joy</p>
          </div>
        </div>
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
        <div className="card-grid">
          <div className="card card--accent">
            <h3 style={{ color: "var(--accent)" }}>Project Guide</h3>
            <p>Asst. Prof. Ms. Sweety Joy, Department of CSE, AISAT</p>
          </div>
          <div className="card card--accent">
            <h3 style={{ color: "var(--accent)" }}>Head of Department</h3>
            <p>Assoc. Prof. Dr. Jeswin Roy DCouth, Department of CSE, AISAT</p>
          </div>
          <div className="card card--accent">
            <h3 style={{ color: "var(--accent)" }}>Project Coordinators</h3>
            <p>Asst. Prof. Ms. Sinijoy PJ · Assoc. Prof. Dr. Jeswin Roy DCouth</p>
          </div>
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
          A prototype indoor navigation system for visually impaired (VI) users. It uses a wearable camera feed to understand the
          surroundings, recognises the user's position on a pre-mapped indoor route, and guides the user with timely spoken directions
          and haptic alerts.
        </p>
        <div className="card-grid">
          <div className="card">
            <h3>Computer Vision</h3>
            <p>Landmarks, obstacles and scene context extracted from a single camera feed.</p>
          </div>
          <div className="card">
            <h3>Visual Place Recognition (VPR)</h3>
            <p>The user's position is estimated in real time along a pre-mapped indoor route.</p>
          </div>
          <div className="card">
            <h3>AI Voice Guidance</h3>
            <p>Spatial understanding is converted into timely spoken directions.</p>
          </div>
          <div className="card">
            <h3>Obstacle Avoidance</h3>
            <p>Hazards are detected continuously so the user is guided along a safe route.</p>
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
          <li>Unfamiliar indoor spaces create major mobility barriers for visually impaired people.</li>
          <li>
            White canes and guide dogs depend on obstacle contact: limited scene understanding, limited detection of upper-body
            obstacles and little landmark awareness.
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
            <p>Detect landmarks, obstacles and scene context from a wearable camera in real time.</p>
          </div>
          <div className="card">
            <h3>Indoor Localisation</h3>
            <p>Use real-time VPR to localise the user on pre-mapped indoor routes.</p>
          </div>
          <div className="card">
            <h3>Clear Voice Guidance</h3>
            <p>Deliver timely spoken directions that keep the cognitive load on the user low.</p>
          </div>
          <div className="card">
            <h3>Redundant Haptic Feedback</h3>
            <p>Provide obstacle-proximity cues through a haptic wristband so alerts are multisensory.</p>
          </div>
          <div className="card">
            <h3>Self-Contained Wearable Hardware</h3>
            <p>Run local agents inside a single wearable housing with no cloud dependency.</p>
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
            <p>Indoor, pre-mapped corridors and rooms.</p>
          </div>
          <div className="card">
            <h3>Hardware Fit</h3>
            <p>Kinect, haptic wristband, in-ear audio, and a laptop or mini-PC.</p>
          </div>
          <div className="card">
            <h3>Feedback Channels</h3>
            <p>Combined voice guidance and haptic vibration.</p>
          </div>
        </div>
        <p style={{ ...eyebrowAccent, marginTop: "1.5rem" }}>Core MVP</p>
        <div className="pipeline-steps">
          <span className="pipeline-step">Kinect</span>
          <span className="pipeline-step">Landmark / obstacle detection</span>
          <span className="pipeline-step">VPR localisation</span>
          <span className="pipeline-step">Voice + haptic guidance</span>
        </div>
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
        <h2>Existing Systems – Current Approaches</h2>
        <div className="lit-table-wrap">
          <table className="lit-table lit-table--4">
            <thead>
              <tr>
                <th>Approach</th>
                <th>Strength</th>
                <th>Limitation</th>
                <th>Relevance / Decision</th>
              </tr>
            </thead>
            <tbody>
              {existingSystemRows.map((row) => (
                <tr key={row.approach}>
                  <td className="lit-authors">{row.approach}</td>
                  <td>{row.strength}</td>
                  <td>{row.limitation}</td>
                  <td className="lit-paper">{row.decision}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    ),
  },

  // ------------------------------------------------ 06 Literature Review (4 pages)
  {
    title: "Literature Review I",
    className: "slide--wide",
    content: <LiteratureTable rows={literature.slice(0, 3)} page={1} />,
  },
  {
    title: "Literature Review II",
    className: "slide--wide",
    content: <LiteratureTable rows={literature.slice(3, 6)} page={2} />,
  },
  {
    title: "Literature Review III",
    className: "slide--wide",
    content: <LiteratureTable rows={literature.slice(6, 8)} page={3} />,
  },
  {
    title: "Literature Review IV",
    className: "slide--wide",
    content: <LiteratureTable rows={literature.slice(8, 10)} page={4} />,
  },

  // ------------------------------------------------------------- 07 Proposed System
  {
    title: "Proposed System",
    content: (
      <>
        <p className="eyebrow">07 · Proposed System</p>
        <h2>Proposed System – ECHO</h2>
        <div className="pipeline-steps">
          <span className="pipeline-step">1 · Sensing (camera)</span>
          <span className="pipeline-step">2 · Vision Agent</span>
          <span className="pipeline-step">3 · Message Broker</span>
          <span className="pipeline-step">4 · Haptic Agent</span>
          <span className="pipeline-step">4 · Voice Agent</span>
          <span className="pipeline-step">5 · Wearable Output</span>
        </div>
        <p style={{ ...eyebrowAccent, marginTop: "1.75rem" }}>Architecture Principle</p>
        <h2 style={{ fontSize: "1.4rem" }}>One on-device vision pipeline, two independent feedback agents</h2>
        <ul className="list-clean" style={{ maxWidth: "820px" }}>
          <li>Vision Agent: the Kinect feed is turned into an occupancy grid and published to the local Message Broker.</li>
          <li>Haptic and Voice Agents: each subscribes independently to the Message Broker and raises its own alerts.</li>
          <li>Independent channels: one delay or failure does not block the other.</li>
        </ul>
      </>
    ),
  },

  // -------------------------------------------------------------- 08 Methodology
  {
    title: "Methodology",
    content: (
      <>
        <p className="eyebrow">08 · Methodology</p>
        <h2>Methodology</h2>
        <p>All agents follow a shared pipeline: Input → Process → Output.</p>
        <div className="card-grid">
          <div className="card">
            <h3>Input</h3>
            <p>Local Message Broker or raw sensor stream · Current spatial state</p>
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
          Agent-specific Input → Process → Output pipelines follow in Modules / Main Features
        </p>
      </>
    ),
  },

  // ------------------------------------------- 09 System Architecture / Block Diagram
  {
    title: "Architecture",
    className: "slide--wide",
    content: <ArchitectureSlide />,
  },

  // ------------------------------------------------------------ 10 UML Diagrams
  {
    title: "Use-Case Diagram",
    className: "slide--wide",
    content: (
      <>
        <p className="eyebrow">10 · UML Diagrams · 4.4.1</p>
        <h2>Use-Case Diagram</h2>
        <Split figure={<Figure src="/images/usecase.jpg" alt="Use-case diagram of ECHO" caption="Fig 4.2: Use-case diagram of ECHO" />}>
          <p className="split-lead">The user (visually impaired) can:</p>
          <ul className="list-clean">
            <li>Start navigation – includes retrieving the pre-mapped route from the Map Service.</li>
            <li>Receive navigation guidance (audio) – voice instructions through the Voice Assistant (text-to-speech).</li>
            <li>Receive obstacle alerts (audio / haptic) – obstacles detected with the Kinect depth sensor, with haptic feedback through the wristband.</li>
            <li>Stop navigation.</li>
          </ul>
        </Split>
      </>
    ),
  },
  {
    title: "Sequence Diagram",
    className: "slide--wide",
    content: (
      <>
        <p className="eyebrow">10 · UML Diagrams · 4.4.2</p>
        <h2>Sequence Diagram</h2>
        <Split reverse figure={<Figure src="/images/sequence.jpg" alt="Sequence diagram of ECHO" caption="Fig 4.3: Sequence diagram of ECHO" />}>
          <p className="subtitle">
            Participants: user, ECHO app, Map Service, Navigation Engine, Kinect camera, Voice Assistant and wristband.
          </p>
          <ul className="list-clean">
            <li>The user opens the app and enters a destination by voice or text.</li>
            <li>The app requests the pre-mapped route; the Navigation Engine generates instructions and the Voice Assistant speaks them.</li>
            <li>Loop while navigating: Kinect depth → obstacle detection → alert → audio warning and haptic vibration.</li>
            <li>Navigation ends when the user stops it.</li>
          </ul>
        </Split>
      </>
    ),
  },
  {
    title: "Activity Diagram",
    className: "slide--wide",
    content: (
      <>
        <p className="eyebrow">10 · UML Diagrams · 4.4.3</p>
        <h2>Activity Diagram</h2>
        <Split figure={<Figure className="figure--tall" src="/images/activity.jpg" alt="Activity diagram of ECHO" caption="Fig 4.4: Activity diagram of ECHO" />}>
          <p className="split-lead">The workflow is divided into six swim-lanes:</p>
          <ul className="list-clean list-clean--tight">
            <li><strong>User interaction</strong> – open the app, start navigation.</li>
            <li><strong>System initialisation</strong> – load the pre-mapped environment, initialise Kinect and wristband, set indoor position, generate path.</li>
            <li><strong>Navigation &amp; guidance</strong> – next waypoint, generate and send instructions, user moves forward.</li>
            <li><strong>Obstacle detection (parallel)</strong> – capture and process depth data, identify obstacles, compare with the pre-mapped environment.</li>
            <li><strong>Feedback to user</strong> – obstacle: audio warning and wristband vibration; otherwise continue audio guidance.</li>
            <li><strong>Monitoring &amp; loop</strong> – update position, check navigation is active, recalculate path or end.</li>
          </ul>
        </Split>
      </>
    ),
  },
  {
    title: "Class Diagram",
    className: "slide--wide",
    content: (
      <>
        <p className="eyebrow">10 · UML Diagrams · 4.4.4</p>
        <h2>Class Diagram</h2>
        <Split reverse figure={<Figure src="/images/class.jpg" alt="Class diagram of ECHO" caption="Fig 4.5: Class diagram of ECHO" />}>
          <p className="split-lead">A modular software architecture:</p>
          <ul className="list-clean">
            <li><strong>ECHOApp</strong> is the central class, used by the User.</li>
            <li>It requests routes from <strong>MapService</strong> and receives sensor data from <strong>KinectCamera</strong>.</li>
            <li>It sends voice instructions to <strong>VoiceAssistant</strong> and haptic alerts to <strong>Wristband</strong>.</li>
            <li><strong>NavigationEngine</strong> uses <strong>Route</strong>, processes environment data, detects obstacles and generates instructions.</li>
            <li><strong>KinectCamera</strong> detects zero or more <strong>Obstacle</strong> objects.</li>
          </ul>
        </Split>
      </>
    ),
  },

  // -------------------------------------------------------- 11 Modules / Main Features
  {
    title: "Modules Overview",
    className: "slide--wide",
    content: (
      <>
        <p className="eyebrow">{MODULES_LABEL}</p>
        <h2>Three agents, one shared pipeline</h2>
        <div className="lit-table-wrap">
          <table className="lit-table lit-table--4">
            <thead>
              <tr>
                <th>Agent</th>
                <th>Input</th>
                <th>Process</th>
                <th>Output</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="lit-authors" style={{ color: "var(--accent-2)" }}>Vision Agent</td>
                <td>Raw IR and depth array from the Xbox 360 Kinect (over USB)</td>
                <td>OpenCV point-cloud generator; 2D occupancy grid converter</td>
                <td>JSON spatial payload published to the local Message Broker</td>
              </tr>
              <tr>
                <td className="lit-authors" style={{ color: "var(--accent-3)" }}>Haptic Agent</td>
                <td>Spatial data subscriber (occupancy grid from the Message Broker)</td>
                <td>Distance-to-PWM mapping; serial protocol formatter</td>
                <td>Serial out to the ESP32 motor controller of the haptic wristband</td>
              </tr>
              <tr>
                <td className="lit-authors" style={{ color: "var(--accent)" }}>Voice Agent</td>
                <td>Spatial data subscriber (occupancy grid from the Message Broker)</td>
                <td>Hazard threshold filter; offline TTS engine</td>
                <td>3D audio panner to the in-ear module</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  ...AGENTS.map((agent) => ({
    title: agent.slideTitle,
    content: <AgentDetailSlide agent={agent} sectionLabel={MODULES_LABEL} />,
  })),

  // ------------------------------------------- 12 System Components / Technologies
  {
    title: "Technologies",
    content: (
      <>
        <p className="eyebrow">12 · System Components / Technologies Used</p>
        <h2>Hardware and software</h2>
        <div className="card-grid">
          <div className="card">
            <h3>Hardware</h3>
            <ul className="list-clean list-clean--tight">
              <li>Xbox 360 Kinect · depth (IR) + RGB capture over USB</li>
              <li>Raspberry Pi in Xbox 360 S shell · local processing and wearable housing</li>
              <li>Battery pack (12V / 5V dual output) · powers Kinect and processor</li>
              <li>Haptic wristband (ESP32 / Arduino) · vibration output</li>
              <li>In-ear module / speaker or earphone · spoken warnings, panned 3D audio</li>
              <li>Laptop or mini-PC · i5/i7 or Ryzen 5/7, 8 GB RAM minimum, 16 GB recommended for VPR</li>
            </ul>
          </div>
          <div className="card">
            <h3>Software</h3>
            <ul className="list-clean list-clean--tight">
              <li>Python · AI modules, computer vision and voice processing</li>
              <li>OpenCV + VPR libraries · recognition, localisation, point-cloud generation</li>
              <li>React + TypeScript · presentation and interface</li>
              <li>Vite · frontend development and local testing</li>
              <li>Speech synthesis · cloud or local APIs optional; the Voice Agent uses an offline local TTS engine</li>
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
            <p>Low-cognitive-load indoor navigation using computer vision, VPR and voice guidance.</p>
          </div>
          <div className="card">
            <h3>Real-Time Hazard Avoidance</h3>
            <p>Continuous obstacle detection and route adjustment.</p>
          </div>
          <div className="card">
            <h3>Greater Independence</h3>
            <p>Reduced reliance on sighted assistance in familiar indoor spaces.</p>
          </div>
          <div className="card">
            <h3>A Foundation to Build On</h3>
            <p>A foundation for dynamic mapping, wearable integrations and unfamiliar environments.</p>
          </div>
        </div>
        <p className="banner">
          <strong>Success criterion:</strong> ECHO complements traditional aids such as the cane or guide dog.
        </p>
      </>
    ),
  },

  // ------------------------------------------------------------------ 14 Snapshots
  {
    title: "Snapshot: ECHO UI",
    className: "slide--wide",
    content: (
      <>
        <p className="eyebrow">14 · Snapshots · 6.2</p>
        <h2>ECHO UI</h2>
        <div className="split split--ui">
          <div className="split-text">
            <p className="split-lead">Voice-first interface</p>
            <ul className="list-clean">
              <li>A large Speak button: tap it and say where you want to go.</li>
              <li>Connection status for the camera, microphone, haptic wristband and in-ear module.</li>
              <li>Phone-based backup connections for the haptic and audio outputs.</li>
            </ul>
          </div>
          <figure className="figure">
            <div className="phone-pair">
              <img src="/images/ui-1.jpeg" alt="ECHO UI screenshot: Speak button and connections" />
              <img src="/images/ui-2.jpeg" alt="ECHO UI screenshot: connection status and camera preview" />
            </div>
            <figcaption>Fig 4.6: ECHO UI</figcaption>
          </figure>
        </div>
      </>
    ),
  },
  {
    title: "Snapshot: Hardware",
    className: "slide--wide",
    content: (
      <>
        <p className="eyebrow">14 · Snapshots · 6.2</p>
        <h2>Haptic wristband and top view</h2>
        <div className="snap-pair">
          <Figure src="/images/wristband.jpeg" alt="Haptic wristband design" caption="Fig 4.7: Haptic Wristband Design – ESP32 Wi-Fi module and vibration motor (GPIO signal and GND)" />
          <Figure src="/images/topview.jpeg" alt="Top view of the ECHO setup" caption="Fig 4.8: Top View – Kinect captures the room, ECHO detects the obstacle, ESP32 vibrates the wristband" />
        </div>
      </>
    ),
  },
  {
    title: "Snapshot: Setup",
    className: "slide--wide",
    content: (
      <>
        <p className="eyebrow">14 · Snapshots · 6.2</p>
        <h2>Prototype setup</h2>
        <Split figure={<Figure src="/images/setup.jpeg" alt="ECHO setup" caption="Fig 4.9: Setup" />}>
          <p className="split-lead">Setup components</p>
          <ul className="list-clean">
            <li>Kinect sensor with Kinect USB adapter.</li>
            <li>Laptop running the ECHO application with obstacle detection.</li>
            <li>ESP32 Wi-Fi module on the haptic feedback wristband.</li>
            <li>Wireless communication between the laptop and the wristband.</li>
          </ul>
        </Split>
      </>
    ),
  },

  // ------------------------------------------------------------------- 15 SDG Mapping
  {
    title: "SDG Mapping",
    content: (
      <>
        <p className="eyebrow">15 · SDG Mapping</p>
        <h2>Relevance to the Sustainable Development Goals</h2>
        <div className="card-grid">
          <div className="card">
            <h3>SDG 3 · Good health and well-being</h3>
            <p>Supports the well-being of visually impaired users by reducing collision risk and the anxiety of moving through unfamiliar indoor spaces.</p>
          </div>
          <div className="card">
            <h3>SDG 9 · Industry, Innovation and Infrastructure</h3>
            <p>A low-cost, self-contained wearable (Kinect, Raspberry Pi, ESP32) using local processing, with no cloud dependency or installed infrastructure.</p>
          </div>
          <div className="card">
            <h3>SDG 10 · Reduced Inequalities</h3>
            <p>Narrows the mobility gap by giving spatial context that a cane or guide dog alone cannot, and reduces reliance on sighted assistance.</p>
          </div>
          <div className="card">
            <h3>SDG 11 · Sustainable Cities and Communities</h3>
            <p>Contributes to inclusive, accessible indoor public spaces by enabling independent navigation of pre-mapped corridors and rooms.</p>
          </div>
        </div>
      </>
    ),
  },

  // -------------------------------------------------------------------- 16 Conclusion
  {
    title: "Conclusion",
    content: (
      <>
        <p className="eyebrow">16 · Conclusion</p>
        <h2>Reliable, low-cognitive-load indoor navigation</h2>
        <ul className="list-clean">
          <li>Computer vision · VPR · voice guidance · obstacle awareness.</li>
          <li>Reduces the mental effort needed to navigate complex indoor spaces through an intuitive, voice-based interface.</li>
          <li>Focused on indoor, pre-mapped routes.</li>
        </ul>
        <p style={{ ...eyebrowAccent, marginTop: "1.5rem" }}>Future directions</p>
        <div className="card-grid">
          <div className="card">
            <h3>Dynamic map generation</h3>
            <p>On-the-fly indoor mapping, enabling navigation beyond pre-mapped routes.</p>
          </div>
          <div className="card">
            <h3>Night Vision</h3>
            <p>IR camera integration to support low-light navigation.</p>
          </div>
          <div className="card">
            <h3>Unfamiliar environments</h3>
            <p>Operating effectively in previously unseen spaces.</p>
          </div>
        </div>
      </>
    ),
  },

  // -------------------------------------------------------------------- 17 References
  {
    title: "References",
    className: "slide--wide",
    content: (
      <>
        <p className="eyebrow">17 · References</p>
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
];
