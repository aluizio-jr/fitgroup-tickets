import { IUserTypes } from "../../@types/userTypes";

export interface IGetUserInfoDTO {
    id: number,
    userType: IUserTypes,
    userName?: string
}