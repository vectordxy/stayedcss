import fs from "fs";
import path from "path";

const defaultBreakpoints: Record<string, string> = {
  "@mobile": "(max-width: 500px)",
  "@tablet": "(max-width: 800px)",
  "@laptop": "(max-width: 1024px)",
  "@desktop": "(max-width: 1280px)",
};

let cachedBreakpoints: Record<string, string> = defaultBreakpoints;

export const loadBreakpoints = (): Record<string, string> => {
  if (cachedBreakpoints) {
    return cachedBreakpoints; // 캐싱된 값 반환
  }

  const filePath = path.join(process.cwd(), "stayedcss/breakpoints.json");

  try {
    if (!fs.existsSync(filePath)) {
      cachedBreakpoints = defaultBreakpoints;
    } else {
      const fileContent = fs.readFileSync(filePath, "utf-8");

      // 파일 내용이 비어있는 경우 처리
      if (!fileContent.trim()) {
        console.warn(
          "Breakpoints JSON file is empty. Using default breakpoints."
        );
        cachedBreakpoints = defaultBreakpoints;
      } else {
        const parsedContent = JSON.parse(fileContent);

        // JSON 형식 검증
        if (
          typeof parsedContent !== "object" ||
          parsedContent === null ||
          Array.isArray(parsedContent)
        ) {
          throw new Error("Invalid JSON structure. Using default breakpoints.");
        }

        cachedBreakpoints = parsedContent; // 캐싱
      }
    }
  } catch (error) {
    cachedBreakpoints = defaultBreakpoints; // 오류 시 기본값 캐싱
  }

  return cachedBreakpoints;
};
