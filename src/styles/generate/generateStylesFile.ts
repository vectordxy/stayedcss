import {
  BreakPoints,
  Json,
  Keyframes,
  MainInput,
  StyleObjectItem,
  StylesForProxy,
} from "../../types";
import { handleKeyframes, handleMediaQuery } from "..";
import { writeStaticCSS, writeStaticDarkModeCSS } from "./utils";
import { generateStylesWithSyntax } from "./generateStylesWithSyntax";
import { defaultBreakpoints } from "./utils/common/handleBreakpoints";
import {
  formatComponentId,
  toLowerCaseComponentId,
} from "./utils/common/handleComponentId";
import { loadBreakpoints } from "./utils/files/loadBreakpoints";

export const getStaticStyles = (
  input: MainInput,
  inputScreenMode: "default" | "dark"
) => {
  // let inputBreakpoints = loadBreakpoints();
  let inputBreakpoints: BreakPoints = defaultBreakpoints;
  let inputKeyframes: Keyframes = {};

  const componentClassName = formatComponentId(input.componentId as string);
  const componentFileRootName = toLowerCaseComponentId(
    input.componentId as string
  );

  // if (config) {
  //   const { breakpoints, keyframes } = config;

  //   inputBreakpoints = breakpoints || defaultBreakpoints;
  //   inputKeyframes = keyframes || {};
  // }

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
        ? `${itemName}-${componentClassName}`
        : `dark .${itemName}-${componentClassName}`;

    stylesForProxy[itemName] = "";

    if (itemName in inputBreakpoints) {
      // 미디어쿼리
      const mqResult = handleMediaQuery(
        inputBreakpoints[itemName],
        itemStyle,
        itemClassName,
        componentClassName
      );
      result.push(mqResult);
    } else {
      result = [
        ...generateStylesWithSyntax(itemStyle, itemClassName),
        ...result,
      ];
    }
    stylesForProxy[itemName] = itemClassName;
  }

  const styleResult = [...keyframesResult, ...result];

  if (inputScreenMode === "default") {
    writeStaticCSS(styleResult, componentFileRootName);
  } else {
    writeStaticDarkModeCSS(styleResult, componentFileRootName);
  }
};
