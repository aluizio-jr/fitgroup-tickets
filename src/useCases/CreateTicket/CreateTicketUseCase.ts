import { getMySqlDate } from "../../utils/date"
import { Ticket } from "../../entities/Ticket";
import { IMailProvider } from "../../providers/IMailProvider";
import { ICustomerRepository } from "../../repositories/ICustomerRepository";
import { ITicketsRepository } from "../../repositories/ITicketsRepository";
import { ICreateTicketRequestDTO } from "./CreateTicketDTO";
import { TicketTiposEnum, TicketStatusEnum } from "../../enums/TicketEnum";
import { TicketMensagens } from "../../entities/TicketMensagens"

import { ICreateTicketMensagemRequestDTO } from "../../useCases/CreateTicketMensagem/CreateTicketMensagemDTO"
import { ITicketMensagensRepository } from "../../repositories/ITicketMensagensRepository";

export class CreateTicketUseCase {
    constructor(
        private ticketRepository: ITicketsRepository,
        private mailProvider: IMailProvider,
        private customerRepository: ICustomerRepository,
        private ticketMensagemRepository: ITicketMensagensRepository
    ) {}

    async execute(data: ICreateTicketRequestDTO) {
        const{ id_responsavel, tipo_usuario, ...ticketInfo } = data

        try {
            if (tipo_usuario === "fitgroup") {
                if (!ticketInfo.id_cliente) throw new Error('Cliente obrigatório.')
                const customer = await this.customerRepository.findById(ticketInfo.id_cliente)
                if (!customer) throw new Error('Cliente não encontrado.')
            }

            if (tipo_usuario === "cliente") {
                if (!ticketInfo.responsavel_cliente)  throw new Error('Informe o nome do responsável pelo ticket.')

                const customer = await this.customerRepository.findById(id_responsavel)
                if (!customer) throw new Error('Cliente não encontrado.')
            }

            if (!ticketInfo.id_ticket_tipo)  throw new Error('ID tipo de ticket obrigatório.')
 
            if (ticketInfo.id_ticket_tipo === TicketTiposEnum.SUPORTE && !ticketInfo.id_sistema) throw new Error('Sistema obrigatório para o tipo de ticket Suporte.')
            if (!ticketInfo.titulo) throw new Error('Título do ticket obrigatório.')
            
            const isSuporte = ticketInfo.id_ticket_tipo === TicketTiposEnum.SUPORTE
            const idSistema = isSuporte ? ticketInfo.id_sistema : null

            const ticket = new Ticket({
                ...ticketInfo,
                id_cliente: tipo_usuario === "fitgroup" ? ticketInfo.id_cliente : id_responsavel,
                id_ticket_atendente: tipo_usuario === "fitgroup" ? id_responsavel : null,
                id_ticket_status: TicketStatusEnum.SEM_ATENDENTE,
                id_ticket_tipo: ticketInfo.id_ticket_tipo,
                id_sistema: idSistema,
                data_abertura: getMySqlDate({ hasTime: true })
            });

            const newTicket = await this.ticketRepository.create(ticket);

            const ticketMensagem = new TicketMensagens({
                id_ticket: newTicket.id_ticket,
                mensagem: data.mensagem,
                id_ticket_atendente: newTicket.id_ticket_atendente || null,
                responsavel_cliente: newTicket.responsavel_cliente || null,
            })
            
            const newTicketMensagem = await this.ticketMensagemRepository.create(ticketMensagem)

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

        } catch(error: any) {
            return {erro: error.message }
        }
    } 
}