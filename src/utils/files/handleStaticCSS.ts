import path from "path";
import { promises as fs } from "fs";
import { Json } from "../../types";
import { addImportToDarkMode, addImportToIndex } from "./handleImportCSS";

// 스타일 업데이트 여부 확인 (공백 및 줄바꿈 제거 후 비교)
const isStyleUpdated = async (filePath: string, newContent: string) => {
  try {
    const existingContent = await fs.readFile(filePath, "utf-8");
    // 공백 및 줄바꿈을 제거하고 비교
    return (
      existingContent.trim().replace(/\s+/g, "") !==
      newContent.trim().replace(/\s+/g, "")
    );
  } catch {
    return true; // 파일이 없으면 업데이트 필요
  }
};

// 디렉토리가 존재하지 않으면 생성
const ensureDirectoryExists = async (filePath: string) => {
  const dir = path.dirname(filePath);
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
    console.log(`Directory created: ${dir}`);
  }
};

// 라이트모드
export const writeStaticCSS = async (input: Json[], componentId: string) => {
  const cssFilePath = `style-${componentId}/style.css`;
  const fullFilePath = path.join(process.cwd(), "stayedcss", cssFilePath);

  try {
    // 디렉토리 확인 및 생성
    await ensureDirectoryExists(fullFilePath);

    // 일반 스타일 CSS 생성
    const cssContent = input.map(({ className, style }) => style).join("\n");

    if (await isStyleUpdated(fullFilePath, cssContent)) {
      // 기존 파일과 다를 때만 새 파일 생성
      await fs.writeFile(fullFilePath, cssContent, "utf-8");
      // console.log(`${componentId} CSS updated successfully.`);

      // stayedcss/index.css에 @import 추가
      await addImportToIndex(`style-${componentId}`);
    }
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
  const fullFilePath = path.join(process.cwd(), "stayedcss", cssFilePath);

  try {
    // 디렉토리 확인 및 생성
    await ensureDirectoryExists(fullFilePath);

    // 다크모드 CSS 생성
    const cssContent = input.map(({ className, style }) => style).join("\n");

    // 새 파일로 다크모드 스타일 업데이트
    await fs.writeFile(fullFilePath, cssContent, "utf-8");
    // console.log(`${componentId} Dark Mode CSS updated successfully.`);

    // 같은 폴더의 style.css에 다크모드 import 추가
    await addImportToDarkMode(`style-${componentId}`);
  } catch (error) {
    console.error(`Failed to process Dark Mode CSS for ${componentId}:`, error);
  }
};
