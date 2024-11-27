import { isRequiredUnits } from "./checkUnits";

export const handleGeneralCSS = (key: any, style: any) => {
  let resultString = "";
  const styleKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
  const styleItem = style[key];
  if (typeof styleItem === "number") {
    if (isRequiredUnits(styleKey)) {
      resultString += `${styleKey}: ${styleItem}px; `;
    } else {
      resultString += `${styleKey}: ${styleItem}; `;
    }
  } else {
    resultString += `${styleKey}: ${styleItem}; `;
  }
  return resultString;
};
