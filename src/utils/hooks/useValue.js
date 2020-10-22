import { useCallback } from "react";
import { useSelector } from "react-redux";
import { getByLevels } from "../../";

export const useValue = levels => {
  const selectorCallback = useCallback(state => getByLevels(state, levels), [levels]);
  const value = useSelector(selectorCallback);
  return value;
};
