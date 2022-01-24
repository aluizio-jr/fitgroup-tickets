import {IUserTypes } from "../../@types/userTypes"

declare namespace Express {
    export interface Request {
        user: number;
        userType: IUserTypes
    }
}