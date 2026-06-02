import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerformanceMonitor, Stars } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

interface UnifiedThreeCanvasProps {
  currentPath: string;
}

type CameraControl = {
  x: number;
  y: number;
  z: number;
  tx: number;
  ty: number;
  tz: number;
};

function useClientOnly() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

/* ─────────────────────────────────────────────────────────────
   Scroll-Driven Camera
   ───────────────────────────────────────────────────────────── */
function ScrollDrivenCamera({ currentPath }: { currentPath: string }) {
  const { camera, pointer } = useThree();
  const smoothScrollRef = useRef(0);
  const cameraControl = useRef<CameraControl>({ x: 0, y: 0, z: 520, tx: 0, ty: 0, tz: 0 });
  const gsapRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (currentPath === "/") return;

    let target: CameraControl = { x: 0, y: 0, z: 520, tx: 0, ty: 0, tz: 0 };
    if (currentPath === "/platform")    target = { x: 160, y: 220, z: 440, tx: 0, ty: 60, tz: 0 };
    else if (currentPath === "/technology") target = { x: 0, y: 0, z: -800, tx: 0, ty: 0, tz: -1500 };
    else if (currentPath === "/solutions")  target = { x: 360, y: -360, z: 230, tx: 0, ty: -600, tz: 200 };
    else if (currentPath === "/industries") target = { x: -270, y: -540, z: 540, tx: 0, ty: -600, tz: 200 };
    else if (currentPath === "/about")      target = { x: 420, y: 220, z: 440, tx: 0, ty: 0, tz: 0 };
    else if (currentPath === "/contact")    target = { x: 0, y: -1050, z: 440, tx: 0, ty: -600, tz: 200 };

    gsapRef.current?.kill();
    gsapRef.current = gsap.to(cameraControl.current, { ...target, duration: 2.2, ease: "power2.inOut" });
    return () => { gsapRef.current?.kill(); };
  }, [currentPath]);

  useFrame(() => {
    const parallaxX = pointer.x * 55;
    const parallaxY = pointer.y * 45;

    if (currentPath === "/") {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const targetSp = totalHeight > 0 ? window.scrollY / totalHeight : 0;
      smoothScrollRef.current += (Math.max(0, Math.min(1, targetSp)) - smoothScrollRef.current) * 0.07;
      const sp = smoothScrollRef.current;

      let target: CameraControl = { x: 0, y: 0, z: 520, tx: 0, ty: 0, tz: 0 };
      if (sp < 0.22) {
        const t = sp / 0.22;
        target = { x: 0, y: 0, z: 530 + t * 80, tx: 0, ty: 0, tz: 0 };
      } else if (sp < 0.55) {
        const t = (sp - 0.22) / 0.33;
        target = { x: t * 120, y: -160 - t * 430, z: 530 - t * 270, tx: 0, ty: -560, tz: 300 + t * 430 };
      } else if (sp < 0.75) {
        const t = (sp - 0.55) / 0.2;
        target = { x: 130 + t * 210, y: -560 + t * 570, z: 255 - t * 570, tx: 310, ty: 0, tz: -330 - t * 185 };
      } else if (sp < 0.88) {
        const t = (sp - 0.75) / 0.13;
        target = { x: 310 - t * 630, y: t * 215, z: -310, tx: -310, ty: 210, tz: -330 - t * 125 };
      } else {
        const t = (sp - 0.88) / 0.12;
        target = { x: -310 + t * 310, y: 210 - t * 210, z: -360 - t * 920, tx: 0, ty: 0, tz: -1200 - t * 660 };
      }

      cameraControl.current.x  += (target.x  - cameraControl.current.x)  * 0.07;
      cameraControl.current.y  += (target.y  - cameraControl.current.y)  * 0.07;
      cameraControl.current.z  += (target.z  - cameraControl.current.z)  * 0.07;
      cameraControl.current.tx += (target.tx - cameraControl.current.tx) * 0.07;
      cameraControl.current.ty += (target.ty - cameraControl.current.ty) * 0.07;
      cameraControl.current.tz += (target.tz - cameraControl.current.tz) * 0.07;
    }

    camera.position.set(
      cameraControl.current.x + (currentPath === "/" ? parallaxX : parallaxX * 0.5),
      cameraControl.current.y + (currentPath === "/" ? parallaxY : parallaxY * 0.5),
      cameraControl.current.z,
    );
    camera.lookAt(cameraControl.current.tx, cameraControl.current.ty, cameraControl.current.tz);
  });

  return null;
}

