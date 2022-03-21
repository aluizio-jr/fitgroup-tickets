import path from "path";

export function getDestinationPath(tmpFolder: string, filename: string): string {
  return path.join(tmpFolder, filename);
}