import { ArrowRight } from "lucide-react";
import { AGENTS } from "../data/agents";
import { useSlideNav } from "../context/SlideNavContext";

/**
 * The "Architecture" slide: Fig 4.1 of the Phase I report (system
 * architecture of ECHO) with the three agents underneath as clickable
 * nodes. Clicking an agent jumps straight to its dedicated detail slide
 * via SlideNavContext, so the deck's slide chrome (counter, dots,
 * keyboard/swipe nav) keeps working unmodified.
 */
export function ArchitectureSlide() {
  const nav = useSlideNav();

  return (
    <>
      <p className="eyebrow">09 · System Architecture / Block Diagram</p>
      <h2>How ECHO is wired together</h2>

      <figure className="figure">
        <div className="uml-diagram-frame">
          <img className="uml-diagram arch-image" src="/images/architecture.png" alt="Fig 4.1: System architecture of ECHO" />
        </div>
        <figcaption>
          <strong>Fig 4.1</strong> · Battery pack and Xbox 360 Kinect feed the Raspberry Pi and Message Broker inside the Xbox 360 S shell. The
          Vision, Haptic and Voice Agents run on this unit and drive the haptic wristband and in-ear module. Processing is local and indoor,
          with no cloud dependency.
        </figcaption>
      </figure>

      <div className="agent-row">
        {AGENTS.map((agent) => {
          const Icon = agent.icon;
          return (
            <button key={agent.key} className="agent-node" style={{ borderLeftColor: agent.color }} onClick={() => nav.goTo(agent.slideTitle)}>
              <span className="agent-node-icon" style={{ color: agent.color, background: `color-mix(in srgb, ${agent.color} 16%, transparent)` }}>
                <Icon size={18} />
              </span>
              <span className="agent-node-text">
                <span className="agent-node-name">{agent.name}</span>
                <span className="agent-node-tagline">{agent.tagline}</span>
              </span>
              <ArrowRight size={15} className="agent-node-arrow" style={{ color: agent.color }} />
            </button>
          );
        })}
      </div>
    </>
  );
}
