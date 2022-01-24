import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { UserTypeEnum } from "../../enums/UserTypeEnum";
import { ICustomerRepository } from "../../repositories/ICustomerRepository"
import { ITicketAtendentesRepository } from "../../repositories/ITicketAtendentesRepository"
import { ILogingDTO } from "./LoginDTO";

export class LoginUseCase {
    constructor (
        private customerRepository: ICustomerRepository,
        private ticketAtendentesRepository: ITicketAtendentesRepository
    ) {}

    async execute (loginDtO: ILogingDTO) {

        const customer = await this.customerRepository.findByEmail(loginDtO.email)
        
        if (customer) {
            const isValidPwd = await bcrypt.compare(loginDtO.senha, customer.senha)
            
            if (isValidPwd) {
                const token = jwt.sign({
                    id: customer.id_cliente,
                    userType: UserTypeEnum.CLIENTE
                }, process.env.JWT_SECRET)

                return token

            } else {
                return {
                    "error": "Login falhou.",
                    "description": "Senha inválida!"
                }
            }
        }

        const ticketAtendentes = await this.ticketAtendentesRepository.findByEmail(loginDtO.email)
        
        if (ticketAtendentes) {
            const isValidPwd = await bcrypt.compare(loginDtO.senha, ticketAtendentes.senha)
            if (isValidPwd) {
                const token = jwt.sign({
                    id: ticketAtendentes.id_ticket_atendente,
                    userType: UserTypeEnum.FITGROUP
                }, process.env.JWT_SECRET)

                return token
            
            } else {
                return {
                    "error": "Login falhou",
                    "description": "Senha inválida!"
                }
            }
        }
        
        return {
            "error": "Login falhou",
            "description": "Usuário não encontrado."
        }

    }

}    
