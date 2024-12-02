import { promises as fs } from "fs";
import { JsonType } from "../../types";

export const writeCSS = async (input: JsonType[]) => {
  const jsonFilePath = "app/stayedcss/style.json";
  const cssFilePath = "app/stayedcss/style.css";

  try {
    // 기존 JSON 데이터 읽기
    let existingJson: JsonType = {};
    try {
      const jsonData = await fs.readFile(jsonFilePath, "utf-8");
      existingJson = JSON.parse(jsonData);
    } catch {
      // console.log("No existing JSON file found. Creating a new one.");
    }

    // 새로운 JSON 데이터 생성
    const jsonResult: JsonType = { ...existingJson };
    let isUpdated = false; // 변경 여부 플래그

    for (const item of input) {
      if (item.className in existingJson) {
        if (existingJson[item.className] !== item.style) {
          // 내용이 변경되었으면 업데이트
          jsonResult[item.className] = item.style;
          isUpdated = true;
        }
      } else {
        // 새로운 클래스 추가
        jsonResult[item.className] = item.style;
        isUpdated = true;
      }
    }

    // 변경이 없으면 종료
    if (!isUpdated) {
      // console.log("No updates to JSON or CSS files.");
      return; // 추가 작업 불필요
    }

    // JSON 파일 저장
    await fs.writeFile(
      jsonFilePath,
      JSON.stringify(jsonResult, null, 2),
      "utf-8"
    );

    // CSS 파일 생성
    const cssContent = Object.values(jsonResult).join("\n");
    await fs.writeFile(cssFilePath, cssContent, "utf-8");

    // console.log("CSS file updated successfully.");
  } catch (error) {
    console.error(`Failed to process CSS: ${error}`);
  }
};
