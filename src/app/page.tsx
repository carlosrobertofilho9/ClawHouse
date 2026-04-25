"use client";

import House from "@/src/components/House";
import ActivityTimeline from "@/src/components/ActivityTimeline";
import StatusBar from "@/src/components/StatusBar";
import { useAgentActivity } from "@/src/hooks/useAgentActivity";

export default function Home() {
  const { events, currentRoom, status, error } = useAgentActivity();

  return (
    <div className="h-[calc(100vh-3.5rem)] flex flex-col">
      <StatusBar status={status} error={error} />
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Casa */}
        <div className="flex-1 flex items-center justify-center p-4 lg:p-8 overflow-auto">
          <div className="w-full max-w-3xl">
            <div className="mb-4 text-center lg:text-left">
              <h2 className="text-xl font-semibold text-neutral-800">
                🏠 Vista da Casa
              </h2>
              <p className="text-sm text-neutral-500">
                Cômodo atual: <span className="font-medium capitalize">{currentRoom.replace("_", " ")}</span>
              </p>
            </div>
            <House currentRoom={currentRoom} />
          </div>
        </div>

        {/* Timeline Sidebar */}
        <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-neutral-200 bg-gray-50 p-4 h-80 lg:h-auto">
          <ActivityTimeline events={events} maxItems={10} />
        </div>
      </div>
    </div>
  );
}
