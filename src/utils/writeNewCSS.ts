import {
  coonvertJsonToCSS,
  ensureFileExistence,
  readJsonFile,
} from "./handleFile";

export const writeNewCSS = async (
  className: string,
  cssBlock: string,
  jsonFilePath: string,
  cssFilePath: string
) => {
  try {
    await ensureFileExistence(jsonFilePath);
    const existingCSS = await readJsonFile(jsonFilePath);

    // 해당 CSS가 이미 존재
    if (existingCSS[className]) {
      if (existingCSS[className] === cssBlock) {
        console.log(`CSS is identical for: ${className}. Skipping update.`);
        return; // 종료
      }
      console.log(`Updating existing CSS for: ${className}`);
      existingCSS[className] = cssBlock;
    } else {
      console.log(`Adding new CSS for: ${className}`);
      existingCSS[className] = cssBlock;
    }

    // JSON 업데이트 및 CSS 파일 변환
    await coonvertJsonToCSS(jsonFilePath, cssFilePath, existingCSS);
  } catch (error) {
    console.error(`Failed to process CSS: ${error}`);
  }
};
