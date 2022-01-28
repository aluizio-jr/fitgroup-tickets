import { Request, Response } from "express";
import { LoginUseCase } from "./LoginUseCase";

export class LoginController {
    constructor (
        private loginUseCase: LoginUseCase
    ) {}

    async handle(request: Request, response: Response) {

        const data = request.body
        try {

            const res = await this.loginUseCase.execute(data)
            return response.json(res)

        } catch(error: any) {
            console.log(error.message)
            return response.status(400).json(error)
        }
    }
}