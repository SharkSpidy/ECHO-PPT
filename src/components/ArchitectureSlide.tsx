import { ArrowRight, Battery, Camera, Cpu, Hand, Headphones, Radio } from "lucide-react";
import { AGENTS } from "../data/agents";
import { useSlideNav } from "../context/SlideNavContext";

/**
 * The "Architecture" slide: a compact map of the whole system, left to
 * right in true signal-flow order — power/sensor inputs, the wearable
 * enclosure (Pi + Broker), the three software agents, then the external
 * hardware outputs. Clicking an agent jumps straight to its dedicated
 * detail slide via SlideNavContext, rather than expanding inline, so the
 * deck's existing slide chrome (counter, dots, keyboard/swipe nav) keeps
 * working unmodified.
 */
export function ArchitectureSlide() {
  const nav = useSlideNav();

  return (
    <>
      <p className="eyebrow">10 · System Architecture / Block Diagram</p>
      <h2>How ECHO is wired together</h2>
      <p className="subtitle">
        Every component runs locally inside a gutted Xbox 360 S shell — no cloud, no signal to
        lose indoors. Click an agent to see its internal pipeline.
      </p>

      <div className="arch-grid">
        <div className="arch-col">
          <div className="hw-card">
            <Battery size={18} className="hw-icon" style={{ color: "var(--accent)" }} />
            <div>
              <div className="hw-card-label">Battery Pack</div>
              <div className="hw-card-sub">12V / 5V dual output</div>
            </div>
          </div>
          <div className="hw-card">
            <Camera size={18} className="hw-icon" />
            <div>
              <div className="hw-card-label">Xbox 360 Kinect</div>
              <div className="hw-card-sub">Depth (IR) + RGB</div>
            </div>
          </div>
        </div>

        <div className="arch-flow" aria-hidden="true">
          <ArrowRight size={16} />
        </div>

        <div className="enclosure">
          <div className="enclosure-label">Xbox 360 S shell — wearable housing</div>
          <div className="enclosure-inner">
            <div className="enclosure-pi">
              <Cpu size={15} />
              <span>Raspberry Pi</span>
            </div>
            <div className="broker-pill">
              <span className="broker-dot" aria-hidden="true" />
              <Radio size={14} />
              <span>Message Broker</span>
            </div>
          </div>
        </div>

        <div className="arch-flow" aria-hidden="true">
          <ArrowRight size={16} />
        </div>

        <div className="arch-col">
          {AGENTS.map((agent) => {
            const Icon = agent.icon;
            return (
              <button
                key={agent.key}
                className="agent-node"
                style={{ borderLeftColor: agent.color }}
                onClick={() => nav.goTo(agent.slideTitle)}
              >
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

        <div className="arch-flow" aria-hidden="true">
          <ArrowRight size={16} />
        </div>

        <div className="arch-col">
          <div className="hw-card">
            <Hand size={18} className="hw-icon" style={{ color: "var(--accent-3)" }} />
            <div>
              <div className="hw-card-label">Haptic Wristband</div>
              <div className="hw-card-sub">ESP32 / Arduino</div>
            </div>
          </div>
          <div className="hw-card">
            <Headphones size={18} className="hw-icon" style={{ color: "var(--accent)" }} />
            <div>
              <div className="hw-card-label">In-Ear Module</div>
              <div className="hw-card-sub">Panned 3D audio</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
