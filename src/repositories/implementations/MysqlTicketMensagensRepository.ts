import { connect } from "../../db";
import { TicketMensagens } from "../../entities/TicketMensagens";
import { ITicketMensagensRepository } from "../ITicketMensagensRepository";

export class MysqlTicketMensagensRepository implements ITicketMensagensRepository {

    async getTicketMensagens(id_ticket_mensagem?: string): Promise<TicketMensagens[]> {
        const db = await connect()
        let dbQuery: string

        dbQuery = `SELECT
        m_ticket_mensagens.id_ticket,
        m_ticket_mensagens.id_ticket_mensagem,
        m_ticket_mensagens.id_ticket_atendente,
        m_ticket_mensagens.responsavel_cliente,
        m_ticket_mensagens.data_hora,
        m_ticket_mensagens.mensagem,
        m_ticket_mensagens.interna,
        m_ticket_mensagens.lida
        FROM
        m_ticket_mensagens
        WHERE
        m_ticket_mensagens.id_ticket
        WHERE id_ticket = '${id_ticket_mensagem}'
        `
        const [rows] = await db.query(dbQuery)        
        return rows
    }

    async getAtendente(id_ticket_mensagem: string): Promise<string> {
        const db = await connect()
        const [rows] = await db.query(
        `SELECT
        c_ticket_atendentes.nome
        FROM
        m_ticket_mensagens
        INNER JOIN c_ticket_atendentes ON m_ticket_mensagens.id_ticket_atendente = c_ticket_atendentes.id_ticket_atendente
        WHERE
        m_ticket_mensagens.id_ticket_mensagem = '${id_ticket_mensagem}'
        `)        

        return rows[0]?.nome
    }      
}