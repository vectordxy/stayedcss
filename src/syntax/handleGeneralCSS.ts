import { StyleInputType } from "../types";
import { isRequiredUnits } from "./checkUnits";

export const handleGeneralCSS = (
  key: string,
  style: StyleInputType,
  className: string
) => {
  let resultString = `.${className} { `;

  const styleKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
  const styleItem = style[key];
  if (typeof styleItem === "number") {
    resultString += `${styleKey}: ${styleItem}${
      isRequiredUnits(styleKey) ? "px" : ""
    }; `;
  } else {
    resultString += `${styleKey}: ${styleItem}; `;
  }

  resultString += "}";
  return resultString;
};
