import { CustomerResposavel } from "../../@types/customer";
import { connect } from "../../db";
import { Customer } from "../../entities/Customer";
import { ICustomerRepository } from "../ICustomerRepository";

export class MysqlCustomerRepository implements ICustomerRepository {

    async findById(id: number): Promise<Customer> {
        const db = await connect()
        const [rows] = await db.query (
            `SELECT 
            id_cliente,
            nome_fantasia,
            email_geral,
            tel_fixo,
            tel_celular,
            contatos,
            senha 
            FROM c_clientes WHERE c_clientes.id_cliente = '${id}'`
            )
        return rows?rows[0] : null;
    
    }

    async findByEmail(email: string): Promise<Customer> {
        const db = await connect()
        const [rows] = await db.query (
            `SELECT 
            id_cliente,
            email_geral,
            senha 
            FROM c_clientes WHERE c_clientes.email_geral = '${email}'`
            )
        return rows?rows[0] : null;

    }

    async getAll(): Promise<Customer[]> {
        const db = await connect()
        const [rows] = await db.query(
            `SELECT 
            id_cliente,
            nome_fantasia,
            email_geral,
            tel_fixo,
            tel_celular,
            contatos,
            senha 
            FROM c_clientes`
            )        
            
        return rows;
    }

    async getResponsaveis(id: number): Promise<CustomerResposavel[]> {
        const db = await connect()

        let dbQuery = 
            `SELECT DISTINCT responsavel_cliente FROM
            (SELECT
            m_ticket_mensagens.responsavel_cliente
            FROM m_ticket_mensagens
            INNER JOIN m_ticket ON m_ticket.id_ticket = m_ticket_mensagens.id_ticket
            WHERE m_ticket.id_cliente = ${id}
            AND m_ticket.responsavel_cliente IS NOT NULL
            UNION ALL
            SELECT 
            responsavel_cliente
            FROM m_ticket
            WHERE m_ticket.id_cliente = ${id}
            AND m_ticket.responsavel_cliente IS NOT NULL) AS P
            WHERE responsavel_cliente IS NOT NULL`
        
        const [rows] = await db.query(dbQuery)        
            
        return rows;
    }    
}
