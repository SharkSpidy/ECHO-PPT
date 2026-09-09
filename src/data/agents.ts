import type { LucideIcon } from "lucide-react";
import {
  Eye,
  Volume2,
  Radio,
  Hand,
  Zap,
  AlertTriangle,
  LayoutGrid,
  Box,
  Send,
  Code2,
  Camera,
  Headphones,
} from "lucide-react";

export type AgentKey = "vision" | "haptic" | "voice";
export type PipelineStage = "INPUT" | "PROCESS" | "OUTPUT";

export interface PipelineStep {
  stage: PipelineStage;
  icon: LucideIcon;
  title: string;
  detail: string;
}

export interface AgentInfo {
  key: AgentKey;
  /** Must exactly match this agent's entry in the `slides` array title. */
  slideTitle: string;
  name: string;
  icon: LucideIcon;
  /** A CSS custom property reference, e.g. "var(--accent-2)". */
  color: string;
  tagline: string;
  inputSource: string;
  outputTarget: string;
  pipeline: PipelineStep[];
}

// Reuses the deck's existing semantic tokens rather than inventing new
// colors: --accent-2 (cyan) is already "computer vision / SLAM" and
// --accent (amber) is already "voice guidance" in index.css. --accent-3
// (soft violet) is added alongside them for the Haptic Agent.
export const AGENTS: AgentInfo[] = [
  {
    key: "vision",
    slideTitle: "Vision Agent",
    name: "Vision Agent",
    icon: Eye,
    color: "var(--accent-2)",
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
  {
    key: "haptic",
    slideTitle: "Haptic Agent",
    name: "Haptic Agent",
    icon: Hand,
    color: "var(--accent-3)",
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
  {
    key: "voice",
    slideTitle: "Voice Agent",
    name: "Voice Agent",
    icon: Volume2,
    color: "var(--accent)",
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
];

export const getAgent = (key: AgentKey): AgentInfo => {
  const agent = AGENTS.find((a) => a.key === key);
  if (!agent) throw new Error(`Unknown agent key: ${key}`);
  return agent;
};
