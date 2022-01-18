import { TicketMensagens } from "../../entities/TicketMensagens";
import { IUpdateTicketMensagemRequestDTO } from "./UpdateTicketMensagemDTO";
import { ITicketMensagensRepository } from "../../repositories/ITicketMensagensRepository";

export class UpdateTicketMensagemUseCase {
    constructor(
        private ticketMensagemRepository: ITicketMensagensRepository,
    ) {}

    async execute(data: IUpdateTicketMensagemRequestDTO) {
        
        try {
            if (!data.id_ticket_mensagem) throw new Error('ID da mensagem do ticket obrigatório.')
            if (!data.lida && !data.interna && !data.excluida) throw new Error('Nenhum dado fornecido para atualização da mensagem: Lida, Interna ou Excluída.')

            const ticketMensagem = new TicketMensagens(data);

            const updateTicketMensagem = await this.ticketMensagemRepository.update(ticketMensagem);
            return updateTicketMensagem

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