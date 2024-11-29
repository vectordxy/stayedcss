import { StyleType } from "../types";
import { isRequiredUnits } from "./checkUnits";

export const handleGeneralCSS = (key: string, style: string | number) => {
  let resultString = "";

  const styleKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
  const styleItem = style;
  if (typeof styleItem === "number") {
    resultString += `${styleKey}: ${styleItem}${
      isRequiredUnits(styleKey) ? "px" : ""
    }; `;
  } else {
    resultString += `${styleKey}: ${styleItem}; `;
  }

  return resultString;
};
