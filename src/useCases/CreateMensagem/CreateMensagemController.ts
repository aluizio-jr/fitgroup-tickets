import { Request, Response } from "express";
import { CreateTicketMensagemUseCase } from "./CreateMensagemUseCase";

export class CreateTicketMensagemController {
    constructor (
        private createTicketMensagemUseCase: CreateTicketMensagemUseCase
    ) {}

    async handle(request: Request, response: Response) {
        const id_ticket = request.params.id_ticket
        const data = request.body 
        const { user, userType, file } = request;
 
        try {
            const newMessage = await this.createTicketMensagemUseCase.execute({
                ...data,
                id_ticket: id_ticket,
                tipo_usuario: userType,
                id_responsavel: user,
                file
            })

            return response.json(newMessage)
            
        } catch(error: any) {
            return response.status(400).json({
                message: error.message
            })
        }
    }
}