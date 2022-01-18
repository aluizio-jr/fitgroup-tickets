import { Ticket } from "../../entities/Ticket";
import { IMailProvider } from "../../providers/IMailProvider";
import { ICustomerRepository } from "../../repositories/ICustomerRepository";
import { ITicketsRepository } from "../../repositories/ITicketsRepository";
import { ICreateTicketRequestDTO } from "./CreateTicketDTO";
import { TicketTiposEnum } from "../../enums/TicketEnum";
import { TicketStatusEnum } from "../../enums/TicketEnum";
import { getMySqlDate } from '../../utils/date';

export class CreateTicketUseCase {
    constructor(
        private ticketRepository: ITicketsRepository,
        private mailProvider: IMailProvider,
        private customerRepository: ICustomerRepository,
    ) {}

    async execute(data: ICreateTicketRequestDTO) {
        
        try {
            if (!data.id_cliente) throw new Error('ID cliente obrigatório.')

            const customer = await this.customerRepository.findById(data.id_cliente)
            if (!customer) throw new Error('Cliente não encontrado.')

            if (!data.responsavel_cliente && !data.id_ticket_atendente) throw new Error('É preciso informar o responsável pela abertura do Ticket: Responsável cliente ou Atendente Fitgroup.')
            if (!data.id_ticket_tipo)  throw new Error('ID tipo de ticket obrigatório.')
            if (!data.descricao) throw new Error('Título do ticket obrigatório.')
            if (data.id_ticket_tipo === TicketTiposEnum.Suporte && !data.id_sistema) throw new Error('Sistema obrigatório para o tipo de ticket Suporte.')
            if (data.id_ticket_status === TicketStatusEnum.Fechado) data.data_fechamento = getMySqlDate({hasTime: true})

            const ticket = new Ticket(data);

            const newTicket = await this.ticketRepository.create(ticket);
            return newTicket

            //const customer = await this.customerRepository.findById(data.id_cliente)

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