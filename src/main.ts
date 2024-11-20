import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

export async function hz(styles) {
  // 스타일 기반 클래스 네임 생성
  const stylesString = JSON.stringify(styles);
  const hash = crypto.createHash("md5").update(stylesString).digest("hex");
  const className = hash.slice(0, 8);

  // CSS 문법으로 변환
  let cssString = "";
  for (const key in styles) {
    if (styles.hasOwnProperty(key)) {
      const kebabKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
      cssString += `${kebabKey}: ${styles[key]}; `;
    }
  }

  const cssBlock = `.${className} { ${cssString.trim()} }`;
  const filePath = path.join(process.cwd(), "hzDist", "tempStyle.txt");

  try {
    // 디렉토리 생성 (없으면 생성)
    await fs.mkdir(path.dirname(filePath), { recursive: true });

    // 내용 추가
    await fs.appendFile(filePath, `${cssBlock}\n`, "utf-8");
  } catch (error) {
    console.error(`Failed to write CSS to file: ${error}`);
  }

  return className;
}
