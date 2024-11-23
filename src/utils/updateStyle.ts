import { promises as fs } from "fs";

import { StyleType } from "../types";
import { makeHash } from "./makeHash";
import {
  ensureDirectoryExistence,
  readJsonFile,
  writeJsonFile,
} from "./handleFile";

const jsonFilePath = ".stylecache/buffer.json";
const cssFilePath = ".stylecache/style.css";
const target = "app";

export function updateClassnameAndCSS(input: StyleType) {
  const { name, component, style } = input;
  const fullPath = __dirname;
  const relativePath = fullPath.substring(fullPath.indexOf(target));
  const pathHash = makeHash(relativePath);
  const componentHash = makeHash(component);
  const className = `${name}-${pathHash.slice(0, 4)}${componentHash.slice(
    0,
    4
  )}`;

  let cssString = "";
  for (const key in style) {
    if (style.hasOwnProperty(key)) {
      const kebabKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
      const styleItem = style[key];
      if (typeof styleItem === "string") {
        if (styleItem.length !== 0) cssString += `${kebabKey}: ${style[key]}; `;
      } else {
        cssString += `${kebabKey}: ${style[key]}; `;
      }
    }
  }
  const cssBlock = `.${className} { ${cssString.trim()} }`;

  (async () => {
    try {
      await ensureDirectoryExistence(jsonFilePath);
      const existingData = await readJsonFile(jsonFilePath);

      if (existingData[className]) {
        // 기존 CSS 업데이트
        if (existingData[className] !== cssBlock) {
          // console.log(`Updating existing style for: ${className}`);
          existingData[className] = cssBlock;
          await writeJsonFile(jsonFilePath, existingData);

          const cssContent = Object.values(existingData).join("\n");
          await fs.writeFile(cssFilePath, cssContent, "utf-8");
          // console.log(`Updated style in ${cssFilePath}: ${className}`);
        } else {
          // console.log(`Style already exists and is unchanged: ${className}`);
        }
        return;
      }

      // 새로운 CSS 추가
      // console.log(`Adding new style: ${className}`);
      existingData[className] = cssBlock;
      await writeJsonFile(jsonFilePath, existingData);

      const cssContent = Object.values(existingData).join("\n");
      await fs.writeFile(cssFilePath, cssContent, "utf-8");
      // console.log(`Added new style to ${cssFilePath}: ${className}`);
    } catch (error) {
      console.error(`Failed to process CSS: ${error}`);
    }
  })();

  return className;
}
