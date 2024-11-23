import { promises as fs } from "fs";

import { StyleType } from "../types";
import { makeHash } from "./makeHash";
import { ensureFileExistence, readJsonFile, writeJsonFile } from "./handleFile";

const jsonFilePath = ".stylecache/buffer.json";
const cssFilePath = ".stylecache/style.css";
const target = "server";

export function updateClassnameAndCSS(input: StyleType) {
  const { name, component, style } = input;

  const fullPath = __dirname;
  const relativePath = fullPath.substring(fullPath.indexOf(target));
  const pathHash = makeHash(relativePath).slice(0, 4);
  const componentHash = makeHash(component).slice(0, 4);
  const className = `${name}-${pathHash}${componentHash}`;

  let cssString = "";

  for (const key in style) {
    if (style.hasOwnProperty(key)) {
      const kebabKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
      const styleItem = style[key];
      if (typeof styleItem === "string") {
        if (styleItem.length !== 0) cssString += `${kebabKey}: ${styleItem}; `;
      } else {
        cssString += `${kebabKey}: ${styleItem}; `;
      }
    }
  }
  const cssBlock = `.${className} { ${cssString.trim()} }`;

  (async () => {
    try {
      await ensureFileExistence(jsonFilePath);
      const existingData = await readJsonFile(jsonFilePath);

      if (existingData[className]) {
        // 기존 CSS 업데이트
        if (existingData[className] !== cssBlock) {
          existingData[className] = cssBlock;
          await writeJsonFile(jsonFilePath, existingData);
          const cssContent = Object.values(existingData).join("\n");
          await fs.writeFile(cssFilePath, cssContent, "utf-8");
        } else {
          console.log(`Style already exists and is unchanged: ${className}`);
        }
        return;
      }

      // 새로운 CSS 추가
      existingData[className] = cssBlock;
      await writeJsonFile(jsonFilePath, existingData);
      const cssContent = Object.values(existingData).join("\n");
      await fs.writeFile(cssFilePath, cssContent, "utf-8");
    } catch (error) {
      console.error(`Failed to process CSS: ${error}`);
    }
  })();

  return className;
}
