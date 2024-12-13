const validPseudoElements = new Set([
  "::before",
  "::after",
  "::first-line",
  "::first-letter",
  "::placeholder",
  "::selection",
  "::marker",
  "::file-selector-button",
  "::backdrop",
  "::cue",
]);

export const isPseudoElements = (input: string) => {
  if (validPseudoElements.has(input)) {
    return true;
  }

  return false;
};
