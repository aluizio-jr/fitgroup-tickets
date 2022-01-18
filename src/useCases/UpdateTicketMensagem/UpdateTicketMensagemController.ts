import { Request, Response } from "express";
import { IUpdateTicketMensagemRequestDTO } from "./UpdateTicketMensagemDTO";
import { UpdateTicketMensagemUseCase } from "./UpdateTicketMensagemUseCase";

export class UpdateTicketMensagemController {
    constructor (
        private createTicketMensagemUseCase: UpdateTicketMensagemUseCase
    ) {}

    async handle(request: Request, response: Response) {
        const data = request.body as IUpdateTicketMensagemRequestDTO
        const updateTicket = await this.createTicketMensagemUseCase.execute(data)

        return response.json(updateTicket)
    }
}