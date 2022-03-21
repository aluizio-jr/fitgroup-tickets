import { TicketMensagens } from "../entities/Mensagens";
import { IMensagemUser } from "./mensagemUser";

export interface TicketMensagensInfo extends Omit<TicketMensagens, "lida" | "interna">, IMensagemUser {
    lida?: boolean,
    interna?: boolean

}