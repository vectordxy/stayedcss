import {
  handleCombinators,
  handleGeneralCSS,
  handlePseudo,
  isPseudoClasses,
  isPseudoElements,
  isCombinators,
} from "..";

export const generateStyles = (
  itemStyle: any,
  itemClassName: string,
  mode: string
) => {
  let result: { className: string; style: string }[] = [];
  let bufferGeneralCSS = "";

  for (const elementKey in itemStyle) {
    const elementStyle = itemStyle[elementKey] as any;

    switch (true) {
      case isPseudoElements(elementKey) || isPseudoClasses(elementKey): // 가상요소 or 클래스
        const pseudo = handlePseudo(
          elementKey,
          elementStyle,
          itemClassName,
          mode
        );
        result.unshift(pseudo);
        break;

      case isCombinators(elementKey): // 조합자
        const combinators = handleCombinators(
          elementKey,
          elementStyle,
          itemClassName,
          mode
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
    className: itemClassName,
    style:
      mode === "light"
        ? `.${itemClassName} { ${bufferGeneralCSS} }`
        : `.dark .${itemClassName} { ${bufferGeneralCSS} }`,
  });

  return result;
};
