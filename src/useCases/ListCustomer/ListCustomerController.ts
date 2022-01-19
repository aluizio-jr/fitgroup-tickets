import { Request, Response } from "express";
import { ListCustomerUseCase } from "./ListCustomerUseCase";

export class ListCustomerController {
    constructor (
        private listCustomerUseCase: ListCustomerUseCase
    ) {}

    async handle(request: Request, response: Response) {
        const id = request.params.id

        try {
            const res = await this.listCustomerUseCase.execute({ id_cliente: Number(id) })
            return response.json(res)

        } catch(error) {
            return response.status(400).json(error)
        }
    }
}