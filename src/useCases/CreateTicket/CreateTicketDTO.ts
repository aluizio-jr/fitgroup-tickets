import { TicketStatusEnum } from "../../enums/TicketEnum"
import { TicketTiposEnum } from "../../enums/TicketEnum"
import { TicketSistemaEnum } from "../../enums/TicketEnum"
import { IUserTypes } from "../../@types/userTypes"

export interface ICreateTicketRequestDTO {
    id_cliente?: number;
    id_responsavel: number;
    tipo_usuario: IUserTypes;
    responsavel_cliente?: string;
    id_ticket_tipo: number;
    id_sistema: number | null;
    id_ticket_status: number;
    titulo: string;
    mensagem: string;
}
