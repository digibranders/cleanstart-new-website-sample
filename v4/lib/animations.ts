import type { Transition, Variants } from "motion/react";

export const EASE_OUT_CUBIC: [number, number, number, number] = [
  0.33, 1, 0.68, 1,
];

export const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const FADE_IN: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const STAGGER_CONTAINER: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const SCROLL_REVEAL_TRANSITION: Transition = {
  duration: 0.6,
  ease: EASE_OUT_CUBIC,
};

export function getStaggerDelay(index: number, base = 0.06): number {
  return index * base;
}
