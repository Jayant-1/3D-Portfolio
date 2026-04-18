import { addListener, launch, stop } from "devtools-detector";
import { useEffect, useState } from "react";

export const useDevToolsOpen = () => {
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    addListener((isOpen) => {
      if (isOpen) {
        setIsDevToolsOpen(true);
        stop();
      }
    });
    launch();
    return () => {
      stop();
    };
  }, []);
  return { isDevToolsOpen };
};
