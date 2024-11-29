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

import { updateStyles } from "./updateStyles";
import { defaultBreakpoints } from "../syntax/handler/handleBreakpoints";

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

  let result: JsonType[] = [];
  const stylesForProxy: StylesForProxyType = {};
  let keyframesResult: JsonType[] = [];

  // 키프레임 애니메이션 처리
  if (keyframes) {
    keyframesResult = handleKeyframes(keyframes);
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
      result.push(mqResult);
    } else {
      const { resultOfCSS, resultOfGeneralCSS } = updateStyles(
        itemStyle,
        itemClassName
      );

      if (resultOfCSS.length > 0) {
        resultOfCSS.forEach((item) =>
          result.unshift({
            className: itemClassName,
            style: `.${itemClassName} { ${item.style} }`,
          })
        );
      }

      if (resultOfGeneralCSS !== "") {
        bufferGeneralCSS = resultOfGeneralCSS;
        result.push({
          className: itemClassName,
          style: `.${itemClassName} { ${bufferGeneralCSS} }`,
        });
      }
    }

    stylesForProxy[itemName] = {
      ...stylesForProxy[itemName],
      className: itemClassName,
      style: "",
    };
  }

  writeNewCSS([...keyframesResult, ...result]);

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
