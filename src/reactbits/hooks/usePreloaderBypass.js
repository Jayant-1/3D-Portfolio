import { useEffect, useRef } from "react";

const usePreloaderBypass = ({
  onBypass,
  keys = ["any"],
  clickEnabled = true,
  touchEnabled = true,
  disabled = false,
} = {}) => {
  const bypassedRef = useRef(false);

  useEffect(() => {
    if (disabled || !onBypass) return;

    const handleBypass = () => {
      if (!bypassedRef.current) {
        bypassedRef.current = true;
        onBypass();
      }
    };

    const handleKeyDown = (e) => {
      if (keys.includes("any") || keys.includes(e.key.toLowerCase())) {
        handleBypass();
      }
    };

    const handleClick = () => {
      if (clickEnabled) {
        handleBypass();
      }
    };

    const handleTouch = () => {
      if (touchEnabled) {
        handleBypass();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    if (clickEnabled) {
      window.addEventListener("click", handleClick);
    }
    if (touchEnabled) {
      window.addEventListener("touchstart", handleTouch);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("touchstart", handleTouch);
    };
  }, [onBypass, keys, clickEnabled, touchEnabled, disabled]);

  return {
    bypassed: bypassedRef.current,
    reset: () => {
      bypassedRef.current = false;
    },
  };
};

export default usePreloaderBypass;
