import { Keyframes } from "../../types";
import { isRequiredUnits } from "./checker/checkUnits";

export const handleKeyframes = (keyframes: Keyframes) => {
  let resultString = "";
  let name = "";
  const result = [];
  for (const keyframesName in keyframes) {
    name = keyframesName;
    resultString = `@keyframes ${keyframesName} { `;
    const keyframesStyle = keyframes[keyframesName];

    for (const frameKey in keyframesStyle) {
      const frameStyle = keyframesStyle[frameKey];
      resultString += `${frameKey} { `;

      for (const styleKey in frameStyle) {
        const kebabKey = styleKey.replace(/([A-Z])/g, "-$1").toLowerCase();
        const styleValue = frameStyle[styleKey];
        if (typeof styleValue === "number") {
          resultString += `${kebabKey}: ${styleValue}${
            isRequiredUnits(kebabKey) ? "px" : ""
          }; `;
        } else {
          resultString += `${kebabKey}: ${styleValue}; `;
        }
      }
      resultString += `} `;
    }
    resultString += `} `;
    result.push({
      className: `@keyframes ${keyframesName}`,
      style: resultString.trim(),
    });
  }

  return result;
};
