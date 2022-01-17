import { connect } from "../../db";
import { Customer } from "../../entities/Customer";
import { ICustomerRepository } from "../ICustomerRepository";

export class MysqlCustomerRepository implements ICustomerRepository{
    async findById(id: number): Promise<Customer> {
        const db = await connect()
        const [rows] = await db.query (`SELECT * FROM c_clientes WHERE c_clientes.id_cliente = '${id}'`)
        return rows?rows[0] : null;
    
    }

    async getAll(): Promise<Customer[]> {
        const db = await connect()
        const [rows] = await db.query('SELECT * FROM c_clientes')        
        return rows;
    }
}