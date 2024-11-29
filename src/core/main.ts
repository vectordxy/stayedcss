import {
  JsonInput,
  MainInputType,
  MediaQueryInput,
  StylesForProxyType,
} from "../types";
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

  const styleData = Object.entries(input).filter(
    ([key]) => key !== "componentName"
  );

  const stylesForCSS: JsonInput[] = [];
  const stylesForProxy: StylesForProxyType = {};
  let kResult: JsonInput[] = [];

  // 키프레임 애니메이션 처리
  if (keyframes) {
    kResult = handleKeyframes(keyframes);
  }

  // 애니메이션 처리
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
            stylesForCSS.push(mqResult);
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
