import { promises as fs } from "fs";
import path from "path";
import { JsonType } from "../types";

export const readJsonFile = async (filePath: string): Promise<JsonType> => {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    return {};
  }
};

export const writeJsonFile = async (filePath: string, data: JsonType) => {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    throw error;
  }
};

export const ensureFileExistence = async (filePath: string) => {
  const dirname = path.dirname(filePath);
  try {
    await fs.mkdir(dirname, { recursive: true });
  } catch (error) {
    throw error;
  }
};

export const convertJsonToCSS = async (
  jsonFilePath: string,
  cssFilePath: string,
  existingCSS: JsonType
) => {
  try {
    await writeJsonFile(jsonFilePath, existingCSS);
    const cssContent = Object.values(existingCSS).join("\n");
    await fs.writeFile(cssFilePath, cssContent, "utf-8");
  } catch (error) {
    throw error;
  }
};
