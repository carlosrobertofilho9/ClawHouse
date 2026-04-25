"use client";

import { ReactNode } from "react";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface EntranceRoom3DProps {
  children?: ReactNode;
}

export default function EntranceRoom3D({ children }: EntranceRoom3DProps) {
  return (
    <group>
      {/* Estrutura da sala */}
      <RoomStructure />
      
      {/* Mobília */}
      <FrontDoor position={[0, 1.5, -3.95]} />
      <ConsoleTable position={[-2.5, 0, -3.2]} rotation={[0, 0.2, 0]} />
      <Rug position={[0, 0.01, 0]} />
      <WallLamp position={[-3.95, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} />
      <WallLamp position={[3.95, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]} />
      <PottedPlant position={[3.2, 0, -3.2]} />
      <Mirror position={[2.5, 1.8, -3.9]} />
      
      {/* Iluminação local */}
      <pointLight position={[0, 3.5, 0]} intensity={0.6} color="#fff8e7" distance={10} castShadow />
      <pointLight position={[-3, 2.5, -3]} intensity={0.3} color="#ffd6a5" distance={6} />
      
      {/* Personagem e outros children */}
      {children}
    </group>
  );
}

function RoomStructure() {
  const roomWidth = 8;
  const roomDepth = 8;
  const roomHeight = 4;

  return (
    <group>
      {/* Piso - madeira escura */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[roomWidth, roomDepth]} />
        <meshStandardMaterial color="#3d2b1f" roughness={0.7} metalness={0.05} />
      </mesh>
      
      {/* Piso - detalhe de tábuas (listras sutis) */}
      {Array.from({ length: 16 }, (_, i) => {
        const x = -roomWidth / 2 + 0.25 + i * 0.5;
        return (
          <mesh
            key={i}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[x, 0.001, 0]}
          >
            <planeGeometry args={[0.02, roomDepth]} />
            <meshStandardMaterial color="#2a1d15" roughness={0.8} transparent opacity={0.3} />
          </mesh>
        );
      })}

      {/* Parede traseira (com a porta) */}
      <mesh position={[0, roomHeight / 2, -roomDepth / 2]} receiveShadow>
        <planeGeometry args={[roomWidth, roomHeight]} />
        <meshStandardMaterial color="#e8ddd4" roughness={0.9} />
      </mesh>

      {/* Parede esquerda */}
      <mesh position={[-roomWidth / 2, roomHeight / 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[roomDepth, roomHeight]} />
        <meshStandardMaterial color="#e8ddd4" roughness={0.9} />
      </mesh>

      {/* Parede direita */}
      <mesh position={[roomWidth / 2, roomHeight / 2, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[roomDepth, roomHeight]} />
        <meshStandardMaterial color="#e8ddd4" roughness={0.9} />
      </mesh>

      {/* Parede frontal (sem porta, onde "entramos") */}
      <mesh position={[0, roomHeight / 2, roomDepth / 2]} rotation={[0, Math.PI, 0]} receiveShadow>
        <planeGeometry args={[roomWidth, roomHeight]} />
        <meshStandardMaterial color="#e8ddd4" roughness={0.9} />
      </mesh>

      {/* Rodapés */}
      <mesh position={[0, 0.08, -roomDepth / 2 + 0.02]}>
        <boxGeometry args={[roomWidth, 0.16, 0.04]} />
        <meshStandardMaterial color="#5c4033" roughness={0.6} />
      </mesh>
      <mesh position={[-roomWidth / 2 + 0.02, 0.08, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[roomDepth, 0.16, 0.04]} />
        <meshStandardMaterial color="#5c4033" roughness={0.6} />
      </mesh>
      <mesh position={[roomWidth / 2 - 0.02, 0.08, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[roomDepth, 0.16, 0.04]} />
        <meshStandardMaterial color="#5c4033" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.08, roomDepth / 2 - 0.02]}>
        <boxGeometry args={[roomWidth, 0.16, 0.04]} />
        <meshStandardMaterial color="#5c4033" roughness={0.6} />
      </mesh>

      {/* Teto (opcional - com abertura sutil ou completo) */}
      <mesh position={[0, roomHeight, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[roomWidth, roomDepth]} />
        <meshStandardMaterial color="#f5f0eb" roughness={0.9} />
      </mesh>

      {/* Moldura do teto */}
      <mesh position={[0, roomHeight - 0.05, 0]}>
        <boxGeometry args={[roomWidth, 0.1, roomDepth]} />
        <meshStandardMaterial color="#e0d5cc" roughness={0.8} />
      </mesh>
    </group>
  );
}

function FrontDoor({ position, rotation }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Frame */}
      <mesh position={[0, 0, -0.06]} castShadow>
        <boxGeometry args={[1.4, 2.4, 0.12]} />
        <meshStandardMaterial color="#5c4033" roughness={0.6} />
      </mesh>
      {/* Porta */}
      <mesh position={[0, 0, 0.02]} castShadow>
        <boxGeometry args={[1.2, 2.2, 0.08]} />
        <meshStandardMaterial color="#6b4423" roughness={0.5} metalness={0.1} />
      </mesh>
      {/* Painéis da porta */}
      <mesh position={[-0.25, 0.4, 0.07]}>
        <boxGeometry args={[0.4, 0.6, 0.02]} />
        <meshStandardMaterial color="#5a3a1f" roughness={0.6} />
      </mesh>
      <mesh position={[0.25, 0.4, 0.07]}>
        <boxGeometry args={[0.4, 0.6, 0.02]} />
        <meshStandardMaterial color="#5a3a1f" roughness={0.6} />
      </mesh>
      <mesh position={[-0.25, -0.4, 0.07]}>
        <boxGeometry args={[0.4, 0.6, 0.02]} />
        <meshStandardMaterial color="#5a3a1f" roughness={0.6} />
      </mesh>
      <mesh position={[0.25, -0.4, 0.07]}>
        <boxGeometry args={[0.4, 0.6, 0.02]} />
        <meshStandardMaterial color="#5a3a1f" roughness={0.6} />
      </mesh>
      {/* Maçaneta */}
      <mesh position={[0.45, -0.1, 0.1]}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshStandardMaterial color="#c9a227" roughness={0.2} metalness={0.8} />
      </mesh>
    </group>
  );
}

function ConsoleTable({ position, rotation }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Tampo */}
      <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.06, 0.5]} />
        <meshStandardMaterial color="#4a3728" roughness={0.5} metalness={0.05} />
      </mesh>
      {/* Pernas */}
      {[[-0.7, 0.45, 0.2], [0.7, 0.45, 0.2], [-0.7, 0.45, -0.2], [0.7, 0.45, -0.2]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow>
          <boxGeometry args={[0.06, 0.9, 0.06]} />
          <meshStandardMaterial color="#4a3728" roughness={0.5} />
        </mesh>
      ))}
      {/* Gaveta */}
      <mesh position={[0, 0.75, 0.02]} castShadow>
        <boxGeometry args={[1.2, 0.2, 0.02]} />
        <meshStandardMaterial color="#5a4535" roughness={0.5} />
      </mesh>
      {/* Puxador da gaveta */}
      <mesh position={[0, 0.75, 0.05]}>
        <boxGeometry args={[0.2, 0.02, 0.04]} />
        <meshStandardMaterial color="#c9a227" roughness={0.2} metalness={0.8} />
      </mesh>
      {/* Decoração: vaso pequeno */}
      <mesh position={[-0.4, 1.05, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.08, 0.18, 12]} />
        <meshStandardMaterial color="#8b7355" roughness={0.7} />
      </mesh>
      {/* Decoração: livro */}
      <mesh position={[0.3, 0.96, 0]} rotation={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[0.2, 0.04, 0.15]} />
        <meshStandardMaterial color="#8b4513" roughness={0.8} />
      </mesh>
    </group>
  );
}

