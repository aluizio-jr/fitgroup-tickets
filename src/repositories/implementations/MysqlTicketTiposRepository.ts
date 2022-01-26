import { connect } from "../../db";
import { TicketTipo } from "../../entities/TicketTipos"
import { ITicketTipoRepository } from "../ITicketTiposRepository"

export class MysqlTicketTiposRepository implements ITicketTipoRepository {

    async getAll(): Promise<TicketTipo> {
        const db = await connect()
        let dbQuery = `SELECT
            c_ticket_tipos.id_ticket_tipo,
            c_ticket_tipos.descricao
            FROM
            c_ticket_tipos
            ORDER BY c_ticket_tipos.id_ticket_tipo`

        const [rows] = await db.query(dbQuery)        
        return rows
    }  
}
