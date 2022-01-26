import { v4 as uuid } from 'uuid'
import { getMySqlDate } from '../utils/date';

import { TicketStatusEnum } from "../enums/TicketEnum"
import { TicketTiposEnum } from "../enums/TicketEnum"
import { TicketSistemaEnum } from "../enums/TicketEnum"

export class Ticket {
    public readonly id_ticket: string;

    public id_cliente: number;
    public id_descritivo?: string;
    public id_ticket_atendente?: number;
    public id_ticket_tipo: number;
    public id_sistema?: number;
    public id_ticket_status: number;
    public titulo: string;
    public responsavel_cliente?: string;
    public data_abertura: string;
    public data_fechamento?: string;
    public data_exclusao?: string;

    constructor(props: Omit<Ticket,'id_ticket' | 'id_descritivo'>, id_ticket?: string, id_descritivo?: string) {
        // this.name = props.name;
        // this.email = props.email;
        Object.assign(this, props);

        if (!id_ticket) {
            this.id_ticket = uuid()
        }

        if (!id_descritivo) {
            this.id_descritivo = this.responsavel_cliente ? 'CL-' : 'FG-' 
            this.id_descritivo += this.id_ticket.substring(0,3) + '-'
            this.id_descritivo += TicketTiposEnum[this.id_ticket_tipo].substring(0,3)
            if (this.id_sistema) this.id_descritivo += '-' + TicketSistemaEnum[this.id_sistema].substring(0,3)
            this.id_descritivo.toUpperCase()
        }
    }
}