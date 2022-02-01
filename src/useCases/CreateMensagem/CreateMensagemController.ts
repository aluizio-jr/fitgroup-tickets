import { Request, Response } from "express";
import { CreateTicketMensagemUseCase } from "./CreateMensagemUseCase";

export class CreateTicketMensagemController {
    constructor (
        private createTicketMensagemUseCase: CreateTicketMensagemUseCase
    ) {}

    async handle(request: Request, response: Response) {
        const id_ticket = request.params.id_ticket
        const data = request.body 
        const { user, userType } = request 
        const newTicket = await this.createTicketMensagemUseCase.execute({
            ...data,
            id_ticket: id_ticket,
            tipo_usuario: userType,
            id_responsavel: user
        })

        return response.json(newTicket)
    }
}