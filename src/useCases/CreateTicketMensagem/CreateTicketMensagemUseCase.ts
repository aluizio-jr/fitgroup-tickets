import { TicketMensagens } from "../../entities/TicketMensagens";
import { ICreateTicketMensagemRequestDTO } from "./CreateTicketMensagemDTO";
import { ITicketMensagensRepository } from "../../repositories/ITicketMensagensRepository";
import { IMailProvider } from "../../providers/IMailProvider";

export class CreateTicketMensagemUseCase {
    constructor(
        private ticketMensagemRepository: ITicketMensagensRepository,
        private mailProvider: IMailProvider,
    ) {}

    async execute(data: ICreateTicketMensagemRequestDTO) {
        
        try {
            if (!data.id_ticket) throw new Error('ID do ticket obrigatório.')
            if (!data.responsavel_cliente && !data.id_ticket_atendente) throw new Error('É preciso informar o responsável pela mensagem do Ticket: Responsável cliente ou Atendente Fitgroup.')
            if (data.responsavel_cliente && data.id_ticket_atendente) throw new Error('A mensagem do Ticket deve ter apenas um responsável: Responsável cliente ou Atendente Fitgroup.')
            if (!data.mensagem) throw new Error('Mensagem obrigatória.')

            const ticketMensagem = new TicketMensagens(data);

            const newTicketMensagem = await this.ticketMensagemRepository.create(ticketMensagem);
            return newTicketMensagem

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

        } catch(error: any) {
            return {erro: error.message }
        }
    } 
}