import React from "react";
import { RBLContext } from "../";

export const RBLResetter = ({ children }) => {
  return <RBLContext.Provider value={[]}>{children}</RBLContext.Provider>;
};
