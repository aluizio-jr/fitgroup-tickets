import { connect } from "../../db";
import { TicketAtendente } from "../../entities/TicketAtendente";
import { ITicketAtendentesRepository } from "../ITicketAtendentesRepository";

export class MysqlTicketAtendentesRepository implements ITicketAtendentesRepository {

    async findByEmail(email: string): Promise<TicketAtendente> {
        const db = await connect()
        const [rows] = await db.query (
            `SELECT 
            id_ticket_atendente,
            email,
            senha 
            FROM c_ticket_atendentes 
            WHERE c_ticket_atendentes.email = '${email}'`
            )
        return rows?rows[0] : null;

    }
}
