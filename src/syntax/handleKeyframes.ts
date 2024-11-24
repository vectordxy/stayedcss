import { isRequiredUnits } from "./checkUnits";
import { promises as fs } from "fs";

export async function generateKeyframesCSS(
  style: any,
  keyframesFilePath: string
) {
  let keyframesString = ""; // 키프레임 내용 저장

  for (const keyframeName in style["@keyframes"]) {
    const keyframe = style["@keyframes"][keyframeName];
    keyframesString += `@keyframes ${keyframeName} { `;
    for (const frameKey in keyframe) {
      keyframesString += `${frameKey} { `;
      const keyframesStyle = keyframe[frameKey];
      for (const frameStyleKey in keyframesStyle) {
        const kebabKey = frameStyleKey.replace(/([A-Z])/g, "-$1").toLowerCase();
        const frameStyleValue = keyframesStyle[frameStyleKey];
        if (typeof frameStyleValue === "number" && isRequiredUnits(kebabKey)) {
          keyframesString += `${kebabKey}: ${frameStyleValue}px; `;
        } else {
          keyframesString += `${kebabKey}: ${frameStyleValue}; `;
        }
      }
      keyframesString += `} `;
    }
    keyframesString += `} `;
  }

  try {
    // 기존 파일 내용과 비교
    let existingContent = "";
    try {
      existingContent = await fs.readFile(keyframesFilePath, "utf-8");
    } catch {
      console.log(`Keyframes file does not exist. Creating a new one.`);
    }

    // 동일한 내용이면 덮어쓰지 않음
    if (existingContent.trim() === keyframesString.trim()) {
      console.log("Keyframes content is unchanged. Skipping write.");
      return;
    }

    // 키프레임을 CSS 파일로 저장
    await fs.writeFile(keyframesFilePath, keyframesString.trim(), "utf-8");
    console.log(`Keyframes written to ${keyframesFilePath}`);
  } catch (error) {
    console.error(`Failed to write keyframes CSS: ${error}`);
  }
}

export async function addKeyframesImportToStyle(
  styleFilePath: string,
  keyframesFileName: string
) {
  try {
    // 파일 내용 읽기
    let existingContent = "";
    try {
      existingContent = await fs.readFile(styleFilePath, "utf-8");
    } catch {
      console.log(`Creating new style file: ${styleFilePath}`);
    }

    // @import 문 추가 (중복 확인)
    const importStatement = `@import "${keyframesFileName}";\n`;
    if (existingContent.includes(importStatement)) {
      console.log(`@import already exists in ${styleFilePath}`);
      return;
    }

    // 최상단에 @import 추가
    const updatedContent = importStatement + existingContent;
    await fs.writeFile(styleFilePath, updatedContent.trim(), "utf-8");
    console.log(`Keyframes import added to ${styleFilePath}`);
  } catch (error) {
    console.error(`Failed to add @import to style.css: ${error}`);
  }
}
