import crypto from "crypto";

export function generateFilename(fileName: string): string {
  const filename = fileName.split(".");
  const ext = filename[filename.length - 1];
  const fileHash = crypto.randomBytes(10).toString("hex");
  return `${fileHash}.${ext}`;
}
