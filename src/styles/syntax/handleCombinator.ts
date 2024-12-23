import { StyleObjectItem } from "../../types";
import { isRequiredUnits } from "./checker/checkUnits";

export const handleCombinators = (
  elementKey: string,
  inputStyle: StyleObjectItem,
  className: string,
  mode: string
) => {
  let resultString =
    mode === "light"
      ? `.${className}${elementKey} { `
      : `.dark .${className}${elementKey} { `;

  for (const key in inputStyle) {
    const styleKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
    const styleItem = inputStyle[key];
    if (typeof styleItem === "number") {
      resultString += `${styleKey}: ${styleItem}${
        isRequiredUnits(styleKey) ? "px" : ""
      }; `;
    } else {
      resultString += `${styleKey}: ${styleItem}; `;
    }
  }

  resultString += "}";

  return { className: `${className} ${elementKey}`, style: resultString };
};
