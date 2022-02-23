import { Request, Response } from "express";
import { ListCustomerResponsaveisUseCase } from "./ListCustomerResponsaveisUseCase";

export class ListCustomerResponsaveisController {
    constructor (
        private listCustomerResponsaveisUseCase: ListCustomerResponsaveisUseCase
    ) {}

    async handle(request: Request, response: Response) {
        const { user } = request;

        try {
            const res = await this.listCustomerResponsaveisUseCase.execute({ id_cliente: user })
            return response.json(res)

        } catch(error: any) {
            return response.status(400).json(error)
        }
    }
}