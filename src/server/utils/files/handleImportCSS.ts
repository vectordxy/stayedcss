import { promises as fs } from "fs";
import path from "path";

export const addImportToFile = async (folderName: string) => {
  try {
    // JSON 파일 경로
    const filePath = path.join(process.cwd(), "stayedcss", "style.json");

    // 추가할 @import 문자열
    const importStatement = `@import ./${folderName}/style.css;`;

    // 파일 읽기
    let data = await fs.readFile(filePath, "utf-8");

    // 중복 확인
    if (data.includes(importStatement)) {
      console.log("The @import statement is already present.");
      return;
    }

    // @import 추가
    const updatedData = `${data.trim()}\n${importStatement}`;

    // 파일 쓰기
    await fs.writeFile(filePath, updatedData, "utf-8");
    console.log("@import statement added successfully!");
  } catch (error) {
    console.error("Error:", error);
  }
};
