const validPseudoElements = [
  "::before",
  "::after",
  "::first-line",
  "::first-letter",
  "::placeholder",
  "::selection",
  "::marker",
  "::part",
  "::slotted",
  "::file-selector-button",
  "::backdrop",
  "::cue",
  "::grammar-error",
  "::spelling-error",
];

export const isPseudoElements = (input: string) => {
  if (validPseudoElements.includes(input)) {
    return true;
  }

  return false;
};
