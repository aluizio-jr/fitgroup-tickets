import { Request, Response } from "express";
import { ListTicketMensagensUseCase } from "./ListTicketMensagensUseCase";

export class ListTicketMensagensController {
    constructor (
        private listTicketMensagensUseCase: ListTicketMensagensUseCase
    ) {}

    async handle(request: Request, response: Response) {
        const id_ticket_mensagem = request.params.id;

        try {
            const res = await this.listTicketMensagensUseCase.execute({ id_ticket_mensagem })
            return response.json(res)

        } catch(error) {
            console.log(error.message)
            return response.status(400).json(error)
        }
    }
}