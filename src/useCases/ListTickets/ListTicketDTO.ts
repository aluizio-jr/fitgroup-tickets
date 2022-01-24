import { TicketStatusEnum } from "../../enums/TicketEnum"
import { TicketTiposEnum } from "../../enums/TicketEnum"
import { TicketSistemaEnum } from "../../enums/TicketEnum"

export interface IListTicketDTO {
    id_ticket?: string,
    id_cliente?: number,
    id_ticket_status?: keyof typeof TicketStatusEnum,
    id_ticket_tipo?: keyof typeof TicketTiposEnum,
    id_sistema?: keyof typeof TicketSistemaEnum,
    id_ticket_atendente?: number,
    responsavel_cliente?: string    
}