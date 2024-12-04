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
import { updateStyles } from "../syntax/generateSyntax";
import { defaultBreakpoints } from "../syntax/handleBreakpoints";
import { handleComponentIdHash, handleHash } from "../../utils";

export const getSharedStyles = (
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

  return {
    styleResult: [...keyframesResult, ...result],
    stylesForProxy: stylesForProxy,
    cIdHash: handleComponentIdHash(input.componentId as string),
  };
};
