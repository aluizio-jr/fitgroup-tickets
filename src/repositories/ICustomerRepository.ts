import { Customer } from "../entities/Customer";
import { CustomerResposavel } from "../@types/customer";

export interface ICustomerRepository {
    //findById: (id: number) => Customer
    findById(id_cliente: number): Promise<Customer>
    getAll(): Promise<Customer[]>
    getResponsaveis(id_cliente: number): Promise<CustomerResposavel[]>
}
