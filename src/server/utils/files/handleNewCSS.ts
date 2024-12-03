import { promises as fs } from "fs";
import path from "path";
import { JsonType } from "../../../types";

export const writeCSS = async (input: JsonType[], componentId: string) => {
  const cssFilePath = `style-${componentId}.css`;
  const fullFilePath = `stayedcss/${cssFilePath}`;

  const ensureDirectoryExists = async (filePath: string) => {
    const dir = path.dirname(filePath);
    try {
      await fs.access(dir);
    } catch {
      await fs.mkdir(dir, { recursive: true });
      // console.log(`Directory created: ${dir}`);
    }
  };

  try {
    // 디렉토리 확인 및 생성
    await ensureDirectoryExists(fullFilePath);

    // 바로 CSS 파일 생성
    const cssContent = input.map(({ className, style }) => style).join("\n");

    await fs.writeFile(fullFilePath, cssContent, "utf-8");
    // console.log(`${componentId} CSS updated successfully.`);

    // stayedcss/index.css에 @import 추가
    await addImportToFile(cssFilePath);
  } catch (error) {
    console.error(`Failed to process CSS for ${componentId}:`, error);
  }
};

// stayedcss/index.css에 @import 추가
const addImportToFile = async (folderPath: string) => {
  const mainCSSFilePath = path.join(process.cwd(), "stayedcss", "index.css");
  const importStatement = `@import "./${folderPath}";`;

  try {
    let data = "";
    try {
      data = await fs.readFile(mainCSSFilePath, "utf-8");
    } catch {
      // console.log("Creating main index.css file.");
    }

    if (!data.includes(importStatement)) {
      const updatedData = `${data.trim()}\n${importStatement}`.trim();
      await fs.writeFile(mainCSSFilePath, updatedData, "utf-8");
      // console.log("@import statement added successfully!");
    } else {
      // console.log("The @import statement is already present.");
    }
  } catch (error) {
    console.error("Error adding @import to main CSS file:", error);
  }
};
