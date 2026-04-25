"use client";

import { cn } from "@/src/lib/utils";
import { AvatarState } from "@/src/hooks/useAgentActivity";
import { ActivityEvent } from "@/src/lib/mocks";
import type { Room } from "@/src/lib/mocks";

interface ClawCharacterProps {
  state: AvatarState;
  isTransitioning: boolean;
  currentRoom: Room;
  previousRoom: Room | null;
  currentEvent: ActivityEvent | null;
}

export default function ClawCharacter({
  state,
  currentEvent,
}: ClawCharacterProps) {
  return (
    <div className="relative">
      <ClawSVG state={state} currentEvent={currentEvent} />
      <StatusEffects state={state} currentEvent={currentEvent} />
    </div>
  );
}

function ClawSVG({ state, currentEvent }: { state: AvatarState; currentEvent: ActivityEvent | null }) {
  const kind = currentEvent?.activity?.kind || currentEvent?.kind || currentEvent?.type;

  const getEyes = () => {
    switch (state) {
      case "idle":
        return (
          <>
            <ellipse cx="28" cy="32" rx="5" ry="6" fill="white" />
            <ellipse cx="52" cy="32" rx="5" ry="6" fill="white" />
            <circle cx="29" cy="33" r="2.5" fill="#1f2937" />
            <circle cx="51" cy="33" r="2.5" fill="#1f2937" />
          </>
        );
      case "thinking":
        return (
          <>
            <ellipse cx="28" cy="32" rx="5" ry="5" fill="white" />
            <ellipse cx="52" cy="32" rx="5" ry="5" fill="white" />
            <circle cx="28" cy="32" r="2.5" fill="#1f2937" />
            <circle cx="52" cy="32" r="2.5" fill="#1f2937" />
            <line x1="22" y1="26" x2="34" y2="24" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" />
            <line x1="46" y1="24" x2="58" y2="26" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" />
          </>
        );
      case "working":
        return (
          <>
            <ellipse cx="28" cy="32" rx="5" ry="4" fill="white" />
            <ellipse cx="52" cy="32" rx="5" ry="4" fill="white" />
            <circle cx="29" cy="33" r="2.5" fill="#1f2937" />
            <circle cx="51" cy="33" r="2.5" fill="#1f2937" />
            <line x1="22" y1="26" x2="34" y2="28" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" />
            <line x1="46" y1="28" x2="58" y2="26" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" />
          </>
        );
      case "excited":
        return (
          <>
            <ellipse cx="28" cy="32" rx="6" ry="7" fill="white" />
            <ellipse cx="52" cy="32" rx="6" ry="7" fill="white" />
            <circle cx="29" cy="33" r="3" fill="#1f2937" />
            <circle cx="51" cy="33" r="3" fill="#1f2937" />
            <circle cx="31" cy="31" r="1" fill="white" />
            <circle cx="49" cy="31" r="1" fill="white" />
          </>
        );
      case "tired":
        return (
          <>
            <line x1="23" y1="32" x2="33" y2="34" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" />
            <line x1="47" y1="34" x2="57" y2="32" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" />
            <path d="M 34 48 Q 40 44 46 48" stroke="#1f2937" strokeWidth="2" fill="none" strokeLinecap="round" />
          </>
        );
      case "reading":
        return (
          <>
            <ellipse cx="28" cy="32" rx="5" ry="5" fill="white" />
            <ellipse cx="52" cy="32" rx="5" ry="5" fill="white" />
            <circle cx="30" cy="33" r="2.5" fill="#1f2937" />
            <circle cx="50" cy="33" r="2.5" fill="#1f2937" />
            <circle cx="28" cy="32" r="8" stroke="#1f2937" strokeWidth="1.5" fill="none" />
            <circle cx="52" cy="32" r="8" stroke="#1f2937" strokeWidth="1.5" fill="none" />
            <line x1="36" y1="32" x2="44" y2="32" stroke="#1f2937" strokeWidth="1.5" />
          </>
        );
    }
  };

  const getMouth = () => {
    if (state === "tired") return null;
    if (state === "excited") {
      return <path d="M 32 46 Q 40 54 48 46" stroke="#1f2937" strokeWidth="2" fill="#fca5a5" strokeLinecap="round" />;
    }
    if (state === "thinking") {
      return <ellipse cx="40" cy="48" rx="3" ry="2" fill="#1f2937" />;
    }
    return <path d="M 34 48 Q 40 52 46 48" stroke="#1f2937" strokeWidth="2" fill="none" strokeLinecap="round" />;
  };

  return (
    <div className={cn("relative", state === "excited" && "animate-jump", state === "tired" && "animate-shake")}>
      <svg width="80" height="80" viewBox="0 0 80 80" className="drop-shadow-lg">
        {/* Shadow */}
        <ellipse cx="40" cy="72" rx="20" ry="6" fill="rgba(0,0,0,0.2)" />

        {/* Body */}
        <circle
          cx="40"
          cy="40"
          r="28"
          className={cn(
            "transition-colors duration-500",
            state === "idle" && "fill-indigo-400",
            state === "thinking" && "fill-blue-400",
            state === "working" && "fill-yellow-400",
            state === "excited" && "fill-green-400",
            state === "tired" && "fill-gray-400",
            state === "reading" && "fill-purple-400"
          )}
        />

        {/* Glow for working */}
        {state === "working" && (
          <circle cx="40" cy="40" r="32" fill="none" stroke="#eab308" strokeWidth="2" opacity="0.5">
            <animate attributeName="r" values="30;34;30" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0.2;0.5" dur="2s" repeatCount="indefinite" />
          </circle>
        )}

        {/* Ears */}
        <ellipse cx="18" cy="22" rx="8" ry="10" className={cn(
            "transition-colors duration-500",
            state === "idle" && "fill-indigo-500",
            state === "thinking" && "fill-blue-500",
            state === "working" && "fill-yellow-500",
            state === "excited" && "fill-green-500",
            state === "tired" && "fill-gray-500",
            state === "reading" && "fill-purple-500"
          )} />
        <ellipse cx="62" cy="22" rx="8" ry="10" className={cn(
            "transition-colors duration-500",
            state === "idle" && "fill-indigo-500",
            state === "thinking" && "fill-blue-500",
            state === "working" && "fill-yellow-500",
            state === "excited" && "fill-green-500",
            state === "tired" && "fill-gray-500",
            state === "reading" && "fill-purple-500"
          )} />

        {/* Face */}
        {getEyes()}
        {getMouth()}

        {/* Accessories */}
        {state === "working" && (
          <>
            <rect x="58" y="50" width="12" height="4" fill="#6b7280" rx="1" transform="rotate(-20 64 52)" />
            <rect x="64" y="44" width="4" height="12" fill="#6b7280" rx="1" transform="rotate(-20 66 50)" />
          </>
        )}

        {kind === "file_edit" && (
          <rect x="58" y="48" width="14" height="3" fill="#f59e0b" rx="1" transform="rotate(30 65 50)" />
        )}
      </svg>

      {/* Thought bubbles */}
      {state === "thinking" && <ThoughtBubbles />}
    </div>
  );
}

