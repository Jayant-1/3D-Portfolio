import { useEffect, useMemo, useRef, useState } from "react";

const defaultOptions = {
  threshold: 0.45,
};

const useNavPeek = (links = [], options = defaultOptions) => {
  const { threshold } = { ...defaultOptions, ...options };
  const [hoverIndex, setHoverIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    if (!links.length) return undefined;
    const ids = links
      .map((link) => link?.href)
      .filter(Boolean)
      .map((href) => href.replace("#", ""));

    if (!ids.length) return undefined;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!elements.length) return undefined;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length) {
          const targetId = visible[0].target.id;
          const idx = ids.indexOf(targetId);
          if (idx !== -1) {
            setActiveIndex(idx);
          }
        }
      },
      { threshold }
    );

    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, [links, threshold]);

  const focusedIndex = hoverIndex ?? activeIndex;
  const preview = useMemo(
    () => links[focusedIndex]?.img,
    [focusedIndex, links]
  );

  return {
    hoverIndex,
    activeIndex,
    isHovering,
    preview,
    focusedIndex,
    handleEnter: (idx) => {
      setHoverIndex(idx);
      setIsHovering(true);
    },
    handleLeave: () => {
      setIsHovering(false);
      setHoverIndex(null);
    },
    handleClick: (idx) => {
      setActiveIndex(idx);
      setIsHovering(false);
    },
  };
};

export default useNavPeek;
