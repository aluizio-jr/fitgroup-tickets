import { connect } from "../../db";
import { Sistema } from "../../entities/Sistemas"
import { ISistemasRepository } from "../ISistemasRepository"

export class MysqlSistemasRepository implements ISistemasRepository {

    async getAll(): Promise<Sistema> {
        const db = await connect()
        let dbQuery = `SELECT
            c_sistemas.id_sistema,
            c_sistemas.nome
            FROM
            c_sistemas
            WHERE ticket_exibe = 1
            ORDER BY c_sistemas.id_sistema`

        const [rows] = await db.query(dbQuery)        
        return rows
    }  
}
