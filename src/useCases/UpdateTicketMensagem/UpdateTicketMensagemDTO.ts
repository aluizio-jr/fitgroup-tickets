export interface IUpdateTicketMensagemRequestDTO {
    id_ticket_mensagem: string;
    id_ticket: string;
    data_hora: string;
    id_ticket_atendente: number;
    responsavel_cliente: string;
    interna?: number;
    mensagem: string;
    lida?: number;
    excluida?: number;
}