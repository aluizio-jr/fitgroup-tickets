import { connect } from "../../db";
import { Ticket } from "../../entities/Ticket";
import { ITicketsRepository } from "../ITicketsRepository";

export class MysqlTicketRepository implements ITicketsRepository {

    async getTicket(id_ticket?: string): Promise<Ticket[]> {
        const db = await connect()
        let dbQuery: string

        dbQuery = `SELECT
        m_ticket.id_ticket,
        m_ticket.id_cliente,
        m_ticket.id_ticket_tipo,
        m_ticket.id_sistema,
        m_ticket.id_ticket_atendente,
        m_ticket.id_ticket_status,
        m_ticket.data_abertura,
        m_ticket.descricao,
        m_ticket.responsavel_cliente,
        m_ticket.data_fechamento
        FROM
        m_ticket
        ${id_ticket ? ` WHERE id_ticket = '${id_ticket}'` : ''}
        `
        const [rows] = await db.query(dbQuery)        
        return rows
    }

    async getStatus(id_ticket: string): Promise<string> {
        const db = await connect()
        const [rows] = await db.query(
        `SELECT
        c_ticket_status.descricao
        FROM
        m_ticket
        INNER JOIN c_ticket_status ON m_ticket.id_ticket_status = c_ticket_status.id_ticket_status
        WHERE id_ticket = '${id_ticket}'
        `)        

        return rows[0]?.descricao
    }    

    async getTipo(id_ticket: string): Promise<string> {
        const db = await connect()
        const [rows] = await db.query(
        `SELECT
        c_ticket_tipos.descricao
        FROM
        m_ticket
        INNER JOIN c_ticket_tipos ON m_ticket.id_ticket_tipo = c_ticket_tipos.id_ticket_tipo
        WHERE id_ticket = '${id_ticket}'
        `)        

        return rows[0]?.descricao
    }      

    async getSistema(id_ticket: string): Promise<string> {
        const db = await connect()
        const [rows] = await db.query(
        `SELECT
        c_sistemas.nome
        FROM
        m_ticket
        INNER JOIN c_sistemas ON m_ticket.id_sistema = c_sistemas.id_sistema
        WHERE id_ticket = '${id_ticket}'
        `)        

        return rows[0]?.nome
    }  

    async getAtendente(id_ticket: string): Promise<string> {
        const db = await connect()
        const [rows] = await db.query(
        `SELECT
        c_ticket_atendentes.nome
        FROM
        m_ticket
        INNER JOIN c_ticket_atendentes ON m_ticket.id_ticket_atendente = c_ticket_atendentes.id_ticket_atendente
        WHERE id_ticket = '${id_ticket}'
        `)        

        return rows[0]?.nome
    }  
}