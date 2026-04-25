"use client";

import RoomBase, { RoomBaseProps } from "./RoomBase";
import { Plant, Stove, Fridge, KitchenIsland } from "@/src/components/furniture";

export default function KitchenRoom(props: Omit<RoomBaseProps, "id" | "name" | "emoji">) {
  return (
    <RoomBase {...props} id="cozinha" name="Cozinha" emoji="🍳">
      <div className="relative w-full h-full">
        <Stove placement={{ top: 8, left: 8 }} />
        <Fridge placement={{ top: 8, right: 8 }} />
        <KitchenIsland
          placement={{ bottom: 24, left: "50%", anchor: "bottom-center" }}
          items={["tomato", "cucumber"]}
        />
        <Plant placement={{ bottom: 8, left: 8 }} size="sm" leafColor="lime" flower="red" />
      </div>
    </RoomBase>
  );
}
