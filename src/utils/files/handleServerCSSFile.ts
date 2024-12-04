import path from "path";
import { promises as fs } from "fs";
import { Json } from "../../types";
import { addImportToIndex, addImportToLocalStyle } from "./handleImportToCSS";

// 라이트모드
export const writeStaticCSS = async (input: Json[], componentId: string) => {
  const cssFilePath = `style-${componentId}/style.css`;
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

    // 일반 스타일 CSS 생성
    const cssContent = input.map(({ className, style }) => style).join("\n");
    await fs.writeFile(fullFilePath, cssContent, "utf-8");
    // console.log(`${componentId} CSS updated successfully.`);

    // stayedcss/index.css에 컴포넌트의 style.css import 추가
    await addImportToIndex(`style-${componentId}`);
  } catch (error) {
    console.error(`Failed to process CSS for ${componentId}:`, error);
  }
};

// 다크모드
export const writeStaticDarkModeCSS = async (
  input: Json[],
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
      // console.log(`Directory created: ${dir}`);
    }
  };

  try {
    // 디렉토리 확인 및 생성
    await ensureDirectoryExists(fullFilePath);

    // 다크모드 CSS 생성
    const cssContent = input.map(({ className, style }) => style).join("\n");
    await fs.writeFile(fullFilePath, cssContent, "utf-8");
    // console.log(`${componentId} Dark Mode CSS updated successfully.`);

    // 같은 폴더의 style.css에 다크모드 import 추가
    await addImportToLocalStyle(`style-${componentId}`, "darkmode.css");
  } catch (error) {
    console.error(`Failed to process Dark Mode CSS for ${componentId}:`, error);
  }
};
