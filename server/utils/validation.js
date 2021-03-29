export const validateEmptyInput = (...n) => {
  if (n.length < 1) {
    return false;
  }
  return true;
};