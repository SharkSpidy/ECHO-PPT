import { ArrowLeft, ArrowRight } from "lucide-react";
import type { AgentInfo } from "../data/agents";
import { useSlideNav } from "../context/SlideNavContext";

/**
 * Detail slide for one agent's internal pipeline, reached by clicking
 * that agent's node on the Architecture slide (or by paging through the
 * deck normally — it's a real slide, not a modal). `agent` is passed in
 * per-slide from data/slides.tsx rather than read from a route param,
 * since this deck has no router.
 */
export function AgentDetailSlide({ agent, sectionLabel }: { agent: AgentInfo; sectionLabel: string }) {
  const nav = useSlideNav();
  const Icon = agent.icon;

  return (
    <>
      <button className="back-link" onClick={() => nav.goTo("Architecture")}>
        <ArrowLeft size={14} />
        Back to Architecture
      </button>

      <p className="eyebrow" style={{ color: agent.color }}>
        {sectionLabel}
      </p>
      <h2 className="agent-detail-title">
        <span className="agent-detail-icon" style={{ color: agent.color, background: `color-mix(in srgb, ${agent.color} 16%, transparent)` }}>
          <Icon size={22} />
        </span>
        {agent.name}
      </h2>
      <p className="subtitle">{agent.tagline}</p>

      <div className="agent-context">
        <span>
          receives from <strong style={{ color: agent.color }}>{agent.inputSource}</strong>
        </span>
        <ArrowRight size={13} />
        <span>
          delivers to <strong style={{ color: agent.color }}>{agent.outputTarget}</strong>
        </span>
      </div>

      <div className="pipeline-list">
        {agent.pipeline.map((step, i) => {
          const StepIcon = step.icon;
          return (
            <div className="pipeline-item" style={{ borderLeftColor: agent.color }} key={i}>
              <span className="pipeline-item-icon" style={{ color: agent.color, background: `color-mix(in srgb, ${agent.color} 16%, transparent)` }}>
                <StepIcon size={16} />
              </span>
              <div>
                <div className="pipeline-item-stage" style={{ color: agent.color }}>
                  {step.stage}
                </div>
                <div className="pipeline-item-title">{step.title}</div>
                <div className="pipeline-item-detail">{step.detail}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
