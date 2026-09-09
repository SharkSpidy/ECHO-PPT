import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Eye,
  Volume2,
  Radio,
  Cpu,
  Battery,
  Camera,
  ArrowRight,
  ArrowLeft,
  ArrowDown,
  Headphones,
  Hand,
  Zap,
  AlertTriangle,
  LayoutGrid,
  Box,
  Send,
  Code2,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Design tokens
// ---------------------------------------------------------------------------
const COLORS = {
  bg: "#090D13",
  bgGrid: "#101923",
  panel: "#10161F",
  panelAlt: "#0C1119",
  border: "#1E2836",
  borderStrong: "#2A3646",
  text: "#E7EDF3",
  textMuted: "#7D8CA0",
  textFaint: "#4C5A6C",
  power: "#FACC15",
  broker: "#38BDF8",
  vision: "#2DD4BF",
  haptic: "#FB923C",
  voice: "#A78BFA",
} as const;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type AgentKey = "vision" | "haptic" | "voice";
type ViewState = "root" | AgentKey;
type PipelineStage = "INPUT" | "PROCESS" | "OUTPUT";

interface PipelineStep {
  stage: PipelineStage;
  icon: LucideIcon;
  title: string;
  detail: string;
}

interface Agent {
  key: AgentKey;
  name: string;
  color: string;
  icon: LucideIcon;
  tagline: string;
  inputSource: string;
  outputTarget: string;
  pipeline: PipelineStep[];
}

