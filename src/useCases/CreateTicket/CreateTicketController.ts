import { Request, Response } from "express";
import { CreateTicketUseCase } from "./CreateTicketUseCase";
import { getMySqlDate } from "../../utils/date"

export class CreateTicketController {
    constructor (
        private createTicketUseCase: CreateTicketUseCase
    ) {}

    async handle(request: Request, response: Response) {
        const { user, userType } = request
        const {
            id_cliente,
            responsavel_cliente,
            id_ticket_tipo,
            id_sistema,
            id_ticket_status,
            descricao,
            data_abertura
        } = request.body 

        const newTicket = await this.createTicketUseCase.execute({
            id_cliente,
            responsavel_cliente,
            id_ticket_tipo,
            id_sistema,
            id_ticket_status,
            descricao,
            id_responsavel: user,
            tipo_usuario: userType,
            data_abertura:  getMySqlDate({ hasTime: true })

        })

        return response.json(newTicket)
    }
}