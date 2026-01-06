import { useEffect, useRef, useState } from "react";

const useCardIntent = ({ id, hoverDelay = 150 } = {}) => {
  const [hoverDepth, setHoverDepth] = useState(0);
  const [pointerVelocity, setPointerVelocity] = useState({ x: 0, y: 0 });
  const [previewReady, setPreviewReady] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const hoverTimeoutRef = useRef(null);
  const lastPosRef = useRef({
    x: 0,
    y: 0,
    time: Date.now(),
    initialized: false,
  });

  const handlePointerEnter = () => {
    setIsHovering(true);
    lastPosRef.current = { x: 0, y: 0, time: Date.now(), initialized: false };
    hoverTimeoutRef.current = setTimeout(() => {
      setPreviewReady(true);
    }, hoverDelay);
  };

  const handlePointerLeave = () => {
    setIsHovering(false);
    setPreviewReady(false);
    setHoverDepth(0);
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  };

  const handlePointerMove = (e) => {
    if (!isHovering) return;

    const now = Date.now();
    if (!lastPosRef.current.initialized) {
      lastPosRef.current = {
        x: e.clientX,
        y: e.clientY,
        time: now,
        initialized: true,
      };
      setHoverDepth(0);
      return;
    }

    const dt = Math.max(now - lastPosRef.current.time, 1);
    const dx = e.clientX - lastPosRef.current.x;
    const dy = e.clientY - lastPosRef.current.y;

    const velocityX = dx / dt;
    const velocityY = dy / dt;
    const speed = Math.sqrt(velocityX ** 2 + velocityY ** 2);

    setPointerVelocity({ x: velocityX, y: velocityY, speed });
    setHoverDepth(Math.min(speed * 8, 0.35));

    lastPosRef.current = {
      x: e.clientX,
      y: e.clientY,
      time: now,
      initialized: true,
    };
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return {
    hoverDepth,
    pointerVelocity,
    previewReady,
    isHovering,
    handlers: {
      onPointerEnter: handlePointerEnter,
      onPointerLeave: handlePointerLeave,
      onPointerMove: handlePointerMove,
    },
  };
};

export default useCardIntent;
