import { Request, Response } from "express";
import { ListTicketUseCase } from "./ListTicketsUseCase";
import { TicketFilter } from "../../@types/ticket";

export class ListTicketController {
  constructor(private listTicketUseCase: ListTicketUseCase) {}

  async handle(request: Request, response: Response) {
    const { filter } = request.params;
    const { user, userType } = request;

    try {
      const res = await this.listTicketUseCase.execute({
        id_responsavel: user,
        tipo_usuario: userType,
        filter: filter.toUpperCase() as TicketFilter
      });
      
      return response.json(res);

    } catch (error: any) {
      console.log(error.message);
      return response.status(400).json(error);
    }
  }
}
