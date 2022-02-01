import { TicketMensagens } from "../entities/Mensagens";

export interface TicketMensagensInfo extends TicketMensagens {
    atendenteNome: string | null;
}