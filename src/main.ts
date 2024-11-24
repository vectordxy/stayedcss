import { handleGeneralCSS } from "./syntax/handleGeneralCSS";
import { handleKeyframes } from "./syntax/handleKeyframes";
import { StyleType } from "./types";
import { makeHash } from "./utils/makeHash";
import { writeNewCSS, writeNewKeyframes } from "./utils/writeNewCSS";

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
  let cssBlock = "";
  for (const key in style) {
    if (style.hasOwnProperty(key)) {
      if (key === "@keyframes") {
        const { className, cssBlock } = handleKeyframes(style);
        writeNewKeyframes(className, cssBlock, jsonFilePath, cssFilePath);
      } else {
        cssString += handleGeneralCSS(key, style);
        cssBlock = `.${className} { ${cssString.trim()} }`;
        writeNewCSS(className, cssBlock, jsonFilePath, cssFilePath);
      }
    }
  }

  return className;
}
