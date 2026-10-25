"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
export default function CoreScene() {
  const mount = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = mount.current;
    if (!host) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: devicePixelRatio < 2,
        alpha: true,
        powerPreference: "low-power",
      });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.7));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    host.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(33, 1, 0.1, 100);
    camera.position.set(0, 0, 9.8);
    const group = new THREE.Group();
    group.rotation.set(0.35, -0.4, -0.34);
    scene.add(group);
    const metal = new THREE.MeshStandardMaterial({
      color: 0x8392ac,
      metalness: 0.9,
      roughness: 0.24,
    });
    const dark = new THREE.MeshStandardMaterial({
      color: 0x182438,
      metalness: 0.8,
      roughness: 0.25,
    });
    const blue = new THREE.MeshStandardMaterial({
      color: 0x76a6ff,
      emissive: 0x2863ff,
      emissiveIntensity: 2.5,
      metalness: 0.4,
      roughness: 0.2,
    });
    const ringGeometry = new THREE.TorusGeometry(1.55, 0.13, 20, 160);
    const wireGeometry = new THREE.TorusGeometry(1.55, 0.022, 8, 160);
    for (let i = 0; i < 3; i++) {
      const orbit = new THREE.Group();
      orbit.rotation.set((i * Math.PI) / 3, (i * Math.PI) / 3, i * 0.2);
      const ring = new THREE.Mesh(ringGeometry, metal);
      orbit.add(ring);
      const lightRing = new THREE.Mesh(wireGeometry, blue);
      lightRing.scale.setScalar(1.04);
      orbit.add(lightRing);
      for (let j = 0; j < 48; j++) {
        const angle = (j / 48) * Math.PI * 2;
        const tick = new THREE.Mesh(
          new THREE.BoxGeometry(0.025, 0.11, 0.11),
          j % 8 === 0 ? blue : dark,
        );
        tick.position.set(Math.cos(angle) * 1.55, Math.sin(angle) * 1.55, 0);
        tick.rotation.z = angle;
        orbit.add(tick);
      }
      group.add(orbit);
    }
    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.65, 1),
      new THREE.MeshStandardMaterial({
        color: 0x223c66,
        metalness: 0.85,
        roughness: 0.13,
        flatShading: true,
      }),
    );
    group.add(core);
    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(core.geometry),
      new THREE.LineBasicMaterial({
        color: 0x6ca4ff,
        transparent: true,
        opacity: 0.7,
      }),
    );
    group.add(edges);
    const inner = new THREE.Mesh(new THREE.IcosahedronGeometry(0.25, 0), blue);
    group.add(inner);
    scene.add(new THREE.AmbientLight(0x9cafdb, 1.5));
    const key = new THREE.DirectionalLight(0xdbe9ff, 8);
    key.position.set(-3, 4, 5);
    scene.add(key);
    const rim = new THREE.PointLight(0x367dff, 65, 20);
    rim.position.set(3, 0, 1);
    scene.add(rim);
    const fill = new THREE.PointLight(0xb2b6ed, 25, 20);
    fill.position.set(-3, -2, 1);
    scene.add(fill);
    let frame = 0,
      visible = true,
      pointer = { x: 0, y: 0 };
    const start = performance.now();
    const resize = () => {
      const w = host.clientWidth,
        h = host.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();
    const move = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      pointer = {
        x: (e.clientX - r.left) / r.width - 0.5,
        y: (e.clientY - r.top) / r.height - 0.5,
      };
    };
    host.addEventListener("pointermove", move);
    const animate = () => {
      frame = requestAnimationFrame(animate);
      if (!visible || document.hidden) return;
      const elapsed = (performance.now() - start) / 1000;
      group.rotation.y +=
        (-0.4 + pointer.x * 0.35 + elapsed * 0.06 - group.rotation.y) * 0.025;
      group.rotation.x += (0.35 + pointer.y * 0.25 - group.rotation.x) * 0.025;
      group.rotation.z =
        -0.34 + Math.min(window.scrollY / innerHeight, 1) * 0.3;
      group.position.y = Math.sin(elapsed * 0.65) * 0.065;
      core.rotation.y = elapsed * 0.09;
      edges.rotation.copy(core.rotation);
      renderer.render(scene, camera);
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(host);
    if (!reduced) animate();
    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      ro.disconnect();
      host.removeEventListener("pointermove", move);
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.LineSegments) {
          obj.geometry.dispose();
          const materials = Array.isArray(obj.material)
            ? obj.material
            : [obj.material];
          materials.forEach((m: THREE.Material) => m.dispose());
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);
  return <div ref={mount} className="core-canvas" aria-hidden="true" />;
}
