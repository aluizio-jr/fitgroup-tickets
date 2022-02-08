import { TicketFilter } from "../../@types/ticket";
import { IUserTypes } from "../../@types/userTypes"

export interface IListTicketParams {
    filter: TicketFilter
}

export interface IListTicketDTO extends IListTicketParams{
    id_responsavel: number,
    tipo_usuario: IUserTypes
}