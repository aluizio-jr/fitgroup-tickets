import { Ticket } from "../entities/Ticket";

export interface ITicketsRepository {
    getTicket(id_ticket: string): Promise<Ticket[]>
    getStatus(id_ticket: string): Promise<string>
    getTipo(id_ticket: string): Promise<string>
    getSistema(id_ticket: string): Promise<string>
    getAtendente(id_ticket: string): Promise<string>
    //save(): Promise<Ticket>
}