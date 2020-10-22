import { path } from "ramda";

export const getByLevels = (obj, levels) => {
  return path(levels, obj);
};
