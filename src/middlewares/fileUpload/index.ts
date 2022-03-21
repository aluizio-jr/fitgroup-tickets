import { NextFunction, Request, Response } from "express";
import { Info } from "busboy";

import {
  defineInstance,
  getDestinationPath,
  generateFilename,
  saveFile,
  uploadFtp
} from "./services";
import { IUploadConfig, IFile } from "./dtos";

class FileUpload {
  constructor() { }
  
  public async uploadFTP(file: Express.Multer.File) {
    try {
      if (!file) return;

      await uploadFtp(file);
    } catch (error: any) {
      console.log({ error });;    }
  }

  // public upload(reference: "any" | "fields" | "array" | "single" | "none") {
  //   return async (
  //     request: Request,
  //     _: Response,
  //     next: NextFunction,
  //   ): Promise<void> => {
  //     const manager = defineInstance();

  //     return manager[reference]();
  //     //any
  //     //fields
  //     //array
  //     // single
  //     // none
  //   };
  // }
}

export { FileUpload, IUploadConfig };
