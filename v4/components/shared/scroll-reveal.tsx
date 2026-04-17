"use client";

import { type ReactNode } from "react";
import { motion, type Variants } from "motion/react";
import { EASE_OUT_CUBIC } from "@/lib/animations";

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE_OUT_CUBIC,
    },
  },
};

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  once?: boolean;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 32,
  once = true,
}: ScrollRevealProps) {
  const isVertical = direction === "up" || direction === "down";
  const sign = direction === "up" || direction === "left" ? 1 : -1;
  const offset = distance * sign;

  const variants: Variants = isVertical
    ? {
        hidden: { opacity: 0, y: offset },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: EASE_OUT_CUBIC, delay },
        },
      }
    : {
        hidden: { opacity: 0, x: offset },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.6, ease: EASE_OUT_CUBIC, delay },
        },
      };

  const useCustom = delay > 0 || direction !== "up";

  return (
    <motion.div
      variants={useCustom ? variants : defaultVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-60px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
