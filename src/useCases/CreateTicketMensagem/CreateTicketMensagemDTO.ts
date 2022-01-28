import { IUserTypes } from "../../@types/userTypes"

export interface ICreateTicketMensagemRequestDTO {
    id_ticket: string;
    data_hora?: string;
    id_responsavel: number;
    tipo_usuario: IUserTypes;
    responsavel_cliente: string | null;
    interna?: number;
    mensagem: string;
    lida?: number;
    excluida?: number;
}