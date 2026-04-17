"use client";

import { useRef, useEffect, useState, useSyncExternalStore } from "react";

const TOTAL_FRAMES = 131;
const FPS = 24;
const FRAME_DELAY = 1000 / FPS;

function getFramePath(index: number): string {
  const padded = String(index).padStart(3, "0");
  return `/kubr/frames/frame-${padded}.webp`;
}

function subscribeToReducedMotion(callback: () => void): () => void {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot(): boolean {
  return false;
}

export interface KubrPlayerProps {
  className?: string;
}

export function KubrPlayer({ className }: KubrPlayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
  const framesRef = useRef<HTMLImageElement[]>([]);
  const frameIndexRef = useRef(0);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Preload frames when visible
  useEffect(() => {
    if (!isVisible || prefersReducedMotion) return;
    if (framesRef.current.length > 0) return;

    const frames: HTMLImageElement[] = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      frames.push(img);
    }
    framesRef.current = frames;
  }, [isVisible, prefersReducedMotion]);

  // Animation loop
  useEffect(() => {
    if (!isVisible || prefersReducedMotion) return;

    function tick(time: number) {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      if (time - lastTimeRef.current >= FRAME_DELAY) {
        lastTimeRef.current = time;
        const frame = framesRef.current[frameIndexRef.current];
        if (frame?.complete && frame.naturalWidth > 0) {
          canvas.width = canvas.clientWidth * 2;
          canvas.height = canvas.clientHeight * 2;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
        }
        frameIndexRef.current = (frameIndexRef.current + 1) % TOTAL_FRAMES;
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isVisible, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <div ref={containerRef} className={className}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getFramePath(1)}
          alt="Kubr - CleanStart mascot"
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div ref={containerRef} className={className}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        aria-label="Kubr - CleanStart mascot animation"
        role="img"
      />
    </div>
  );
}
