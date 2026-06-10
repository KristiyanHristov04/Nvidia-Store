"use client";

import { Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Center,
  ContactShadows,
  Float,
  Html,
  OrbitControls,
  Sparkles,
  useGLTF,
  useProgress,
} from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

const MODEL_URL = "/models/gpu.glb";
const DRACO_PATH = "/draco/";
const TARGET_LENGTH = 3.2;

// The model is authored standing upright (length along Y). This base rotation
// lays it horizontal with the "RTX 4090" backplate facing the camera, text upright.
const BASE_ROTATION: [number, number, number] = [Math.PI / 2, 0, Math.PI / 2];

type PoseName = "backplate" | "fans" | "top";

const POSES: Record<PoseName, [number, number, number]> = {
  backplate: [0, 0, 0],
  fans: [0, Math.PI, 0],
  top: [Math.PI / 2.4, 0.3, 0],
};

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="whitespace-nowrap font-mono text-sm font-bold tracking-widest text-[#76b900]">
        LOADING RTX 4090 — {progress.toFixed(0)}%
      </div>
    </Html>
  );
}

function GpuModel({
  pose,
  interactingRef,
}: {
  pose: PoseName;
  interactingRef: React.RefObject<boolean>;
}) {
  const sway = useRef<THREE.Group>(null);
  const poseGroup = useRef<THREE.Group>(null);
  // Note: the model ships with a "Takeoff Mode" disassembly animation —
  // playing it throws parts out of frame, so it stays unused.
  const { scene } = useGLTF(MODEL_URL, DRACO_PATH);

  // Normalize whatever size the model was authored at to our scene units
  const scale = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    return TARGET_LENGTH / Math.max(size.x, size.y, size.z);
  }, [scene]);

  const targetQuaternion = useMemo(
    () =>
      new THREE.Quaternion().setFromEuler(new THREE.Euler(...POSES[pose])),
    [pose],
  );

  useFrame(({ clock }) => {
    // Glide toward the selected preset pose
    poseGroup.current?.quaternion.slerp(targetQuaternion, 0.06);

    // Gentle idle sway, paused while the user is dragging
    if (sway.current && !interactingRef.current) {
      const t = clock.getElapsedTime();
      sway.current.rotation.y = Math.sin(t * 0.25) * 0.22;
      sway.current.rotation.x = Math.sin(t * 0.18) * 0.04;
    }
  });

  return (
    <group ref={sway}>
      <group ref={poseGroup}>
        <Center>
          <group rotation={BASE_ROTATION} scale={scale}>
            <primitive object={scene} />
          </group>
        </Center>
      </group>
    </group>
  );
}

useGLTF.preload(MODEL_URL, DRACO_PATH);

const POSE_BUTTONS: { name: PoseName; label: string }[] = [
  { name: "backplate", label: "Backplate" },
  { name: "fans", label: "Fans" },
  { name: "top", label: "Top" },
];

export default function Hero3D() {
  const [pose, setPose] = useState<PoseName>("backplate");
  const interactingRef = useRef(false);
  const controlsRef = useRef<OrbitControlsImpl>(null);

  return (
    <div className="relative h-full w-full">
      <Canvas
        camera={{ position: [1.6, 1.0, 4.8], fov: 32 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        className="cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 6, 3]} intensity={2} />
        <pointLight position={[-4, 2, -2]} intensity={60} color="#76b900" />
        <pointLight position={[4, -1, 3]} intensity={35} color="#e2e8f0" />

        <Suspense fallback={<Loader />}>
          <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.5}>
            <GpuModel pose={pose} interactingRef={interactingRef} />
          </Float>
        </Suspense>

        <Sparkles
          count={70}
          scale={7}
          size={2.2}
          speed={0.35}
          opacity={0.5}
          color="#a3e635"
        />
        <ContactShadows
          position={[0, -1.3, 0]}
          opacity={0.45}
          scale={9}
          blur={2.6}
          far={2.6}
          color="#000000"
        />
        <OrbitControls
          ref={controlsRef}
          makeDefault
          enableZoom={false}
          rotateSpeed={0.9}
          onStart={() => {
            interactingRef.current = true;
          }}
          onEnd={() => {
            interactingRef.current = false;
          }}
        />
      </Canvas>

      {/* View controls */}
      <div className="absolute bottom-2 right-2 z-10 flex items-center gap-1.5">
        {POSE_BUTTONS.map((button) => (
          <button
            key={button.name}
            onClick={() => setPose(button.name)}
            className={`border px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition-colors ${
              pose === button.name
                ? "border-nv bg-nv text-black"
                : "border-white/20 bg-black/50 text-zinc-300 backdrop-blur hover:border-nv hover:text-nv"
            }`}
          >
            {button.label}
          </button>
        ))}
        <button
          onClick={() => {
            setPose("backplate");
            controlsRef.current?.reset();
          }}
          aria-label="Reset view"
          className="border border-white/20 bg-black/50 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-zinc-300 backdrop-blur transition-colors hover:border-nv hover:text-nv"
        >
          ⟲ Reset
        </button>
      </div>

      <span className="pointer-events-none absolute bottom-2 left-2 z-10 text-[11px] text-zinc-600">
        Drag to rotate · Right-drag to move
      </span>
    </div>
  );
}
