import { v4 as uuid } from 'uuid'
import { getMySqlDate } from '../utils/date';

export class Ticket {
    public readonly id_ticket: string;
    public readonly data_abertura: string;

    public id_cliente: number;
    public id_ticket_atendente: number;
    public id_ticket_tipo: number;
    public id_sistema: number;
    public id_ticket_status: number;
    public descricao: string;
    public responsavel_cliente: string;
    public data_fechamento: string;
    public data_exclusao: string;

    constructor(props: Omit<Ticket,'id_ticket' | 'data_abertura'>, id_ticket?: string) {
        // this.name = props.name;
        // this.email = props.email;
        Object.assign(this, props);

        if (!id_ticket) {
            this.id_ticket = uuid()
        }
        
        this.data_abertura = getMySqlDate({ hasTime: true });
    }
}