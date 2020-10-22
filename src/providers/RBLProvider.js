import React, { useContext } from "react";
import { RBLContext, toArrayIfNeeded } from "../";

export const RBLProvider = ({ children, level }) => {
  const levelsToAppend = toArrayIfNeeded(level);
  const levels = useContext(RBLContext) || [];
  return (
    <RBLContext.Provider value={[...levels, ...levelsToAppend]}>{children}</RBLContext.Provider>
  );
};
