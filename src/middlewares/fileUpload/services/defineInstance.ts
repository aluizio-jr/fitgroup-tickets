import multer from "multer";

export function defineInstance(): multer.Multer {
  return multer();
}
