import { BreakPoints, Json, MainInput, StyleObjectItem } from "../../types";
import { handleMediaQuery } from "..";
import { writeStaticCSS, writeStaticDarkModeCSS } from "./utils";
import { generateStylesWithSyntax } from "./generateStylesWithSyntax";
import { defaultBreakpoints } from "./utils/common/handleBreakpoints";
import {
  formatComponentId,
  toLowerCaseComponentId,
} from "./utils/common/handleComponentId";

export const getStaticStyles = (
  input: MainInput,
  inputScreenMode: "default" | "dark"
) => {
  let inputBreakpoints: BreakPoints = defaultBreakpoints;

  const componentClassName = formatComponentId(input.componentId as string);
  const componentFileRootName = toLowerCaseComponentId(
    input.componentId as string
  );

  const styleData = Object.entries(input).filter(
    ([key]) => key !== "componentId"
  );

  let result: Json[] = [];

  for (let item of styleData) {
    const itemName = item[0];
    const itemStyle = item[1] as unknown as StyleObjectItem;
    const itemClassName =
      inputScreenMode === "default"
        ? `${itemName}-${componentClassName}`
        : `dark .${itemName}-${componentClassName}`;

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
  }

  const styleResult = [...result];

  if (inputScreenMode === "default") {
    writeStaticCSS(styleResult, componentFileRootName);
  } else {
    writeStaticDarkModeCSS(styleResult, componentFileRootName);
  }
};
