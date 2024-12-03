import path from "path";
import { promises as fs } from "fs";

// stayedcss/index.css에  style.css 추가
export const addImportToIndex = async (folderPath: string) => {
  const mainCSSFilePath = path.join(process.cwd(), "stayedcss", "index.css");
  const importStatement = `@import "./${folderPath}/style.css";`;

  try {
    let data = "";
    try {
      data = await fs.readFile(mainCSSFilePath, "utf-8");
    } catch {
      console.log("index.css not found, creating a new one.");
    }

    // @import 최상단
    if (!data.includes(importStatement)) {
      const updatedData = `${importStatement}\n${data.trim()}`.trim();
      await fs.writeFile(mainCSSFilePath, updatedData, "utf-8");
      console.log(`@import statement added to index.css: ${importStatement}`);
    } else {
      console.log("The @import statement is already present in index.css.");
    }
  } catch (error) {
    console.error("Error adding @import to index.css:", error);
  }
};

// 폴더/style.css에 @import 추가
export const addImportToLocalStyle = async (
  folderPath: string,
  importFile: string
) => {
  const localStylePath = path.join(
    process.cwd(),
    "stayedcss",
    folderPath,
    "style.css"
  );
  const importStatement = `@import "./${importFile}";`;

  try {
    let data = "";
    try {
      data = await fs.readFile(localStylePath, "utf-8");
    } catch {
      console.log("style.css not found, creating a new one.");
    }

    // @import 최상단
    if (!data.includes(importStatement)) {
      const updatedData = `${importStatement}\n${data.trim()}`.trim();
      await fs.writeFile(localStylePath, updatedData, "utf-8");
      console.log(
        `@import statement added to ${localStylePath}: ${importStatement}`
      );
    } else {
      console.log(
        `The @import statement is already present in ${localStylePath}.`
      );
    }
  } catch (error) {
    console.error(`Error adding @import to ${localStylePath}:`, error);
  }
};
