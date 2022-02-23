
import { IMensagemUser } from "../@types/mensagemUser";
import { TicketMensagens } from "../entities/Mensagens";

export interface ITicketMensagensRepository {
    getTicketMensagens(id_ticket: string): Promise<TicketMensagens[]>
    getResponsavel(id_ticket_mensagem: string): Promise<IMensagemUser>
    create(ticketMensagem: TicketMensagens): Promise<TicketMensagens>
    update(ticketMensagem: TicketMensagens): Promise<TicketMensagens>
}