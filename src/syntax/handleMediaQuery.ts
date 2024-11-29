import { StyleType } from "../types";
import { updateStyles } from "../core/updateStyles";

export const handleMediaQuery = (
  mediaQueryKey: string,
  inputStyle: StyleType,
  hash: string
) => {
  let mediaQueryString = `@media ${mediaQueryKey} { `;
  const result: any = [];

  for (const key in inputStyle) {
    if (inputStyle.hasOwnProperty(key)) {
      const itemClassName = `${key}-${hash}`;
      const itemStyle = inputStyle[key] as any;
      let bufferGeneralCSS = "";

      const { resultOfCSS, resultOfGeneralCSS } = updateStyles(
        itemStyle,
        itemClassName
      );

      if (resultOfCSS.length > 0) {
        resultOfCSS.map((item) =>
          result.push({
            className: itemClassName,
            style: `.${itemClassName} { ${item.style} }`,
          })
        );
      }

      if (resultOfGeneralCSS !== "") {
        bufferGeneralCSS = resultOfGeneralCSS;
        result.push({
          className: itemClassName,
          style: `.${itemClassName} { ${bufferGeneralCSS} }`,
        });
      }
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
