"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number };

const LINK = 165; // px: connect nodes closer than this
const MOUSE_LINK = 205; // px: connect nodes to the cursor

/** A sparse, warm-toned "neural constellation": drifting nodes joined by thin
 *  lines that brighten near the cursor. Hand-built canvas, no dependency.
 *  Pauses offscreen / when the tab is hidden, and renders a single static
 *  frame under prefers-reduced-motion. Picks up the live accent token. */
export default function NeuralBackground({
  className = "",
}: {
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes: Node[] = [];
    let raf = 0;
    let running = false;
    let inView = true;
    const mouse = { x: -9999, y: -9999, active: false };

    function hexToRgb(hex: string): string | null {
      const m = hex.replace("#", "").trim();
      if (m.length === 6) {
        const n = parseInt(m, 16);
        return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
      }
      if (m.length === 3) {
        return `${parseInt(m[0] + m[0], 16)}, ${parseInt(m[1] + m[1], 16)}, ${parseInt(m[2] + m[2], 16)}`;
      }
      return null;
    }
    function accentRGB(): string {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue("--color-accent")
        .trim();
      return hexToRgb(raw) ?? "224, 135, 90";
    }
    let rgb = accentRGB();

    function resize() {
      const parent = canvas!.parentElement;
      const rect = parent?.getBoundingClientRect();
      width = rect?.width ?? window.innerWidth;
      height = rect?.height ?? window.innerHeight;
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = Math.min(92, Math.floor((width * height) / 16000));
      const count = Math.max(22, target);
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      }));
    }

    function draw(move: boolean) {
      ctx!.clearRect(0, 0, width, height);
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        if (move) {
          a.x += a.vx;
          a.y += a.vy;
          if (a.x < 0 || a.x > width) a.vx *= -1;
          if (a.y < 0 || a.y > height) a.vy *= -1;
        }
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            ctx!.strokeStyle = `rgba(${rgb}, ${(1 - d / LINK) * 0.26})`;
            ctx!.lineWidth = 0.85;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
        if (mouse.active) {
          const d = Math.hypot(a.x - mouse.x, a.y - mouse.y);
          if (d < MOUSE_LINK) {
            ctx!.strokeStyle = `rgba(${rgb}, ${(1 - d / MOUSE_LINK) * 0.62})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(mouse.x, mouse.y);
            ctx!.stroke();
          }
        }
        ctx!.fillStyle = `rgba(${rgb}, 0.72)`;
        ctx!.beginPath();
        ctx!.arc(a.x, a.y, 1.9, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function loop() {
      if (!running) return;
      draw(true);
      raf = requestAnimationFrame(loop);
    }
    function start() {
      if (running || reduce || !inView || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(loop);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    resize();
    if (reduce) draw(false);
    else start();

    const onResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      resize();
      if (reduce) draw(false);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = canvas!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouse.active = x >= 0 && x <= width && y >= 0 && y <= height;
      mouse.x = x;
      mouse.y = y;
    };
    const onLeave = () => {
      mouse.active = false;
    };
    const onVis = () => (document.hidden ? stop() : start());
    const onTheme = () => {
      rgb = accentRGB();
      if (reduce) draw(false);
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("blur", onLeave);
    document.addEventListener("visibilitychange", onVis);
    const mo = new MutationObserver(onTheme);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) start();
        else stop();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    return () => {
      stop();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("blur", onLeave);
      document.removeEventListener("visibilitychange", onVis);
      mo.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
