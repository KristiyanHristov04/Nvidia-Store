"use client";

import { useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Sparkles } from "@react-three/drei";

function SsdStick() {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.rotation.y = Math.sin(t * 0.3) * 0.55;
    group.current.rotation.x = 0.35 + Math.sin(t * 0.2) * 0.06;
  });

  return (
    <group ref={group}>
      {/* PCB */}
      <mesh>
        <boxGeometry args={[2.8, 0.06, 0.95]} />
        <meshStandardMaterial color="#0b1426" metalness={0.4} roughness={0.55} />
      </mesh>

      {/* Controller chip */}
      <mesh position={[-0.95, 0.07, 0]}>
        <boxGeometry args={[0.55, 0.09, 0.55]} />
        <meshStandardMaterial
          color="#365314"
          emissive="#76b900"
          emissiveIntensity={0.5}
          metalness={0.6}
          roughness={0.35}
        />
      </mesh>

      {/* NAND flash packages */}
      {[-0.15, 0.65].map((x) => (
        <mesh key={x} position={[x, 0.065, 0]}>
          <boxGeometry args={[0.65, 0.08, 0.72]} />
          <meshStandardMaterial color="#1e293b" metalness={0.5} roughness={0.45} />
        </mesh>
      ))}

      {/* Accent label strip */}
      <mesh position={[-0.15, 0.045, 0.42]}>
        <boxGeometry args={[2.4, 0.025, 0.04]} />
        <meshStandardMaterial
          color="#76b900"
          emissive="#76b900"
          emissiveIntensity={1.8}
          toneMapped={false}
        />
      </mesh>

      {/* Gold edge connector with M-key notch */}
      <mesh position={[1.31, 0, 0.12]}>
        <boxGeometry args={[0.18, 0.05, 0.62]} />
        <meshStandardMaterial color="#d4a017" metalness={1} roughness={0.25} />
      </mesh>
      <mesh position={[1.31, 0, -0.36]}>
        <boxGeometry args={[0.18, 0.05, 0.14]} />
        <meshStandardMaterial color="#d4a017" metalness={1} roughness={0.25} />
      </mesh>

      {/* Mounting semicircle hint at the far end */}
      <mesh position={[-1.34, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.09, 0.09, 0.07, 20]} />
        <meshStandardMaterial color="#d4a017" metalness={1} roughness={0.3} />
      </mesh>
    </group>
  );
}

export default function Ssd3D() {
  return (
    <Canvas
      camera={{ position: [1.6, 1.6, 2.6], fov: 38 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      className="cursor-grab active:cursor-grabbing"
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 5, 2]} intensity={1.3} />
      <pointLight position={[-3, 2, -2]} intensity={30} color="#76b900" />
      <pointLight position={[3, -1, 2]} intensity={22} color="#e2e8f0" />

      <Float speed={1.6} rotationIntensity={0.2} floatIntensity={0.7}>
        <SsdStick />
      </Float>

      <Sparkles count={40} scale={5} size={1.8} speed={0.3} opacity={0.45} color="#a3e635" />
      <OrbitControls enableZoom={false} makeDefault />
    </Canvas>
  );
}
