import { JsonType, MainInputType, StylesForProxyType } from "../types";
import { handleHash, writeNewCSS } from "../utils";
import {
  handleCombinators,
  handleGeneralCSS,
  handleKeyframes,
  handleMediaQuery,
  handlePseudoElements,
  isPseudoElements,
} from "../syntax";
import { defaultBreakpoints } from "../syntax/handleBreakpoints";

export default function main(
  input: MainInputType,
  config: any = { breakpoints: defaultBreakpoints, keyframes: undefined }
) {
  const { breakpoints, keyframes } = config;

  const filePath = __dirname.substring(__dirname.indexOf("server"));
  const pathHash = handleHash(filePath).slice(0, 4);
  const componentHash = handleHash(input.componentName).slice(0, 4);
  const hash = `${pathHash}${componentHash}`;

  const styleData = Object.entries(input).filter(
    ([key]) => key !== "componentName"
  );

  const stylesForCSS: JsonType[] = [];
  const stylesForProxy: StylesForProxyType = {};
  let kResult: JsonType[] = [];

  // 키프레임 애니메이션 처리
  if (keyframes) {
    kResult = handleKeyframes(keyframes);
  }

  // 애니메이션 처리
  for (let item of styleData) {
    const itemName = item[0];
    const itemStyle = item[1];
    const itemClassName = `${itemName}-${hash}`;

    let bufferGeneralCSS = "";

    stylesForProxy[itemName] = {
      className: "",
      style: "",
    };

    if (itemName in breakpoints) {
      // 미디어쿼리
      const mqResult = handleMediaQuery(breakpoints[itemName], itemStyle, hash);
      stylesForCSS.push(mqResult);
    } else {
      for (const elementKey in itemStyle) {
        const elementStyle = itemStyle[elementKey] as any;

        switch (true) {
          case isPseudoElements(elementKey):
            console.log(elementStyle); // 가상요소
            const pResult = handlePseudoElements(
              elementKey,
              elementStyle,
              itemClassName
            );
            stylesForCSS.unshift(pResult);
            break;

          case /^[>+~ ]/.test(elementKey): // 조합자
            const cResult = handleCombinators(
              elementKey,
              elementStyle,
              itemClassName
            );
            stylesForCSS.unshift(cResult);
            break;

          default: // 그외 일반 스타일
            bufferGeneralCSS += handleGeneralCSS(elementKey, elementStyle);
            break;
        }
      }

      const finalCSS = `.${itemClassName} { ${bufferGeneralCSS}}`;

      stylesForCSS.unshift({
        className: itemClassName,
        style: finalCSS,
      });
    }

    stylesForProxy[itemName] = {
      ...stylesForProxy[itemName],
      className: itemClassName,
      style: "",
    };
  }

  writeNewCSS([...kResult, ...stylesForCSS]);

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
