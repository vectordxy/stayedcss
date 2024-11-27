import { makeHash } from "./utils/makeHash";
import { writeNewCSS } from "./utils/writeNewCSS";

import { breakpoints, handleMediaQuery } from "./syntax/handleMediaQuery";
import { handleGeneralCSS } from "./syntax/handleGeneralCSS";
import { handleKeyframes } from "./syntax/handleKeyframes";

const jsonFilePath = ".stylecache/buffer.json";
const cssFilePath = ".stylecache/style.css";
const target = "server";

export default function hz(input: any) {
  const fullPath = __dirname;
  const relativePath = fullPath.substring(fullPath.indexOf(target));
  const pathHash = makeHash(relativePath).slice(0, 4);
  const componentHash = makeHash(input.component).slice(0, 4);

  const styleData = Object.entries(input).filter(
    ([key]) => key !== "component"
  );

  const styles: any = {};
  let itemClassName = "";
  let cssBlock = "";

  for (let i = 0; i < styleData.length; i++) {
    const itemName = styleData[i][0];
    const itemStyle = styleData[i][1] as any;
    let cssString = "";
    let mediaQueryString = "";
    let keyframesString = "";

    for (const key in itemStyle) {
      if (itemStyle.hasOwnProperty(key)) {
        itemClassName = `${itemName}-${pathHash}${componentHash}`;
        if (key === "@keyframes") {
          cssBlock += handleKeyframes(itemStyle[key], itemClassName);
        } else if (key in breakpoints) {
          cssBlock += mediaQueryString += handleMediaQuery(
            breakpoints[key],
            itemStyle[key],
            `${itemName}-${pathHash}${componentHash}`
          );
        } else {
          cssBlock = `.${itemClassName} { ${cssString} } `;
          cssString += handleGeneralCSS(key, itemStyle);
        }
      }
    }

    (async () => {
      const res = await writeNewCSS(
        itemClassName,
        cssBlock,
        jsonFilePath,
        cssFilePath
      );
    })();

    styles[itemName] = {
      ...itemStyle,
      className: itemClassName,
    };
  }

  return new Proxy(styles, {
    get(target, prop) {
      if (
        typeof target[prop] === "object" &&
        target[prop] !== null &&
        "className" in target[prop]
      ) {
        return target[prop].className;
      } else {
        console.warn(`Property "${String(prop)}" does not exist on styles.`);
        return undefined;
      }
    },
  });
}
