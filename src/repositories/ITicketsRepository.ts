import { Ticket } from "../entities/Ticket";
import { IListTicketDTO } from "../useCases/ListTickets/ListTicketDTO";

export interface ITicketsRepository {
    getTicket(ticketParams: IListTicketDTO): Promise<Ticket[]>
    getStatus(id_ticket: string): Promise<string>
    getTipo(id_ticket: string): Promise<string>
    getSistema(id_ticket: string): Promise<string>
    getAtendente(id_ticket: string): Promise<string>
    create(ticket: Ticket ): Promise<Ticket>
}