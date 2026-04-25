"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { AvatarState } from "@/src/hooks/useAgentActivity";
import type { ActivityEvent } from "@/src/lib/mocks";

interface ClawCharacter3DProps {
  state: AvatarState;
  currentEvent: ActivityEvent | null;
  position?: [number, number, number];
}

const STATE_COLORS: Record<AvatarState, { body: string; ear: string; glow?: string }> = {
  idle: { body: "#818cf8", ear: "#6366f1" },
  thinking: { body: "#60a5fa", ear: "#3b82f6" },
  working: { body: "#facc15", ear: "#eab308", glow: "#facc15" },
  excited: { body: "#4ade80", ear: "#22c55e" },
  tired: { body: "#9ca3af", ear: "#6b7280" },
  reading: { body: "#c084fc", ear: "#a855f7" },
};

export default function ClawCharacter3D({
  state,
  currentEvent,
  position = [0, 0, 0],
}: ClawCharacter3DProps) {
  // Raio do corpo
  const BODY_RADIUS = 0.6;
  const FLOOR_OFFSET = 0.01;
  const baseY = position[1] + BODY_RADIUS + FLOOR_OFFSET;

  const colors = STATE_COLORS[state];
  const timeRef = useRef(0);

  const groupRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const faceRef = useRef<THREE.Group>(null);
  const particlesGroupRef = useRef<THREE.Group>(null);
  const bubblesGroupRef = useRef<THREE.Group>(null);

  const particleRefs = useRef<THREE.Mesh[]>([]);
  const bubbleRefs = useRef<THREE.Mesh[]>([]);

  const particles = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      angle: (i / 8) * Math.PI * 2,
      radius: 0.6 + Math.random() * 0.4,
      speed: 1.5 + Math.random(),
      size: 0.03 + Math.random() * 0.04,
    }));
  }, []);

  const thoughtBubbles = useMemo(() => {
    return Array.from({ length: 3 }, (_, i) => ({
      id: i,
      delay: i * 0.8,
      x: (i - 1) * 0.3,
    }));
  }, []);

  useFrame((_, delta) => {
    timeRef.current += delta;
    const t = timeRef.current;
    const group = groupRef.current;
    const body = bodyRef.current;
    const glow = glowRef.current;
    const face = faceRef.current;
    const pGroup = particlesGroupRef.current;
    const bGroup = bubblesGroupRef.current;
    if (!group || !body) return;

    let bodyRotZ = 0;
    let bodyRotX = 0;

    // Animações baseadas no estado
    switch (state) {
      case "idle":
        bodyRotZ = Math.sin(t * 1.5) * 0.05;
        group.position.y = baseY + Math.sin(t * 2) * 0.05;
        body.scale.setScalar(1 + Math.sin(t * 2) * 0.02);
        break;

      case "thinking":
        bodyRotZ = Math.sin(t * 3) * 0.08;
        group.position.y = baseY + Math.sin(t * 4) * 0.03;
        if (bGroup) bGroup.visible = true;
        break;

      case "working":
        group.position.y = baseY + Math.sin(t * 15) * 0.02;
        bodyRotZ = Math.sin(t * 20) * 0.02;
        if (glow) {
          const s = 1.15 + Math.sin(t * 3) * 0.1;
          glow.scale.setScalar(s);
          (glow.material as THREE.MeshBasicMaterial).opacity = 0.3 + Math.sin(t * 3) * 0.15;
        }
        if (pGroup) {
          pGroup.visible = true;
          pGroup.rotation.y += delta * 2;
        }
        break;

      case "excited": {
        const jump = Math.abs(Math.sin(t * 4)) * 0.4;
        group.position.y = baseY + jump;
        bodyRotZ = Math.sin(t * 8) * 0.1;
        body.scale.setScalar(1 + jump * 0.3);
        break;
      }

      case "tired":
        bodyRotX = 0.3;
        group.position.y = baseY + Math.sin(t * 1) * 0.02;
        break;

      case "reading":
        bodyRotX = 0.2;
        group.position.y = baseY;
        break;
    }

    // Aplica rotação ao corpo
    group.rotation.z = bodyRotZ;
    group.rotation.x = bodyRotX;

    // Face estabilizada: contra-rotação suave para manter olhos virados para frente
    if (face) {
      face.rotation.z = -bodyRotZ * 0.7;
      face.rotation.x = -bodyRotX * 0.5;
    }

    // Reset visibilidades
    if (bGroup && state !== "thinking") bGroup.visible = false;
    if (pGroup && state !== "working") pGroup.visible = false;
    if (glow && state !== "working") glow.scale.setScalar(0);

    // Animar partículas
    if (pGroup && state === "working") {
      particleRefs.current.forEach((mesh, i) => {
        if (!mesh) return;
        const p = particles[i];
        mesh.position.x = Math.cos(p.angle + t * p.speed) * p.radius;
        mesh.position.y = Math.sin(t * p.speed * 2) * 0.3 + 0.3;
        mesh.position.z = Math.sin(p.angle + t * p.speed) * p.radius;
      });
    }

    // Animar bolhas
    if (bGroup && state === "thinking") {
      bubbleRefs.current.forEach((mesh, i) => {
        if (!mesh) return;
        const b = thoughtBubbles[i];
        mesh.position.x = b.x;
        mesh.position.y = Math.sin(t * 2 + b.delay) * 0.15 + b.id * 0.15;
      });
    }
  });

  // Posições dos olhos: metade dentro, metade fora da superfície da esfera
  // Olho branco encostado na superfície, pupila e brilho à frente para serem visíveis
  const eyeZ = BODY_RADIUS - 0.05;      // olho branco: metade dentro, metade fora
  const pupilZ = BODY_RADIUS + 0.08;     // pupila: à frente do olho branco
  const shineZ = BODY_RADIUS + 0.12;     // brilho: à frente da pupila
  const cheekZ = BODY_RADIUS - 0.02;     // bochecha: sutil na superfície
  const mouthZ = BODY_RADIUS + 0.02;     // boca: ligeiramente para fora

  return (
    <group ref={groupRef} position={position}>
      {/* Glow para working */}
      <mesh ref={glowRef} scale={0}>
        <sphereGeometry args={[BODY_RADIUS * 1.4, 32, 32]} />
        <meshBasicMaterial color={colors.glow || colors.body} transparent opacity={0.3} />
      </mesh>

      {/* Corpo principal */}
      <mesh ref={bodyRef} castShadow>
        <sphereGeometry args={[BODY_RADIUS, 32, 32]} />
        <meshStandardMaterial
          color={colors.body}
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>

      {/* Orelha esquerda */}
      <mesh position={[-0.34, BODY_RADIUS * 0.85, 0]} rotation={[0, 0, 0.4]} castShadow>
        <coneGeometry args={[0.18, 0.42, 4]} />
        <meshStandardMaterial color={colors.ear} roughness={0.4} />
      </mesh>

      {/* Orelha direita */}
      <mesh position={[0.34, BODY_RADIUS * 0.85, 0]} rotation={[0, 0, -0.4]} castShadow>
        <coneGeometry args={[0.18, 0.42, 4]} />
        <meshStandardMaterial color={colors.ear} roughness={0.4} />
      </mesh>

      {/* Face estabilizada - contra-rotaciona para manter expressão virada para frente */}
      <group ref={faceRef}>
        {/* Olho esquerdo (branco) - metade dentro, metade fora */}
        <mesh position={[-0.2, 0.1, eyeZ]}>
          <sphereGeometry args={[0.11, 16, 16]} />
          <meshStandardMaterial color="white" roughness={0.2} />
        </mesh>
        {/* Pupila esquerda - centralizada no olho branco */}
        <mesh position={[-0.2, 0.1, pupilZ]}>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshStandardMaterial color="#1f2937" roughness={0.1} />
        </mesh>
        {/* Brilho olho esquerdo - centralizado na pupila */}
        <mesh position={[-0.17, 0.12, shineZ]}>
          <sphereGeometry args={[0.022, 8, 8]} />
          <meshBasicMaterial color="white" />
        </mesh>

        {/* Olho direito (branco) - metade dentro, metade fora */}
        <mesh position={[0.2, 0.1, eyeZ]}>
          <sphereGeometry args={[0.11, 16, 16]} />
          <meshStandardMaterial color="white" roughness={0.2} />
        </mesh>
        {/* Pupila direita - centralizada no olho branco */}
        <mesh position={[0.2, 0.1, pupilZ]}>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshStandardMaterial color="#1f2937" roughness={0.1} />
        </mesh>
        {/* Brilho olho direito - centralizado na pupila */}
        <mesh position={[0.23, 0.12, shineZ]}>
          <sphereGeometry args={[0.022, 8, 8]} />
          <meshBasicMaterial color="white" />
        </mesh>

        {/* Boca (sorriso sutil) */}
        <mesh position={[0, -0.15, mouthZ]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.1, 0.018, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>

        {/* Bochechas (coradinho) */}
        <mesh position={[-0.32, -0.05, cheekZ]}>
          <sphereGeometry args={[0.07, 8, 8]} />
          <meshStandardMaterial color="#fca5a5" transparent opacity={0.4} />
        </mesh>
        <mesh position={[0.32, -0.05, cheekZ]}>
          <sphereGeometry args={[0.07, 8, 8]} />
          <meshStandardMaterial color="#fca5a5" transparent opacity={0.4} />
        </mesh>
      </group>

      {/* Partículas de energia (working) */}
      <group ref={particlesGroupRef} visible={false}>
        {particles.map((p, i) => (
          <mesh
            key={p.id}
            ref={(el) => { if (el) particleRefs.current[i] = el; }}
          >
            <sphereGeometry args={[p.size, 8, 8]} />
            <meshBasicMaterial color="#facc15" />
          </mesh>
        ))}
      </group>

      {/* Bolhas de pensamento (thinking) */}
      <group ref={bubblesGroupRef} visible={false} position={[0, 0.9, 0]}>
        {thoughtBubbles.map((b, i) => (
          <mesh
            key={b.id}
            ref={(el) => { if (el) bubbleRefs.current[i] = el; }}
          >
            <sphereGeometry args={[0.04 + b.id * 0.02, 8, 8]} />
            <meshStandardMaterial color="white" transparent opacity={0.6} />
          </mesh>
        ))}
      </group>

      {/* Acessório: martelo quando file_edit */}
      {currentEvent?.activity?.kind === "file_edit" && (
        <mesh position={[BODY_RADIUS * 0.9, BODY_RADIUS * 0.2, BODY_RADIUS * 0.2]} rotation={[0, 0, -0.5]}>
          <boxGeometry args={[0.18, 0.05, 0.05]} />
          <meshStandardMaterial color="#6b7280" />
        </mesh>
      )}
    </group>
  );
}
