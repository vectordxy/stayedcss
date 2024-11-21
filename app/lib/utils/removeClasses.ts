import { promises as fs } from "fs";
import { readJsonFile } from "./readJsonFile";
import { writeJsonFile } from "./writeJsonFile";

export async function removeUnusedClasses(
  jsonFilePath: string,
  cssFilePath: string,
  unusedClasses: string[]
) {
  const jsonContent = await readJsonFile(jsonFilePath);

  unusedClasses.forEach((className) => {
    delete jsonContent[className];
  });

  await writeJsonFile(jsonFilePath, jsonContent);

  const cssContent = Object.values(jsonContent).join("\n");
  await fs.writeFile(cssFilePath, cssContent, "utf-8");
  console.log(`Removed unused classes and updated CSS.`);
}
