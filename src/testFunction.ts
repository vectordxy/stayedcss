import { makeHash } from "./utils/makeHash";
import { handleGeneralCSS } from "./syntax/handleGeneralCSS";
import { writeNewCSS } from "./utils/writeNewCSS";

const jsonFilePath = ".stylecache/buffer.json";
const cssFilePath = ".stylecache/style.css";

export const testFunction = (input: Record<string, any>) => {
  const componentHash = makeHash(input.component).slice(0, 8);
  const styleData = Object.entries(input).filter(
    ([key]) => key !== "component"
  );

  const styles: Record<string, any> = {};

  for (let i = 0; i < styleData.length; i++) {
    const itemName = styleData[i][0];
    const itemStyle = styleData[i][1] as Record<string, any>;

    let cssString = "";
    for (const key in itemStyle) {
      if (itemStyle.hasOwnProperty(key)) {
        cssString += handleGeneralCSS(key, itemStyle);
      }
    }

    const cssBlock = `.${itemName}-${componentHash} { ${cssString.trim()} }`;

    // CSS 업데이트
    (async () => {
      await writeNewCSS(
        `${itemName}-${componentHash}`,
        cssBlock,
        jsonFilePath,
        cssFilePath
      );
    })();

    styles[itemName] = {
      ...itemStyle,
      className: `${itemName}-${componentHash}`,
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
};
