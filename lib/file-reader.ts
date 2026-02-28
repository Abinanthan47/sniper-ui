import fs from "fs";
import path from "path";

/**
 * Reads the source code of a registry component file.
 * This runs server-side only (in Server Components / generateStaticParams).
 */
export function readComponentSource(fileName: string): string {
  const filePath = path.join(process.cwd(), "registry", "components", fileName);

  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch {
    return `// Source code not found: ${fileName}`;
  }
}
