import { useEffect, useMemo, useRef, useState } from "react";

const PHASE = {
  TYPING: "typing",
  PAUSING: "pausing",
  DELETING: "deleting",
};

const clampNumber = (value, min, max) => Math.max(min, Math.min(max, value));

const useTypewriter = ({
  items,
  typeSpeed = 90,
  deleteSpeed = 55,
  pause = 1100,
  loop = true,
} = {}) => {
  const safeItems = useMemo(() => {
    const list = Array.isArray(items) ? items.filter(Boolean) : [];
    return list.length ? list : [""];
  }, [items]);
  const [itemIndex, setItemIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [phase, setPhase] = useState(PHASE.TYPING);
  const [cursorVisible, setCursorVisible] = useState(true);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const blink = setInterval(() => {
      setCursorVisible((visible) => !visible);
    }, 550);
    return () => clearInterval(blink);
  }, []);

  useEffect(() => {
    const currentWord = safeItems[itemIndex] ?? "";

    if (phase === PHASE.TYPING) {
      const done = subIndex === currentWord.length;
      const timeout = setTimeout(() => {
        if (!mountedRef.current) return;
        if (done) {
          setPhase(PHASE.PAUSING);
        } else {
          setSubIndex((value) => value + 1);
        }
      }, clampNumber(typeSpeed, 20, 500));
      return () => clearTimeout(timeout);
    }

    if (phase === PHASE.PAUSING) {
      const timeout = setTimeout(() => {
        if (!mountedRef.current) return;
        setPhase(loop ? PHASE.DELETING : PHASE.TYPING);
      }, pause);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      if (!mountedRef.current) return;
      const atStart = subIndex === 0;
      if (atStart) {
        const nextIndex = (itemIndex + 1) % safeItems.length;
        setItemIndex(nextIndex);
        setPhase(PHASE.TYPING);
      } else {
        setSubIndex((value) => value - 1);
      }
    }, clampNumber(deleteSpeed, 20, 500));
    return () => clearTimeout(timeout);
  }, [
    deleteSpeed,
    itemIndex,
    loop,
    pause,
    phase,
    safeItems,
    subIndex,
    typeSpeed,
  ]);

  return {
    text: (safeItems[itemIndex] ?? "").slice(0, subIndex),
    cursorVisible,
    phase,
    itemIndex,
  };
};

export default useTypewriter;
