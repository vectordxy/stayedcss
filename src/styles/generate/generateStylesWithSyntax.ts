import {
  handleCombinators,
  handleGeneralCSS,
  handlePseudo,
  isPseudoClasses,
  isPseudoElements,
  isCombinators,
} from "..";

import { StyleObjectItem } from "../../types";

export const generateStylesWithSyntax = (
  itemStyle: StyleObjectItem,
  itemClassName: string
) => {
  let result: { className: string; style: string }[] = [];
  let bufferGeneralCSS = "";
  const itemName = itemClassName;
  for (const elementKey in itemStyle) {
    const elementStyle = itemStyle[elementKey] as any;

    switch (true) {
      case isPseudoElements(elementKey) || isPseudoClasses(elementKey): // 가상요소 or 클래스
        const pseudo = handlePseudo(elementKey, elementStyle, itemName);
        result.unshift(pseudo);
        break;

      // case isPseudoClasses(elementKey): // 가상 클래스
      //   const pseudoClasses = handlePseudo(elementKey, elementStyle, itemName);
      //   result.unshift(pseudoClasses);
      //   break;

      case isCombinators(elementKey): // 조합자
        const combinators = handleCombinators(
          elementKey,
          elementStyle,
          itemName
        );
        result.unshift(combinators);
        break;

      default: // 그외 일반 스타일
        const general = handleGeneralCSS(elementKey, elementStyle);
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
