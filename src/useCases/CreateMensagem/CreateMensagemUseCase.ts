import { TicketMensagens } from "../../entities/Mensagens";
import { ICreateTicketMensagemRequestDTO } from "./CreateMensagemDTO";
import { ITicketMensagensRepository } from "../../repositories/IMensagensRepository";
import { IMailProvider } from "../../providers/IMailProvider";

export class CreateTicketMensagemUseCase {
    constructor(
        private ticketMensagemRepository: ITicketMensagensRepository,
        private mailProvider: IMailProvider,
    ) {}

    async execute(data: ICreateTicketMensagemRequestDTO) {
        try {
            const{ id_responsavel, tipo_usuario, ...mensagemData } = data

            if (!mensagemData.id_ticket) throw new Error('ID do ticket obrigatório.')
            if (tipo_usuario === "cliente" && !mensagemData.responsavel_cliente) throw new Error('Informe o responsável pela mensagem do Ticket.')
            if (tipo_usuario === "fitgroup" && !id_responsavel) throw new Error('ID do atendente não informado. Possível erro de autenticação')
            if (!mensagemData.mensagem) throw new Error('Mensagem obrigatória.')

            const ticketMensagem = new TicketMensagens({
                ...mensagemData,
                id_ticket_atendente: tipo_usuario === "fitgroup" ? id_responsavel : null,
                responsavel_cliente: tipo_usuario === "cliente" ? mensagemData.responsavel_cliente : null
            });

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