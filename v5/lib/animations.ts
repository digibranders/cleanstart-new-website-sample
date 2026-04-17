export const EASE_OUT_CUBIC: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_ENTRANCE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const SPRING_GENTLE = { type: "spring" as const, stiffness: 200, damping: 25 };
export const SPRING_BOUNCY = { type: "spring" as const, stiffness: 300, damping: 20 };

export function staggerChildren(stagger: number = 0.06) {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: stagger } },
  };
}

export function fadeSlideUp(delay: number = 0) {
  return {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay, ease: EASE_OUT_CUBIC },
    },
  };
}
