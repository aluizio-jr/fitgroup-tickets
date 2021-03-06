import { Request, Response } from "express";
import { ListSistemasUseCase } from "./ListSistemasUseCase";

export class ListSistemasController {
    constructor (
        private listSistemasUseCase: ListSistemasUseCase
    ) {}

    async handle(request: Request, response: Response) {
        try {
            const res = await this.listSistemasUseCase.execute()
            return response.json(res)

        } catch(error: any) {
            console.log(error.message)
            return response.status(400).json(error)
        }
    }
}