import { handleGeneralCSS } from "./syntax/handleGeneralCSS";
import { StyleType } from "./types";
import { makeHash } from "./utils/makeHash";
import { writeNewCSS } from "./utils/writeNewCSS";

const jsonFilePath = ".stylecache/buffer.json";
const cssFilePath = ".stylecache/style.css";
const target = "server";

export default function hz(input: StyleType) {
  const { name, component, style } = input;

  const fullPath = __dirname;
  const relativePath = fullPath.substring(fullPath.indexOf(target));
  const pathHash = makeHash(relativePath).slice(0, 4);
  const componentHash = makeHash(component).slice(0, 4);
  const className = `${name}-${pathHash}${componentHash}`;

  let cssString = "";

  (async () => {
    for (const key in style) {
      if (style.hasOwnProperty(key)) {
        cssString += handleGeneralCSS(key, style);
      }
    }
    const cssBlock = `.${className} { ${cssString.trim()} }`;
    await writeNewCSS(className, cssBlock, jsonFilePath, cssFilePath);
  })();

  return className;
}
