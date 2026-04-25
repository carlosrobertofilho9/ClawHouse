"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Stars } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";
import EntranceRoom3D from "./rooms/EntranceRoom3D";
import ClawCharacter3D from "./ClawCharacter3D";
import type { AvatarState } from "@/src/hooks/useAgentActivity";
import type { ActivityEvent, Room } from "@/src/lib/mocks";

interface Scene3DProps {
  currentRoom: Room;
  avatarState: AvatarState;
  currentEvent: ActivityEvent | null;
}

export default function Scene3D({ currentRoom, avatarState, currentEvent }: Scene3DProps) {
  return (
    <div className="w-full h-full rounded-xl overflow-hidden">
      <Canvas
        shadows
        camera={{ position: [0, 4, 8], fov: 50 }}
        gl={{ antialias: true, toneMapping: 3 }}
      >
        <Suspense fallback={null}>
          {/* Background e atmosfera */}
          <color attach="background" args={["#0f0f23"]} />
          <fog attach="fog" args={["#0f0f23", 12, 30]} />
          <Stars radius={50} depth={30} count={800} factor={3} saturation={0.2} fade speed={0.5} />

          {/* Iluminação global */}
          <ambientLight intensity={0.35} color="#b8c5ff" />
          <directionalLight
            position={[5, 8, 5]}
            intensity={0.7}
            color="#fff8e7"
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-far={20}
            shadow-camera-left={-8}
            shadow-camera-right={8}
            shadow-camera-top={8}
            shadow-camera-bottom={-8}
          />
          <directionalLight
            position={[-3, 4, -3]}
            intensity={0.2}
            color="#8ec5ff"
          />

          {/* Sala atual */}
          {currentRoom === "entrada" && (
            <EntranceRoom3D>
              <ClawCharacter3D
                state={avatarState}
                currentEvent={currentEvent}
                position={[0, 0, 0]}
              />
            </EntranceRoom3D>
          )}

          {/* Fallback para outros cômodos */}
          {currentRoom !== "entrada" && (
            <FallbackRoom room={currentRoom}>
              <ClawCharacter3D
                state={avatarState}
                currentEvent={currentEvent}
                position={[0, 0, 0]}
              />
            </FallbackRoom>
          )}

          {/* Sombras de contato */}
          <ContactShadows
            position={[0, 0.01, 0]}
            opacity={0.35}
            scale={20}
            blur={2}
            far={5}
          />

          {/* Controles de câmera */}
          <OrbitControls
            makeDefault
            enablePan={false}
            minPolarAngle={Math.PI / 8}
            maxPolarAngle={Math.PI / 2.1}
            minDistance={4}
            maxDistance={16}
            target={[0, 1.5, 0]}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

function FallbackRoom({ room, children }: { room: Room; children?: React.ReactNode }) {
  const roomLabels: Record<Room, string> = {
    entrada: "Entrada",
    escritorio: "Escritório",
    biblioteca: "Biblioteca",
    cozinha: "Cozinha",
    laboratorio: "Laboratório",
    sala_de_controle: "Sala de Controle",
  };

  return (
    <group>
      {/* Piso placeholder */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.8} />
      </mesh>
      {/* Grade no piso */}
      <gridHelper args={[12, 12, "#2a2a3e", "#2a2a3e"]} position={[0, 0.01, 0]} />
      
      {/* Indicador visual de construção */}
      <FloatingLabel text={`${roomLabels[room]} - Em construção`} />
      
      {children}
    </group>
  );
}

function FloatingLabel({ text }: { text: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.y = 2.5 + Math.sin(clock.elapsedTime * 1.5) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, 2.5, -2]}>
      {/* Painel de fundo */}
      <mesh>
        <planeGeometry args={[4, 0.8]} />
        <meshStandardMaterial color="#1a1a3e" transparent opacity={0.85} side={THREE.DoubleSide} />
      </mesh>
      {/* Borda */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[4.1, 0.9]} />
        <meshBasicMaterial color="#4a4a6e" side={THREE.DoubleSide} />
      </mesh>
      {/* Indicadores visuais (esferas pulsantes) */}
      <mesh position={[-1.2, 0, 0.02]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[1.2, 0, 0.02]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}
