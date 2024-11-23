import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import { StyleType } from "../types";

const jsonFilePath = ".stylecache/buffer.json";
const cssFilePath = ".stylecache/style.css";

export function updateClassnameAndCSS(input: StyleType, stylePath: string) {
  const hash = crypto.createHash("md5").update(stylePath).digest("hex");
  const className = `hz-${hash.slice(0, 8)}`;

  let cssString = "";
  for (const key in input) {
    if (input.hasOwnProperty(key)) {
      const kebabKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
      const style = input[key];
      if (typeof style === "string") {
        if (style.length !== 0) cssString += `${kebabKey}: ${input[key]}; `;
      } else {
        cssString += `${kebabKey}: ${input[key]}; `;
      }
    }
  }
  const cssBlock = `.${className} { ${cssString.trim()} }`;

  (async () => {
    try {
      await ensureDirectoryExistence(jsonFilePath);

      const existingData = await readJsonFile(jsonFilePath);

      if (existingData[className]) {
        // 기존 CSS 업데이트
        if (existingData[className] !== cssBlock) {
          // console.log(`Updating existing style for: ${className}`);
          existingData[className] = cssBlock;
          await writeJsonFile(jsonFilePath, existingData);

          const cssContent = Object.values(existingData).join("\n");
          await fs.writeFile(cssFilePath, cssContent, "utf-8");
          // console.log(`Updated style in ${cssFilePath}: ${className}`);
        } else {
          // console.log(`Style already exists and is unchanged: ${className}`);
        }
        return;
      }

      // 새로운 CSS 추가
      // console.log(`Adding new style: ${className}`);
      existingData[className] = cssBlock;
      await writeJsonFile(jsonFilePath, existingData);

      const cssContent = Object.values(existingData).join("\n");
      await fs.writeFile(cssFilePath, cssContent, "utf-8");
      // console.log(`Added new style to ${cssFilePath}: ${className}`);
    } catch (error) {
      console.error(`Failed to process CSS: ${error}`);
    }
  })();

  return className;
}

async function ensureDirectoryExistence(filePath: string) {
  const dirname = path.dirname(filePath);
  try {
    await fs.mkdir(dirname, { recursive: true });
    // console.log(`Directory created: ${dirname}`);
  } catch (error) {
    console.error(`Failed to create directory: ${dirname}`, error);
    throw error;
  }
}

async function readJsonFile(filePath: string): Promise<Record<string, string>> {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    // console.log(`JSON file does not exist. Creating ${filePath}...`);
    return {};
  }
}

async function writeJsonFile(filePath: string, data: Record<string, string>) {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error(`Failed to write JSON file: ${filePath}`, error);
    throw error;
  }
}

async function restartBufferJson() {
  try {
    await fs.unlink(jsonFilePath);
    console.log(`Deleted existing buffer.json.`);
  } catch (error) {
    console.error(`Failed to delete buffer.json: ${error}`);
  }

  try {
    await writeJsonFile(jsonFilePath, {});
    console.log(`Initialized buffer.json.`);
  } catch (error) {
    console.error(`Failed to initialize buffer.json: ${error}`);
  }
}
