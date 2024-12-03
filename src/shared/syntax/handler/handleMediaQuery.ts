import { updateStyles } from "./generateSyntax";
import { StyleObjectItem } from "../../../types";

export const handleMediaQuery = (
  mediaQueryKey: string,
  inputStyle: StyleObjectItem,
  className: string,
  componentHash: string
) => {
  let mediaQueryString = `@media ${mediaQueryKey} { `;
  let result: { className: string; style: string }[] = [];

  for (const key in inputStyle) {
    if (inputStyle.hasOwnProperty(key)) {
      const itemClassName = `${key}-${componentHash}`;
      const itemStyle = inputStyle[key] as any;
      result = [...result, ...updateStyles(itemStyle, itemClassName)];
    }
  }

  for (let el of result) {
    mediaQueryString += `${el.style} `;
  }

  mediaQueryString += `} `;

  return {
    className: `@media-${mediaQueryKey}-${className}`,
    style: mediaQueryString,
  };
};
