/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  Wifi, 
  Smartphone, 
  Monitor, 
  Settings, 
  Server, 
  Database, 
  Activity, 
  Mail, 
  GitBranch, 
  Link,
  Play,
  Target,
  UserCheck,
  FileText,
  Eye,
  Brain,
  Sparkles,
  Clipboard,
  AlertCircle,
  Cpu,
  TrendingUp,
  ShieldCheck,
  FileCode,
  Scan,
  MessageSquare,
  CreditCard,
  Layout,
  Layers,
  Hash,
  DollarSign,
  Search,
  Calendar,
  Clock,
  Shield,
  Zap,
  Bell,
  Camera,
  Barcode,
  Grid
} from "lucide-react";

// Project specific type definitions
export type ProjectTitle = "ALTAYRA" | "MEDICAL FITNESS PROS" | "CRONOTAX" | "NOURYX" | "CALORIS";

interface FlowNode {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface ProjectFlowData {
  inputs: FlowNode[];
  processing: {
    engineName: string;
    subNodes: { icon: React.ComponentType<{ className?: string }>; label: string }[];
  };
  outputs: FlowNode[];
}

const FLOW_DATA: Record<ProjectTitle, ProjectFlowData> = {
  "ALTAYRA": {
    inputs: [
      { label: "IoT Devices", icon: Barcode },
      { label: "GPS Telemetry", icon: Wifi },
      { label: "Customer Requests", icon: MessageSquare },
      { label: "Geofence Zones", icon: Scan }
    ],
    processing: {
      engineName: "ALTAYRA CORE",
      subNodes: [
        { icon: Server, label: "NestJS Backend" },
        { icon: Layers, label: "Pipeline Router" },
        { icon: Database, label: "Supabase DB" }
      ]
    },
    outputs: [
      { label: "Technician App", icon: Smartphone },
      { label: "Quote & Orders", icon: DollarSign },
      { label: "Insights Dash", icon: TrendingUp },
      { label: "Email Alerts", icon: Bell }
    ]
  },
  "MEDICAL FITNESS PROS": {
    inputs: [
      { label: "Video Ingest", icon: Play },
      { label: "User Goals", icon: Target },
      { label: "Trainer Input", icon: UserCheck },
      { label: "Medical Hist", icon: FileText }
    ],
    processing: {
      engineName: "MFP Vision AI",
      subNodes: [
        { icon: Eye, label: "Vision Eng" },
        { icon: Brain, label: "Gemini" },
        { icon: Sparkles, label: "RAG Doc" }
      ]
    },
    outputs: [
      { label: "Clinical PDF", icon: Clipboard },
      { label: "Workouts", icon: Activity },
      { label: "Alert Dash", icon: AlertCircle },
      { label: "Trainer Sync", icon: Server }
    ]
  },
  "CRONOTAX": {
    inputs: [
      { label: "PDF Invoices", icon: FileText },
      { label: "Bank Feeds", icon: DollarSign },
      { label: "Manual Input", icon: FileCode },
      { label: "W2 / 1099", icon: Clipboard }
    ],
    processing: {
      engineName: "Tax Parser",
      subNodes: [
        { icon: Scan, label: "OCR Engine" },
        { icon: Brain, label: "Gemini 1.5" },
        { icon: Cpu, label: "Rules Eng" }
      ]
    },
    outputs: [
      { label: "Tax Returns", icon: ShieldCheck },
      { label: "Savings Rep", icon: TrendingUp },
      { icon: Database, label: "Supa Sync" },
      { label: "Audit Trail", icon: ShieldCheck }
    ]
  },
  "NOURYX": {
    inputs: [
      { label: "Salon Register", icon: UserCheck },
      { label: "Client Book", icon: Calendar },
      { label: "Stripe Sub", icon: CreditCard },
      { label: "Team Slots", icon: Clock }
    ],
    processing: {
      engineName: "Scheduler Sync",
      subNodes: [
        { icon: Zap, label: "Team Sync" },
        { icon: Shield, label: "Double Book Prev" },
        { icon: DollarSign, label: "Escrow Sub" }
      ]
    },
    outputs: [
      { label: "Slot Booking", icon: Activity },
      { label: "Salon Dash", icon: Layout },
      { label: "Receipt Mail", icon: Mail },
      { label: "SMS Alerts", icon: MessageSquare }
    ]
  },
  "CALORIS": {
    inputs: [
      { label: "Food Photo", icon: Camera },
      { label: "Barcode Scan", icon: Barcode },
      { label: "Macro Target", icon: Target },
      { label: "User Weight", icon: Clock }
    ],
    processing: {
      engineName: "Vision Sync",
      subNodes: [
        { icon: Eye, label: "Food ML" },
        { icon: Database, label: "Nutrition" },
        { icon: Zap, label: "Supa Edge" }
      ]
    },
    outputs: [
      { label: "Calorie Track", icon: Activity },
      { label: "Macro Charts", icon: Grid },
      { label: "Meal History", icon: Clipboard },
      { label: "Push Alerts", icon: Bell }
    ]
  }
};

interface ProjectFlowDiagramProps {
  projectTitle: string;
}

export default function ProjectFlowDiagram({ projectTitle }: ProjectFlowDiagramProps) {
  // Graceful fallback if project title is missing or typed incorrectly
  const title = (FLOW_DATA[projectTitle as ProjectTitle] ? projectTitle : "ALTAYRA") as ProjectTitle;
  const data = FLOW_DATA[title];

  // Coordinates matching the math design
  const leftX = 50;
  const rightX = 690;
  const itemW = 160;
  const itemH = 42;

  // Symmetrical Y distributions for Left & Right items
  const yCoordinates = [35, 105, 255, 325];

  // Helper to generate paths and stagger dots
  const getCubicPath = (startY: number, endY: number, direction: "in" | "out") => {
    if (direction === "in") {
      const startX = leftX + itemW;
      const endX = 290;
      return `M ${startX} ${startY} C ${startX + 40} ${startY}, ${endX - 40} ${endY}, ${endX} ${endY}`;
    } else {
      const startX = 610;
      const endX = rightX;
      return `M ${startX} ${startY} C ${startX + 40} ${startY}, ${endX - 40} ${endY}, ${endX} ${endY}`;
    }
  };

  // Coordinates matching the mobile math design
  const mobileInputCoords = [
    { x: 80, y: 40 },
    { x: 360, y: 40 },
    { x: 80, y: 110 },
    { x: 360, y: 110 }
  ];

  const mobileOutputCoords = [
    { x: 80, y: 520 },
    { x: 360, y: 520 },
    { x: 80, y: 590 },
    { x: 360, y: 590 }
  ];

  const getVerticalPath = (startX: number, startY: number, endX: number, endY: number) => {
    return `M ${startX} ${startY} C ${startX} ${startY + 25}, ${endX} ${endY - 25}, ${endX} ${endY}`;
  };

  return (
    <>
      {/* Mobile & Tablet Vertical SVG Flow Layout */}
      <div className="relative w-full aspect-[3/4.2] sm:aspect-[3/3.6] max-w-[480px] mx-auto bg-[#090909]/40 border border-white/5 rounded-xl p-1 overflow-hidden group/diagram select-none lg:hidden" style={{ willChange: 'transform', contain: 'layout style paint' }}>
        {/* Background radial soft gold glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.03)_0%,transparent_70%)] pointer-events-none" />

        <svg 
          viewBox="0 0 600 680" 
          className="w-full h-full select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Neon Glow Filter */}
            <filter id="gold-glow-mobile" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Paths connecting Inputs to Gateway */}
          {mobileInputCoords.map((coord, index) => {
            const startX = coord.x + itemW / 2;
            const startY = coord.y + itemH;
            const endX = 300;
            const endY = 200;
            const path = getVerticalPath(startX, startY, endX, endY);
            return (
              <g key={`in-path-mobile-${index}`}>
                <path
                  d={path}
                  fill="none"
                  stroke="rgba(234,179,8,0.1)"
                  strokeWidth="1.5"
                  className="group-hover/diagram:stroke-gold/20 transition-colors duration-500"
                />
                <circle r="2.5" fill="#ffffff" opacity="0.9">
                  <animateMotion
                    path={path}
                    dur={`${2.6 + index * 0.3}s`}
                    repeatCount="indefinite"
                    begin={`${index * 0.5}s`}
                  />
                </circle>
                <circle r="1.5" fill="#EAB308" opacity="0.8">
                  <animateMotion
                    path={path}
                    dur={`${2.6 + index * 0.3}s`}
                    repeatCount="indefinite"
                    begin={`${index * 0.5}s`}
                  />
                </circle>
              </g>
            );
          })}

          {/* Core Connections */}
          {/* Gateway Y:200 to Core Y:290 */}
          <path
            d="M 300 260 L 300 290"
            fill="none"
            stroke="rgba(234,179,8,0.15)"
            strokeWidth="2"
          />
          <circle r="3" fill="#ffffff" opacity="0.9">
            <animateMotion
              path="M 300 260 L 300 290"
              dur="1s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Core Y:370 to Sync Y:400 */}
          <path
            d="M 300 370 L 300 400"
            fill="none"
            stroke="rgba(234,179,8,0.15)"
            strokeWidth="2"
          />
          <circle r="3" fill="#ffffff" opacity="0.9">
            <animateMotion
              path="M 300 370 L 300 400"
              dur="1s"
              repeatCount="indefinite"
              begin="0.3s"
            />
          </circle>

          {/* Paths connecting Sync Gateway to Outputs */}
          {mobileOutputCoords.map((coord, index) => {
            const startX = 300;
            const startY = 460;
            const endX = coord.x + itemW / 2;
            const endY = coord.y;
            const path = getVerticalPath(startX, startY, endX, endY);
            return (
              <g key={`out-path-mobile-${index}`}>
                <path
                  d={path}
                  fill="none"
                  stroke="rgba(234,179,8,0.1)"
                  strokeWidth="1.5"
                  className="group-hover/diagram:stroke-gold/20 transition-colors duration-500"
                />
                <circle r="2.5" fill="#ffffff" opacity="0.9">
                  <animateMotion
                    path={path}
                    dur={`${2.6 + index * 0.3}s`}
                    repeatCount="indefinite"
                    begin={`${index * 0.5 + 0.3}s`}
                  />
                </circle>
                <circle r="1.5" fill="#EAB308" opacity="0.8">
                  <animateMotion
                    path={path}
                    dur={`${2.6 + index * 0.3}s`}
                    repeatCount="indefinite"
                    begin={`${index * 0.5 + 0.3}s`}
                  />
                </circle>
              </g>
            );
          })}

          {/* Input Nodes */}
          {data.inputs.map((node, index) => {
            const IconComponent = node.icon;
            const coord = mobileInputCoords[index];
            return (
              <foreignObject
                key={`in-node-mobile-${index}`}
                x={coord.x}
                y={coord.y}
                width={itemW}
                height={itemH}
                className="overflow-visible"
              >
                <motion.div
                  whileHover={{ scale: 1.04, borderColor: "rgba(234, 179, 8, 0.4)", boxShadow: "0 0 12px rgba(234, 179, 8, 0.15)" }}
                  className="flex items-center gap-2.5 px-3.5 py-2.5 bg-[#0a0a0a] border border-white/5 rounded-full text-white font-mono text-[9px] sm:text-[10px] tracking-wider uppercase select-none cursor-default"
                >
                  <IconComponent className="w-3.5 h-3.5 text-gold/80" />
                  <span className="truncate max-w-[105px] text-white/70 font-medium">{node.label}</span>
                </motion.div>
              </foreignObject>
            );
          })}

          {/* Left Gateway */}
          <foreignObject x="270" y="200" width="60" height="60" className="overflow-visible">
            <motion.div
              whileHover={{ scale: 1.05, borderColor: "rgba(234, 179, 8, 0.5)" }}
              className="w-[60px] h-[60px] bg-[#0c0c0c] border border-white/10 rounded-xl flex items-center justify-center flex-col gap-1 transition-all shadow-[0_0_20px_rgba(0,0,0,0.8)]"
            >
              <div className="relative w-8 h-8 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center">
                <span className="font-display font-black text-gold text-xs leading-none">AK</span>
              </div>
              <span className="font-mono text-[7px] text-white/40 uppercase tracking-widest leading-none">GATE</span>
            </motion.div>
          </foreignObject>

          {/* Central Engine */}
          <foreignObject x="230" y="290" width="140" height="80" className="overflow-visible">
            <motion.div
              whileHover={{ scale: 1.03, borderColor: "rgba(234, 179, 8, 0.3)", boxShadow: "0 0 25px rgba(234, 179, 8, 0.1)" }}
              className="w-[140px] h-[80px] bg-[#0d0d0d]/90 border border-white/5 rounded-xl flex flex-col items-center justify-center px-2 py-1.5 shadow-[0_0_30px_rgba(234,179,8,0.02)] transition-all duration-300"
            >
              <span className="font-mono text-[8px] text-gold/80 uppercase tracking-[0.15em] font-semibold mb-2 leading-none">
                {data.processing.engineName}
              </span>
              <div className="flex justify-around items-center w-full bg-black/40 rounded-lg p-1.5 border border-white/5 gap-1">
                {data.processing.subNodes.map((sub, sIdx) => {
                  const SubIcon = sub.icon;
                  return (
                    <div 
                      key={`sub-mobile-${sIdx}`}
                      className="relative group/sub flex flex-col items-center justify-center w-8 h-8 rounded bg-white/[0.02] border border-white/5 hover:bg-gold/10 hover:border-gold/30 transition-all duration-300 cursor-help"
                      title={sub.label}
                    >
                      <SubIcon className="w-3.5 h-3.5 text-white/70 group-hover/sub:text-gold" />
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </foreignObject>

          {/* Sync Block */}
          <foreignObject x="270" y="400" width="60" height="60" className="overflow-visible">
            <motion.div
              whileHover={{ scale: 1.05, borderColor: "rgba(234, 179, 8, 0.5)" }}
              className="w-[60px] h-[60px] bg-[#0c0c0c] border border-white/10 rounded-xl flex items-center justify-center flex-col gap-1 transition-all shadow-[0_0_20px_rgba(0,0,0,0.8)]"
            >
              <div className="relative w-8 h-8 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center">
                <span className="font-display font-black text-gold text-xs leading-none">AK</span>
              </div>
              <span className="font-mono text-[7px] text-white/40 uppercase tracking-widest leading-none">SYNC</span>
            </motion.div>
          </foreignObject>

          {/* Output Nodes */}
          {data.outputs.map((node, index) => {
            const IconComponent = node.icon;
            const coord = mobileOutputCoords[index];
            return (
              <foreignObject
                key={`out-node-mobile-${index}`}
                x={coord.x}
                y={coord.y}
                width={itemW}
                height={itemH}
                className="overflow-visible"
              >
                <motion.div
                  whileHover={{ scale: 1.04, borderColor: "rgba(234, 179, 8, 0.4)", boxShadow: "0 0 12px rgba(234, 179, 8, 0.15)" }}
                  className="flex items-center gap-2.5 px-3.5 py-2.5 bg-[#0a0a0a] border border-white/5 rounded-full text-white font-mono text-[9px] sm:text-[10px] tracking-wider uppercase select-none cursor-default"
                >
                  <IconComponent className="w-3.5 h-3.5 text-gold/80" />
                  <span className="truncate max-w-[105px] text-white/70 font-medium">{node.label}</span>
                </motion.div>
              </foreignObject>
            );
          })}
        </svg>
      </div>

      {/* Desktop Horizontal Flow Layout */}
      <div className="relative w-full h-[320px] sm:h-auto sm:aspect-[9/4] bg-[#090909]/40 border border-white/5 rounded-lg p-2 overflow-x-auto overflow-y-hidden hidden lg:flex items-center justify-center group/diagram [scrollbar-width:thin] [scrollbar-color:rgba(234,179,8,0.2)_transparent]" style={{ willChange: 'transform', contain: 'layout style paint' }}>
        {/* Background radial soft gold glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.03)_0%,transparent_70%)] pointer-events-none" />

        {/* SVG Canvas containing paths and animation particles */}
        <svg 
          viewBox="0 0 900 400" 
          className="w-[850px] h-[300px] sm:w-full sm:h-full select-none flex-shrink-0"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Neon Glow Filter */}
            <filter id="gold-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* --- PATHS & PIPELINES --- */}
          <g>
            {/* Left inputs path connections merging to center-left gateway */}
            {yCoordinates.map((y, index) => {
              const path = getCubicPath(y + itemH / 2, 200, "in");
              return (
                <g key={`in-group-${index}`}>
                  {/* Background faded paths */}
                  <path
                    d={path}
                    fill="none"
                    stroke="rgba(234,179,8,0.1)"
                    strokeWidth="1.5"
                    className="group-hover/diagram:stroke-gold/20 transition-colors duration-500"
                  />
                  {/* Active glow pulsing path */}
                  <path
                    d={path}
                    fill="none"
                    stroke="url(#path-glow-in)"
                    strokeWidth="1.5"
                    strokeDasharray="4 8"
                    className="opacity-40 animate-[dash_30s_linear_infinite]"
                    style={{ display: "none" }} /* Native CSS animation or SVG path */
                  />

                  {/* Moving Glowing Flow Packets / Particles */}
                  <circle r="2.5" fill="#ffffff" opacity="0.9">
                    <animateMotion
                      path={path}
                      dur={`${2.8 + index * 0.4}s`}
                      repeatCount="indefinite"
                      begin={`${index * 0.6}s`}
                    />
                  </circle>
                  <circle r="1.5" fill="#EAB308" opacity="0.8">
                    <animateMotion
                      path={path}
                      dur={`${2.8 + index * 0.4}s`}
                      repeatCount="indefinite"
                      begin={`${index * 0.6}s`}
                    />
                  </circle>
                </g>
              );
            })}

            {/* Central pipelines linking Left-Lucien -> LLMs/Processor -> Right-Lucien */}
            {/* Path 1: X 350 to 380 */}
            <path
              d="M 350 200 L 380 200"
              fill="none"
              stroke="rgba(234,179,8,0.15)"
              strokeWidth="2"
              className="group-hover/diagram:stroke-gold/30 transition-colors duration-500"
            />
            <circle r="3" fill="#ffffff" opacity="0.9">
              <animateMotion
                path="M 350 200 L 380 200"
                dur="1.2s"
                repeatCount="indefinite"
              />
            </circle>

            {/* Path 2: X 520 to 550 */}
            <path
              d="M 520 200 L 550 200"
              fill="none"
              stroke="rgba(234,179,8,0.15)"
              strokeWidth="2"
              className="group-hover/diagram:stroke-gold/30 transition-colors duration-500"
            />
            <circle r="3" fill="#ffffff" opacity="0.9">
              <animateMotion
                path="M 520 200 L 550 200"
                dur="1.2s"
                repeatCount="indefinite"
                begin="0.4s"
              />
            </circle>

            {/* Right outputs path connections splitting from center-right dispatcher */}
            {yCoordinates.map((y, index) => {
              const path = getCubicPath(200, y + itemH / 2, "out");
              return (
                <g key={`out-group-${index}`}>
                  {/* Background faded paths */}
                  <path
                    d={path}
                    fill="none"
                    stroke="rgba(234,179,8,0.1)"
                    strokeWidth="1.5"
                    className="group-hover/diagram:stroke-gold/20 transition-colors duration-500"
                  />

                  {/* Moving Glowing Flow Packets / Particles */}
                  <circle r="2.5" fill="#ffffff" opacity="0.9">
                    <animateMotion
                      path={path}
                      dur={`${2.8 + index * 0.3}s`}
                      repeatCount="indefinite"
                      begin={`${index * 0.5 + 0.3}s`}
                    />
                  </circle>
                  <circle r="1.5" fill="#EAB308" opacity="0.8">
                    <animateMotion
                      path={path}
                      dur={`${2.8 + index * 0.3}s`}
                      repeatCount="indefinite"
                      begin={`${index * 0.5 + 0.3}s`}
                    />
                  </circle>
                </g>
              );
            })}
          </g>

          {/* --- NODES (SVG HTML OVERLAYS) --- */}
          {/* LEFT COLUMN: Input Nodes */}
          {data.inputs.map((node, index) => {
            const IconComponent = node.icon;
            return (
              <foreignObject
                key={`in-node-${index}`}
                x={leftX}
                y={yCoordinates[index]}
                width={itemW}
                height={itemH}
                className="overflow-visible"
              >
                <motion.div
                  whileHover={{ scale: 1.04, borderColor: "rgba(234, 179, 8, 0.4)", boxShadow: "0 0 12px rgba(234, 179, 8, 0.15)" }}
                  className="flex items-center gap-2.5 px-3.5 py-2.5 bg-[#0a0a0a] border border-white/5 rounded-full text-white font-mono text-[9px] sm:text-[10px] tracking-wider uppercase select-none cursor-default"
                >
                  <IconComponent className="w-3.5 h-3.5 text-gold/80" />
                  <span className="truncate max-w-[105px] text-white/70 font-medium">{node.label}</span>
                </motion.div>
              </foreignObject>
            );
          })}

          {/* CENTER COLUMN: Processors & Hubs */}
          {/* Left Controller Square (X: 290, Y: 170) */}
          <foreignObject x="290" y="170" width="60" height="60" className="overflow-visible">
            <motion.div
              whileHover={{ scale: 1.05, borderColor: "rgba(234, 179, 8, 0.5)" }}
              className="w-[60px] h-[60px] bg-[#0c0c0c] border border-white/10 rounded-xl flex items-center justify-center flex-col gap-1 transition-all shadow-[0_0_20px_rgba(0,0,0,0.8)]"
            >
              <div className="relative w-8 h-8 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center">
                <span className="font-display font-black text-gold text-xs leading-none">AK</span>
              </div>
              <span className="font-mono text-[7px] text-white/40 uppercase tracking-widest leading-none">GATE</span>
            </motion.div>
          </foreignObject>

          {/* Central Core Engine (X: 380, Y: 160) */}
          <foreignObject x="380" y="160" width="140" height="80" className="overflow-visible">
            <motion.div
              whileHover={{ scale: 1.03, borderColor: "rgba(234, 179, 8, 0.3)", boxShadow: "0 0 25px rgba(234, 179, 8, 0.1)" }}
              className="w-[140px] h-[80px] bg-[#0d0d0d]/90 border border-white/5 rounded-xl flex flex-col items-center justify-center px-2 py-1.5 shadow-[0_0_30px_rgba(234,179,8,0.02)] transition-all duration-300"
            >
              {/* Core Label */}
              <span className="font-mono text-[8px] text-gold/80 uppercase tracking-[0.15em] font-semibold mb-2 leading-none">
                {data.processing.engineName}
              </span>

              {/* Inner Sub-Node Icons */}
              <div className="flex justify-around items-center w-full bg-black/40 rounded-lg p-1.5 border border-white/5 gap-1">
                {data.processing.subNodes.map((sub, sIdx) => {
                  const SubIcon = sub.icon;
                  return (
                    <div 
                      key={`sub-${sIdx}`}
                      className="relative group/sub flex flex-col items-center justify-center w-8 h-8 rounded bg-white/[0.02] border border-white/5 hover:bg-gold/10 hover:border-gold/30 transition-all duration-300 cursor-help"
                      title={sub.label}
                    >
                      <SubIcon className="w-3.5 h-3.5 text-white/70 group-hover/sub:text-gold" />
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </foreignObject>

          {/* Right Controller Square (X: 550, Y: 170) */}
          <foreignObject x="550" y="170" width="60" height="60" className="overflow-visible">
            <motion.div
              whileHover={{ scale: 1.05, borderColor: "rgba(234, 179, 8, 0.5)" }}
              className="w-[60px] h-[60px] bg-[#0c0c0c] border border-white/10 rounded-xl flex items-center justify-center flex-col gap-1 transition-all shadow-[0_0_20px_rgba(0,0,0,0.8)]"
            >
              <div className="relative w-8 h-8 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center">
                <span className="font-display font-black text-gold text-xs leading-none">AK</span>
              </div>
              <span className="font-mono text-[7px] text-white/40 uppercase tracking-widest leading-none">SYNC</span>
            </motion.div>
          </foreignObject>

          {/* RIGHT COLUMN: Output Nodes */}
          {data.outputs.map((node, index) => {
            const IconComponent = node.icon;
            return (
              <foreignObject
                key={`out-node-${index}`}
                x={rightX}
                y={yCoordinates[index]}
                width={itemW}
                height={itemH}
                className="overflow-visible"
              >
                <motion.div
                  whileHover={{ scale: 1.04, borderColor: "rgba(234, 179, 8, 0.4)", boxShadow: "0 0 12px rgba(234, 179, 8, 0.15)" }}
                  className="flex items-center gap-2.5 px-3.5 py-2.5 bg-[#0a0a0a] border border-white/5 rounded-full text-white font-mono text-[9px] sm:text-[10px] tracking-wider uppercase select-none cursor-default"
                >
                  <IconComponent className="w-3.5 h-3.5 text-gold/80" />
                  <span className="truncate max-w-[105px] text-white/70 font-medium">{node.label}</span>
                </motion.div>
              </foreignObject>
            );
          })}
        </svg>
      </div>
    </>
  );
}

