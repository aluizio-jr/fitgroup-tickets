import { Customer } from "../entities/Customer";

export interface ICustomerRepository {
    //findById: (id: number) => Customer
    findById(id_cliente: number): Promise<Customer>
    getAll(): Promise<Customer[]>

}