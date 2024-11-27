import { isRequiredUnits } from "./checkUnits";

export const handleKeyframes = (keyframes: any, className: string) => {
  let resultString = "";

  for (const keyframesName in keyframes) {
    resultString += `@keyframes ${keyframesName} { `;
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
      resultString += `} `; // 닫는 중괄호 (frameKey)
    }
    resultString += `} `; // 닫는 중괄호 (keyframesName)
  }

  return resultString.trim();
};
