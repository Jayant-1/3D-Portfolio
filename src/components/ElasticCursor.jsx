import gsap from "gsap";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useCursorState } from "../reactbits/context/ReactBitsCursorProvider";
import { useMouse } from "../utils/useMouse";

// Gsap Ticker Function
function useTicker(callback, paused) {
  useEffect(() => {
    if (!paused && callback) {
      gsap.ticker.add(callback);
    }
    return () => {
      gsap.ticker.remove(callback);
    };
  }, [callback, paused]);
}

function useInstance(value = {}) {
  const ref = useRef();
  if (ref.current === undefined) {
    ref.current = typeof value === "function" ? value() : value;
  }
  return ref.current;
}

function getScale(diffX, diffY) {
  const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
  return Math.min(distance / 1200, 0.18);
}

function getAngle(diffX, diffY) {
  return (Math.atan2(diffY, diffX) * 180) / Math.PI;
}

function getRekt(el) {
  if (el?.classList && el.classList.contains("cursor-can-hover"))
    return el.getBoundingClientRect();
  else if (el?.parentElement?.classList.contains("cursor-can-hover"))
    return el.parentElement.getBoundingClientRect();
  else if (
    el?.parentElement?.parentElement?.classList.contains("cursor-can-hover")
  )
    return el.parentElement.parentElement.getBoundingClientRect();
  return null;
}

const CURSOR_DIAMETER = 44;

function ElasticCursor() {
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(max-width: 768px)").matches;

  const jellyRef = useRef(null);
  const dotRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const { x, y } = useMouse();
  const { setTargetBounds, setHoverTarget } = useCursorState();
  const pos = useInstance(() => ({ x: -100, y: -100 }));
  const vel = useInstance(() => ({ x: 0, y: 0 }));
  const set = useInstance();

  useLayoutEffect(() => {
    if (!jellyRef.current) return;
    set.x = gsap.quickSetter(jellyRef.current, "x", "px");
    set.y = gsap.quickSetter(jellyRef.current, "y", "px");
    set.r = gsap.quickSetter(jellyRef.current, "rotate", "deg");
    set.sx = gsap.quickSetter(jellyRef.current, "scaleX");
    set.sy = gsap.quickSetter(jellyRef.current, "scaleY");
    set.width = gsap.quickSetter(jellyRef.current, "width", "px");
    set.height = gsap.quickSetter(jellyRef.current, "height", "px");
  }, []);

  const loop = useCallback(() => {
    if (!set.width || !set.sx || !set.sy || !set.r) return;

    // Smoothly decay velocity when stationary
    vel.x *= 0.85;
    vel.y *= 0.85;

    var rotation = getAngle(+vel.x, +vel.y);
    var scale = getScale(+vel.x, +vel.y);

    if (!isHovering) {
      set.x(pos.x);
      set.y(pos.y);
      set.width(CURSOR_DIAMETER + scale * 140);
      set.height(CURSOR_DIAMETER - scale * 40);
      set.r(rotation);
      set.sx(1 + scale * 0.6);
      set.sy(1 - scale * 0.6);
    } else {
      set.r(0);
      set.sx(1);
      set.sy(1);
    }
  }, [isHovering]);

  const [cursorMoved, setCursorMoved] = useState(false);

  useLayoutEffect(() => {
    if (isMobile) return;

    const setFromEvent = (e) => {
      if (!jellyRef.current) return;

      if (!cursorMoved) {
        setCursorMoved(true);
        gsap.to([jellyRef.current, dotRef.current], {
          opacity: 1,
          duration: 0.2,
        });
      }

      const el = e.target;
      const hoverElemRect = getRekt(el);

      if (hoverElemRect) {
        const rect = el.getBoundingClientRect();
        setIsHovering(true);
        setTargetBounds(rect);
        setHoverTarget(el);

        gsap.to(jellyRef.current, {
          rotate: 0,
          scaleX: 1,
          scaleY: 1,
          duration: 0.1,
        });

        gsap.to(jellyRef.current, {
          width: el.offsetWidth + 12,
          height: el.offsetHeight + 12,
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          borderRadius: 12,
          duration: 0.45,
          ease: "power2.out",
        });
      } else {
        setIsHovering(false);
        setTargetBounds(null);
        setHoverTarget(null);

        gsap.to(jellyRef.current, {
          borderRadius: 50,
          width: CURSOR_DIAMETER,
          height: CURSOR_DIAMETER,
          duration: 0.25,
        });
      }

      const clientX = e.clientX;
      const clientY = e.clientY;

      gsap.to(pos, {
        x: clientX,
        y: clientY,
        duration: 0.5,
        ease: "power3.out",
        onUpdate: () => {
          vel.x = (clientX - pos.x) * 0.9;
          vel.y = (clientY - pos.y) * 0.9;
        },
        onComplete: () => {
          vel.x = 0;
          vel.y = 0;
        },
      });
    };

    const handleMouseLeave = () => {
      if (!jellyRef.current) return;
      gsap.to([jellyRef.current, dotRef.current], {
        opacity: 0,
        duration: 0.2,
      });
    };

    const handleMouseEnter = () => {
      if (!jellyRef.current) return;
      gsap.to([jellyRef.current, dotRef.current], {
        opacity: 1,
        duration: 0.2,
      });
    };

    window.addEventListener("mousemove", setFromEvent);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", setFromEvent);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isMobile, cursorMoved]);

  useTicker(loop, !cursorMoved || isMobile);

  if (isMobile) return null;

  return (
    <>
      <div
        ref={jellyRef}
        id="jelly-id"
        className="jelly-blob fixed left-0 top-0 rounded-full z-[999] pointer-events-none will-change-transform translate-x-[-50%] translate-y-[-50%] opacity-0"
        style={{
          width: CURSOR_DIAMETER,
          height: CURSOR_DIAMETER,
          border: "1.5px solid rgba(142, 197, 255, 0.4)",
          background: "rgba(142, 197, 255, 0.08)",
          backdropFilter: "blur(2px)",
          pointerEvents: "none",
        }}
      />
      {/* Small subtle center dot */}
      <div
        ref={dotRef}
        className="w-2 h-2 rounded-full fixed translate-x-[-50%] translate-y-[-50%] pointer-events-none opacity-0 bg-[#8ec5ff]"
        style={{
          top: y,
          left: x,
          zIndex: 1000,
          boxShadow: "0 0 8px #8ec5ff",
        }}
      />
    </>
  );
}

export default ElasticCursor;
