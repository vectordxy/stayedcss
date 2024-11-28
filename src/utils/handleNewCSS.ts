import { promises as fs } from "fs";
import { ensureFileExistence, readJsonFile, writeJsonFile } from "./handleFile";

const jsonFilePath = ".stylecache/buffer.json";
const cssFilePath = ".stylecache/style.css";

export const writeNewCSS = async (className: string, cssBlock: string) => {
  try {
    await ensureFileExistence(jsonFilePath);
    const existingCSS = await readJsonFile(jsonFilePath);

    let jsonUpdated = false;

    if (existingCSS[className]) {
      if (existingCSS[className] === cssBlock) {
        return;
      }
      existingCSS[className] = cssBlock;
      jsonUpdated = !jsonUpdated;
    } else {
      existingCSS[className] = cssBlock;
      jsonUpdated = !jsonUpdated;
    }

    if (jsonUpdated) {
      await writeJsonFile(jsonFilePath, existingCSS);
    }

    // if (jsonUpdated) {
    //   const cssContent = Object.values(existingCSS).join("\n");
    //   await fs.writeFile(cssFilePath, cssContent, "utf-8");
    // }
  } catch (error) {
    console.error(`Failed to process CSS: ${error}`);
  }
};
