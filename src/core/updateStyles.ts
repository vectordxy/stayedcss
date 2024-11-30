import {
  handleCombinators,
  handleGeneralCSS,
  handlePseudoClasses,
  handlePseudoElements,
  isPseudoClasses,
  isPseudoElements,
} from "../syntax";

import { StyleType } from "../types";

export const updateStyles = (
  itemStyle: StyleType,
  className: string,
  hash: string
) => {
  let result: { className: string; style: string }[] = [];
  let bufferGeneralCSS = "";
  const itemName = `${className}-${hash}`;
  for (const elementKey in itemStyle) {
    const elementStyle = itemStyle[elementKey] as any;

    switch (true) {
      case isPseudoElements(elementKey): // 가상요소
        const pseudoElements = handlePseudoElements(
          elementKey,
          elementStyle,
          itemName
        );
        result.unshift(pseudoElements);
        break;

      case isPseudoClasses(elementKey): // 가상 클래스
        const pseudoClasses = handlePseudoClasses(
          elementKey,
          elementStyle,
          itemName
        );
        result.unshift(pseudoClasses);
        break;

      case /^[>+~ ]/.test(elementKey): // 조합자
        const combinators = handleCombinators(
          elementKey,
          elementStyle,
          itemName
        );
        result.unshift(combinators);
        break;

      default: // 그외 일반 스타일
        const general = handleGeneralCSS(
          elementKey,
          elementStyle,
          `${className}-${hash}`
        );
        bufferGeneralCSS += general;
        break;
    }
  }

  result.push({
    className: itemName,
    style: `.${itemName} { ${bufferGeneralCSS} }`,
  });

  return result;
};