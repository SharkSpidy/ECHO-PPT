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
// colors: --accent-2 (cyan) is already "computer vision / VPR" and
// --accent (amber) is already "voice guidance" in index.css. --accent-3
// (soft violet) is added alongside them for the Haptic Agent.
export const AGENTS: AgentInfo[] = [
  {
    key: "vision",
    slideTitle: "Vision Agent",
    name: "Vision Agent",
    icon: Eye,
    color: "var(--accent-2)",
    tagline: "Kinect depth -> 2D occupancy map",
    inputSource: "Xbox 360 Kinect Sensor",
    outputTarget: "Local Message Broker",
    pipeline: [
      {
        stage: "INPUT",
        icon: Camera,
        title: "Raw IR & Depth Array",
        detail: "Infrared + depth frames · Kinect over USB",
      },
      {
        stage: "PROCESS",
        icon: Box,
        title: "OpenCV Point Cloud Generator",
        detail: "Depth frame -> 3D point cloud · Forward scene",
      },
      {
        stage: "PROCESS",
        icon: LayoutGrid,
        title: "2D Occupancy Grid Converter",
        detail: "Point cloud -> lightweight 2D grid · Real-time Pi processing",
      },
      {
        stage: "OUTPUT",
        icon: Send,
        title: "JSON Spatial Payload Publisher",
        detail: "Occupancy grid -> Message Broker -> Haptic and Voice Agents",
      },
    ],
  },
  {
    key: "haptic",
    slideTitle: "Haptic Agent",
    name: "Haptic Agent",
    icon: Hand,
    color: "var(--accent-3)",
    tagline: "Nearby obstacles -> wristband vibration",
    inputSource: "Local Message Broker",
    outputTarget: "Haptic Wristband (ESP32)",
    pipeline: [
      {
        stage: "INPUT",
        icon: Radio,
        title: "Spatial Data Subscriber",
        detail: "Occupancy grid subscription · Vision Agent data",
      },
      {
        stage: "PROCESS",
        icon: Zap,
        title: "Distance-to-PWM Mapping",
        detail: "Obstacle proximity -> vibration intensity · Closer = stronger",
      },
      {
        stage: "PROCESS",
        icon: Code2,
        title: "Serial Protocol Formatter",
        detail: "Motor intensity + position -> serial command frame",
      },
      {
        stage: "OUTPUT",
        icon: Hand,
        title: "Serial Out to ESP32",
        detail: "Serial command -> ESP32 motor controller -> Correct motor",
      },
    ],
  },
  {
    key: "voice",
    slideTitle: "Voice Agent",
    name: "Voice Agent",
    icon: Volume2,
    color: "var(--accent)",
    tagline: "Real hazard ahead -> spoken warning",
    inputSource: "Local Message Broker",
    outputTarget: "In-Ear Module",
    pipeline: [
      {
        stage: "INPUT",
        icon: Radio,
        title: "Spatial Data Subscriber",
        detail: "Occupancy grid subscription · Vision Agent data",
      },
      {
        stage: "PROCESS",
        icon: AlertTriangle,
        title: "Hazard Threshold Filter",
        detail: "Routine clutter ignored · Drop-offs and head-level hazards trigger",
      },
      {
        stage: "PROCESS",
        icon: Volume2,
        title: "Offline TTS Engine",
        detail: "Short spoken warning · Offline local TTS",
      },
      {
        stage: "OUTPUT",
        icon: Headphones,
        title: "3D Audio Panner",
        detail: "Left/right audio pan · Obstacle position matching",
      },
    ],
  },
];

export const getAgent = (key: AgentKey): AgentInfo => {
  const agent = AGENTS.find((a) => a.key === key);
  if (!agent) throw new Error(`Unknown agent key: ${key}`);
  return agent;
};
