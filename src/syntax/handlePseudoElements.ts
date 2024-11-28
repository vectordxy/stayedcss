import { isRequiredUnits } from "./checkUnits";

export const handlePseudoElements = (
  elementKey: string,
  style: Record<string, any>,
  className: string
) => {
  let resultString = `.${className}${elementKey} { `;

  for (const key in style) {
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
  resultString += `} `;

  return resultString;
};
