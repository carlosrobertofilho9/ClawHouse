"use client";

import { useEffect, useRef, useCallback } from "react";
import { AvatarState } from "@/src/hooks/useAgentActivity";

// Simple Web Audio API sound effects
function createAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    return new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  } catch {
    return null;
  }
}

function playTone(ctx: AudioContext, frequency: number, duration: number, type: OscillatorType = "sine") {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(frequency, ctx.currentTime);
  gain.gain.setValueAtTime(0.08, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
}

const stateSounds: Record<AvatarState, (ctx: AudioContext) => void> = {
  idle: (ctx) => playTone(ctx, 300, 0.3, "sine"),
  thinking: (ctx) => {
    playTone(ctx, 440, 0.15, "sine");
    setTimeout(() => playTone(ctx, 554, 0.15, "sine"), 120);
  },
  working: (ctx) => {
    playTone(ctx, 523, 0.1, "square");
    setTimeout(() => playTone(ctx, 659, 0.1, "square"), 100);
    setTimeout(() => playTone(ctx, 784, 0.1, "square"), 200);
  },
  excited: (ctx) => {
    playTone(ctx, 523, 0.1, "sine");
    setTimeout(() => playTone(ctx, 659, 0.1, "sine"), 80);
    setTimeout(() => playTone(ctx, 784, 0.1, "sine"), 160);
    setTimeout(() => playTone(ctx, 1047, 0.2, "sine"), 240);
  },
  tired: (ctx) => {
    playTone(ctx, 300, 0.3, "sawtooth");
    setTimeout(() => playTone(ctx, 250, 0.4, "sawtooth"), 200);
  },
  reading: (ctx) => playTone(ctx, 400, 0.2, "triangle"),
};

export function useAvatarSound(state: AvatarState) {
  const ctxRef = useRef<AudioContext | null>(null);
  const prevStateRef = useRef<AvatarState>("idle");

  useEffect(() => {
    ctxRef.current = createAudioContext();
    return () => {
      if (ctxRef.current?.state !== "closed") {
        ctxRef.current?.close();
      }
    };
  }, []);

  const play = useCallback(() => {
    if (typeof window === "undefined") return;
    const enabled = (window as unknown as { ClawHouse?: { soundEnabled?: boolean } }).ClawHouse?.soundEnabled;
    if (!enabled) return;

    const ctx = ctxRef.current;
    if (!ctx) return;
    if (ctx.state === "suspended") ctx.resume();

    stateSounds[state]?.(ctx);
  }, [state]);

  useEffect(() => {
    if (prevStateRef.current !== state) {
      prevStateRef.current = state;
      play();
    }
  }, [state, play]);

  return { play };
}
