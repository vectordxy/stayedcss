import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import { convertTxtToCss } from "./convert";

type Styles = {
  name?: string;
  style: { [key: string]: string | number };
};

const txtFilePath = ".stylecache/buffer.txt";
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

async function readFileContent(filePath: string): Promise<string> {
  try {
    return await fs.readFile(filePath, "utf-8");
  } catch (error) {
    console.log(`File does not exist. Creating ${filePath}...`);
    return "";
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
      await ensureDirectoryExistence(txtFilePath);
      const existingContent = await readFileContent(txtFilePath);

      if (existingContent.includes(cssBlock)) {
        console.log(`Style already exists: ${className}`);
        return;
      }

      await fs.appendFile(txtFilePath, `${cssBlock}\n`, "utf-8");
      await convertTxtToCss(txtFilePath, cssFilePath);
      console.log(`Added new style to ${txtFilePath}: ${className}`);
    } catch (error) {
      console.error(`Failed to process CSS: ${error}`);
    }
  })();

  return className;
}
