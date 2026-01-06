import { useEffect, useState } from "react";
import usePointerIntent from "./usePointerIntent";

const useParallax = ({
  strength = 0.05,
  maxOffset = 20,
  smoothing = 0.15,
  enabled = true,
} = {}) => {
  const { velocity } = usePointerIntent();
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [targetOffset, setTargetOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) {
      setOffset({ x: 0, y: 0 });
      setTargetOffset({ x: 0, y: 0 });
      return;
    }

    // Calculate target offset based on velocity
    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
    const targetX = clamp(velocity.x * strength * 100, -maxOffset, maxOffset);
    const targetY = clamp(velocity.y * strength * 100, -maxOffset, maxOffset);

    setTargetOffset({ x: targetX, y: targetY });
  }, [velocity, strength, maxOffset, enabled]);

  useEffect(() => {
    if (!enabled) return;

    // Smooth lerp animation
    const animate = () => {
      setOffset((current) => ({
        x: current.x + (targetOffset.x - current.x) * smoothing,
        y: current.y + (targetOffset.y - current.y) * smoothing,
      }));
    };

    const rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [targetOffset, smoothing, enabled]);

  return {
    offset,
    style: {
      transform: `translate(${offset.x}px, ${offset.y}px)`,
      transition: "transform 0.1s ease-out",
    },
  };
};

export default useParallax;
