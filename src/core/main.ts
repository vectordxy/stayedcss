import {
  breakpoints,
  handleCombinators,
  handleGeneralCSS,
  handleMediaQuery,
  handlePseudoElements,
  isPseudoElements,
} from "../syntax";
import { MainInputType, StyleOutputType } from "../types";
import { handleHash, writeNewCSS } from "../utils";

export default function hz(input: MainInputType) {
  const target = "server";

  const fullPath = __dirname;
  const relativePath = fullPath.substring(fullPath.indexOf(target));
  const pathHash = handleHash(relativePath).slice(0, 4);
  const componentHash = handleHash(input.componentName).slice(0, 4);

  const styleData = Object.entries(input).filter(
    ([key]) => key !== "componentName"
  );

  const styles: StyleOutputType = {};
  const resultCSS = [];

  for (let i = 0; i < styleData.length; i++) {
    const itemName = styleData[i][0];
    const itemStyle = styleData[i][1] as any;
    const itemClassName = `${itemName}-${pathHash}${componentHash}`;

    let bufferGeneralCSS = "";

    styles[itemName] = {
      className: "",
      style: "",
    };

    for (const key in itemStyle) {
      if (itemStyle.hasOwnProperty(key)) {
        switch (true) {
          case isPseudoElements(key): // 가상요소
            const pResult = handlePseudoElements(
              key,
              itemStyle[key],
              itemClassName
            );
            resultCSS.push(pResult);
            break;

          case /^[>+~ ]/.test(key): // 조합자
            const cResult = handleCombinators(
              key,
              itemStyle[key],
              itemClassName
            );
            resultCSS.push(cResult);
            break;

          case key in breakpoints: // 미디어쿼리 (반응형)
            const mqResult = handleMediaQuery(
              breakpoints[key],
              itemStyle[key],
              `${itemName}-${pathHash}${componentHash}`
            );
            resultCSS.push(mqResult);
            break;

          default: // 그외 일반 CSS
            bufferGeneralCSS += handleGeneralCSS(key, itemStyle, itemClassName);
            break;
        }
      }
    }
    // 일반 CSS 합치기
    resultCSS.push({ className: itemClassName, style: bufferGeneralCSS });
  }
  writeNewCSS(resultCSS);

  return new Proxy(styles, {
    get(target, prop) {
      if (typeof prop === "string") {
        if (
          typeof target[prop] === "object" &&
          target[prop] !== null &&
          "className" in target[prop]
        ) {
          return target[prop].className;
        } else {
          console.warn(`Property "${String(prop)}" does not exist on styles.`);
          return undefined;
        }
      }
    },
  });
}
