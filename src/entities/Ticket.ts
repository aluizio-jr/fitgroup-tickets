import { v4 as uuid } from 'uuid'

export class Ticket {
    public readonly id_ticket: string;

    public id_cliente: number;
    public id_ticket_atendente: number;
    public id_ticket_tipo: number;
    public id_sistema: number;
    public id_ticket_status: number;
    public descricao: string;
    public responsavel_cliente: string;
    public data_abertura: Date;
    public data_fechamento: Date;
    public data_exclusao: Date;

    constructor(props: Omit<Ticket,'id_ticket'>, id_ticket?: string) {
        // this.name = props.name;
        // this.email = props.email;
        Object.assign(this, props);

        if (!this.id_ticket) {
            this.id_ticket = uuid()
        }
    }
}