import { promises as fs } from "fs";

export async function readJsonFile(
  filePath: string
): Promise<Record<string, any>> {
  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Failed to read JSON file: ${filePath}`, error);
    return {}; // 파일이 없거나 에러가 발생하면 빈 객체 반환
  }
}
