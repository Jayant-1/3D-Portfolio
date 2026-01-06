import { useEffect, useMemo, useState } from "react";
import usePointerIntent from "./usePointerIntent";

const useParallax = ({
  strength = 0.015,
  maxOffset = 10,
  smoothing = 0.12,
  enabled = true,
  disableOnMobile = true,
} = {}) => {
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 768px)").matches;
  }, []);

  const { velocity } = usePointerIntent();
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [targetOffset, setTargetOffset] = useState({ x: 0, y: 0 });

  const isEnabled =
    enabled && !(disableOnMobile && isMobile) && !prefersReducedMotion;

  useEffect(() => {
    if (!isEnabled) {
      setOffset({ x: 0, y: 0 });
      setTargetOffset({ x: 0, y: 0 });
      return;
    }

    // Calculate target offset based on velocity
    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
    const targetX = clamp(velocity.x * strength * 100, -maxOffset, maxOffset);
    const targetY = clamp(velocity.y * strength * 100, -maxOffset, maxOffset);

    setTargetOffset({ x: targetX, y: targetY });
  }, [isEnabled, maxOffset, strength, velocity]);

  useEffect(() => {
    if (!isEnabled) return;

    // Smooth lerp animation
    let rafId;
    const animate = () => {
      setOffset((current) => ({
        x: current.x + (targetOffset.x - current.x) * smoothing,
        y: current.y + (targetOffset.y - current.y) * smoothing,
      }));
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isEnabled, smoothing, targetOffset]);

  return {
    offset,
    style: {
      transform: `translate(${offset.x}px, ${offset.y}px)`,
      transition: "transform 0.08s ease-out",
    },
  };
};

export default useParallax;
