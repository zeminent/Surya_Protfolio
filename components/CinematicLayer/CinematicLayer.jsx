"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * CinematicLayer
 * A transparent, GPU-friendly Three.js overlay of warm orange + white
 * bokeh particles. Additive blending, soft radial sprites, slow sine-wave
 * float, and gentle mouse-parallax camera drift for a movie-intro mood.
 *
 * Performance notes:
 *  - One BufferGeometry + one PointsMaterial (a single draw call).
 *  - Soft bokeh comes from a runtime-generated radial-gradient sprite,
 *    so there is no texture file to ship.
 *  - Respects prefers-reduced-motion and pauses when the tab is hidden.
 *  - All GPU resources are disposed on unmount.
 */
export default function CinematicLayer({ count = 60 }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Lighter particle load on small screens.
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? Math.round(count * 0.55) : count;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.z = 22;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // transparent
    mount.appendChild(renderer.domElement);

    /* ---- Soft bokeh sprite (radial gradient, generated at runtime) ---- */
    const makeSprite = () => {
      const size = 128;
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = size;
      const ctx = canvas.getContext("2d");
      const g = ctx.createRadialGradient(
        size / 2,
        size / 2,
        0,
        size / 2,
        size / 2,
        size / 2
      );
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(0.25, "rgba(255,255,255,0.85)");
      g.addColorStop(0.55, "rgba(255,255,255,0.25)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, size, size);
      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    };
    const sprite = makeSprite();

    /* ---- Geometry: positions, colors, per-particle motion seeds ---- */
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    // CPU-side animation state (kept out of the buffer for clarity).
    const seeds = new Float32Array(particleCount * 4); // phaseX, phaseY, speed, ampScale
    const base = new Float32Array(particleCount * 3); // resting positions

    const warm = new THREE.Color(0xff7a18);
    const warmSoft = new THREE.Color(0xffb066);
    const white = new THREE.Color(0xfff4e8);

    const spread = { x: 46, y: 26, z: 24 };

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const x = (Math.random() - 0.5) * spread.x;
      const y = (Math.random() - 0.5) * spread.y;
      const z = (Math.random() - 0.5) * spread.z;

      base[i3] = x;
      base[i3 + 1] = y;
      base[i3 + 2] = z;
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      // ~60% warm tones, ~40% soft white for a balanced, dreamy palette.
      const r = Math.random();
      const c = r < 0.45 ? warm : r < 0.6 ? warmSoft : white;
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;

      seeds[i * 4] = Math.random() * Math.PI * 2;
      seeds[i * 4 + 1] = Math.random() * Math.PI * 2;
      seeds[i * 4 + 2] = 0.15 + Math.random() * 0.4; // slow speed
      seeds[i * 4 + 3] = 0.6 + Math.random() * 1.4; // amplitude
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: isMobile ? 1.5 : 1.9,
      map: sprite,
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    /* ---- Mouse parallax (eased) ---- */
    const pointer = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const onPointerMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      target.x = nx;
      target.y = ny;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    /* ---- Resize ---- */
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    /* ---- Animation loop ---- */
    const clock = new THREE.Clock();
    let rafId = 0;
    let running = true;

    const posAttr = geometry.getAttribute("position");

    const animate = () => {
      if (!running) return;
      rafId = requestAnimationFrame(animate);

      const t = clock.getElapsedTime();

      // Slow sine-wave float per particle.
      if (!prefersReduced) {
        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          const pX = seeds[i * 4];
          const pY = seeds[i * 4 + 1];
          const spd = seeds[i * 4 + 2];
          const amp = seeds[i * 4 + 3];

          posAttr.array[i3] = base[i3] + Math.sin(t * spd + pX) * amp;
          posAttr.array[i3 + 1] =
            base[i3 + 1] + Math.cos(t * spd * 0.8 + pY) * amp;
          posAttr.array[i3 + 2] =
            base[i3 + 2] + Math.sin(t * spd * 0.5 + pX) * amp * 0.5;
        }
        posAttr.needsUpdate = true;

        // Whole field drifts very slowly.
        points.rotation.z = Math.sin(t * 0.05) * 0.04;
      }

      // Eased parallax — camera leans toward the pointer.
      pointer.x += (target.x - pointer.x) * 0.03;
      pointer.y += (target.y - pointer.y) * 0.03;
      camera.position.x = pointer.x * 2.4;
      camera.position.y = -pointer.y * 1.6;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    /* ---- Pause when tab hidden (saves battery / GPU) ---- */
    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(rafId);
      } else if (!running) {
        running = true;
        clock.getDelta(); // swallow the gap so motion doesn't jump
        animate();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    /* ---- Cleanup ---- */
    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);

      geometry.dispose();
      material.dispose();
      sprite.dispose();
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [count]);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 3,
      }}
    />
  );
}
