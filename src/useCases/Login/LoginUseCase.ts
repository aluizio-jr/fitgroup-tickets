import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { UserTypeEnum } from "../../enums/UserTypeEnum";
import { ICustomerRepository } from "../../repositories/ICustomerRepository"
import { IAtendentesRepository } from "../../repositories/IAtendentesRepository"
import { ILogingDTO } from "./LoginDTO";

export class LoginUseCase {
    constructor (
        private customerRepository: ICustomerRepository,
        private ticketAtendentesRepository: IAtendentesRepository
    ) {}

    async execute (loginDtO: ILogingDTO) {

        const customer = await this.customerRepository.findByEmail(loginDtO.email)
        
        if (customer) {
            const isValidPwd = await bcrypt.compare(loginDtO.senha, customer.senha)
            
            if (!isValidPwd) throw new Error("Senha inválida!")
            
            const token = jwt.sign({
                id: customer.id_cliente,
                userType: UserTypeEnum.CLIENTE
            }, String(process.env.JWT_SECRET))

            return {
                "usuarioTipo": "cliente",
                "usuarioNome": customer.nome_fantasia,
                "token": token
            }

        }

        const ticketAtendentes = await this.ticketAtendentesRepository.findByEmail(loginDtO.email)
        
        if (ticketAtendentes) {
            const isValidPwd = await bcrypt.compare(loginDtO.senha, ticketAtendentes.senha)
            if (!isValidPwd)  throw new Error("Senha inválida!")

            const token = jwt.sign({
                id: ticketAtendentes.id_ticket_atendente,
                userType: UserTypeEnum.FITGROUP
            }, String(process.env.JWT_SECRET))

            return {
                "usuarioTipo": "fitgroup",
                "usuarioNome": ticketAtendentes.nome,
                "token": token
            }
        }

        throw new Error("Usuário não encontrado.")
    }

}    
