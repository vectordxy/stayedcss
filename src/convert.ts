import { promises as fs } from "fs";

export async function convertTxtToCss(txtFilePath, cssFilePath) {
  try {
    const fileContent = await fs.readFile(txtFilePath, "utf-8");
    await fs.writeFile(cssFilePath, fileContent, "utf-8");
  } catch (error) {
    console.error(`Failed to convert file: ${error}`);
  }
}
