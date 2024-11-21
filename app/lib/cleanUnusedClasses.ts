import { extractClasses } from "./utils/extractClasses";
import { findUnusedClasses } from "./utils/findUnusedClasses";
import { removeUnusedClasses } from "./utils/removeUnusedClasses";

export async function cleanUnusedClasses(
  srcDir: string,
  jsonFilePath: string,
  cssFilePath: string
) {
  const usedClasses = await extractClasses(srcDir);
  const unusedClasses = await findUnusedClasses(jsonFilePath, usedClasses);

  if (unusedClasses.length > 0) {
    console.log(`Found unused classes: ${unusedClasses.join(", ")}`);
    await removeUnusedClasses(jsonFilePath, cssFilePath, unusedClasses);
  } else {
    console.log(`No unused classes found.`);
  }
}
