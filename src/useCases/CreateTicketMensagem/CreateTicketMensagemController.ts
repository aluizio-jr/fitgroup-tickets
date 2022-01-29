import { Request, Response } from "express";
import { CreateTicketMensagemUseCase } from "./CreateTicketMensagemUseCase";

export class CreateTicketMensagemController {
    constructor (
        private createTicketMensagemUseCase: CreateTicketMensagemUseCase
    ) {}

    async handle(request: Request, response: Response) {
        const data = request.body 
        const { user, userType } = request 
        const newTicket = await this.createTicketMensagemUseCase.execute({
            ...data,
            
            tipo_usuario: userType,
            id_responsavel: user
        })

        return response.json(newTicket)
    }
}