"use client";

import { cn } from "@/src/lib/utils";
import FurnitureBase, { type FurnitureComponentProps } from "./FurnitureBase";
import type { ReactNode } from "react";

export type TableItem = "frame" | "vase-red" | "vase-blue" | "lamp" | "plant";

interface ConsoleTableProps extends FurnitureComponentProps {
  width?: string;
  items?: TableItem[];
}

/* ─── Console-table scale ───
   Default w-60 (240px) feels right next to a sofa.
   ViewBox: 0 0 320 110  (~2.9:1)
*/

const VB_W = 320;
const VB_H = 110;

function WoodTop({ id }: { id: string }) {
  return (
    <pattern id={id} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(8)">
      <rect width="6" height="6" fill="#2a1a0f" />
      <path d="M0 3h6" stroke="#3d2617" strokeWidth="0.4" opacity="0.5" />
      <path d="M1 0v6" stroke="#1a0f08" strokeWidth="0.25" opacity="0.4" />
    </pattern>
  );
}

function Noise({ id }: { id: string }) {
  return (
    <filter id={id}>
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" result="n" />
      <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.1 0" in="n" result="c" />
      <feBlend in="SourceGraphic" in2="c" mode="multiply" />
    </filter>
  );
}

function Shadow({ id, dx = 0.5, dy = 2, b = 2, o = 0.25 }: { id: string; dx?: number; dy?: number; b?: number; o?: number }) {
  return (
    <filter id={id} x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx={dx} dy={dy} stdDeviation={b} floodColor="#000" floodOpacity={o} />
    </filter>
  );
}

function Glow({ id, b = 5 }: { id: string; b?: number }) {
  return (
    <filter id={id} x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation={b} result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  );
}

/* ─── Table ─── */
function TableBody() {
  const tx = 20;
  const ty = 26;
  const tw = 280;
  const th = 22;
  const edge = 4;
  const faceH = 16;
  const legW = 6;
  const legH = 12;

  return (
    <g>
      {/* Floor shadow */}
      <ellipse cx={VB_W / 2} cy={ty + th + faceH + legH + 5} rx={tw / 2 + 8} ry={5} fill="#000" opacity="0.2" filter="url(#blur)" />

      {/* Back legs */}
      <rect x={tx + 4} y={ty + th} width={legW - 1} height={legH - 4} rx={1} fill="#120a05" />
      <rect x={tx + tw - legW - 3} y={ty + th} width={legW - 1} height={legH - 4} rx={1} fill="#120a05" />

      {/* Table-top upper face */}
      <rect x={tx} y={ty} width={tw} height={th} rx={2.5} fill="url(#woodTop)" filter="url(#noise)" />
      <rect x={tx} y={ty} width={tw} height={th / 2} rx={2.5} fill="#fff" opacity="0.04" />
      <rect x={tx} y={ty + th - 1} width={tw} height={0.8} rx={0.4} fill="#000" opacity="0.25" />

      {/* Front edge of top */}
      <rect x={tx} y={ty + th} width={tw} height={edge} fill="#1f140c" />
      <rect x={tx + 1} y={ty + th + 0.5} width={tw - 2} height={0.6} fill="#3d2617" opacity="0.3" />

      {/* Front face (drawers) */}
      <rect x={tx + 2} y={ty + th + edge} width={tw - 4} height={faceH} rx={1.2} fill="#1c120a" />
      <line x1={tx + 2} y1={ty + th + edge + faceH / 2} x2={tx + tw - 2} y2={ty + th + edge + faceH / 2} stroke="#0d0804" strokeWidth="0.7" opacity="0.6" />

      {/* Handles */}
      <g filter="url(#glowGold)">
        <rect x={tx + tw * 0.27} y={ty + th + edge + 5.5} width={22} height={4.5} rx={2} fill="#c9a227" />
        <circle cx={tx + tw * 0.27 + 11} cy={ty + th + edge + 7.75} r={1.3} fill="#fff8d1" />
        <rect x={tx + tw * 0.67} y={ty + th + edge + 5.5} width={22} height={4.5} rx={2} fill="#c9a227" />
        <circle cx={tx + tw * 0.67 + 11} cy={ty + th + edge + 7.75} r={1.3} fill="#fff8d1" />
      </g>

      {/* Screws */}
      <circle cx={tx + 6} cy={ty + th + edge + 3.5} r={0.7} fill="#3d2617" />
      <circle cx={tx + 6} cy={ty + th + edge + faceH - 3.5} r={0.7} fill="#3d2617" />
      <circle cx={tx + tw - 6} cy={ty + th + edge + 3.5} r={0.7} fill="#3d2617" />
      <circle cx={tx + tw - 6} cy={ty + th + edge + faceH - 3.5} r={0.7} fill="#3d2617" />

      {/* Front legs */}
      <rect x={tx + 2} y={ty + th + edge + faceH} width={legW} height={legH} rx={1.2} fill="url(#woodTop)" filter="url(#noise)" />
      <rect x={tx + tw - legW - 2} y={ty + th + edge + faceH} width={legW} height={legH} rx={1.2} fill="url(#woodTop)" filter="url(#noise)" />
      <rect x={tx + 2} y={ty + th + edge + faceH} width={2.5} height={legH} rx={0.6} fill="#000" opacity="0.35" />
      <rect x={tx + tw - legW - 2} y={ty + th + edge + faceH} width={2.5} height={legH} rx={0.6} fill="#000" opacity="0.35" />

      {/* Brass feet */}
      <rect x={tx + 1} y={ty + th + edge + faceH + legH - 1.5} width={legW + 2} height={2.5} rx={0.6} fill="#c9a227" />
      <rect x={tx + tw - legW - 3} y={ty + th + edge + faceH + legH - 1.5} width={legW + 2} height={2.5} rx={0.6} fill="#c9a227" />

      {/* Side edges */}
      <polygon points={`${tx},${ty + 2} ${tx - 2.5},${ty + 4.5} ${tx - 2.5},${ty + th + 1.5} ${tx},${ty + th}`} fill="#140c07" opacity="0.8" />
      <polygon points={`${tx + tw},${ty + 2} ${tx + tw + 2.5},${ty + 4.5} ${tx + tw + 2.5},${ty + th + 1.5} ${tx + tw},${ty + th}`} fill="#140c07" opacity="0.8" />
    </g>
  );
}

