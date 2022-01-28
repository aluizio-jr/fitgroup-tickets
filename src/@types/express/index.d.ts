import {IUserTypes } from "../../@types/userTypes"

declare global {
    namespace Express {
        interface Request {
            user: number;
            userType: IUserTypes
        }
    }
}