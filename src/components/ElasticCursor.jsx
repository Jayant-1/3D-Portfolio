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
  if (el.classList && el.classList.contains("cursor-can-hover"))
    return el.getBoundingClientRect();
  else if (el.parentElement?.classList.contains("cursor-can-hover"))
    return el.parentElement.getBoundingClientRect();
  else if (
    el.parentElement?.parentElement?.classList.contains("cursor-can-hover")
  )
    return el.parentElement.parentElement.getBoundingClientRect();
  return null;
}

const CURSOR_DIAMETER = 50;

function ElasticCursor() {
  // Detect if mobile (simple check)
  const isMobile =
    window.matchMedia && window.matchMedia("(max-width: 768px)").matches;
  const jellyRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const { x, y } = useMouse();
  const { intent, setTargetBounds, setHoverTarget } = useCursorState();
  const pos = useInstance(() => ({ x: 0, y: 0 }));
  const vel = useInstance(() => ({ x: 0, y: 0 }));
  const set = useInstance();

  useLayoutEffect(() => {
    set.x = gsap.quickSetter(jellyRef.current, "x", "px");
    set.y = gsap.quickSetter(jellyRef.current, "y", "px");
    set.r = gsap.quickSetter(jellyRef.current, "rotate", "deg");
    set.sx = gsap.quickSetter(jellyRef.current, "scaleX");
    set.sy = gsap.quickSetter(jellyRef.current, "scaleY");
    set.width = gsap.quickSetter(jellyRef.current, "width", "px");
  }, []);

  const loop = useCallback(() => {
    if (!set.width || !set.sx || !set.sy || !set.r) return;
    var rotation = getAngle(+vel.x, +vel.y);
    var scale = getScale(+vel.x, +vel.y);
    if (!isHovering) {
      set.x(pos.x);
      set.y(pos.y);
      set.width(CURSOR_DIAMETER + scale * 180);
      set.r(rotation);
      set.sx(1 + scale * 0.8);
      set.sy(1 - scale * 1.2);
    } else {
      set.r(0);
    }
  }, [isHovering]);

  const [cursorMoved, setCursorMoved] = useState(false);
  useLayoutEffect(() => {
    if (isMobile) return;
    const setFromEvent = (e) => {
      if (!jellyRef.current) return;
      if (!cursorMoved) {
        setCursorMoved(true);
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
          duration: 0,
        });
        gsap.to(jellyRef.current, {
          width: el.offsetWidth + 12,
          height: el.offsetHeight + 12,
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          borderRadius: 10,
          duration: 0.9,
          ease: "elastic.out(1, 0.4)",
        });
      } else {
        gsap.to(jellyRef.current, {
          borderRadius: 50,
          width: CURSOR_DIAMETER,
          height: CURSOR_DIAMETER,
        });
        setIsHovering(false);
        setTargetBounds(null);
        setHoverTarget(null);
      }
      const x = e.clientX;
      const y = e.clientY;
      gsap.to(pos, {
        x: x,
        y: y,
        duration: 0.9,
        ease: "power3.out",
        onUpdate: () => {
          vel.x = (x - pos.x) * 1.2;
          vel.y = (y - pos.y) * 1.2;
        },
      });
      loop();
    };
    window.addEventListener("mousemove", setFromEvent);
    return () => {
      window.removeEventListener("mousemove", setFromEvent);
    };
  }, [isMobile]);

  useTicker(loop, !cursorMoved || isMobile);
  if (isMobile) return null;
  return (
    <>
      <div
        ref={jellyRef}
        id={"jelly-id"}
        className="jelly-blob fixed left-0 top-0 rounded-lg z-[999] pointer-events-none will-change-transform translate-x-[-50%] translate-y-[-50%]"
        style={{
          width: CURSOR_DIAMETER,
          height: CURSOR_DIAMETER,
          borderRadius: 50,
          border: "2px solid #000",
          background: "rgba(255,255,255,0.2)",
          mixBlendMode: "exclusion",
          pointerEvents: "none",
          backdropFilter: "invert(100%)",
        }}
      />
      {/* Small dot at mouse position with invert effect */}
      <div
        className="w-3 h-3 rounded-full fixed translate-x-[-50%] translate-y-[-50%] pointer-events-none transition-none duration-300"
        style={{
          top: y,
          left: x,
          backdropFilter: "invert(100%)",
          zIndex: 1000,
        }}
      />
    </>
  );
}

export default ElasticCursor;
