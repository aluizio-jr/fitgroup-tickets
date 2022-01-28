import { v4 as uuid } from 'uuid'
import { getMySqlDate } from '../utils/date';

export class TicketMensagens {
    public readonly id_ticket_mensagem: string;

    public id_ticket: string;
    public data_hora: string;
    public id_ticket_atendente: number | null;
    public responsavel_cliente: string | null;
    public interna?: number;
    public mensagem: string;
    public lida?: number;
    public excluida?: number;


    constructor(props: Omit<TicketMensagens,'id_ticket_mensagem' | 'data_hora'>, id_ticket_mensagem?: string) {
        // this.name = props.name;
        // this.email = props.email;
        Object.assign(this, props);

        if (!id_ticket_mensagem) this.id_ticket_mensagem = uuid()
        if (!this.interna) this.interna = 0
        if (!this.lida) this.lida = 0
        if (!this.excluida) this.excluida = 0

        this.data_hora = getMySqlDate({ hasTime: true });
    }
}