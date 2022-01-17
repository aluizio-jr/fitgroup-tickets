export interface ICreateTicketRequestDTO {
    id_cliente: number;
    id_ticket_atendente: number;
    id_ticket_tipo: number;
    id_sistema: number;
    id_ticket_status: number;
    descricao: string;
    responsavel_cliente: string;
    data_fechamento: string;
    data_exclusao: string;
}