function Rug({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Tapete base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[2.5, 3.5]} />
        <meshStandardMaterial color="#8b4513" roughness={0.9} />
      </mesh>
      {/* Borda do tapete */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
        <planeGeometry args={[2.3, 3.3]} />
        <meshStandardMaterial color="#a0522d" roughness={0.9} />
      </mesh>
      {/* Padrão central */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.004, 0]}>
        <planeGeometry args={[1.2, 1.8]} />
        <meshStandardMaterial color="#cd853f" roughness={0.9} />
      </mesh>
    </group>
  );
}

function WallLamp({ position, rotation }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    if (lightRef.current) {
      lightRef.current.intensity = 0.4 + Math.sin(clock.elapsedTime * 3) * 0.05;
    }
  });

  return (
    <group position={position} rotation={rotation}>
      {/* Base */}
      <mesh castShadow>
        <boxGeometry args={[0.15, 0.2, 0.1]} />
        <meshStandardMaterial color="#3d3d3d" roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Braço */}
      <mesh position={[0.1, 0.1, 0]} castShadow>
        <boxGeometry args={[0.2, 0.04, 0.04]} />
        <meshStandardMaterial color="#3d3d3d" roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Cúpula */}
      <mesh position={[0.2, 0.05, 0]} castShadow>
        <coneGeometry args={[0.12, 0.15, 8, 1, true]} />
        <meshStandardMaterial color="#f5f5dc" roughness={0.8} side={THREE.DoubleSide} />
      </mesh>
      {/* Luz */}
      <pointLight
        ref={lightRef}
        position={[0.2, -0.1, 0]}
        intensity={0.4}
        color="#ffd6a5"
        distance={4}
      />
    </group>
  );
}

function PottedPlant({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Vaso */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.15, 0.7, 12]} />
        <meshStandardMaterial color="#8b4513" roughness={0.7} />
      </mesh>
      {/* Terra */}
      <mesh position={[0, 0.68, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.04, 12]} />
        <meshStandardMaterial color="#3d2817" roughness={0.9} />
      </mesh>
      {/* Caule */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.03, 0.5, 8]} />
        <meshStandardMaterial color="#228b22" roughness={0.8} />
      </mesh>
      {/* Folhas */}
      {Array.from({ length: 6 }, (_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * 0.15,
              1.1 + Math.sin(i) * 0.1,
              Math.sin(angle) * 0.15,
            ]}
            rotation={[Math.random() * 0.5, angle, Math.random() * 0.5]}
            castShadow
          >
            <sphereGeometry args={[0.12, 8, 8]} />
            <meshStandardMaterial color={i % 2 === 0 ? "#228b22" : "#32cd32"} roughness={0.8} />
          </mesh>
        );
      })}
    </group>
  );
}

function Mirror({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Frame */}
      <mesh castShadow>
        <boxGeometry args={[0.9, 1.3, 0.06]} />
        <meshStandardMaterial color="#d4af37" roughness={0.2} metalness={0.6} />
      </mesh>
      {/* Espelho */}
      <mesh position={[0, 0, 0.035]}>
        <boxGeometry args={[0.75, 1.15, 0.02]} />
        <meshStandardMaterial color="#c0d6e4" roughness={0.05} metalness={0.9} />
      </mesh>
    </group>
  );
}
