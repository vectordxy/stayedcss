import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

type Styles = {
  name?: string;
  style: { [key: string]: string | number };
};

const jsonFilePath = ".stylecache/buffer.json";
const cssFilePath = ".stylecache/style.css";

async function ensureDirectoryExistence(filePath: string) {
  const dirname = path.dirname(filePath);
  try {
    await fs.mkdir(dirname, { recursive: true });
    console.log(`Directory created: ${dirname}`);
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
    console.log(`JSON file does not exist. Creating ${filePath}...`);
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

export function hz(input: Styles) {
  const stylesString = JSON.stringify(input.style);
  const hash = crypto.createHash("md5").update(stylesString).digest("hex");
  const className = `hz-${hash.slice(0, 8)}`;

  let cssString = "";
  for (const key in input.style) {
    if (input.style.hasOwnProperty(key)) {
      const kebabKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
      cssString += `${kebabKey}: ${input.style[key]}; `;
    }
  }
  const cssBlock = `.${className} { ${cssString.trim()} }`;

  (async () => {
    try {
      await ensureDirectoryExistence(jsonFilePath);
      const existingData = await readJsonFile(jsonFilePath);

      if (existingData[className]) {
        console.log(`Style already exists: ${className}`);
        return;
      }

      // Add new style to JSON
      existingData[className] = cssBlock;
      await writeJsonFile(jsonFilePath, existingData);

      // Convert JSON to CSS
      const cssContent = Object.values(existingData).join("\n");
      await fs.writeFile(cssFilePath, cssContent, "utf-8");
      console.log(`Added new style to ${jsonFilePath}: ${className}`);
    } catch (error) {
      console.error(`Failed to process CSS: ${error}`);
    }
  })();

  return className;
}
