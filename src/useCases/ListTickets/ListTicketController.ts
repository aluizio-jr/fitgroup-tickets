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

        const {
            user,
            userType
        } = request

        try {
            const res = await this.listTicketUseCase.execute({
                id_ticket: id_ticket ? String(id_ticket) : '',
                id_cliente: Number(id_cliente),
                id_ticket_status: TicketStatusEnum[Number(id_ticket_status)] as keyof typeof TicketStatusEnum,
                id_ticket_tipo: TicketTiposEnum[Number(id_ticket_tipo)] as keyof typeof TicketTiposEnum,
                id_sistema: TicketSistemaEnum[Number(id_sistema)] as keyof typeof TicketSistemaEnum,
                id_ticket_atendente: Number(id_ticket_atendente),
                responsavel_cliente: responsavel_cliente ? String(responsavel_cliente) : '',
                id_responsavel: user,
                tipo_usuario: userType
            })
            return response.json(res)

        } catch(error: any) {
            console.log(error.message)
            return response.status(400).json(error)
        }
    }
}