import { connect } from "../../db";
import { MensagemAnexo } from "../../entities/MensagemAnexo";
import { IMensagemAnexoRepository } from "../IMensagemAnexoRepository";

export class MysqlMensagemAnexoRepository implements IMensagemAnexoRepository {

    async create(mensagemAnexo: MensagemAnexo): Promise<MensagemAnexo> {
        const db = await connect()
        let dbQuery = `INSERT INTO m_ticket_anexos (
            id_ticket_anexo,
            id_ticket_mensagem,
            arquivo_original,
            arquivo_url
            ) VALUES ( 
            '${mensagemAnexo.id_ticket_anexo}',
            '${mensagemAnexo.id_ticket_mensagem}',
            '${mensagemAnexo.arquivo_original}',
            ${mensagemAnexo.arquivo_url ? `'${mensagemAnexo.arquivo_url}'` : 'NULL'})`
        
        await db.query(dbQuery)        
        return mensagemAnexo
    }

    async getMensagemAnexosById(id_ticket_mensagem: string): Promise<MensagemAnexo[]> {
        const db = await connect()
        let dbQuery: string

        dbQuery = `SELECT
        m_ticket_anexos.id_ticket_anexo,
        m_ticket_anexos.id_ticket_mensagem,
        m_ticket_anexos.arquivo_original,
        m_ticket_anexos.arquivo_url
        FROM
        m_ticket_anexos
        WHERE
        m_ticket_anexos.id_ticket_mensagem = '${id_ticket_mensagem}'
        ORDER BY m_ticket_anexos.arquivo_original`

        const [rows] = await db.query(dbQuery)        
        return rows
    }

}