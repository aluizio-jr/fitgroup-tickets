import { TicketMensagens } from "../entities/TicketMensagens";

export interface TicketMensagensInfo extends TicketMensagens {
    atendenteNome: string;
}