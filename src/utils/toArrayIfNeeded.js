export const toArrayIfNeeded = stringOrArray =>
  Array.isArray(stringOrArray) ? stringOrArray : stringOrArray !== undefined ? [stringOrArray] : [];
