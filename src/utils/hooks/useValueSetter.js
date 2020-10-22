import { useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { toArrayIfNeeded } from "../";

export const useValueSetter = levels => {
  const dispatch = useDispatch();
  const prevValue = useRef();
  const setValue = useCallback(
    (value, level) => {
      if (prevValue.current !== value) {
        prevValue.current = value;
        const levelsToUpdate = level ? [...levels, ...toArrayIfNeeded(level)] : levels;
        dispatch({
          type: levels.join("_"),
          payload: { levels: levelsToUpdate, value }
        });
      }
    },
    [dispatch, levels]
  );
  return setValue;
};
