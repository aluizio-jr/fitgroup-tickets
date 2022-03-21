import jsftp from "jsftp";

import { IOptions } from "./index";

export interface IUploadConfig {
  // destination: string;
  // options: IOptions;
  storage?: () => jsftp;
}
