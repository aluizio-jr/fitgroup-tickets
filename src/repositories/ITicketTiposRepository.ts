import { TicketTipo } from "../entities/TicketTipos"

export interface ITicketTipoRepository {
    getAll(): Promise<TicketTipo>
}