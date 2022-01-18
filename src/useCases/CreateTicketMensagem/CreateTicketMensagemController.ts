import { Request, Response } from "express";
import { ICreateTicketMensagemRequestDTO } from "./CreateTicketMensagemDTO";
import { CreateTicketMensagemUseCase } from "./CreateTicketMensagemUseCase";

export class CreateTicketMensagemController {
    constructor (
        private createTicketMensagemUseCase: CreateTicketMensagemUseCase
    ) {}

    async handle(request: Request, response: Response) {
        const data = request.body as ICreateTicketMensagemRequestDTO
        const newTicket = await this.createTicketMensagemUseCase.execute(data)

        return response.json(newTicket)
    }
}