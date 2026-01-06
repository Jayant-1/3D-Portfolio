/**
 * Enhanced motion utilities with device-aware variant generators
 * These wrap the original motion.js functions with ReactBits awareness
 */

import {
  createCardHover,
  createFadeIn,
  createSlideIn,
  createStaggerContainer,
  createTextVariant,
} from "../reactbits/motion/variantGenerators";
import useMediaQuery from "../utils/useMediaQuery";

/**
 * Hook to check if device is mobile
 */
export const useDeviceAware = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1024px)");
  const isDesktop = useMediaQuery("(min-width: 1025px)");
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );

  return {
    isMobile,
    isTablet,
    isDesktop,
    prefersReducedMotion,
  };
};

/**
 * Device-aware fadeIn generator
 * Usage: const variants = useFadeIn("up", "spring", 0.5, 0.75);
 */
export const useFadeIn = (direction, type, delay, duration) => {
  const { isMobile } = useDeviceAware();
  return createFadeIn(direction, type, delay, duration, isMobile);
};

/**
 * Device-aware card hover generator
 */
export const useCardHover = (depth = 1) => {
  const { isMobile } = useDeviceAware();
  return createCardHover(isMobile, depth);
};

/**
 * Device-aware slideIn generator
 */
export const useSlideIn = (direction, type, delay, duration) => {
  const { isMobile } = useDeviceAware();
  return createSlideIn(direction, type, delay, duration, isMobile);
};

/**
 * Device-aware stagger container
 */
export const useStaggerContainer = (staggerChildren, delayChildren) => {
  const { isMobile } = useDeviceAware();
  return createStaggerContainer(staggerChildren, delayChildren, isMobile);
};

/**
 * Device-aware text variant
 */
export const useTextVariant = (delay) => {
  const { isMobile } = useDeviceAware();
  return createTextVariant(delay, isMobile);
};