const AGENTS: Record<AgentKey, Agent> = {
  vision: {
    key: "vision",
    name: "Vision Agent",
    color: COLORS.vision,
    icon: Eye,
    tagline: "Turns raw Kinect depth into a 2D map the rest of the system can use.",
    inputSource: "Xbox 360 Kinect Sensor",
    outputTarget: "Local Message Broker",
    pipeline: [
      {
        stage: "INPUT",
        icon: Camera,
        title: "Raw IR & Depth Array",
        detail: "Reads the unprocessed infrared and depth frames streamed from the Kinect over USB.",
      },
      {
        stage: "PROCESS",
        icon: Box,
        title: "OpenCV Point Cloud Generator",
        detail: "Reconstructs the depth frame into a 3D point cloud of everything in front of the wearer.",
      },
      {
        stage: "PROCESS",
        icon: LayoutGrid,
        title: "2D Occupancy Grid Converter",
        detail: "Flattens and compresses the point cloud into a lightweight 2D grid the Pi can process in real time.",
      },
      {
        stage: "OUTPUT",
        icon: Send,
        title: "JSON Spatial Payload Publisher",
        detail: "Publishes the occupancy grid to the Message Broker for the Haptic and Voice Agents to consume.",
      },
    ],
  },
  haptic: {
    key: "haptic",
    name: "Haptic Agent",
    color: COLORS.haptic,
    icon: Hand,
    tagline: "Converts nearby obstacles into vibration patterns on the glove.",
    inputSource: "Local Message Broker",
    outputTarget: "Haptic Glove (ESP32)",
    pipeline: [
      {
        stage: "INPUT",
        icon: Radio,
        title: "Spatial Data Subscriber",
        detail: "Listens to the Broker for every new occupancy grid published by the Vision Agent.",
      },
      {
        stage: "PROCESS",
        icon: Zap,
        title: "Distance-to-PWM Mapping",
        detail: "Translates obstacle proximity into a vibration intensity, closer objects mean stronger pulses.",
      },
      {
        stage: "PROCESS",
        icon: Code2,
        title: "Serial Protocol Formatter",
        detail: "Packages motor intensity and position values into a compact serial command frame.",
      },
      {
        stage: "OUTPUT",
        icon: Hand,
        title: "Serial Out to ESP32",
        detail: "Streams the command frame to the glove's motor controller to fire the correct vibration motor.",
      },
    ],
  },
  voice: {
    key: "voice",
    name: "Voice Agent",
    color: COLORS.voice,
    icon: Volume2,
    tagline: "Speaks up only when there's a real hazard ahead.",
    inputSource: "Local Message Broker",
    outputTarget: "In-Ear Module",
    pipeline: [
      {
        stage: "INPUT",
        icon: Radio,
        title: "Spatial Data Subscriber",
        detail: "Listens to the Broker for every new occupancy grid published by the Vision Agent.",
      },
      {
        stage: "PROCESS",
        icon: AlertTriangle,
        title: "Hazard Threshold Filter",
        detail: "Ignores routine clutter and only triggers for drop-offs or head-level obstacles.",
      },
      {
        stage: "PROCESS",
        icon: Volume2,
        title: "Offline TTS Engine",
        detail: "Generates a short spoken warning locally, with no network connection required.",
      },
      {
        stage: "OUTPUT",
        icon: Headphones,
        title: "3D Audio Panner",
        detail: "Pans the spoken cue left or right in the ear to match the obstacle's real-world position.",
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Small building blocks
// ---------------------------------------------------------------------------

function GridBackdrop() {
  return (
    <div
      className="pointer-events-none fixed inset-0"
      style={{
        backgroundImage: `linear-gradient(${COLORS.bgGrid} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.bgGrid} 1px, transparent 1px)`,
        backgroundSize: "38px 38px",
        opacity: 0.35,
      }}
    />
  );
}

interface HardwareCardProps {
  icon: LucideIcon;
  label: string;
  sub?: string;
  accent: string;
}

function HardwareCard({ icon: Icon, label, sub, accent }: HardwareCardProps) {
  return (
    <div
      className="flex items-center gap-3 rounded-md px-4 py-3"
      style={{ backgroundColor: COLORS.panel, border: `1px solid ${COLORS.border}` }}
    >
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md"
        style={{ backgroundColor: `${accent}1A`, color: accent }}
      >
        <Icon size={18} strokeWidth={1.75} />
      </div>
      <div>
        <div className="text-sm font-medium leading-tight" style={{ color: COLORS.text }}>
          {label}
        </div>
        {sub && (
          <div className="font-mono text-[11px] leading-tight" style={{ color: COLORS.textMuted }}>
            {sub}
          </div>
        )}
      </div>
    </div>
  );
}

interface AgentNodeProps {
  agent: Agent;
  onClick: () => void;
}

function AgentNode({ agent, onClick }: AgentNodeProps) {
  const Icon = agent.icon;
  return (
    <button
      onClick={onClick}
      className="group flex w-full items-center gap-4 rounded-md px-4 py-3.5 text-left transition-transform duration-150 hover:-translate-y-0.5"
      style={{
        backgroundColor: COLORS.panel,
        border: `1px solid ${COLORS.border}`,
        borderLeft: `3px solid ${agent.color}`,
      }}
    >
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md"
        style={{ backgroundColor: `${agent.color}1A`, color: agent.color }}
      >
        <Icon size={20} strokeWidth={1.75} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-semibold" style={{ color: COLORS.text }}>
          {agent.name}
        </div>
        <div className="truncate text-xs" style={{ color: COLORS.textMuted }}>
          {agent.tagline}
        </div>
      </div>
      <ArrowRight
        size={16}
        className="shrink-0 transition-transform duration-150 group-hover:translate-x-1"
        style={{ color: agent.color }}
      />
    </button>
  );
}

function FlowLine({ vertical = false }: { vertical?: boolean }) {
  if (vertical) {
    return (
      <div className="flex items-center justify-center py-1">
        <ArrowDown size={16} style={{ color: COLORS.textFaint }} />
      </div>
    );
  }
  return (
    <div className="hidden items-center px-2 lg:flex">
      <div className="h-px w-6" style={{ backgroundColor: COLORS.borderStrong }} />
      <ArrowRight size={14} style={{ color: COLORS.textFaint }} />
      <div className="h-px w-6" style={{ backgroundColor: COLORS.borderStrong }} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Root View
// ---------------------------------------------------------------------------

interface RootViewProps {
  onSelectAgent: (key: AgentKey) => void;
}

function RootView({ onSelectAgent }: RootViewProps) {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-12">
      <header className="mb-12">
        <div className="mb-2 font-mono text-xs tracking-wide" style={{ color: COLORS.textFaint }}>
          sys.architecture // root
        </div>
        <h1
          className="text-4xl font-semibold tracking-tight sm:text-5xl"
          style={{ color: COLORS.text, fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Echo Deck
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed" style={{ color: COLORS.textMuted }}>
          An offline, wearable indoor navigation system for visually impaired users. Everything
          below runs locally, with no cloud connection and no signal to lose indoors.
        </p>
        <a
          href="/deck.html"
          className="mt-5 inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs font-medium transition-colors duration-150 hover:opacity-80"
          style={{ border: `1px solid ${COLORS.border}`, color: COLORS.textMuted }}
        >
          View the pitch deck
          <ArrowRight size={13} />
        </a>
      </header>

      {/* legend */}
      <div className="mb-10 flex flex-wrap gap-x-6 gap-y-2">
        {Object.values(AGENTS).map((a) => (
          <div key={a.key} className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: a.color }} />
            <span className="font-mono text-[11px]" style={{ color: COLORS.textMuted }}>
              {a.name}
            </span>
          </div>
        ))}
      </div>

      {/* architecture grid */}
      <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[220px_auto_260px_auto_220px]">
        {/* Column 1: power + sensor inputs */}
        <div className="flex flex-col gap-3">
          <HardwareCard icon={Battery} label="Battery Pack" sub="12V / 5V dual output" accent={COLORS.power} />
          <HardwareCard icon={Camera} label="Xbox 360 Kinect" sub="Depth (IR) + RGB" accent={COLORS.text} />
        </div>

        <FlowLine />

        {/* Column 2: the enclosure */}
        <div className="rounded-lg p-4" style={{ border: `1px dashed ${COLORS.borderStrong}` }}>
          <div className="mb-3 font-mono text-[10px] tracking-wide" style={{ color: COLORS.textFaint }}>
            xbox 360 s shell — wearable housing
          </div>
          <div className="rounded-md p-3" style={{ backgroundColor: COLORS.panelAlt, border: `1px solid ${COLORS.border}` }}>
            <div className="mb-3 flex items-center gap-2">
              <Cpu size={16} style={{ color: COLORS.textMuted }} />
              <span className="text-xs font-medium" style={{ color: COLORS.text }}>
                Raspberry Pi
              </span>
            </div>
            <div
              className="flex items-center justify-center gap-2 rounded-md py-3"
              style={{
                backgroundColor: `${COLORS.broker}14`,
                border: `1px solid ${COLORS.broker}55`,
              }}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full"
                  style={{ backgroundColor: COLORS.broker, opacity: 0.6 }}
                />
                <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: COLORS.broker }} />
              </span>
              <Radio size={15} style={{ color: COLORS.broker }} />
              <span className="text-xs font-medium" style={{ color: COLORS.broker }}>
                Message Broker
              </span>
            </div>
          </div>
        </div>

        <FlowLine />

        {/* Column 3: the three clickable agents */}
        <div className="flex flex-col gap-3">
          {Object.values(AGENTS).map((agent) => (
            <AgentNode key={agent.key} agent={agent} onClick={() => onSelectAgent(agent.key)} />
          ))}
        </div>

        <FlowLine />

        {/* Column 4: hardware outputs, row-matched to haptic / voice */}
        <div className="flex flex-col gap-3">
          <div className="hidden lg:block" style={{ height: 0 }} aria-hidden="true" />
          <HardwareCard icon={Hand} label="Haptic Glove" sub="ESP32 / Arduino" accent={COLORS.haptic} />
          <HardwareCard icon={Headphones} label="In-Ear Module" sub="Panned 3D audio" accent={COLORS.voice} />
        </div>
      </div>

      <p className="mt-12 text-xs" style={{ color: COLORS.textFaint }}>
        Click any agent above to see its internal data pipeline.
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Detail View
// ---------------------------------------------------------------------------

interface DetailViewProps {
  agent: Agent;
  onBack: () => void;
}

function DetailView({ agent, onBack }: DetailViewProps) {
  const Icon = agent.icon;
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12">
      <button
        onClick={onBack}
        className="mb-10 flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors duration-150 hover:opacity-80"
        style={{ border: `1px solid ${COLORS.border}`, color: COLORS.textMuted }}
      >
        <ArrowLeft size={15} />
        Back to Main Architecture
      </button>

      <div className="mb-2 font-mono text-xs" style={{ color: COLORS.textFaint }}>
        sys.architecture // {agent.key}-agent
      </div>

      <div className="mb-10 flex items-start gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md"
          style={{ backgroundColor: `${agent.color}1A`, color: agent.color }}
        >
          <Icon size={24} strokeWidth={1.75} />
        </div>
        <div>
          <h2
            className="text-3xl font-semibold tracking-tight"
            style={{ color: COLORS.text, fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {agent.name}
          </h2>
          <p className="mt-1 text-sm" style={{ color: COLORS.textMuted }}>
            {agent.tagline}
          </p>
        </div>
      </div>

      {/* context strip: where data comes from / goes to */}
      <div
        className="mb-10 flex flex-col gap-2 rounded-md px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
        style={{ backgroundColor: COLORS.panelAlt, border: `1px solid ${COLORS.border}` }}
      >
        <span className="font-mono text-[11px]" style={{ color: COLORS.textMuted }}>
          receives from <span style={{ color: agent.color }}>{agent.inputSource}</span>
        </span>
        <ArrowRight size={13} className="hidden sm:block" style={{ color: COLORS.textFaint }} />
        <span className="font-mono text-[11px]" style={{ color: COLORS.textMuted }}>
          delivers to <span style={{ color: agent.color }}>{agent.outputTarget}</span>
        </span>
      </div>

      {/* pipeline */}
      <div className="flex flex-col">
        {agent.pipeline.map((step, i) => {
          const StepIcon = step.icon;
          const isLast = i === agent.pipeline.length - 1;
          return (
            <div key={i}>
              <div
                className="flex gap-4 rounded-md p-4"
                style={{
                  backgroundColor: COLORS.panel,
                  border: `1px solid ${COLORS.border}`,
                  borderLeft: `3px solid ${agent.color}`,
                }}
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md"
                  style={{ backgroundColor: `${agent.color}1A`, color: agent.color }}
                >
                  <StepIcon size={18} strokeWidth={1.75} />
                </div>
                <div>
                  <div className="mb-1 font-mono text-[10px] tracking-wide" style={{ color: agent.color }}>
                    {step.stage}
                  </div>
                  <div className="text-sm font-medium" style={{ color: COLORS.text }}>
                    {step.title}
                  </div>
                  <div className="mt-1 text-xs leading-relaxed" style={{ color: COLORS.textMuted }}>
                    {step.detail}
                  </div>
                </div>
              </div>
              {!isLast && <FlowLine vertical />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// App root
// ---------------------------------------------------------------------------

export default function App() {
  const [view, setView] = useState<ViewState>("root");

  return (
    <div className="relative min-h-screen w-full" style={{ backgroundColor: COLORS.bg }}>
      <GridBackdrop />
      <div className="relative">
        {view === "root" ? (
          <RootView onSelectAgent={(key) => setView(key)} />
        ) : (
          <DetailView agent={AGENTS[view]} onBack={() => setView("root")} />
        )}
      </div>
    </div>
  );
}
