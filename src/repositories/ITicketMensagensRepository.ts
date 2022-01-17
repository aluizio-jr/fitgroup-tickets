
import { TicketMensagens } from "../entities/TicketMensagens";

export interface ITicketMensagensRepository {
    getTicketMensagens(id_ticket_mensagem: string): Promise<TicketMensagens[]>
    getAtendente(id_ticket_mensagem: string): Promise<string>
    //save(): Promise<Ticket>
}