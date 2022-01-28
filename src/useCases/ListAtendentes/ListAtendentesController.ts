import { Request, Response } from "express";
import { ListAtendentesUseCase } from "./ListAtendentesUseCase";

export class ListAtendentesController {
    constructor (
        private listAtendentesUseCase: ListAtendentesUseCase
    ) {}

    async handle(request: Request, response: Response) {
        try {
            const res = await this.listAtendentesUseCase.execute()
            return response.json(res)

        } catch(error: any) {
            console.log(error.message)
            return response.status(400).json(error)
        }
    }
}