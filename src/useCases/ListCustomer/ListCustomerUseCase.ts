import { ICustomerRepository } from "../../repositories/ICustomerRepository";
import { IListCustomerDTO } from "./ListCustomerDTO";

export class ListCustomerUseCase {
    constructor(
        private customerRepository: ICustomerRepository
    ) {}

    async execute({id_cliente}: IListCustomerDTO) {
        try {
            if (id_cliente) {
                const customer = await this.customerRepository.findById(id_cliente)
                return customer
            }

            const customers = await this.customerRepository.getAll()
            return customers

        } catch (error: any) {
            throw error
        }
    }
}