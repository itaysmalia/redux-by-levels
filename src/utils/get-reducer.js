import { getByLevels,setByLevels } from "../";

export const getRBLReducer = (initialState = {}, levelsAfterRoot = 0) => {
  const reducer = (state = initialState, action) => {
    const levels = action?.payload?.levels?.slice(levelsAfterRoot);
    if (levels) {
      const value = action?.payload?.value;
      const valueToSet = typeof value === "function" ? value(getByLevels(state, levels)) : value;
      return setByLevels(state, levels, valueToSet);
    }
    return state;
  };
  return reducer;
};
