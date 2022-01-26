import { ICustomerRepository } from "../../repositories/ICustomerRepository";
import { IListCustomerResponsaveisDTO } from "./ListCustomerResponsaveisDTO";

export class ListCustomerResponsaveisUseCase {
    constructor(
        private customerRepository: ICustomerRepository
    ) {}

    async execute({id_cliente}: IListCustomerResponsaveisDTO) {
        try {
            const customerResponsaveis = await this.customerRepository.getResponsaveis(id_cliente)
            const customerResponsaveisString = customerResponsaveis.map((customerResponsavel)=>customerResponsavel.responsavel_cliente)
            return customerResponsaveisString

        } catch (error) {
            throw error
        }
    }
}