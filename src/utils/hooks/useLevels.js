import { useContext, useMemo } from "react";
import { toArrayIfNeeded, RBLContext } from "../../";

export const useLevels = (level = []) => {
  const levelsToAppend = toArrayIfNeeded(level);
  const contextLevels = useContext(RBLContext) || [];
  const levels = useMemo(() => [...contextLevels, ...levelsToAppend], [
    contextLevels,
    levelsToAppend
  ]);
  return levels;
};
