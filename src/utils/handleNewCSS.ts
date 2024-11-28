import { promises as fs } from "fs";
import { JsonInput } from "../types";

const jsonFilePath = ".stylecache/buffer.json";
const cssFilePath = ".stylecache/style.css";

// 이미 처리된 className 추적
const processedClasses = new Set<string>();

export const writeNewCSS = async (input: JsonInput[]) => {
  try {
    // 기존 데이터 로드
    let existingJson: JsonInput = {};
    try {
      const jsonData = await fs.readFile(jsonFilePath, "utf-8");
      existingJson = JSON.parse(jsonData);
    } catch {
      console.log("No existing JSON file found. Creating a new one.");
    }

    // 새로운 JSON 데이터 생성 (중복제외)
    const jsonResult: JsonInput = { ...existingJson };
    const newCSSContent: string[] = []; // 새로운 CSS만 저장

    for (const item of input) {
      if (existingJson[item.className] !== item.style) {
        jsonResult[item.className] = item.style;

        // 처리되지 않은 className만 추가
        if (!processedClasses.has(item.className)) {
          newCSSContent.push(item.style); // 새로운 CSS 추가
          processedClasses.add(item.className); // 처리된 className 기록
        }
      }
    }

    // JSON 파일 저장
    await fs.writeFile(
      jsonFilePath,
      JSON.stringify(jsonResult, null, 2),
      "utf-8"
    );

    // 새로운 CSS만 파일에 저장
    if (newCSSContent.length > 0) {
      const existingCSS = await fs
        .readFile(cssFilePath, "utf-8")
        .catch(() => "");
      const updatedCSS = [existingCSS, ...newCSSContent]
        .filter(Boolean)
        .join("\n");
      await fs.writeFile(cssFilePath, updatedCSS, "utf-8");
      console.log(`CSS file successfully updated at ${cssFilePath}`);
    } else {
      console.log("No new CSS to process.");
    }
  } catch (error) {
    console.error(`Failed to process CSS: ${error}`);
  }
};
