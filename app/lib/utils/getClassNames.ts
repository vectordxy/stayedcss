import * as fs from "fs";
import path from "path";

export async function getClassNames(sourceDir: string) {
  const rootDir = process.cwd();
  const dirPath = path.join(rootDir, sourceDir);

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
