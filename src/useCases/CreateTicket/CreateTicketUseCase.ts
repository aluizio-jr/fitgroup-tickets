import { Ticket } from "../../entities/Ticket";
import { IMailProvider } from "../../providers/IMailProvider";
import { ICustomerRepository } from "../../repositories/ICustomerRepository";
import { ITicketsRepository } from "../../repositories/ITicketsRepository";
import { ICreateTicketRequestDTO } from "./CreateTicketDTO";
import { TicketSistemaEnum, TicketTiposEnum, TicketStatusEnum } from "../../enums/TicketEnum";

export class CreateTicketUseCase {
    constructor(
        private ticketRepository: ITicketsRepository,
        private mailProvider: IMailProvider,
        private customerRepository: ICustomerRepository,
    ) {}

    async execute(data: ICreateTicketRequestDTO) {
        const{ id_responsavel, tipo_usuario, ...ticketInfo } = data

        try {
            if (tipo_usuario === "fitgroup" && !ticketInfo.id_cliente) throw new Error('Cliente obrigatório.')
            if (tipo_usuario === "cliente" && !ticketInfo.responsavel_cliente)  throw new Error('Informe o nome do responsável pelo ticket.')

            if (tipo_usuario === "fitgroup") {
                if (!ticketInfo.id_cliente) throw new Error('Cliente obrigatório.')
                const customer = await this.customerRepository.findById(ticketInfo.id_cliente)
                if (!customer) throw new Error('Cliente não encontrado.')

            }

            if (tipo_usuario === "cliente") {
                const customer = await this.customerRepository.findById(id_responsavel)
                if (!customer) throw new Error('Cliente não encontrado.')

                if (!ticketInfo.responsavel_cliente)  throw new Error('Informe o nome do responsável pelo ticket.')
                
            }

            if (!ticketInfo.id_ticket_tipo)  throw new Error('ID tipo de ticket obrigatório.')
 
            if (TicketTiposEnum[ticketInfo.id_ticket_tipo] === TicketTiposEnum.SUPORTE && !ticketInfo.id_sistema) throw new Error('Sistema obrigatório para o tipo de ticket Suporte.')
            if (!ticketInfo.descricao) throw new Error('Título do ticket obrigatório.')            
            //if (TicketStatusEnum[String(ticketInfo.id_ticket_status)] === TicketStatusEnum.FECHADO) ticketInfo.ticketInfo_fechamento = getMySqlDate({hasTime: true})
            const idSistema = TicketTiposEnum[ticketInfo.id_ticket_tipo] === TicketTiposEnum.FINANCEIRO ? null : TicketSistemaEnum[ticketInfo.id_sistema]
            
            const ticket = new Ticket({
                ...ticketInfo,
                id_cliente: tipo_usuario === "fitgroup" ? ticketInfo.id_cliente : id_responsavel,
                id_ticket_atendente: tipo_usuario === "fitgroup" ? id_responsavel : null,
                id_ticket_status: TicketStatusEnum.SEM_ATENDENTE,
                id_ticket_tipo: TicketTiposEnum[ticketInfo.id_ticket_tipo],
                id_sistema: idSistema

            });

            const newTicket = await this.ticketRepository.create(ticket);
            return newTicket

            //const customer = await this.customerRepository.findById(ticketInfo.id_cliente)

            // this.mailProvider.sendMail({
            //     to: {
            //         name: customer.nome_fantasia,
            //         email: customer.email_geral
            //     },
            //     from: {
            //         name: 'Suporte Fitgroup',
            //         email: 'suporte@fitgroup.com.br'
            //     },
            //     subject: 'Essa é uma mensagem de confirmacao',
            //     body: '<p>Nova interação no seu Ticket</p>'
            // })

        } catch(error) {
            return {erro: error.message }
        }
    } 
}