function ThoughtBubbles() {
  return (
    <div className="absolute -top-6 left-1/2 -translate-x-1/2 pointer-events-none">
      {[0, 0.3, 0.6].map((delay, i) => (
        <div
          key={i}
          className="absolute animate-float-up text-base"
          style={{
            animationDelay: `${delay}s`,
            left: `${i * 6 - 6}px`,
            top: `${i * 3}px`,
          }}
        >
          💭
        </div>
      ))}
    </div>
  );
}

function StatusEffects({ state, currentEvent }: { state: AvatarState; currentEvent: ActivityEvent | null }) {
  const kind = currentEvent?.activity?.kind || currentEvent?.kind || currentEvent?.type;

  return (
    <>
      {/* Energy particles for working */}
      {(state === "working" || kind === "tool_call" || kind === "web_search") && (
        <div className="absolute inset-0 pointer-events-none">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-yellow-300 animate-particle"
              style={{
                animationDelay: `${i * 0.15}s`,
                ["--tx" as string]: `${Math.cos((i / 5) * Math.PI * 2) * 40}px`,
                ["--ty" as string]: `${Math.sin((i / 5) * Math.PI * 2) * 40}px`,
              }}
            />
          ))}
        </div>
      )}

      {/* Ripple for excited / message_sent */}
      {(state === "excited" || kind === "message_sent") && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          {[0, 0.4, 0.8].map((delay, i) => (
            <div
              key={i}
              className="absolute w-16 h-16 rounded-full border-2 border-green-400 animate-ripple"
              style={{ animationDelay: `${delay}s` }}
            />
          ))}
        </div>
      )}
    </>
  );
}
