import { connect } from "../../db";
import { MensagemAnexo } from "../../entities/MensagemAnexo";
import { IMensagemAnexoRepository } from "../IMensagemAnexoRepository";

export class MysqlMensagemAnexoRepository implements IMensagemAnexoRepository {

    async create(mensagemAnexo: MensagemAnexo): Promise<MensagemAnexo> {
        const db = await connect()
        let dbQuery = `INSERT INTO m_ticket_anexos (
            id_ticket_anexo,
            id_ticket_mensagem,
            arquivo_nome,
            arquivo_original
            ) VALUES ( 
            '${mensagemAnexo.id_ticket_anexo}',
            '${mensagemAnexo.id_ticket_mensagem}',
            '${mensagemAnexo.arquivo_nome}',
            '${mensagemAnexo.arquivo_original}')`
        
        await db.query(dbQuery)        
        return mensagemAnexo
    }
}