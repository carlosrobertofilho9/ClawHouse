"use client";

import House from "@/src/components/House";
import ActivityTimeline from "@/src/components/ActivityTimeline";
import StatusBar from "@/src/components/StatusBar";
import NarrationBar from "@/src/components/NarrationBar";
import { useAgentActivity } from "@/src/hooks/useAgentActivity";
import { useAvatarSound } from "@/src/hooks/useAvatarSound";

export default function Home() {
  const {
    events,
    current,
    currentRoom,
    previousRoom,
    isTransitioning,
    avatarState,
    status,
    error,
  } = useAgentActivity();

  // Optional sound
  useAvatarSound(avatarState);

  return (
    <div className="h-[calc(100vh-3.5rem)] flex flex-col bg-[#0f0f23]">
      <StatusBar status={status} error={error} />

      {/* Narration Bar */}
      <div className="px-4 py-2 bg-[#1a1a2e] border-b border-neutral-800">
        <NarrationBar
          avatarState={avatarState}
          currentEvent={current}
          currentRoom={currentRoom}
          className="max-w-2xl mx-auto"
        />
      </div>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Game Area */}
        <div className="flex-1 flex flex-col p-4 lg:p-6 overflow-hidden">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">
                🎮 ClawHouse
              </h2>
              <p className="text-xs text-neutral-400">
                Cômodo atual:{" "}
                <span className="font-medium text-neutral-200 capitalize">
                  {currentRoom.replace("_", " ")}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-500">Claw</span>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </div>
          </div>
          <div className="flex-1 min-h-0">
            <House
              currentRoom={currentRoom}
              previousRoom={previousRoom}
              isTransitioning={isTransitioning}
              avatarState={avatarState}
              currentEvent={current}
            />
          </div>
        </div>

        {/* Timeline Sidebar */}
        <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-neutral-800 bg-[#0f0f23] p-4 h-80 lg:h-auto overflow-hidden flex flex-col">
          <ActivityTimeline events={events} maxItems={10} />
        </div>
      </div>
    </div>
  );
}
