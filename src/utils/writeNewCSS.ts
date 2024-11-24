import { promises as fs } from "fs";
import { ensureFileExistence, readJsonFile, writeJsonFile } from "./handleFile";

export const writeNewCSS = async (
  className,
  cssBlock,
  jsonFilePath,
  cssFilePath
) => {
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
};
