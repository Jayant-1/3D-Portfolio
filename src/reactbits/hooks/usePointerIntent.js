import { useEffect, useRef, useState } from "react";

const usePointerIntent = () => {
  const [velocity, setVelocity] = useState({ x: 0, y: 0, magnitude: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const lastPosRef = useRef({ x: 0, y: 0, time: Date.now() });
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handlePointerMove = (e) => {
      const now = Date.now();
      const dt = Math.max(now - lastPosRef.current.time, 1);
      const dx = e.clientX - lastPosRef.current.x;
      const dy = e.clientY - lastPosRef.current.y;

      const vx = dx / dt;
      const vy = dy / dt;
      const magnitude = Math.sqrt(vx ** 2 + vy ** 2);

      setVelocity({ x: vx, y: vy, magnitude });
      setIsMoving(true);

      lastPosRef.current = { x: e.clientX, y: e.clientY, time: now };

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsMoving(false);
        setVelocity({ x: 0, y: 0, magnitude: 0 });
      }, 100);
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return { velocity, isMoving };
};

export default usePointerIntent;
