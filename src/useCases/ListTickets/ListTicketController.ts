import { Request, Response } from "express";
import { ListTicketUseCase } from "./ListTicketsUseCase";

export class ListTicketController {
    constructor (
        private listTicketUseCase: ListTicketUseCase
    ) {}

    async handle(request: Request, response: Response) {
        const id_ticket = request.params.id;
        //const nomeResponsabel = request.query.nomeResponsavel as string
        
        //const query = request.query
        //query.responsavel

        //const { nomeResponsavel } = request.query as string

        try {
            const res = await this.listTicketUseCase.execute({ id_ticket })
            return response.json(res)

        } catch(error) {
            console.log(error.message)
            return response.status(400).json(error)
        }
    }
}