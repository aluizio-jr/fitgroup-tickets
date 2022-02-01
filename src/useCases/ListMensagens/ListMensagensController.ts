import { Request, Response } from "express";
import { ListMensagensUseCase } from "./ListMensagensUseCase";

export class ListMensagensController {
    constructor (
        private listMensagensUseCase: ListMensagensUseCase
    ) {}

    async handle(request: Request, response: Response) {
        const id_ticket = request.params.id_ticket;

        try {
            const res = await this.listMensagensUseCase.execute({ id_ticket: id_ticket })
            return response.json(res)

        } catch(error: any) {
            console.log(error.message)
            return response.status(400).json(error)
        }
    }
}