import { handleHash, writeNewCSS } from "../utils";
import { handleKeyframes, handleMediaQuery } from "../syntax";

import { updateStyles } from "./updateStyles";
import { defaultBreakpoints } from "../syntax/handler/handleBreakpoints";
import {
  MainInputType,
  ConfigType,
  JsonType,
  StylesForProxyType,
  StyleObjectItemType,
} from "../../types";

export default function main(
  input: MainInputType,
  config: ConfigType = {
    breakpoints: defaultBreakpoints,
    keyframes: undefined,
  }
) {
  const { breakpoints, keyframes } = config;

  const filePath = __dirname.substring(__dirname.indexOf("server"));
  const pathHash = handleHash(filePath).slice(0, 4);
  const componentHash = handleHash(input.componentName as string).slice(0, 4);
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
    const itemStyle = item[1] as unknown as StyleObjectItemType;
    const itemClassName = `${itemName}-${hash}`;

    stylesForProxy[itemName] = "";

    if (itemName in breakpoints) {
      // 미디어쿼리
      const mqResult = handleMediaQuery(breakpoints[itemName], itemStyle, hash);
      result.push(mqResult);
    } else {
      // 그 외
      result = [...updateStyles(itemStyle, itemName, hash), ...result];
    }
    stylesForProxy[itemName] = itemClassName;
  }

  writeNewCSS([...keyframesResult, ...result]);

  return new Proxy(stylesForProxy, {
    get(target, prop) {
      if (typeof prop === "string" && prop in target) {
        return target[prop]; // className 반환
      } else {
        console.warn(`Property "${String(prop)}" does not exist on styles.`);
        return undefined;
      }
    },
  });
}
