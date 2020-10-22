import { assocPath, dissocPath } from "ramda";

export const setByLevels = (obj, levels, value) => {
  return value !== undefined ? assocPath(levels, value, obj) : dissocPath(levels, obj);
};
