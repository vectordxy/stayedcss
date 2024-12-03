import { promises as fs } from "fs";
import path from "path";
import { JsonType } from "../../../types";

// 폴더 내부 style.css에 @import 추가
const addImportToLocalStyle = async (
  folderPath: string,
  importFile: string
) => {
  const localStylePath = path.join(
    process.cwd(),
    "stayedcss",
    folderPath,
    "style.css"
  );
  const importStatement = `@import "./${importFile}";`;

  try {
    let data = "";
    try {
      data = await fs.readFile(localStylePath, "utf-8");
    } catch {
      console.log("style.css not found, creating a new one.");
    }

    // @import 문이 최상단에 오도록 처리
    if (!data.includes(importStatement)) {
      const updatedData = `${importStatement}\n${data.trim()}`.trim();
      await fs.writeFile(localStylePath, updatedData, "utf-8");
      console.log(
        `@import statement added to ${localStylePath}: ${importStatement}`
      );
    } else {
      console.log(
        `The @import statement is already present in ${localStylePath}.`
      );
    }
  } catch (error) {
    console.error(`Error adding @import to ${localStylePath}:`, error);
  }
};

// stayedcss/index.css에 컴포넌트 style.css 추가
const addImportToIndex = async (folderPath: string) => {
  const mainCSSFilePath = path.join(process.cwd(), "stayedcss", "index.css");
  const importStatement = `@import "./${folderPath}/style.css";`;

  try {
    let data = "";
    try {
      data = await fs.readFile(mainCSSFilePath, "utf-8");
    } catch {
      console.log("index.css not found, creating a new one.");
    }

    // @import 문이 최상단에 오도록 처리
    if (!data.includes(importStatement)) {
      const updatedData = `${importStatement}\n${data.trim()}`.trim();
      await fs.writeFile(mainCSSFilePath, updatedData, "utf-8");
      console.log(`@import statement added to index.css: ${importStatement}`);
    } else {
      console.log("The @import statement is already present in index.css.");
    }
  } catch (error) {
    console.error("Error adding @import to index.css:", error);
  }
};

// 다크모드 CSS 생성 함수
export const writeDarkModeCSS = async (
  input: JsonType[],
  componentId: string
) => {
  const cssFilePath = `style-${componentId}/darkmode.css`;
  const fullFilePath = `stayedcss/${cssFilePath}`;

  const ensureDirectoryExists = async (filePath: string) => {
    const dir = path.dirname(filePath);
    try {
      await fs.access(dir);
    } catch {
      await fs.mkdir(dir, { recursive: true });
      console.log(`Directory created: ${dir}`);
    }
  };

  try {
    // 디렉토리 확인 및 생성
    await ensureDirectoryExists(fullFilePath);

    // 다크모드 CSS 생성
    const cssContent = input.map(({ className, style }) => style).join("\n");
    await fs.writeFile(fullFilePath, cssContent, "utf-8");
    console.log(`${componentId} Dark Mode CSS updated successfully.`);

    // 같은 폴더의 style.css에 다크모드 import 추가
    await addImportToLocalStyle(`style-${componentId}`, "darkmode.css");
  } catch (error) {
    console.error(`Failed to process Dark Mode CSS for ${componentId}:`, error);
  }
};

// 일반 스타일 CSS 생성 함수
export const writeCSS = async (input: JsonType[], componentId: string) => {
  const cssFilePath = `style-${componentId}/style.css`;
  const fullFilePath = `stayedcss/${cssFilePath}`;

  const ensureDirectoryExists = async (filePath: string) => {
    const dir = path.dirname(filePath);
    try {
      await fs.access(dir);
    } catch {
      await fs.mkdir(dir, { recursive: true });
      console.log(`Directory created: ${dir}`);
    }
  };

  try {
    // 디렉토리 확인 및 생성
    await ensureDirectoryExists(fullFilePath);

    // 일반 스타일 CSS 생성
    const cssContent = input.map(({ className, style }) => style).join("\n");
    await fs.writeFile(fullFilePath, cssContent, "utf-8");
    console.log(`${componentId} CSS updated successfully.`);

    // stayedcss/index.css에 컴포넌트의 style.css import 추가
    await addImportToIndex(`style-${componentId}`);
  } catch (error) {
    console.error(`Failed to process CSS for ${componentId}:`, error);
  }
};