/* ─────────────────────────────────────────────────────────────
   Scene 1: Neural AI Core — icosahedron + vibrant rings
   ───────────────────────────────────────────────────────────── */
function NeuralCore() {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const icoRef   = useRef<THREE.Mesh>(null);

  /* Particle halo */
  const particles = useMemo(() => {
    const count = 600;
    const positions = new Float32Array(count * 3);
    const colors    = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(Math.random() * 2 - 1);
      const r     = 56 + Math.random() * 32;
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      // violet ↔ cyan gradient by random
      const t = Math.random();
      colors[i * 3]     = 0.48 + t * 0.1;   // R
      colors[i * 3 + 1] = t * 0.72;          // G
      colors[i * 3 + 2] = 0.9 + t * 0.1;    // B
    }
    return { count, positions, colors };
  }, []);

  /* Agent orbit nodes */
  const nodes = useMemo(() =>
    Array.from({ length: 12 }).map((_, i) => {
      const a = (i / 12) * Math.PI * 2;
      const r = 110 + (i % 3) * 22;
      return { x: Math.cos(a) * r, z: Math.sin(a) * r, color: i % 3 === 0 ? "#7c3aed" : i % 3 === 1 ? "#06b6d4" : "#10b981" };
    }),
  []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.1;
      groupRef.current.scale.setScalar(1 + Math.sin(t * 2.2) * 0.04);
    }
    if (icoRef.current) icoRef.current.rotation.x = t * 0.15;
    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.3;
    if (ring2Ref.current) ring2Ref.current.rotation.z = -t * 0.2;
    if (ring3Ref.current) ring3Ref.current.rotation.z = t * 0.12;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Icosahedron wireframe core */}
      <mesh ref={icoRef}>
        <icosahedronGeometry args={[42, 1]} />
        <meshBasicMaterial color="#7c3aed" wireframe transparent opacity={0.55} />
      </mesh>

      {/* Inner solid glow */}
      <mesh>
        <icosahedronGeometry args={[28, 0]} />
        <meshBasicMaterial color="#4f46e5" transparent opacity={0.18} />
      </mesh>

      {/* Orbit rings — tilted differently for 3D look */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[100, 102, 128]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.22} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[Math.PI / 4, Math.PI / 6, 0]}>
        <ringGeometry args={[140, 142, 128]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.18} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={ring3Ref} rotation={[-Math.PI / 6, Math.PI / 3, 0]}>
        <ringGeometry args={[178, 180, 128]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.14} side={THREE.DoubleSide} />
      </mesh>

      {/* Particle halo */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles.positions, 3]} />
          <bufferAttribute attach="attributes-color"    args={[particles.colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={4.5} vertexColors transparent opacity={0.75} depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>

      {/* Agent nodes on orbit */}
      {nodes.map((n, i) => (
        <mesh key={i} position={[n.x, 0, n.z]}>
          <sphereGeometry args={[5, 16, 16]} />
          <meshBasicMaterial color={n.color} transparent opacity={0.9} />
        </mesh>
      ))}

      {/* Energy beams between nodes */}
      {nodes.slice(0, 8).map((n, i) => {
        const next = nodes[(i + 1) % nodes.length];
        const beamPoints = [new THREE.Vector3(n.x, 0, n.z), new THREE.Vector3(next.x, 0, next.z)];
        const beamGeo = new THREE.BufferGeometry().setFromPoints(beamPoints);
        return (
          <lineSegments key={`beam-${i}`} geometry={beamGeo}>
            <lineBasicMaterial color="#7c3aed" transparent opacity={0.25} />
          </lineSegments>
        );
      })}
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────
   Scene 2: City Matrix — neon buildings with grid floor
   ───────────────────────────────────────────────────────────── */
function CityMatrix() {
  const groupRef = useRef<THREE.Group>(null);

  const buildingSpecs = useMemo(() => [
    { x: -260, z: 160,  w: 55,  h: 230, color: "#10b981" },
    { x:  230, z: 320,  w: 70,  h: 190, color: "#7c3aed" },
    { x: -190, z: 480,  w: 50,  h: 260, color: "#06b6d4" },
    { x:  270, z: 640,  w: 65,  h: 200, color: "#c084fc" },
    { x: -230, z: 800,  w: 80,  h: 180, color: "#06b6d4" },
    { x:  210, z: 950,  w: 75,  h: 155, color: "#f59e0b" },
    { x:    0, z: 1100, w: 95,  h: 320, color: "#7c3aed" },
    { x: -140, z: 280,  w: 40,  h: 120, color: "#10b981" },
    { x:  140, z: 460,  w: 45,  h: 140, color: "#06b6d4" },
  ], []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) groupRef.current.rotation.y = Math.sin(t * 0.12) * 0.06;
  });

  return (
    <group ref={groupRef} position={[0, -620, 200]}>
      {/* Grid floor */}
      <gridHelper args={[1600, 32, "#7c3aed", "#1e1b4b"]} position={[0, -55, 0]} />
      {/* Secondary finer grid */}
      <gridHelper args={[1600, 96, "#06b6d42a", "#06b6d408"]} position={[0, -54, 0]} />

      {buildingSpecs.map((b, idx) => (
        <group key={idx}>
          <lineSegments position={[b.x, -55 + b.h / 2, b.z]}>
            <edgesGeometry args={[new THREE.BoxGeometry(b.w, b.h, b.w)]} />
            <lineBasicMaterial color={b.color} transparent opacity={0.45} />
          </lineSegments>
          {/* Rooftop glow beacon */}
          <mesh position={[b.x, -55 + b.h + 4, b.z]}>
            <sphereGeometry args={[3, 8, 8]} />
            <meshBasicMaterial color={b.color} transparent opacity={0.9} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────
   Scene 3: Command Cloud
   ───────────────────────────────────────────────────────────── */
function CommandCloud() {
  const groupRef = useRef<THREE.Group>(null);

  const cloudData = useMemo(() => {
    const count = 900;
    const positions = new Float32Array(count * 3);
    const colors    = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 450;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 130;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 450;
      // violet-to-cyan
      const t = Math.random();
      colors[i * 3]     = 0.48 * (1 - t) + 0.02 * t;
      colors[i * 3 + 1] = 0.23 * (1 - t) + 0.72 * t;
      colors[i * 3 + 2] = 0.93;
    }
    return { count, positions, colors };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.05;
      groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.04;
    }
  });

  return (
    <group ref={groupRef} position={[300, 0, -300]}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[cloudData.positions, 3]} />
          <bufferAttribute attach="attributes-color"    args={[cloudData.colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={3.2} vertexColors transparent opacity={0.7} depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────
   Scene 4: Multi-Agent Layer — glowing node mesh
   ───────────────────────────────────────────────────────────── */
function AgentLayer() {
  const groupRef = useRef<THREE.Group>(null);

  const agentColors = ["#7c3aed", "#06b6d4", "#10b981", "#c084fc", "#f59e0b"];
  const offsets = useMemo(() =>
    Array.from({ length: 5 }).map(() =>
      Array.from({ length: 12 }).map(() => [
        (Math.random() - 0.5) * 28,
        (Math.random() - 0.5) * 28,
        (Math.random() - 0.5) * 28,
      ] as const),
    ),
  []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.07;
      groupRef.current.rotation.x = Math.sin(t * 0.22) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[-300, 200, -300]}>
      {Array.from({ length: 5 }).map((_, c) => {
        const a = (c / 5) * Math.PI * 2;
        const r = 130;
        const x = Math.cos(a) * r;
        const z = Math.sin(a) * r;
        return (
          <group key={c} position={[x, 0, z]}>
            {/* Core node */}
            <mesh>
              <sphereGeometry args={[6, 20, 20]} />
              <meshBasicMaterial color={agentColors[c]} transparent opacity={0.95} />
            </mesh>
            {/* Outer glow ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[12, 14, 32]} />
              <meshBasicMaterial color={agentColors[c]} transparent opacity={0.25} side={THREE.DoubleSide} />
            </mesh>
            {/* Sub-particles */}
            {offsets[c]?.map((off, p) => (
              <mesh key={p} position={off}>
                <sphereGeometry args={[1.5, 8, 8]} />
                <meshBasicMaterial
                  color={p % 2 === 0 ? "#06b6d4" : "#7c3aed"}
                  transparent opacity={0.85}
                />
              </mesh>
            ))}
          </group>
        );
      })}
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────
   Scene 5: Neural Tunnel
   ───────────────────────────────────────────────────────────── */
function NeuralTunnel() {
  const tunnelRef = useRef<THREE.LineSegments>(null);
  const innerRef  = useRef<THREE.LineSegments>(null);

  const tunnelGeo  = useMemo(() => new THREE.EdgesGeometry(new THREE.CylinderGeometry(160, 160, 1300, 24, 24, true)), []);
  const innerGeo   = useMemo(() => new THREE.EdgesGeometry(new THREE.CylinderGeometry(90, 90,  1300, 16, 16, true)), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (tunnelRef.current) tunnelRef.current.rotation.y = t * 0.06;
    if (innerRef.current)  innerRef.current.rotation.y  = -t * 0.09;
  });

  return (
    <group position={[0, 0, -1200]}>
      <lineSegments ref={tunnelRef} geometry={tunnelGeo} rotation={[Math.PI / 2, 0, 0]}>
        <lineBasicMaterial color="#7c3aed" transparent opacity={0.14} />
      </lineSegments>
      <lineSegments ref={innerRef} geometry={innerGeo} rotation={[Math.PI / 2, 0, 0]}>
        <lineBasicMaterial color="#06b6d4" transparent opacity={0.1} />
      </lineSegments>
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main Scene
   ───────────────────────────────────────────────────────────── */
function Scene({ currentPath }: { currentPath: string }) {
  const coreRef      = useRef<THREE.Group>(null);
  const cityRef      = useRef<THREE.Group>(null);
  const cmdRef       = useRef<THREE.Group>(null);
  const agentRef     = useRef<THREE.Group>(null);
  const tunnelRef    = useRef<THREE.Group>(null);
  const smoothScroll = useRef(0);

  useFrame(() => {
    const totalH = document.documentElement.scrollHeight - window.innerHeight;
    const tgt = currentPath === "/" && totalH > 0 ? window.scrollY / totalH : 0;
    smoothScroll.current += (Math.max(0, Math.min(1, tgt)) - smoothScroll.current) * 0.07;
    const sp = smoothScroll.current;

    if (coreRef.current)   coreRef.current.visible   = currentPath !== "/" || sp < 0.35;
    if (cityRef.current)   cityRef.current.visible   = currentPath !== "/" || (sp > 0.18 && sp < 0.64);
    if (cmdRef.current)    cmdRef.current.visible    = currentPath !== "/" || (sp > 0.50 && sp < 0.84);
    if (agentRef.current)  agentRef.current.visible  = currentPath !== "/" || (sp > 0.70 && sp < 0.95);
    if (tunnelRef.current) tunnelRef.current.visible = currentPath !== "/" || sp > 0.84;
  });

  return (
    <>
      {/* Fog — deep indigo */}
      <fog attach="fog" args={[new THREE.Color("#03050f"), 380, 2600]} />

      {/* Deep space stars */}
      <Stars radius={2000} depth={80} count={1600} factor={3.5} saturation={0.2} fade speed={0.4} />

      {/* Ambient & directional lights */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[140, 300, 220]} intensity={1.4} color="#a78bfa" />
      <pointLight position={[-220, 80, 280]} intensity={1.2} color="#06b6d4" />
      <pointLight position={[200, -100, -240]} intensity={0.9} color="#7c3aed" />
      <pointLight position={[0, 0, 0]} intensity={0.6} color="#10b981" distance={600} />

      {/* Scenes */}
      <group ref={coreRef}>   <NeuralCore />    </group>
      <group ref={cityRef}>   <CityMatrix />    </group>
      <group ref={cmdRef}>    <CommandCloud />  </group>
      <group ref={agentRef}>  <AgentLayer />    </group>
      <group ref={tunnelRef}> <NeuralTunnel />  </group>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   Export
   ───────────────────────────────────────────────────────────── */
export function UnifiedThreeCanvas({ currentPath }: UnifiedThreeCanvasProps) {
  const mounted = useClientOnly();
  const [dpr, setDpr] = useState(2);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 h-screen w-screen pointer-events-none -z-20" style={{ background: "#03050f" }}>
      <Canvas
        dpr={[1, dpr]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        camera={{ fov: 60, near: 1, far: 3500, position: [0, 0, 520] }}
      >
        <color attach="background" args={["#03050f"]} />
        <PerformanceMonitor
          onDecline={() => setDpr(1)}
          onIncline={() => setDpr(2)}
          flipflops={2}
        />
        <ScrollDrivenCamera currentPath={currentPath} />
        <Scene currentPath={currentPath} />
      </Canvas>
    </div>
  );
}
