import { generateStyles } from "../generate/generateStyles";
import { StyleObjectItem } from "../../types";

export const handleMediaQuery = (
  mediaQueryKey: string,
  inputStyle: any,
  componentHash: string,
  mode: string
) => {
  let mediaQueryString = `@media ${mediaQueryKey} { `;
  let result: { className: string; style: string }[] = [];
  let itemClassName = "";

  for (const key in inputStyle) {
    if (inputStyle.hasOwnProperty(key)) {
      itemClassName = `${key}-${componentHash}`;
      const itemStyle = inputStyle[key] as any;
      result = [...result, ...generateStyles(itemStyle, itemClassName, mode)];
    }
  }

  for (let el of result) {
    mediaQueryString += `${el.style} `;
  }

  mediaQueryString += `} `;

  return {
    className: `${mediaQueryKey}-${itemClassName}`,
    style: mediaQueryString,
  };
};
