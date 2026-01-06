import { useEffect, useRef, useState } from "react";

const useMagnetic = ({ radius = 80, strength = 0.4 } = {}) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [pressDepth, setPressDepth] = useState(0);
  const [isNear, setIsNear] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handlePointerMove = (e) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.sqrt(dx ** 2 + dy ** 2);

      if (distance < radius) {
        const pull = 1 - distance / radius;
        setOffset({
          x: dx * strength * pull,
          y: dy * strength * pull,
        });
        setIsNear(true);
      } else {
        setOffset({ x: 0, y: 0 });
        setIsNear(false);
      }
    };

    const handlePointerDown = () => {
      setPressDepth(0.95);
    };

    const handlePointerUp = () => {
      setPressDepth(0);
    };

    const handlePointerLeave = () => {
      setOffset({ x: 0, y: 0 });
      setIsNear(false);
      setPressDepth(0);
    };

    window.addEventListener("pointermove", handlePointerMove);
    element.addEventListener("pointerdown", handlePointerDown);
    element.addEventListener("pointerup", handlePointerUp);
    element.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      element.removeEventListener("pointerdown", handlePointerDown);
      element.removeEventListener("pointerup", handlePointerUp);
      element.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [radius, strength]);

  return {
    ref: elementRef,
    offset,
    pressDepth,
    isNear,
    style: {
      transform: `translate(${offset.x}px, ${offset.y}px) scale(${
        1 - pressDepth * 0.05
      })`,
      transition: pressDepth > 0 ? "transform 0.1s" : "transform 0.3s ease-out",
    },
  };
};

export default useMagnetic;