/* ─── Items ─── */
const TOP_Y = 31;

function Frame() {
  return (
    <g transform={`translate(46, ${TOP_Y - 12})`} filter="url(#shadowSm)">
      <ellipse cx={11} cy={22} rx={10} ry={2.5} fill="#000" opacity="0.2" />
      <polygon points="9,22 13,22 12,18.5 10,18.5" fill="#3f3f46" />
      <rect x={3.5} y={3.5} width={15} height={17} rx={1.2} fill="#f3e5ab" stroke="#bfa730" strokeWidth="1.1" />
      <rect x={5} y={5} width={12} height={14} rx={0.6} fill="#0f172a" />
      <circle cx={9} cy={9} r={2.2} fill="#f59e0b" opacity="0.9" />
      <path d="M5 18.5l3.5-5.5 2.5 3.5 3.5-5 4 7.5z" fill="#1e3a8a" opacity="0.85" />
      <path d="M5 18.5l3-4 2 3 3-4.5 3.5 5.5z" fill="#0f766e" opacity="0.7" />
      <polygon points="5,5 10,5 5,12" fill="#fff" opacity="0.07" />
      <polygon points="17,5 17,9 12,5" fill="#fff" opacity="0.04" />
    </g>
  );
}

function VaseRed() {
  return (
    <g transform={`translate(96, ${TOP_Y - 9})`} filter="url(#shadowSm)">
      <ellipse cx={9} cy={16} rx={8} ry={2.2} fill="#000" opacity="0.2" />
      <path d="M4.5 16 Q2.5 11.5 3.5 8.5 Q5 6.5 5 4.5 Q5 3.5 6.5 3.5 Q8 3.5 8 4.5 Q8 6.5 9.5 8.5 Q10.5 11.5 8.5 16 Z" fill="url(#gradRed)" />
      <rect x={5} y={2.5} width={3} height={1.3} rx={0.4} fill="#7f1d1d" />
      <path d="M4.5 9.5 Q4 12.5 5 15" stroke="#fff" strokeWidth="0.5" opacity="0.2" fill="none" strokeLinecap="round" />
      <g transform="translate(6.5, 1.5)">
        <ellipse cx={0} cy={1} rx={2.2} ry={1} fill="#166534" />
        <ellipse cx={-1.3} cy={-0.2} rx={1.7} ry={0.8} fill="#15803d" transform="rotate(-25)" />
        <ellipse cx={1.3} cy={-0.2} rx={1.7} ry={0.8} fill="#15803d" transform="rotate(25)" />
        <ellipse cx={-0.7} cy={-1.8} rx={1.3} ry={0.6} fill="#16a34a" transform="rotate(-12)" />
        <ellipse cx={0.7} cy={-1.8} rx={1.3} ry={0.6} fill="#16a34a" transform="rotate(12)" />
        <ellipse cx={0} cy={-2.7} rx={1} ry={0.5} fill="#22c55e" />
        <path d="M0 1v-3.5" stroke="#052e16" strokeWidth="0.2" opacity="0.5" />
        <path d="M0 0l-0.9 -1.2" stroke="#052e16" strokeWidth="0.2" opacity="0.4" />
        <path d="M0 0l0.9 -1.2" stroke="#052e16" strokeWidth="0.2" opacity="0.4" />
      </g>
    </g>
  );
}

