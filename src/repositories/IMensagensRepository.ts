
import { TicketMensagens } from "../entities/Mensagens";

export interface ITicketMensagensRepository {
    getTicketMensagens(id_ticket: string): Promise<TicketMensagens[]>
    getAtendente(id_ticket_mensagem: string): Promise<string>
    create(ticketMensagem: TicketMensagens): Promise<TicketMensagens>
    update(ticketMensagem: TicketMensagens): Promise<TicketMensagens>
}