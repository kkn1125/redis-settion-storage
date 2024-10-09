export const isNil = <T extends undefined | null | unknown>(
  obj: T,
): obj is undefined | null => {
  return !obj;
};
