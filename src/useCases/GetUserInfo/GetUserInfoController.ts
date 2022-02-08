import { Request, Response } from "express";
import { GetUserInfoUseCase } from "./GetUserInfoUseCase";

export class GetUserInfoController {
    constructor (
        private getUserInfoUseCase: GetUserInfoUseCase
    ) {}

    async handle(request: Request, response: Response) {
        const { user, userType} = request

        try {
            const res = await this.getUserInfoUseCase.execute({ id: Number(user), userType })
            return response.json(res)

        } catch(error: any) {
            return response.status(400).json(error)
        }
    }
}