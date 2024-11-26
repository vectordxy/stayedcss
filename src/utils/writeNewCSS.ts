import { promises as fs } from "fs";
import { ensureFileExistence, readJsonFile, writeJsonFile } from "./handleFile";

export const writeNewCSS = async (
  className: string,
  cssBlock: string,
  jsonFilePath: string,
  cssFilePath: string
) => {
  try {
    await ensureFileExistence(jsonFilePath);
    const existingCSS = await readJsonFile(jsonFilePath);

    let jsonUpdated = false;

    // 해당 CSS가 이미 존재
    if (existingCSS[className]) {
      if (existingCSS[className] === cssBlock) {
        console.log(`CSS is identical for: ${className}. Skipping update.`);
        return; // JSON 변경 없이 종료
      }
      console.log(`Updating existing CSS for: ${className}`);
      existingCSS[className] = cssBlock;
      jsonUpdated = true;
    } else {
      console.log(`Adding new CSS for: ${className}`);
      existingCSS[className] = cssBlock;
      jsonUpdated = true;
    }

    // JSON 파일 업데이트
    if (jsonUpdated) {
      await writeJsonFile(jsonFilePath, existingCSS);
      console.log(`JSON updated for: ${className}`);
    } else {
      console.log(`No updates needed for JSON.`);
    }

    // JSON → CSS 변환 (JSON이 변경된 경우에만 실행)
    if (jsonUpdated) {
      const cssContent = Object.values(existingCSS).join("\n");
      await fs.writeFile(cssFilePath, cssContent, "utf-8");
      console.log(`CSS file updated: ${cssFilePath}`);
    }
  } catch (error) {
    console.error(`Failed to process CSS: ${error}`);
  }
};
