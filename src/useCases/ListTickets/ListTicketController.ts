import { Request, Response } from "express";
import { ListTicketUseCase } from "./ListTicketsUseCase";

export class ListTicketController {
    constructor (
        private listTicketUseCase: ListTicketUseCase
    ) {}

    async handle(request: Request, response: Response) {
        const id_ticket = request.params.id;

        try {
            const res = await this.listTicketUseCase.execute({ id_ticket })
            return response.json(res)

        } catch(error) {
            console.log(error.message)
            return response.status(400).json(error)
        }
    }
}