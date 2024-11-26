import { handleGeneralCSS } from "./syntax/handleGeneralCSS";
import { StyleInput } from "./types";
import { makeHash } from "./utils/makeHash";
import { writeNewCSS } from "./utils/writeNewCSS";

const jsonFilePath = ".stylecache/buffer.json";
const cssFilePath = ".stylecache/style.css";
const target = "server";

export default function hz(input: StyleInput) {
  const fullPath = __dirname;
  const relativePath = fullPath.substring(fullPath.indexOf(target));
  const pathHash = makeHash(relativePath).slice(0, 4);
  const componentHash = makeHash(input.component).slice(0, 4);

  const styleData = Object.entries(input).filter(
    ([key]) => key !== "component"
  );

  const styles: StyleInput = {};

  for (let i = 0; i < styleData.length; i++) {
    const itemName = styleData[i][0];
    const itemStyle = styleData[i][1] as StyleInput;

    let cssString = "";
    for (const key in itemStyle) {
      if (itemStyle.hasOwnProperty(key)) {
        cssString += handleGeneralCSS(key, itemStyle);
      }
    }

    const itemClassName = `${itemName}-${pathHash}${componentHash}`;
    const cssBlock = `.${itemClassName} { ${cssString.trim()} }`;

    // CSS 업데이트
    (async () => {
      await writeNewCSS(itemClassName, cssBlock, jsonFilePath, cssFilePath);
    })();

    styles[itemName] = {
      ...itemStyle,
      className: itemClassName,
    };
  }

  return new Proxy(styles, {
    get(target, prop) {
      if (typeof prop === "string" && prop in target) {
        return target[prop].className;
      } else {
        console.warn(`Property "${String(prop)}" does not exist on styles.`);
        return undefined;
      }
    },
  });
}
