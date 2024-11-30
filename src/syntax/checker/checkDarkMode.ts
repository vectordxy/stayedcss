export const isDarkMode = (cssKey: string) => {
  if (cssKey === "&dark") {
    return true;
  }
  return false;
};