function VaseBlue() {
  return (
    <g transform={`translate(140, ${TOP_Y - 10})`} filter="url(#shadowSm)">
      <ellipse cx={9} cy={17} rx={8} ry={2.2} fill="#000" opacity="0.2" />
      <path d="M3.5 17 L3.5 9 Q3.5 6.5 6 5.5 L6 3 Q6 2 7.5 2 Q9 2 9 3 L9 5.5 Q11.5 6.5 11.5 9 L11.5 17 Q11.5 18 7.5 18 Q3.5 18 3.5 17 Z" fill="url(#gradBlue)" />
      <rect x={4} y={10.5} width={7} height={1.1} rx={0.3} fill="#1e3a8a" opacity="0.5" />
      <path d="M4 9.5 Q3.5 13 4 16" stroke="#fff" strokeWidth="0.4" opacity="0.2" fill="none" strokeLinecap="round" />
      <g transform="translate(7.5, 1.5)">
        <path d="M0 0 Q-1.2 -4.5 -2.8 -7" stroke="#15803d" strokeWidth="0.5" fill="none" />
        <path d="M0 0 Q1.3 -5.5 2.2 -8.5" stroke="#15803d" strokeWidth="0.5" fill="none" />
        <path d="M0 0 Q2.8 -4 3.8 -6" stroke="#15803d" strokeWidth="0.5" fill="none" />
        <g transform="translate(-2.8, -7)">
          <circle r={1.6} fill="#e0f2fe" />
          <circle r={0.7} fill="#f0f9ff" />
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <ellipse key={a} cx={Math.cos((a * Math.PI) / 180) * 1.3} cy={Math.sin((a * Math.PI) / 180) * 1.3} rx={0.7} ry={0.35} fill="#bae6fd" transform={`rotate(${a})`} />
          ))}
        </g>
        <g transform="translate(2.2, -8.5)">
          <circle r={1.3} fill="#dbeafe" />
          <circle r={0.5} fill="#eff6ff" />
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse key={a} cx={Math.cos((a * Math.PI) / 180) * 1.1} cy={Math.sin((a * Math.PI) / 180) * 1.1} rx={0.6} ry={0.3} fill="#93c5fd" transform={`rotate(${a})`} />
          ))}
        </g>
        <g transform="translate(3.8, -6)">
          <circle r={1.1} fill="#ede9fe" />
          <circle r={0.4} fill="#f5f3ff" />
        </g>
      </g>
    </g>
  );
}

function Lamp() {
  return (
    <g transform={`translate(186, ${TOP_Y - 13})`} filter="url(#shadowSm)">
      <ellipse cx={11} cy={24} rx={9} ry={2.2} fill="#000" opacity="0.2" />
      <path d="M11 0 Q11 -5.5 16.5 -8" stroke="#334155" strokeWidth="0.6" fill="none" />
      <ellipse cx={11} cy={22} rx={7} ry={2.2} fill="#475569" />
      <rect x={8.5} y={16.5} width={5} height={5.5} rx={0.7} fill="#64748b" />
      <rect x={7.5} y={14.5} width={7} height={1.8} rx={0.4} fill="#94a3b8" />
      <rect x={9.5} y={6.5} width={3} height={9} rx={0.6} fill="#64748b" />
      <path d="M4.5 6.5 L17.5 6.5 L20 16.5 L2 16.5 Z" fill="url(#gradLamp)" opacity="0.95" />
      <path d="M6 8 L16 8 L17.5 15.5 L4.5 15.5 Z" fill="#fef3c7" opacity="0.2" />
      <circle cx={11} cy={11.5} r={3.5} fill="#fde047" filter="url(#glowWarm)" opacity="0.85" />
      <circle cx={11} cy={11.5} r={1.8} fill="#fff" opacity="0.9" />
      <polygon points="2,16.5 20,16.5 26,24 -4,24" fill="#fde047" opacity="0.05" />
      <line x1={16} y1={9.5} x2={16} y2={12.5} stroke="#cbd5e1" strokeWidth="0.3" />
      <circle cx={16} cy={13.2} r={0.5} fill="#cbd5e1" />
    </g>
  );
}

