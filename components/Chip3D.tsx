"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Instance, Instances, OrbitControls } from "@react-three/drei";

function CpuChip() {
  const group = useRef<THREE.Group>(null);

  const pins = useMemo(() => {
    const positions: [number, number, number][] = [];
    for (let x = 0; x < 10; x++) {
      for (let z = 0; z < 10; z++) {
        positions.push([-0.63 + x * 0.14, -0.1, -0.63 + z * 0.14]);
      }
    }
    return positions;
  }, []);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.rotation.y = t * 0.25;
    group.current.rotation.x = 0.35 + Math.sin(t * 0.3) * 0.08;
  });

  return (
    <group ref={group}>
      {/* Substrate */}
      <mesh>
        <boxGeometry args={[1.6, 0.08, 1.6]} />
        <meshStandardMaterial color="#1a2e05" metalness={0.3} roughness={0.6} />
      </mesh>

      {/* Heat spreader */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[1.25, 0.12, 1.25]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.95} roughness={0.28} />
      </mesh>

      {/* Engraved emissive accent on the lid */}
      <mesh position={[0, 0.165, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.28, 0.34, 32]} />
        <meshStandardMaterial
          color="#76b900"
          emissive="#76b900"
          emissiveIntensity={1.6}
          toneMapped={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Gold contact pins */}
      <Instances limit={pins.length}>
        <boxGeometry args={[0.045, 0.12, 0.045]} />
        <meshStandardMaterial color="#d4a017" metalness={1} roughness={0.3} />
        {pins.map((position, i) => (
          <Instance key={i} position={position} />
        ))}
      </Instances>
    </group>
  );
}

export default function Chip3D() {
  return (
    <Canvas
      camera={{ position: [1.7, 1.5, 2.2], fov: 36 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      className="cursor-grab active:cursor-grabbing"
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 2]} intensity={1.4} />
      <pointLight position={[-3, 2, -1]} intensity={25} color="#76b900" />
      <pointLight position={[3, 0, 2]} intensity={18} color="#e2e8f0" />

      <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.5}>
        <CpuChip />
      </Float>

      <OrbitControls enableZoom={false} makeDefault />
    </Canvas>
  );
}
