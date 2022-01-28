export interface ICreateTicketMensagemRequestDTO {
    id_ticket: string;
    data_hora?: string;
    id_ticket_atendente: number | null;
    responsavel_cliente: string | null;
    interna?: number;
    mensagem: string;
    lida?: number;
    excluida?: number;
}