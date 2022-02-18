import { v4 as uuid } from 'uuid'

export class MensagemAnexo {
    public readonly id_ticket_anexo: string;

    public arquivo_nome: string;
    public arquivo_original: string;
    public id_ticket_mensagem: string;

    constructor(props: Omit<MensagemAnexo,'id_ticket_anexo'>, id_ticket_anexo?: string) {
        Object.assign(this, props);

        if (!id_ticket_anexo) this.id_ticket_anexo = uuid()
    }
}