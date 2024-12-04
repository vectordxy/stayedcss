import {
  handleComponentIdHash,
  handleHash,
  writeStaticCSS,
  writeStaticDarkModeCSS,
} from "../../utils";
import {
  BreakPoints,
  Config,
  Json,
  Keyframes,
  MainInput,
  StyleObjectItem,
  StylesForProxy,
} from "../../types";
import { handleKeyframes, handleMediaQuery } from "..";
import { defaultBreakpoints } from "../syntax/handleBreakpoints";
import { updateStyles } from "../syntax/generateSyntax";

export const getStaticStyles = (
  input: MainInput,
  inputScreenMode: "default" | "dark",
  config?: Config
) => {
  let inputBreakpoints: BreakPoints = defaultBreakpoints;
  let inputKeyframes: Keyframes = {};

  if (config) {
    const { breakpoints, keyframes } = config;

    inputBreakpoints = breakpoints || defaultBreakpoints;
    inputKeyframes = keyframes || {};
  }

  const componentHash = handleHash(input.componentId as string).slice(0, 8);

  const styleData = Object.entries(input).filter(
    ([key]) => key !== "componentId"
  );

  let result: Json[] = [];

  const stylesForProxy: StylesForProxy = {};
  let keyframesResult: Json[] = [];

  // 키프레임 애니메이션 처리
  if (inputKeyframes) {
    keyframesResult = handleKeyframes(inputKeyframes);
  }

  // 애니메이션 처리
  for (let item of styleData) {
    const itemName = item[0];
    const itemStyle = item[1] as unknown as StyleObjectItem;
    const itemClassName =
      inputScreenMode === "default"
        ? `${itemName}-${componentHash}`
        : `dark .${itemName}-${componentHash}`;

    stylesForProxy[itemName] = "";

    if (itemName in inputBreakpoints) {
      // 미디어쿼리
      const mqResult = handleMediaQuery(
        inputBreakpoints[itemName],
        itemStyle,
        itemClassName,
        componentHash
      );
      result.push(mqResult);
    } else {
      // 그 외
      result = [...updateStyles(itemStyle, itemClassName), ...result];
    }
    stylesForProxy[itemName] = itemClassName;
  }

  const styleResult = [...keyframesResult, ...result];
  const cIdHash = handleComponentIdHash(input.componentId as string);

  if (inputScreenMode === "default") {
    writeStaticCSS(styleResult, cIdHash);
  } else {
    writeStaticDarkModeCSS(styleResult, cIdHash);
  }

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
