import fs from "fs";
import path from "path";

type ExtractedComponentId = string[];

export function getFilesRecursively(
  dir: string,
  extensions: string[]
): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  entries.forEach((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getFilesRecursively(fullPath, extensions));
    } else if (extensions.some((ext) => fullPath.endsWith(ext))) {
      files.push(fullPath);
    }
  });

  return files;
}

/**
 * Extracts componentId values from the file content.
 */
export function extractComponentIds(filePath: string): ExtractedComponentId {
  const content = fs.readFileSync(filePath, "utf-8");
  const componentIdRegex =
    /(st|stDark|stClient|stClientDark)\([\s\S]*?componentId:\s*["'`]([^"'`]+)["'`]/g;
  const componentIds: string[] = [];

  let match: RegExpExecArray | null;
  while ((match = componentIdRegex.exec(content)) !== null) {
    componentIds.push(match[2]); // Capture the componentId value
  }

  return componentIds;
}

/**
 * Aggregates all componentId values from files in the specified directory.
 */
export function extractAllComponentIds(
  rootDir: string,
  extensions: string[] = [".jsx", ".tsx"]
): ExtractedComponentId {
  const files = getFilesRecursively(rootDir, extensions);
  const allComponentIds: string[] = [];

  files.forEach((file) => {
    const componentIds = extractComponentIds(file);
    allComponentIds.push(...componentIds);
  });

  return allComponentIds;
}
