import { TicketAtendente } from "../entities/TicketAtendente"

export interface IAtendentesRepository {
    findByEmail(email: string): Promise<TicketAtendente>,
    getAll(): Promise<TicketAtendente>

}