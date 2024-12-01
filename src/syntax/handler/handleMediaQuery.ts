import { updateStyles } from "../../core/updateStyles";
import { StyleObjectItemType } from "../../../types";

export const handleMediaQuery = (
  mediaQueryKey: string,
  inputStyle: StyleObjectItemType,
  hash: string
) => {
  let mediaQueryString = `@media ${mediaQueryKey} { `;
  let result: { className: string; style: string }[] = [];

  for (const key in inputStyle) {
    if (inputStyle.hasOwnProperty(key)) {
      const itemClassName = key;
      const itemStyle = inputStyle[key] as any;
      result = [...result, ...updateStyles(itemStyle, itemClassName, hash)];
    }
  }

  for (let el of result) {
    mediaQueryString += `${el.style} `;
  }

  mediaQueryString += `} `;
  return {
    className: `@media-${mediaQueryKey}-${hash}`,
    style: mediaQueryString,
  };
};
