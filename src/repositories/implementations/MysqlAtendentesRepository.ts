import { connect } from "../../db";
import { TicketAtendente } from "../../entities/TicketAtendente";
import { IAtendentesRepository } from "../IAtendentesRepository";

export class MysqlAtendentesRepository implements IAtendentesRepository {

    async findByEmail(email: string): Promise<TicketAtendente> {
        const db = await connect()
        const [rows] = await db.query (
            `SELECT 
            id_ticket_atendente,
            nome,
            email,
            senha 
            FROM c_ticket_atendentes 
            WHERE c_ticket_atendentes.email = '${email}'`
            )
        return rows?rows[0] : null;

    }

    async getAll(): Promise<TicketAtendente> {
        const db = await connect()
        const [rows] = await db.query (
            `SELECT 
            id_ticket_atendente,
            nome,
            email
            FROM c_ticket_atendentes`
            )
        return rows;

    }    
}
