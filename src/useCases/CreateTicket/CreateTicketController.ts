import { Request, Response } from "express";
import { ICreateTicketRequestDTO } from "./CreateTicketDTO";
import { CreateTicketUseCase } from "./CreateTicketUseCase";

export class CreateTicketController {
    constructor (
        private createTicketUseCase: CreateTicketUseCase
    ) {}

    async handle(request: Request, response: Response) {
        const data = request.body as ICreateTicketRequestDTO
        this.createTicketUseCase.execute(data)

        return response.send()
    }
}