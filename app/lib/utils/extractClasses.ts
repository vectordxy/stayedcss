import { promises as fs } from "fs";
import path from "path";

export async function extractClasses(
  srcDir: string,
  visitedDirs = new Set<string>()
): Promise<Set<string>> {
  const usedClasses = new Set<string>();

  // 이미 탐색한 디렉토리 방지
  if (visitedDirs.has(srcDir)) return usedClasses;
  visitedDirs.add(srcDir);

  const files = await fs.readdir(srcDir, { withFileTypes: true });

  for (const file of files) {
    const filePath = path.join(srcDir, file.name);

    if (file.isDirectory()) {
      // 재귀 호출로 하위 디렉토리 탐색
      const nestedClasses = await extractClasses(filePath, visitedDirs);
      nestedClasses.forEach((cls) => usedClasses.add(cls));
    } else if (file.name.endsWith(".jsx") || file.name.endsWith(".tsx")) {
      const content = await fs.readFile(filePath, "utf-8");
      const matches = content.match(/className=["'`]([^"'`]+)["'`]/g);
      if (matches) {
        matches.forEach((match) => {
          const className = match.match(/className=["'`]([^"'`]+)["'`]/)?.[1];
          if (className) usedClasses.add(className);
        });
      }
    }
  }

  return usedClasses;
}
