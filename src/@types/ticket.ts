import { Ticket } from "../entities/Ticket";

export interface TicketInfo extends Ticket {
    nomeFantasia: string;
    statusDescricao: string;
    tipoDescricao: string
    sistemaNome: string;
    atendenteNome: string;

}