import { v4 as uuid } from 'uuid'

export class TicketMensagens {
    public readonly id_ticket_mensagem: string;

    public id_ticket: string;
    public id_ticket_atendente: number;
    public responsavel_cliente: string;
    public data_hora: number;
    public interna: number;
    public mensagem: string;
    public lida: number;
    public excluida: number;


    constructor(props: Omit<TicketMensagens,'id_ticket_mensagem'>, id_ticket_mensagem?: string) {
        // this.name = props.name;
        // this.email = props.email;
        Object.assign(this, props);

        if (!this.id_ticket_mensagem) {
            this.id_ticket_mensagem = uuid()
        }
    }
}