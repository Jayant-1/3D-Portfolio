import { useMemo, useState } from "react";

const groupCounters = new Map();

const useEntryTiming = ({
  groupId = "default",
  baseDelay = 0,
  stagger = 0.1,
} = {}) => {
  const [order] = useState(() => {
    const count = groupCounters.get(groupId) ?? 0;
    groupCounters.set(groupId, count + 1);
    return count;
  });

  const delayChildren = useMemo(
    () => baseDelay + order * stagger,
    [baseDelay, order, stagger]
  );

  return {
    delayChildren,
    staggerChildren: stagger,
  };
};

export default useEntryTiming;
