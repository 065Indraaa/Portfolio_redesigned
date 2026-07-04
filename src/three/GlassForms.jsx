import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

/**
 * GlassForms — monokrom editorial 3D.
 *
 * Komposisi:
 *  - 1 blob distorted glass utama (center-right, di belakang konten)
 *  - 5 pecahan huruf "INDRA" sebagai glass shards melayang di depth field
 *
 * Semua reaktif terhadap:
 *  - posisi mouse (parallax kamera halus)
 *  - scroll progress (camera dolly ringan)
 *
 * Palette: paper #f1ede4 + ink #16140f saja. Zero hue.
 */

/* ---------- shared scroll + mouse state ---------- */
const pointer = { x: 0, y: 0 };
const scroll = { y: 0 };

if (typeof window !== "undefined") {
  window.addEventListener("pointermove", (e) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
  });
  window.addEventListener(
    "scroll",
    () => {
      scroll.y = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);
    },
    { passive: true }
  );
}

/* ---------- distorted glass blob ---------- */
function GlassBlob() {
  const mesh = useRef(null);
  const geo = useMemo(() => {
    const g = new THREE.IcosahedronGeometry(1.4, 12);
    const pos = g.attributes.position;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const n =
        (Math.sin(v.x * 1.7) + Math.cos(v.y * 1.9) + Math.sin(v.z * 1.6)) * 0.09;
      v.multiplyScalar(1 + n);
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    g.computeVertexNormals();
    return g;
  }, []);

  useFrame((state, dt) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += dt * 0.05;
    mesh.current.rotation.x += dt * 0.02;
  });

  return (
    <mesh ref={mesh} geometry={geo} position={[2.3, 0.1, -1]}>
      <MeshTransmissionMaterial
        backside
        samples={6}
        resolution={256}
        transmission={1}
        roughness={0.28}
        thickness={1.2}
        ior={1.18}
        chromaticAberration={0.0}
        distortion={0.32}
        distortionScale={0.4}
        temporalDistortion={0.05}
        color="#f1ede4"
        attenuationColor="#e8e2d5"
        attenuationDistance={3}
        background={new THREE.Color("#f1ede4")}
      />
    </mesh>
  );
}

/* ---------- typographic glass shards ---------- */
const LETTERS = ["I", "N", "D", "R", "A"];
const SHARD_LAYOUT = [
  { pos: [-3.1, 1.6, -1.2], scale: 0.62, speed: 1.0, rot: 0.08 },
  { pos: [-2.4, -1.4, -0.6], scale: 0.5, speed: 1.3, rot: -0.06 },
  { pos: [3.6, 1.8, -1.6], scale: 0.7, speed: 0.8, rot: 0.05 },
  { pos: [-3.8, -0.2, -2.0], scale: 0.46, speed: 1.5, rot: -0.09 },
  { pos: [3.2, -1.7, -0.9], scale: 0.55, speed: 1.1, rot: 0.07 },
];

