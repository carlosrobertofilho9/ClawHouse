"use client";

import RoomBase, { RoomBaseProps } from "./RoomBase";
import { Plant, Stove, Fridge, KitchenIsland } from "@/src/components/furniture";

export default function KitchenRoom(props: Omit<RoomBaseProps, "id" | "name" | "emoji">) {
  return (
    <RoomBase {...props} id="cozinha" name="Cozinha" emoji="🍳">
      <div className="relative w-full h-full">
        <Stove className="absolute top-2 left-2" />
        <Fridge className="absolute top-2 right-2" />
        <KitchenIsland className="absolute bottom-6 left-1/2 -translate-x-1/2" items={["tomato", "cucumber"]} />
        <Plant className="absolute bottom-2 left-2" size="sm" leafColor="lime" flower="red" />
      </div>
    </RoomBase>
  );
}
