import { promises as fs } from "fs";
import path from "path";

export async function readJsonFile(
  filePath: string
): Promise<Record<string, string>> {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    // console.log(`JSON file does not exist. Creating ${filePath}...`);
    return {};
  }
}

export async function writeJsonFile(
  filePath: string,
  data: Record<string, string>
) {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error(`Failed to write JSON file: ${filePath}`, error);
    throw error;
  }
}

export async function ensureFileExistence(filePath: string) {
  const dirname = path.dirname(filePath);
  try {
    await fs.mkdir(dirname, { recursive: true });
  } catch (error) {
    console.error(`Failed to create directory: ${dirname}`, error);
    throw error;
  }
}
