import { isRequiredUnits } from "./checkUnits";
import { StyleType } from "../types";
import { isPseudoElements } from "./checkPseudoElements";
import { handlePseudoElements } from "./handlePseudoElements";
import { handleCombinators } from "./handleCombinator";
import { handleGeneralCSS } from "./handleGeneralCSS";

export const handleMediaQuery = (
  mediaQueryKey: string,
  inputStyle: StyleType,
  hash: string
) => {
  let mediaQueryString = `@media ${mediaQueryKey} {`;
  const resultOfCSS = [];
  const resultOfGeneralCSS = [];

  for (const key in inputStyle) {
    if (inputStyle.hasOwnProperty(key)) {
      const itemClassName = `${key}-${hash}`;
      const itemStyle = inputStyle[key] as any;
      let bufferGeneralCSS = "";

      for (const elementKey in itemStyle) {
        const elementStyle = itemStyle[elementKey];
        // console.log(elementStyle);
        switch (true) {
          case isPseudoElements(elementKey): // 가상요소
            const pResult = handlePseudoElements(
              elementKey,
              elementStyle,
              itemClassName
            );
            resultOfCSS.unshift(pResult);
            break;

          case /^[>+~ ]/.test(elementKey): // 조합자
            const cResult = handleCombinators(
              elementKey,
              elementStyle,
              itemClassName
            );
            resultOfCSS.unshift(cResult);
            break;

          default: // 그외 일반 스타일
            bufferGeneralCSS += handleGeneralCSS(elementKey, elementStyle);
            break;
        }
      }

      resultOfGeneralCSS.push({
        className: itemClassName,
        style: `.${itemClassName} { ${bufferGeneralCSS} }`,
      });
    }
  }

  const result = [...resultOfGeneralCSS, ...resultOfCSS];

  for (let el of result) {
    mediaQueryString += el.style;
  }

  mediaQueryString += "}";

  return {
    className: `@media-${mediaQueryKey}-${hash}`,
    style: mediaQueryString,
  };
};
