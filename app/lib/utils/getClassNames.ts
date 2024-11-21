import * as fs from "fs";
import path from "path";

export async function getClassNames(srcDir: string, outputFilePath: string) {
  const rootDir = process.cwd();
  const dirPath = path.join(rootDir, "app/test");

  traverseDirectory(dirPath);
}

function traverseDirectory(currentDir: string) {
  const files = fs.readdirSync(currentDir);

  files.forEach((file) => {
    const filePath = path.join(currentDir, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      traverseDirectory(filePath);
    } else if (
      stats.isFile() &&
      (file.endsWith(".tsx") || file.endsWith(".jsx"))
    ) {
      console.log(file);
    }
  });
}
