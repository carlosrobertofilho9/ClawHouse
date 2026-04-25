"use client";

import { cn } from "@/src/lib/utils";
import { AvatarState } from "@/src/hooks/useAgentActivity";
import { ActivityEvent } from "@/src/lib/mocks";

interface AvatarProps {
  state: AvatarState;
  isTransitioning: boolean;
  currentEvent: ActivityEvent | null;
  className?: string;
}

export default function Avatar({ state, isTransitioning, currentEvent, className }: AvatarProps) {
  const baseClasses = cn(
    "relative w-14 h-14 rounded-full flex items-center justify-center text-2xl z-10 transition-all duration-300 border-2 border-neutral-900",
    "bg-white shadow-xl",
    state === "idle" && "scale-100",
    state === "thinking" && "animate-bounce",
    state === "working" && "animate-slow-spin glow-yellow",
    state === "excited" && "animate-jump",
    state === "tired" && "grayscale-[0.5] rotate-3",
    state === "reading" && "opacity-80",
    isTransitioning && "opacity-0 scale-75",
    !isTransitioning && "opacity-100 scale-100",
    className
  );

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      {/* Thought bubbles */}
      {state === "thinking" && !isTransitioning && <ThoughtBubbles />}

      {/* Main avatar */}
      <div className={baseClasses}>
        {state === "reading" && (
          <div className="absolute inset-0 rounded-full animate-shimmer overflow-hidden" />
        )}
        <span className="relative z-10">🐾</span>
      </div>

      {/* Status effects overlay */}
      <AvatarEffects state={state} isTransitioning={isTransitioning} currentEvent={currentEvent} />
    </div>
  );
}

function ThoughtBubbles() {
  return (
    <div className="absolute -top-8 left-1/2 -translate-x-1/2 pointer-events-none">
      {[0, 0.3, 0.6].map((delay, i) => (
        <div
          key={i}
          className="absolute animate-float-up text-lg"
          style={{
            animationDelay: `${delay}s`,
            left: `${i * 8 - 8}px`,
            top: `${i * 4}px`,
          }}
        >
          💭
        </div>
      ))}
    </div>
  );
}

function AvatarEffects({
  state,
  isTransitioning,
  currentEvent,
}: {
  state: AvatarState;
  isTransitioning: boolean;
  currentEvent: ActivityEvent | null;
}) {
  if (isTransitioning) return null;

  const kind = currentEvent?.activity?.kind || currentEvent?.kind || currentEvent?.type;

  return (
    <>
      {/* Tool call / working: energy particles */}
      {(state === "working" || kind === "tool_call" || kind === "web_search") && (
        <EnergyParticles />
      )}

      {/* File edit: floating pencil */}
      {kind === "file_edit" && <FloatingPencil />}

      {/* Message sent: ripple waves */}
      {state === "excited" || kind === "message_sent" ? <RippleWaves /> : null}
    </>
  );
}

function EnergyParticles() {
  const particles = Array.from({ length: 6 }, (_, i) => {
    const angle = (i / 6) * 360;
    const rad = (angle * Math.PI) / 180;
    const distance = 30 + Math.random() * 20;
    return {
      id: i,
      tx: Math.cos(rad) * distance,
      ty: Math.sin(rad) * distance,
      delay: i * 0.2,
      size: 4 + Math.random() * 4,
    };
  });

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-400 animate-particle"
          style={{
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            ["--tx" as string]: `${p.tx}px`,
            ["--ty" as string]: `${p.ty}px`,
          }}
        />
      ))}
    </div>
  );
}

function FloatingPencil() {
  return (
    <div className="absolute -top-4 -right-4 pointer-events-none animate-pencil-float text-xl">
      ✏️
    </div>
  );
}

function RippleWaves() {
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      {[0, 0.4, 0.8].map((delay, i) => (
        <div
          key={i}
          className="absolute w-14 h-14 rounded-full border-2 border-green-400 animate-ripple"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
    </div>
  );
}
