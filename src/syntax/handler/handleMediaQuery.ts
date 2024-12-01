import { updateStyles } from "../../utils/applyStyles";
import { StyleObjectItemType } from "../../../types";

export const handleMediaQuery = (
  mediaQueryKey: string,
  inputStyle: StyleObjectItemType,
  className: string
) => {
  let mediaQueryString = `@media ${mediaQueryKey} { `;
  let result: { className: string; style: string }[] = [];

  for (const key in inputStyle) {
    if (inputStyle.hasOwnProperty(key)) {
      const itemClassName = key;
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
