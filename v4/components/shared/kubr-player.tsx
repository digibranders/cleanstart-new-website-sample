"use client";

import {
  useRef,
  useEffect,
  useSyncExternalStore,
} from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Prefers-reduced-motion external store                             */
/* ------------------------------------------------------------------ */

function subscribeToReducedMotion(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getReducedMotionSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot(): boolean {
  return false;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const TOTAL_FRAMES = 131;
const FPS = 24;
const FRAME_INTERVAL = 1000 / FPS;

function framePath(index: number): string {
  const padded = String(index).padStart(3, "0");
  return `/kubr/frames/frame-${padded}.webp`;
}

/* ------------------------------------------------------------------ */
/*  KubrPlayer component                                              */
/* ------------------------------------------------------------------ */

interface KubrPlayerProps {
  className?: string;
  width?: number;
  height?: number;
  loop?: boolean;
  autoPlay?: boolean;
}

export function KubrPlayer({
  className,
  width = 320,
  height = 320,
  loop = true,
  autoPlay = true,
}: KubrPlayerProps) {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const frameIndexRef = useRef(0);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef(0);
  const isVisibleRef = useRef(false);
  const loadedRef = useRef(false);

  /* Refs that the animation loop closes over — synced via effects
     to satisfy the React Compiler's no-ref-access-in-render rule */
  const loopRef = useRef(loop);
  const reducedRef = useRef(prefersReducedMotion);

  useEffect(() => {
    loopRef.current = loop;
  }, [loop]);

  useEffect(() => {
    reducedRef.current = prefersReducedMotion;
  }, [prefersReducedMotion]);

  /* IntersectionObserver for lazy loading + play/pause --------------- */
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    /* Capture a non-null const so inner closures stay narrowed */
    const canvas: HTMLCanvasElement = el;

    /* Pre-load all frames -------------------------------------------- */
    function preloadFrames() {
      if (loadedRef.current) return;
      loadedRef.current = true;

      const images: HTMLImageElement[] = [];
      let loadedCount = 0;

      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const img = new window.Image();
        img.src = framePath(i);
        img.onload = () => {
          loadedCount++;
          if (loadedCount === 1) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              ctx.drawImage(images[0], 0, 0, canvas.width, canvas.height);
            }
          }
        };
        images.push(img);
      }
      framesRef.current = images;
    }

    /* Animation loop ------------------------------------------------- */
    function tick(timestamp: number) {
      if (!isVisibleRef.current || reducedRef.current) return;

      if (timestamp - lastTimeRef.current >= FRAME_INTERVAL) {
        lastTimeRef.current = timestamp;
        const ctx = canvas.getContext("2d");
        const frames = framesRef.current;
        if (!ctx || frames.length === 0) {
          rafRef.current = requestAnimationFrame(tick);
          return;
        }

        const frame = frames[frameIndexRef.current];
        if (frame?.complete && frame.naturalWidth > 0) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
        }

        frameIndexRef.current++;
        if (frameIndexRef.current >= TOTAL_FRAMES) {
          if (loopRef.current) {
            frameIndexRef.current = 0;
          } else {
            return;
          }
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisibleRef.current = true;
          preloadFrames();
          if (autoPlay && !reducedRef.current) {
            rafRef.current = requestAnimationFrame(tick);
          }
        } else {
          isVisibleRef.current = false;
          if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
          }
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(canvas);

    return () => {
      observer.disconnect();
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [autoPlay]);

  /* Reduced motion fallback — static frame --------------------------- */
  if (prefersReducedMotion) {
    return (
      <Image
        src={framePath(1)}
        alt="Kubr mascot"
        width={width}
        height={height}
        className={className}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={cn("pointer-events-none", className)}
      aria-label="Kubr mascot animation"
      role="img"
    />
  );
}
