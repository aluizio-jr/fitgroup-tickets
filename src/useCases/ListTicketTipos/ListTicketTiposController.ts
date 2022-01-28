import { Request, Response } from "express";
import { ListTicketTiposUseCase } from "./ListTicketTiposUseCase";

export class ListTicketTiposController {
    constructor (
        private listTicketTiposUseCase: ListTicketTiposUseCase
    ) {}

    async handle(request: Request, response: Response) {
        try {
            const res = await this.listTicketTiposUseCase.execute()
            return response.json(res)

        } catch(error: any) {
            console.log(error.message)
            return response.status(400).json(error)
        }
    }
}