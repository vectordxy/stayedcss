const validPseudoElements = [
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
];

export const isPseudoElements = (input: string) => {
  if (validPseudoElements.includes(input)) {
    return true;
  }

  return false;
};
