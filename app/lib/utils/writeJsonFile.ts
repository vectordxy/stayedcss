import { promises as fs } from "fs";

export async function writeJsonFile(
  filePath: string,
  data: Record<string, any>
): Promise<void> {
  try {
    const jsonContent = JSON.stringify(data, null, 2); // 들여쓰기를 포함해 JSON 포맷 정리
    await fs.writeFile(filePath, jsonContent, "utf-8");
    console.log(`Successfully wrote JSON to file: ${filePath}`);
  } catch (error) {
    console.error(`Failed to write JSON file: ${filePath}`, error);
    throw error;
  }
}
