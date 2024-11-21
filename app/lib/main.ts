import { promises as fs } from "fs";
import crypto from "crypto";
import { convertTxtToCss } from "./convert";

type Styles = {
  name?: string;
  style: { [key: string]: string | number };
};

const txtFile = "hzDist/tempStyle.txt";
const cssFile = "hzDist/styles.css";

export async function hz(input: Styles) {
  const stylesString = JSON.stringify(input.style);
  const hash = crypto.createHash("md5").update(stylesString).digest("hex");
  const className = `${input.name ? `${input.name}` : "hz"}-${hash.slice(
    0,
    8
  )}`;

  // CSS 문법으로 변환
  let cssString = "";
  for (const key in input.style) {
    if (input.style.hasOwnProperty(key)) {
      const kebabKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
      cssString += `${kebabKey}: ${input.style[key]}; `;
    }
  }
  const cssBlock = `.${className} { ${cssString.trim()} }`;

  try {
    // tempStyle.txt 파일 읽기
    let existingContent = "";
    try {
      existingContent = await fs.readFile(txtFile, "utf-8");
    } catch (error) {
      console.log(`Creating new ${txtFile}...`);
    }

    // 중복 확인
    if (existingContent.includes(cssBlock)) {
      console.log(`Style already exists: ${className}`);
      return className;
    }

    // 새 스타일 추가
    await fs.appendFile(txtFile, `${cssBlock}\n`, "utf-8");
    console.log(`Added new style to ${txtFile}: ${className}`);
  } catch (error) {
    console.error(`Failed to process CSS: ${error}`);
  }

  return className;
}
