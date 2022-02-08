import { connect } from "../../db";
import { Ticket } from "../../entities/Ticket";
import { IListTicketDTO } from "../../useCases/ListTickets/ListTicketDTO";
import { ITicketsRepository } from "../ITicketsRepository";

export class MysqlTicketRepository implements ITicketsRepository {

    async create(ticket: Ticket): Promise<Ticket> {
        const db = await connect()
        let dbQuery = `INSERT INTO m_ticket (
            m_ticket.id_ticket,
            m_ticket.id_descritivo,
            m_ticket.id_cliente,
            m_ticket.id_ticket_tipo,
            m_ticket.id_sistema,
            m_ticket.id_ticket_atendente,
            m_ticket.id_ticket_status,
            m_ticket.data_abertura,
            m_ticket.titulo,
            m_ticket.responsavel_cliente
            ) VALUES ( 
            '${ticket.id_ticket}',
            '${ticket.id_descritivo}',
            ${ticket.id_cliente},
            ${ticket.id_ticket_tipo},
            ${ticket.id_sistema || null},
            ${ticket.id_ticket_atendente || null},
            ${ticket.id_ticket_status},
            '${ticket.data_abertura}',
            '${ticket.titulo}',
            ${ticket.responsavel_cliente ? `'${ticket.responsavel_cliente}'` :  null})`
        
        await db.query(dbQuery)  
        
        
        return ticket
    }

    async getTicket(ticketParams: IListTicketDTO): Promise<Ticket[]> {
        const db = await connect()

        let dbQuery: string 
        dbQuery = `SELECT
            m_ticket.id_ticket,
            m_ticket.id_descritivo,
            m_ticket.id_cliente,
            m_ticket.id_ticket_tipo,
            m_ticket.id_sistema,
            m_ticket.id_ticket_atendente,
            m_ticket.id_ticket_status,
            m_ticket.data_abertura,
            m_ticket.titulo,
            m_ticket.responsavel_cliente,
            m_ticket.data_fechamento,
            (SELECT
                (CASE 
                    WHEN m_ticket_mensagens.id_ticket_atendente IS NOT NULL THEN 'fitgroup'
                    WHEN m_ticket_mensagens.responsavel_cliente IS NOT NULL THEN 'cliente'
                END) 
                FROM
                m_ticket_mensagens
                WHERE
                m_ticket_mensagens.id_ticket = m_ticket.id_ticket
                ORDER BY
                m_ticket_mensagens.data_hora DESC
                LIMIT 1
            ) AS respondido
            FROM
            m_ticket
            WHERE id_ticket IS NOT NULL
            ${ticketParams.tipo_usuario === "cliente" ? ` AND id_cliente = ${ticketParams.id_responsavel}` : ''}
            ${ticketParams.filter === "ABERTOS" ? ` AND id_ticket_status IN (1,2)` : ''}
            ${ticketParams.filter === "FECHADOS" ? ` AND id_ticket_status = 4` : ''}
            ${ticketParams.filter === "RESPONDIDOS" ? ` AND id_ticket_status IN (1,2) HAVING respondido <> '${ticketParams.tipo_usuario}'` : ''}
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