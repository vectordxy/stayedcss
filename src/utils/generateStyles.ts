import {
  BreakPointsType,
  ConfigType,
  JsonType,
  KeyframesType,
  MainInputType,
  StyleObjectItemType,
  StylesForProxyType,
} from "../../types";
import { handleKeyframes, handleMediaQuery } from "../syntax";
import { defaultBreakpoints } from "../syntax/handler/handleBreakpoints";
import { handleHash, writeCSS } from "../utils";
import { updateStyles } from "../utils/applyStyles";

export const generateStyles = (
  input: MainInputType,
  inputMode: "default" | "dark",
  config?: ConfigType
) => {
  let inputBreakpoints: BreakPointsType = defaultBreakpoints;
  let inputKeyframes: KeyframesType = {};

  if (config) {
    const { breakpoints, keyframes } = config;

    inputBreakpoints = breakpoints || defaultBreakpoints;
    inputKeyframes = keyframes || {};
  }

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
  if (inputKeyframes) {
    keyframesResult = handleKeyframes(inputKeyframes);
  }

  // 애니메이션 처리
  for (let item of styleData) {
    const itemName = item[0];
    const itemStyle = item[1] as unknown as StyleObjectItemType;
    const itemClassName =
      inputMode === "default"
        ? `${itemName}-${hash}`
        : `dark .${itemName}-${hash}`;

    stylesForProxy[itemName] = "";

    if (itemName in inputBreakpoints) {
      // 미디어쿼리
      const mqResult = handleMediaQuery(
        inputBreakpoints[itemName],
        itemStyle,
        itemClassName
      );
      result.push(mqResult);
    } else {
      // 그 외
      result = [...updateStyles(itemStyle, itemClassName), ...result];
    }
    stylesForProxy[itemName] = itemClassName;
  }

  writeCSS([...keyframesResult, ...result]);

  return new Proxy(stylesForProxy, {
    get(target, prop) {
      if (typeof prop === "string" && prop in target) {
        return target[prop];
      } else {
        console.warn(`Property "${String(prop)}" does not exist on styles.`);
        return undefined;
      }
    },
  });
};
