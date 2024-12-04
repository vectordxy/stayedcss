import { isRequiredUnits } from "./checker/checkUnits";

export const handleGeneralCSS = (
  elementKey: string,
  inputStyle: string | number
) => {
  let resultString = "";
  const styleKey = elementKey.replace(/([A-Z])/g, "-$1").toLowerCase();

  if (typeof inputStyle === "number") {
    resultString += `${styleKey}: ${inputStyle}${
      isRequiredUnits(styleKey) ? "px" : ""
    }; `;
  } else {
    resultString += `${styleKey}: ${inputStyle}; `;
  }

  return resultString;
};
