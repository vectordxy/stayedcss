import path from "path";
import { promises as fs } from "fs";

export const addImportToIndex = async (folderPath: string) => {
  const mainCSSFilePath = path.join(process.cwd(), "stayedcss", "index.css");
  const importStatement = `@import "./${folderPath}/style.css";`;

  try {
    let data = "";
    try {
      data = await fs.readFile(mainCSSFilePath, "utf-8");
    } catch {
      console.log("index.css not found, creating a new one.");
    }

    // @import 최상단에 추가하고 기존 내용 보존
    if (!data.includes(importStatement)) {
      const updatedData = `${importStatement}\n${data.trim()}`;
      await fs.writeFile(mainCSSFilePath, updatedData, "utf-8");
      console.log(`@import statement added to index.css: ${importStatement}`);
    } else {
      console.log("The @import statement is already present in index.css.");
    }
  } catch (error) {
    console.error("Error adding @import to index.css:", error);
  }
};

export const addImportToDarkMode = async (folderPath: string) => {
  const centralDarkModePath = path.join(
    process.cwd(),
    "stayedcss",
    "darkmode.css"
  );
  const importStatement = `@import "./${folderPath}/darkmode.css";`;

  try {
    let data = "";
    try {
      data = await fs.readFile(centralDarkModePath, "utf-8");
    } catch {
      // 중앙 darkmode.css가 없으면 새로 생성
      await fs.writeFile(centralDarkModePath, "", "utf-8");
    }

    // 중복된 @import 방지
    if (!data.includes(importStatement)) {
      const updatedData = `${importStatement}\n${data.trim()}`.trim();
      await fs.writeFile(centralDarkModePath, updatedData, "utf-8");
      // console.log(`Added import to central darkmode.css: ${importStatement}`);
    }
  } catch (error) {
    console.error("Error adding @import to central darkmode.css:", error);
  }
};

export const ensureDarkModeImportInIndex = async () => {
  const mainCSSFilePath = path.join(process.cwd(), "stayedcss", "index.css");
  const importStatement = `@import "./darkmode.css";`;

  try {
    let data = "";
    try {
      // index.css 파일 읽기
      data = await fs.readFile(mainCSSFilePath, "utf-8");
    } catch {
      // index.css 파일이 없으면 새로 생성
      await fs.writeFile(mainCSSFilePath, "", "utf-8");
      // console.log("index.css created as it was not found.");
    }

    // 다크모드 import 문이 없는 경우 추가
    if (!data.includes(importStatement)) {
      const updatedData = `${importStatement}\n${data.trim()}`.trim();
      await fs.writeFile(mainCSSFilePath, updatedData, "utf-8");
      // console.log(`Added @import for darkmode.css to index.css.`);
    } else {
      // console.log(`@import for darkmode.css already exists in index.css.`);
    }
  } catch (error) {
    console.error(
      "Error ensuring darkmode.css is imported in index.css:",
      error
    );
  }
};
