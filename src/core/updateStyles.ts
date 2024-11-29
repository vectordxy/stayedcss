import {
  handleCombinators,
  handleGeneralCSS,
  handlePseudoElements,
  isPseudoElements,
} from "../syntax";

import { StyleType } from "../types";

export const updateStyles = (itemStyle: StyleType, itemClassName: string) => {
  const resultOfCSS = [];
  let bufferGeneralCSS = "";

  for (const elementKey in itemStyle) {
    const elementStyle = itemStyle[elementKey] as any;

    switch (true) {
      //   case isPseudoElements(elementKey): // 가상요소
      //     const pseudoElements = handlePseudoElements(
      //       elementKey,
      //       elementStyle,
      //       itemClassName
      //     );
      //     resultOfCSS.unshift(pseudoElements);
      //     break;

      //   case isPseudoClasses(elementKey): // 가상 클래스
      //     const pseudoClasses = handlePseudoClasses(
      //       elementKey,
      //       elementStyle,
      //       itemClassName
      //     );
      //     console.log(pseudoClasses);
      //     // resultOfCSS.unshift(pseudoClasses);
      //     break;

      case /^[>+~ ]/.test(elementKey): // 조합자
        const combinators = handleCombinators(
          elementKey,
          elementStyle,
          itemClassName
        );
        resultOfCSS.unshift(combinators);
        break;

      default: // 그외 일반 스타일
        // console.log(itemClassName, elementKey, elementStyle);
        bufferGeneralCSS += handleGeneralCSS(elementKey, elementStyle);
        break;
    }
  }
  console.log(itemClassName, resultOfCSS);
  return { resultOfCSS: resultOfCSS, resultOfGeneralCSS: bufferGeneralCSS };
};
