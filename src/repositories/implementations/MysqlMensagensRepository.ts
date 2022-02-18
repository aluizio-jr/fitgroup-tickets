import { connect } from "../../db";
import { TicketMensagens } from "../../entities/Mensagens";
import { ITicketMensagensRepository } from "../IMensagensRepository";

export class MysqlMensagensRepository implements ITicketMensagensRepository {

    async create(ticketMensagem: TicketMensagens): Promise<TicketMensagens> {
        const db = await connect()
        let dbQuery = `INSERT INTO m_ticket_mensagens (
            id_ticket_mensagem,
            id_ticket,
            data_hora,
            id_ticket_atendente,
            responsavel_cliente,
            interna,
            mensagem,
            lida,
            excluida
            ) VALUES ( 
            '${ticketMensagem.id_ticket_mensagem}',
            '${ticketMensagem.id_ticket}',
            '${ticketMensagem.data_hora}',
            ${ticketMensagem.id_ticket_atendente || null},
            '${ticketMensagem.responsavel_cliente || null}',
            ${ticketMensagem.interna},
            '${ticketMensagem.mensagem}',
            ${ticketMensagem.lida},
            ${ticketMensagem.excluida})`
        
        await db.query(dbQuery)        
        return ticketMensagem
    }

    async update(ticketMensagem: TicketMensagens): Promise<TicketMensagens> {
        const db = await connect()
        let dbQuery = `UPDATE m_ticket_mensagens SET
            interna = ${ticketMensagem.interna},
            lida = ${ticketMensagem.lida},
            excluida =  ${ticketMensagem.excluida}
            WHERE id_ticket_mensagem = '${ticketMensagem.id_ticket_mensagem}')`
        
        await db.query(dbQuery)        
        return ticketMensagem
    }

    async getTicketMensagens(id_ticket?: string): Promise<TicketMensagens[]> {
        const db = await connect()
        let dbQuery: string

        dbQuery = `SELECT
        m_ticket_mensagens.id_ticket,
        m_ticket_mensagens.id_ticket_mensagem,
        m_ticket_mensagens.id_ticket_atendente,
        m_ticket_mensagens.responsavel_cliente,
        DATE_FORMAT(m_ticket_mensagens.data_hora, '%Y-%m-%d %h:%i:%s') AS data_hora,
        m_ticket_mensagens.mensagem,
        m_ticket_mensagens.interna,
        m_ticket_mensagens.lida
        FROM
        m_ticket_mensagens
        WHERE
        m_ticket_mensagens.id_ticket = '${id_ticket}'
        ORDER BY m_ticket_mensagens.data_hora`

        const [rows] = await db.query(dbQuery)        
        return rows
    }

    async getAtendente(id_ticket_mensagem: string): Promise<string> {
        const db = await connect()
        let dbQuery: string
        dbQuery = `SELECT
        c_ticket_atendentes.nome
        FROM
        m_ticket_mensagens
        INNER JOIN c_ticket_atendentes ON m_ticket_mensagens.id_ticket_atendente = c_ticket_atendentes.id_ticket_atendente
        WHERE
        m_ticket_mensagens.id_ticket_mensagem = '${id_ticket_mensagem}'`

        const [rows] = await db.query(dbQuery)        

        return rows[0]?.nome
    }      
}