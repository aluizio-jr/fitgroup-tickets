import { TicketAtendente } from "../entities/TicketAtendente"

export interface ITicketAtendentesRepository {
    findByEmail(email: string): Promise<TicketAtendente>,
    getAll(): Promise<TicketAtendente>

}