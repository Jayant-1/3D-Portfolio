/**
 * Device-aware motion variant generators
 * These functions create Framer Motion variants that adapt to device capabilities
 */

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Generate responsive fadeIn variants based on device
 * @param {string} direction - "left" | "right" | "up" | "down" | ""
 * @param {string} type - Animation type
 * @param {number} delay - Delay in seconds
 * @param {number} duration - Duration in seconds
 * @param {boolean} isMobile - Whether device is mobile
 */
export const createFadeIn = (
  direction = "",
  type = "tween",
  delay = 0,
  duration = 0.45,
  isMobile = false
) => {
  if (prefersReducedMotion) {
    return {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { duration: 0.3 } },
    };
  }

  const distance = isMobile ? 18 : 32;
  const ease = [0.2, 0.7, 0.2, 1];

  return {
    hidden: {
      x:
        direction === "left" ? distance : direction === "right" ? -distance : 0,
      y: direction === "up" ? distance : direction === "down" ? -distance : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type,
        delay,
        duration: isMobile ? duration * 0.85 : duration,
        ease,
      },
    },
  };
};

/**
 * Generate responsive hover variants for cards
 */
export const createCardHover = (isMobile = false, depth = 1) => {
  if (prefersReducedMotion || isMobile) {
    return {
      rest: { scale: 1 },
      hover: { scale: 1 },
    };
  }

  const liftDistance = -4 * depth;

  return {
    rest: {
      y: 0,
      scale: 1,
      transition: {
        duration: 0.32,
        type: "spring",
        stiffness: 260,
        damping: 26,
      },
    },
    hover: {
      y: liftDistance,
      scale: 1 + 0.008 * depth,
      transition: {
        duration: 0.28,
        type: "spring",
        stiffness: 260,
        damping: 26,
      },
    },
  };
};

/**
 * Generate button press variants
 */
export const createButtonPress = (isMobile = false) => {
  if (prefersReducedMotion) {
    return {
      rest: { scale: 1 },
      tap: { scale: 1 },
    };
  }

  return {
    rest: { scale: 1 },
    hover: { scale: isMobile ? 1 : 1.03 },
    tap: { scale: 0.97 },
  };
};

/**
 * Generate magnetic effect variants
 */
export const createMagneticEffect = (
  offset = { x: 0, y: 0 },
  pressDepth = 0
) => {
  return {
    x: offset.x,
    y: offset.y,
    scale: 1 - pressDepth * 0.05,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 18,
    },
  };
};

/**
 * Generate stagger container with device-aware timing
 */
export const createStaggerContainer = (
  staggerChildren = 0.1,
  delayChildren = 0,
  isMobile = false
) => {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren: isMobile ? staggerChildren * 0.7 : staggerChildren,
        delayChildren: isMobile ? delayChildren * 0.7 : delayChildren,
      },
    },
  };
};

/**
 * Generate slide-in variants with device awareness
 */
export const createSlideIn = (
  direction = "left",
  type = "tween",
  delay = 0,
  duration = 0.55,
  isMobile = false
) => {
  if (prefersReducedMotion) {
    return {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { duration: 0.3 } },
    };
  }

  return {
    hidden: {
      x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
      y: direction === "up" ? "100%" : direction === "down" ? "-100%" : 0,
    },
    show: {
      x: 0,
      y: 0,
      transition: {
        type,
        delay,
        duration: isMobile ? duration * 0.85 : duration,
        ease: [0.2, 0.7, 0.2, 1],
      },
    },
  };
};

/**
 * Generate text reveal variants
 */
export const createTextVariant = (delay = 0, isMobile = false) => {
  if (prefersReducedMotion) {
    return {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { duration: 0.3 } },
    };
  }

  return {
    hidden: {
      y: isMobile ? -14 : -22,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: isMobile ? 0.65 : 0.8,
        delay,
        damping: 20,
      },
    },
  };
};
