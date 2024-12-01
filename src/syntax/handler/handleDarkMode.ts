import { StyleObjectItemType } from "../../../types";
import { isRequiredUnits } from "../checker/checkUnits";

export const handleDarkMode = (
  elementKey: string,
  inputStyle: StyleObjectItemType,
  className: string
) => {
  let resultString = `.dark .${className} { `;

  // console.log(style);
  for (const key in inputStyle) {
    const styleKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
    const styleItem = inputStyle[key];
    // console.log(styleItem);
    if (typeof styleItem === "number") {
      resultString += `${styleKey}: ${styleItem}${
        isRequiredUnits(styleKey) ? "px" : ""
      }; `;
    } else {
      resultString += `${styleKey}: ${styleItem}; `;
    }
  }

  resultString += `} `;

  return { className: `${className}.dark`, style: resultString };
};
