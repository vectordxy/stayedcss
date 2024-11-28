import { isRequiredUnits } from "./checkUnits";
import { MediaQueryInput, StyleInputType } from "../types";

export const breakpoints: MediaQueryInput = {
  "@mobile": "(max-width: 768px)",
  "@desktop": "(min-width: 769px)",
};

export const handleMediaQuery = (
  mediaQueryKey: string,
  style: StyleInputType,
  className: string
) => {
  let mediaQueryString = `@media ${mediaQueryKey} { .${className} { `;
  let resultString = "";

  for (const key in style) {
    if (style.hasOwnProperty(key)) {
      const styleKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
      const styleItem = style[key];
      if (typeof styleItem === "number") {
        resultString += `${styleKey}: ${styleItem}${
          isRequiredUnits(styleKey) ? "px" : ""
        }; `;
      } else {
        resultString += `${styleKey}: ${styleItem}; `;
      }
    }
    mediaQueryString += resultString;
  }
  mediaQueryString += `} };`;
  return {
    className: `@media ${mediaQueryKey} .${className}`,
    style: mediaQueryString,
  };
};
