import { Request, Response } from "express";
import { ListTicketUseCase } from "./ListTicketsUseCase";
import { TicketStatusEnum } from "../../enums/TicketEnum"
import { TicketTiposEnum } from "../../enums/TicketEnum"
import { TicketSistemaEnum } from "../../enums/TicketEnum"

export class ListTicketController {
    constructor (
        private listTicketUseCase: ListTicketUseCase
    ) {}

    async handle(request: Request, response: Response) {
        const {
            id_ticket,
            id_cliente,
            id_ticket_status,
            id_ticket_tipo,
            id_sistema,
            id_ticket_atendente,
            responsavel_cliente
         } = request.query;

        try {
            const res = await this.listTicketUseCase.execute({
                id_ticket: id_ticket ? String(id_ticket) : '',
                id_cliente: Number(id_cliente),
                id_ticket_status: TicketStatusEnum[String(id_ticket_status)],
                id_ticket_tipo: TicketTiposEnum[String(id_ticket_tipo)],
                id_sistema: TicketSistemaEnum[String(id_sistema)],
                id_ticket_atendente: Number(id_ticket_atendente),
                responsavel_cliente: responsavel_cliente ? String(responsavel_cliente) : ''                
            })
            return response.json(res)

        } catch(error) {
            console.log(error.message)
            return response.status(400).json(error)
        }
    }
}