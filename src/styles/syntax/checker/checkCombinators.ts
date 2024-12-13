export const isCombinators = (input: string) => {
  if (/^[>+~]$/.test(input)) {
    return true;
  }

  return false;
};
