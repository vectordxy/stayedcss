import { StyleObjectItem } from "../../types";
import { isRequiredUnits } from "./checker/checkUnits";

export const handlePseudo = (
  elementKey: string,
  inputStyle: StyleObjectItem,
  className: string
) => {
  let resultString = `.${className}${elementKey} { `;

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

  resultString += `} `;

  return { className: `${className}${elementKey}`, style: resultString };
};
