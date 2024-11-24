import {
  coonvertJsonToCSS,
  ensureFileExistence,
  readJsonFile,
} from "./handleFile";

export const writeNewCSS = async (
  className: string,
  cssBlock,
  jsonFilePath: string,
  cssFilePath: string
) => {
  try {
    await ensureFileExistence(jsonFilePath);
    const existingCSS = await readJsonFile(jsonFilePath);

    // 해당 CSS가 이미 존재하면
    if (existingCSS[className]) {
      // 해당 CSS의 내용이 달라졌다면 (내용이 업데이트 되었다면)
      if (existingCSS[className] !== cssBlock) {
        existingCSS[className] = cssBlock;
        coonvertJsonToCSS(jsonFilePath, cssFilePath, existingCSS);
      } else {
        // 이미 해당 CSS가 존재하고 내용도 같다면 아무것도 하지 않는다
      }
      return;
    } else {
      // 새로운 CSS이라면 추가하기
      existingCSS[className] = cssBlock;
      coonvertJsonToCSS(jsonFilePath, cssFilePath, existingCSS);
    }
  } catch (error) {
    console.error(`Failed to process CSS: ${error}`);
  }
};

const cssPath = ".stylecache/style.css";

export const writeNewKeyframes = async (
  className,
  cssBlock,
  jsonFilePath,
  cssFilePath
) => {
  try {
    await ensureFileExistence(jsonFilePath);
    const existingCSS = await readJsonFile(jsonFilePath);
    console.log(existingCSS);
    if (existingCSS[className]) {
      if (existingCSS[className] !== cssBlock) {
        existingCSS[className] = cssBlock;
        coonvertJsonToCSS(jsonFilePath, cssFilePath, existingCSS);
      } else {
        // 이미 해당 CSS가 존재하고 내용도 같다면 아무것도 하지 않는다
      }
      return;
    } else {
      existingCSS[className] = cssBlock;
      coonvertJsonToCSS(jsonFilePath, cssFilePath, existingCSS);
    }
  } catch (error) {
    console.error(`Failed to update keyframes in ${cssPath}: ${error}`);
  }
};
