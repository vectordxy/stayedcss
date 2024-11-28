import {
  breakpoints,
  handleCombinators,
  handleGeneralCSS,
  handleMediaQuery,
  handlePseudoElements,
  isPseudoElements,
} from "../syntax";
import { handleHash } from "../utils";

const jsonFilePath = ".stylecache/buffer.json";
const cssFilePath = ".stylecache/style.css";
const target = "server";

export default function hz(input: any) {
  const fullPath = __dirname;
  const relativePath = fullPath.substring(fullPath.indexOf(target));
  const pathHash = handleHash(relativePath).slice(0, 4);
  const componentHash = handleHash(input.component).slice(0, 4);

  const styleData = Object.entries(input).filter(
    ([key]) => key !== "component"
  );

  const styles: any = {};
  let cssBlock = "";

  for (let i = 0; i < styleData.length; i++) {
    const itemName = styleData[i][0];
    const itemStyle = styleData[i][1] as any;
    const itemClassName = `${itemName}-${pathHash}${componentHash}`;

    let cssString = "";

    styles[itemName] = {
      className: itemClassName,
    };

    for (const key in itemStyle) {
      if (itemStyle.hasOwnProperty(key)) {
        if (isPseudoElements(key)) {
          handlePseudoElements(key, itemStyle[key], itemClassName);
        } else if (/^[>+~ ]/.test(key)) {
          handleCombinators(key, itemStyle[key], itemClassName);
        } else if (key in breakpoints) {
          handleMediaQuery(
            breakpoints[key],
            itemStyle[key],
            `${itemName}-${pathHash}${componentHash}`
          );
        } else {
          cssString += handleGeneralCSS(key, itemStyle);
          cssBlock = `.${itemClassName} { ${cssString} } `;
        }
      }
    }

    // (async () => {
    //   await writeNewCSS(itemClassName, cssBlock, jsonFilePath, cssFilePath);
    // })();
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
