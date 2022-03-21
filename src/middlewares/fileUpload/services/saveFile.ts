import { NextFunction, Request } from "express";
import fs from "fs";
import { IFile } from "../dtos";

export function saveFile(
  request: Request,
  next: NextFunction,
  file: any,
  data: Express.Multer.File,
): void {
  return file
    .pipe(fs.createWriteStream(data.destination))
    .on("finish", async () => {
      request.file = data;
      next();
    });
}
