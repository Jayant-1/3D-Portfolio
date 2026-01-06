import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export const ReactBitsCursorContext = createContext({
  intent: "default",
  targetBounds: null,
  hoverTarget: null,
  setIntent: () => {},
  setTargetBounds: () => {},
  setHoverTarget: () => {},
});

const ReactBitsCursorProvider = ({ children }) => {
  const [intent, setIntent] = useState("default");
  const [targetBounds, setTargetBounds] = useState(null);
  const [hoverTarget, setHoverTarget] = useState(null);

  const updateIntent = useCallback((newIntent) => {
    setIntent(newIntent);
  }, []);

  const updateTargetBounds = useCallback((bounds) => {
    setTargetBounds(bounds);
  }, []);

  const updateHoverTarget = useCallback((target) => {
    setHoverTarget(target);
  }, []);

  const value = useMemo(
    () => ({
      intent,
      targetBounds,
      hoverTarget,
      setIntent: updateIntent,
      setTargetBounds: updateTargetBounds,
      setHoverTarget: updateHoverTarget,
    }),
    [
      intent,
      targetBounds,
      hoverTarget,
      updateIntent,
      updateTargetBounds,
      updateHoverTarget,
    ]
  );

  return (
    <ReactBitsCursorContext.Provider value={value}>
      {children}
    </ReactBitsCursorContext.Provider>
  );
};

export const useCursorState = () => {
  const context = useContext(ReactBitsCursorContext);
  if (!context) {
    throw new Error(
      "useCursorState must be used within ReactBitsCursorProvider"
    );
  }
  return context;
};

export default ReactBitsCursorProvider;
