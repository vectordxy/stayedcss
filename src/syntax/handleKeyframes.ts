import { isRequiredUnits } from "./checkUnits";

export const handleKeyframes = (style: any) => {
  // let keyframesString = "";
  // const keyframesAnimation = style["@keyframes"];
  // for (const keyframeName in keyframesAnimation as any) {
  //   const keyFrameItem = keyframesAnimation[keyframeName];
  //   keyframesString += `@keyframes ${keyframeName} { `;
  //   for (const keyFrameItemKey in keyFrameItem) {
  //     keyframesString += `${keyFrameItemKey} { `;
  //     const keyframesStyle = keyFrameItem[keyFrameItemKey];
  //     for (const keyframesStyleKey in keyframesStyle) {
  //       const kebabKey = keyframesStyleKey
  //         .replace(/([A-Z])/g, "-$1")
  //         .toLowerCase();
  //       const keyframeStyleValue = keyframesStyle[keyframesStyleKey];
  //       if (
  //         typeof keyframeStyleValue === "number" &&
  //         isRequiredUnits(kebabKey)
  //       ) {
  //         keyframesString += `${kebabKey}: ${keyframeStyleValue}px; `;
  //       } else {
  //         keyframesString += `${kebabKey}: ${keyframeStyleValue}; `;
  //       }
  //     }
  //     keyframesString += `} `;
  //   }
  //   keyframesString += `} `;
  // }
  // return {
  //   className: keyframesString.split(" ")[1],
  //   cssBlock: keyframesString,
  // };
};
