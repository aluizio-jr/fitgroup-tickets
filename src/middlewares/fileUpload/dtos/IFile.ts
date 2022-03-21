export interface IFile {
  originalname: string;
  encoding: string;
  mimeType: string;
  destination: string;
  filename: string;
  buffer: Buffer;
}
