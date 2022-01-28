import { Request, Response } from "express";
import { ListCustomerResponsaveisUseCase } from "./ListCustomerResponsaveisUseCase";

export class ListCustomerResponsaveisController {
    constructor (
        private listCustomerResponsaveisUseCase: ListCustomerResponsaveisUseCase
    ) {}

    async handle(request: Request, response: Response) {
        const id = request.params.id

        try {
            const res = await this.listCustomerResponsaveisUseCase.execute({ id_cliente: Number(id) })
            return response.json(res)

        } catch(error: any) {
            return response.status(400).json(error)
        }
    }
}