function Plant() {
  return (
    <g transform={`translate(240, ${TOP_Y - 10})`} filter="url(#shadowSm)">
      <ellipse cx={12} cy={18} rx={10} ry="2.5" fill="#000" opacity="0.2" />
      <path d="M3 18 L4.5 7.5 L19.5 7.5 L21 18 Q21 19.5 12 19.5 Q3 19.5 3 18 Z" fill="url(#gradConcrete)" />
      <rect x={4} y={6} width={16} height="2" rx="0.5" fill="#a1a1aa" />
      <rect x={5} y="6.5" width={14} height="0.7" rx="0.2" fill="#d4d4d8" opacity="0.4" />
      <circle cx="8" cy="13" r="0.3" fill="#52525b" opacity="0.3" />
      <circle cx="12" cy="15.5" r="0.3" fill="#52525b" opacity="0.3" />
      <circle cx="16" cy="12" r="0.3" fill="#52525b" opacity="0.3" />
      <ellipse cx="12" cy="7.8" rx="7" ry="1" fill="#292524" />
      <g transform="translate(12, 7)">
        <path d="M0 0 Q-6 -7 -10.5 -5 Q-12 -3 -8.5 -0.5 Q-4.5 2 0 0" fill="#14532d" />
        <path d="M0 0 Q6 -8 10.5 -6 Q12 -4 8.5 -1.5 Q4.5 1 0 0" fill="#14532d" />
        <path d="M0 0 Q-2.5 -8 -1 -12 Q0 -14 1.5 -10 Q3 -6.5 0 0" fill="#166534" />
        <path d="M0 0 Q-6.5 -4.5 -11 -1.5 Q-12.5 1.5 -8.5 3 Q-3 3 0 0" fill="#15803d" />
        <path d="M0 0 Q6.5 -5 11 -2 Q12.5 0.5 8.5 3 Q3.5 3 0 0" fill="#15803d" />
        <path d="M0 0 Q-4 -7 -6.5 -11.5 Q-5 -14 -1.5 -9.5 Q1.5 -5.5 0 0" fill="#16a34a" />
        <path d="M0 0 Q4 -7 7.5 -10 Q9 -7 5.5 -3.5 Q2.5 -0.5 0 0" fill="#16a34a" />
        <path d="M0 0 Q-4 -3.5 -8 -1" stroke="#052e16" strokeWidth="0.25" fill="none" opacity="0.5" />
        <path d="M0 0 Q4 -4 8 -1.5" stroke="#052e16" strokeWidth="0.25" fill="none" opacity="0.5" />
        <path d="M0 0 Q-2 -7 -2.5 -9.5" stroke="#052e16" strokeWidth="0.25" fill="none" opacity="0.4" />
        <path d="M0 0 Q2.5 -5 4.5 -8.5" stroke="#052e16" strokeWidth="0.25" fill="none" opacity="0.4" />
        <ellipse cx="-6" cy="-4.5" rx="0.6" ry="0.3" fill="#14532d" opacity="0.6" transform="rotate(-16)" />
        <ellipse cx="6" cy="-5.5" rx="0.55" ry="0.3" fill="#14532d" opacity="0.6" transform="rotate(12)" />
        <ellipse cx="-1.5" cy="-8" rx="0.45" ry="0.22" fill="#166534" opacity="0.5" />
      </g>
    </g>
  );
}

const itemComponents: Record<TableItem, ReactNode> = {
  frame: <Frame />,
  "vase-red": <VaseRed />,
  "vase-blue": <VaseBlue />,
  lamp: <Lamp />,
  plant: <Plant />,
};

export default function ConsoleTable({
  className,
  placement,
  width = "w-60",
  items = ["frame", "vase-red"],
}: ConsoleTableProps) {
  return (
    <FurnitureBase placement={placement} className={cn(width, "h-auto", className)}>
      <svg viewBox={`0 0 ${VB_W} ${VB_H}`} xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" style={{ overflow: "visible" }}>
        <defs>
          <WoodTop id="woodTop" />
          <Noise id="noise" />
          <Shadow id="shadowSm" />
          <Glow id="glowGold" b={1.2} />
          <Glow id="glowWarm" b={3} />
          <filter id="blur">
            <feGaussianBlur stdDeviation="2" />
          </filter>

          <linearGradient id="gradRed" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7f1d1d" />
            <stop offset="40%" stopColor="#b91c1c" />
            <stop offset="70%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#991b1b" />
          </linearGradient>

          <linearGradient id="gradBlue" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="40%" stopColor="#2563eb" />
            <stop offset="70%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>

          <linearGradient id="gradLamp" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="60%" stopColor="#fde68a" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>

          <linearGradient id="gradConcrete" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#52525b" />
            <stop offset="30%" stopColor="#a1a1aa" />
            <stop offset="70%" stopColor="#d4d4d8" />
            <stop offset="100%" stopColor="#52525b" />
          </linearGradient>
        </defs>

        <TableBody />

        {items.slice(0, 5).map((key, i) => {
          const slotX = [46, 96, 140, 186, 240][i];
          const baseX = [46, 96, 140, 186, 240][["frame", "vase-red", "vase-blue", "lamp", "plant"].indexOf(key) ?? 0];
          const shiftX = slotX - baseX;
          return (
            <g key={`${key}-${i}`} transform={`translate(${shiftX}, 0)`}>
              {itemComponents[key]}
            </g>
          );
        })}
      </svg>
    </FurnitureBase>
  );
}
