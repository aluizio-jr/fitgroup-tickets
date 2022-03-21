import {IUserTypes } from "../../@types/userTypes"
import { IFile } from "../file"

declare global {
    namespace Express {
        interface Request {
            user: number;
            userType: IUserTypes,
            file?: IFile
        }
    }
}