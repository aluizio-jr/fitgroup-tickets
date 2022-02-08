import { IAtendentesRepository } from "../../repositories/IAtendentesRepository"
import { ICustomerRepository } from "../../repositories/ICustomerRepository";
import { IGetUserInfoDTO } from "./GetUserInfoDTO"

export class GetUserInfoUseCase {
    constructor(
        private customerRepository: ICustomerRepository, 
        private atentendeRepository: IAtendentesRepository, 
    ) {}

    async execute({id, userType }: IGetUserInfoDTO) { 
        try {
            if (userType === "cliente") {
                const customer = await this.customerRepository.findById(id)
                return {
                    nome: customer.nome_fantasia,
                    tipo: userType
                }
            }

            if (userType === "fitgroup") {
                const atendente = await this.atentendeRepository.findById(id)
                return {
                    name: atendente.nome,
                    type: userType
                }
            }

            throw new Error('Tipo de usuario desconhecido.')

        } catch (error: any) {
            return {erro: error.message }
        }
    }
}