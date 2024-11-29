import { JsonInput, MainInputType, StylesForProxyType } from "../types";
import { handleHash, writeNewCSS } from "../utils";
import {
  breakpoints,
  handleCombinators,
  handleGeneralCSS,
  handleMediaQuery,
  handlePseudoElements,
  isPseudoElements,
} from "../syntax";

export default function hz(input: MainInputType) {
  const target = "server";

  const fullPath = __dirname;
  const relativePath = fullPath.substring(fullPath.indexOf(target));
  const pathHash = handleHash(relativePath).slice(0, 4);
  const componentHash = handleHash(input.componentName).slice(0, 4);

  const styleData = Object.entries(input).filter(
    ([key]) => key !== "componentName"
  );

  const stylesForCSS: JsonInput[] = [];
  const stylesForProxy: StylesForProxyType = {};

  for (let i = 0; i < styleData.length; i++) {
    const itemName = styleData[i][0];
    const itemStyle = styleData[i][1] as any;
    const itemClassName = `${itemName}-${pathHash}${componentHash}`;

    let bufferGeneralCSS = "";
    stylesForProxy[itemName] = {
      className: "",
      style: "",
    };
    // 스타일 처리
    for (const key in itemStyle) {
      if (itemStyle.hasOwnProperty(key)) {
        const itemKey = key;
        const itemObjectStyle = itemStyle[key];
        switch (true) {
          case isPseudoElements(key): // 가상요소
            const pResult = handlePseudoElements(
              itemKey,
              itemObjectStyle,
              itemClassName
            );
            stylesForCSS.unshift(pResult);
            break;

          case /^[>+~ ]/.test(key): // 조합자
            const cResult = handleCombinators(
              itemKey,
              itemObjectStyle,
              itemClassName
            );
            stylesForCSS.unshift(cResult);
            break;

          case key in breakpoints: // 미디어쿼리 (반응형)
            const mqResult = handleMediaQuery(
              breakpoints[key],
              itemObjectStyle,
              itemClassName
            );

            if (breakpoints[key].includes("max-width")) {
              stylesForCSS.unshift(mqResult);
            } else if (breakpoints[key].includes("min-width")) {
              stylesForCSS.push(mqResult);
            } else {
              console.warn(`Unknown breakpoint condition: ${breakpoints[key]}`);
              stylesForCSS.push(mqResult);
            }
            break;

          default: // 그외 일반 스타일
            bufferGeneralCSS += handleGeneralCSS(
              itemKey,
              itemStyle,
              itemClassName
            );
            break;
        }
      }
    }

    const finalCSS = `.${itemClassName} { ${bufferGeneralCSS}}`;

    stylesForCSS.unshift({
      className: itemClassName,
      style: finalCSS,
    });

    stylesForProxy[itemName] = {
      ...stylesForProxy[itemName],
      className: itemClassName,
      style: finalCSS,
    };
  }

  writeNewCSS(stylesForCSS);

  return new Proxy(stylesForProxy, {
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
