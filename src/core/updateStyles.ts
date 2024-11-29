import {
  handleCombinators,
  handleGeneralCSS,
  handlePseudoElements,
  isPseudoElements,
} from "../syntax";
import { StyleType } from "../types";

export const updateStyles = (itemStyle: StyleType, itemClassName: string) => {
  const resultOfCSS = [];
  const resultOfGeneralCSS: any = [];
  let bufferGeneralCSS = "";

  for (const elementKey in itemStyle) {
    const elementStyle = itemStyle[elementKey] as any;

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
        // console.log(itemClassName, elementKey, elementStyle);
        bufferGeneralCSS += handleGeneralCSS(elementKey, elementStyle);
        break;
    }
  }

  return { resultOfCSS: resultOfCSS, resultOfGeneralCSS: bufferGeneralCSS };
};
