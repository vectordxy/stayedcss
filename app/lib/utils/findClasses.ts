import { readJsonFile } from "./readJsonFile";

export async function findUnusedClasses(
  jsonFilePath: string,
  usedClasses: Set<string>
) {
  const jsonContent = await readJsonFile(jsonFilePath);
  const unusedClasses = Object.keys(jsonContent).filter(
    (className) => !usedClasses.has(className)
  );
  return unusedClasses;
}
