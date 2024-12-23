import { BreakPoints, Json, MainInput, StyleObjectItem } from "../../types";
import { handleMediaQuery } from "..";
import { writeStaticCSS, writeStaticDarkModeCSS } from "./utils";
import { generateStyles } from "./generateStyles";
import { defaultBreakpoints } from "./utils/common/handleBreakpoints";
import {
  formatComponentId,
  toLowerCaseComponentId,
} from "./utils/common/handleComponentId";

export const getStyles = (input: MainInput) => {
  let inputBreakpoints: BreakPoints = defaultBreakpoints;

  const componentClassName = formatComponentId(input.componentId as string);
  const componentFileRootName = toLowerCaseComponentId(
    input.componentId as string
  );

  const styleData = Object.entries(input).filter(
    ([key]) => key !== "componentId"
  );

  let result: Json[] = [];
  let darkModeResult: Json[] = [];

  for (let item of styleData) {
    const itemKey = item[0];
    const itemValue = item[1] as unknown as StyleObjectItem;

    if (itemKey === "&dark") {
      for (const elementKey in itemValue) {
        const elementValue = itemValue[elementKey];
        if (elementKey in inputBreakpoints) {
          // Media Query
          const mqResult = handleMediaQuery(
            inputBreakpoints[elementKey],
            elementValue,
            componentClassName,
            "dark"
          );
          darkModeResult.push(mqResult);
        } else {
          const itemClassName = `${elementKey}-${componentClassName}`;
          darkModeResult = [
            ...generateStyles(elementValue, itemClassName, "dark"),
            ...darkModeResult,
          ];
        }
      }
    } else {
      if (itemKey in inputBreakpoints) {
        // Media Query
        const mqResult = handleMediaQuery(
          inputBreakpoints[itemKey],
          itemValue,
          componentClassName,
          "light"
        );
        result.push(mqResult);
      } else {
        const itemClassName = `${itemKey}-${componentClassName}`;
        result = [
          ...generateStyles(itemValue, itemClassName, "light"),
          ...result,
        ];
      }
    }
  }

  writeStaticCSS(result, componentFileRootName);
  writeStaticDarkModeCSS(darkModeResult, componentFileRootName);
};