function makeLetterShape(letter) {
  const path = new THREE.Path();
  // Geometric sans-serif-ish block letters on a 1x1.4 unit grid.
  // We approximate the glyph outline so each shard reads as a letterform.
  const l = letter.toUpperCase();
  switch (l) {
    case "I":
      path.moveTo(-0.5, -0.7); path.lineTo(0.5, -0.7);
      path.lineTo(0.5, -0.5); path.lineTo(0.12, -0.5);
      path.lineTo(0.12, 0.5); path.lineTo(0.5, 0.5);
      path.lineTo(0.5, 0.7); path.lineTo(-0.5, 0.7);
      path.lineTo(-0.5, 0.5); path.lineTo(-0.12, 0.5);
      path.lineTo(-0.12, -0.5); path.lineTo(-0.5, -0.5);
      path.closePath();
      break;
    case "N":
      path.moveTo(-0.5, -0.7); path.lineTo(-0.26, -0.7);
      path.lineTo(0.26, 0.3); path.lineTo(0.26, -0.7);
      path.lineTo(0.5, -0.7); path.lineTo(0.5, 0.7);
      path.lineTo(0.26, 0.7); path.lineTo(-0.26, -0.3); path.lineTo(-0.26, 0.7);
      path.lineTo(-0.5, 0.7); path.closePath();
      break;
    case "D":
      path.moveTo(-0.5, -0.7); path.lineTo(0.02, -0.7);
      path.bezierCurveTo(0.55, -0.7, 0.6, 0.0, 0.6, 0.0);
      path.bezierCurveTo(0.6, 0.0, 0.55, 0.7, 0.02, 0.7);
      path.lineTo(-0.5, 0.7); path.lineTo(-0.5, 0.5); path.lineTo(-0.26, 0.5);
      path.lineTo(-0.26, -0.5); path.lineTo(-0.5, -0.5); path.closePath();
      break;
    case "R":
      path.moveTo(-0.5, -0.7); path.lineTo(0.18, -0.7);
      path.bezierCurveTo(0.6, -0.7, 0.55, -0.18, 0.3, -0.05);
      path.lineTo(0.55, 0.5); path.lineTo(0.55, 0.7); path.lineTo(0.28, 0.7);
      path.lineTo(0.05, 0.2); path.lineTo(-0.26, 0.2); path.lineTo(-0.26, 0.7);
      path.lineTo(-0.5, 0.7); path.lineTo(-0.5, 0.5); path.lineTo(-0.26, 0.5);
      path.lineTo(-0.26, -0.5); path.lineTo(-0.5, -0.5); path.closePath();
      break;
    case "A":
      path.moveTo(-0.5, -0.7); path.lineTo(-0.18, -0.7);
      path.lineTo(-0.02, -0.2); path.lineTo(0.36, -0.7);
      path.lineTo(0.6, -0.7); path.lineTo(0.18, 0.08); path.lineTo(0.36, 0.5);
      path.lineTo(0.5, 0.5); path.lineTo(0.5, 0.7); path.lineTo(0.02, 0.7);
      path.lineTo(0.02, 0.5); path.lineTo(0.12, 0.5); path.lineTo(0.0, 0.28);
      path.lineTo(-0.28, 0.5); path.lineTo(-0.18, 0.5); path.lineTo(-0.18, 0.7);
      path.lineTo(-0.5, 0.7); path.lineTo(-0.32, 0.4); path.lineTo(-0.5, 0.0);
      path.closePath();
      break;
    default:
      path.moveTo(-0.4, -0.4); path.lineTo(0.4, -0.4);
      path.lineTo(0.4, 0.4); path.lineTo(-0.4, 0.4); path.closePath();
  }
  const shape = new THREE.Shape(path.getPoints().map((p) => new THREE.Vector2(p.x, p.y)));
  return new THREE.ExtrudeGeometry(shape, {
    depth: 0.28,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.05,
    bevelSegments: 3,
  });
}

function LetterShard({ letter, layout, index }) {
  const mesh = useRef(null);
  const geo = useMemo(() => makeLetterShape(letter), [letter]);

  useFrame((state, dt) => {
    if (!mesh.current) return;
    mesh.current.rotation.z += dt * layout.rot;
  });

  return (
    <Float speed={layout.speed} rotationIntensity={0.15} floatIntensity={0.5} floatPositionIntensity={0.4}>
      <mesh ref={mesh} geometry={geo} position={layout.pos} scale={layout.scale} renderOrder={1}>
        <MeshTransmissionMaterial
          samples={4}
          resolution={128}
          transmission={0.92}
          roughness={0.42}
          thickness={0.7}
          ior={1.2}
          chromaticAberration={0.0}
          distortion={0.25}
          distortionScale={0.3}
          temporalDistortion={0.04}
          color="#f1ede4"
          attenuationColor="#ded7c7"
          attenuationDistance={4}
          background={new THREE.Color("#f1ede4")}
        />
      </mesh>
    </Float>
  );
}

/* ---------- camera rig: parallax mouse + scroll dolly ---------- */
function CameraRig() {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 6));

  useFrame((_, dt) => {
    const tx = pointer.x * 0.6;
    const ty = -pointer.y * 0.4;
    const tz = 6 - scroll.y * 1.4;
    target.current.set(tx, ty, tz);
    camera.position.lerp(target.current, 1 - Math.pow(0.001, dt));
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ---------- full scene ---------- */
export default function Scene3D() {
  return (
    <Canvas
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      camera={{ position: [0, 0, 6], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      {/* warm editorial light rig — monokrom */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 6, 4]} intensity={1.6} color="#f1ede4" />
      <directionalLight position={[-4, -2, 2]} intensity={0.5} color="#16140f" />
      <hemisphereLight args={["#f1ede4", "#16140f", 0.5]} />

      <CameraRig />
      <GlassBlob />
      {LETTERS.map((l, i) => (
        <LetterShard key={l} letter={l} layout={SHARD_LAYOUT[i]} index={i} />
      ))}
    </Canvas>
  );
}
