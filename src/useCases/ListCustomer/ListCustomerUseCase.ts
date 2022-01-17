import { ICustomerRepository } from "../../repositories/ICustomerRepository";
import { IListCustomerDTO } from "./ListCustomerDTO";

export class ListCustomerUseCase {
    constructor(
        private customerRepository: ICustomerRepository
    ) {}

    async execute({id}: IListCustomerDTO) {
        try {
            if (id) {
                const customer = await this.customerRepository.findById(id)
                return customer
            }

            const customers = await this.customerRepository.getAll()
            return customers

        } catch (error) {
            throw error
        }
    }
}