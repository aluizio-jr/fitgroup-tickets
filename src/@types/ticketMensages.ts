import { TicketMensagens } from "../entities/Mensagens";
import { IMensagemUser } from "./mensagemUser";

export interface TicketMensagensInfo extends TicketMensagens, IMensagemUser {

}