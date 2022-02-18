import { TicketMensagens } from "../../entities/Mensagens";
import { ICreateTicketMensagemRequestDTO } from "./CreateMensagemDTO";
import { ITicketMensagensRepository } from "../../repositories/IMensagensRepository";
import { IMailProvider } from "../../providers/IMailProvider";
import { MensagemAnexo } from "../../entities/MensagemAnexo";
import { IMensagemAnexoRepository } from "../../repositories/IMensagemAnexoRepository";

export class CreateTicketMensagemUseCase {
    constructor(
        private ticketMensagemRepository: ITicketMensagensRepository,
        private mensagemAnexoRepository: IMensagemAnexoRepository,
        private mailProvider: IMailProvider,
    ) {}

    async execute(data: ICreateTicketMensagemRequestDTO) {
        try {
            const{ id_responsavel, tipo_usuario, file, ...mensagemData } = data

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

            if (file) {
                const mensagemAnexo = new MensagemAnexo({
                    id_ticket_mensagem: ticketMensagem.id_ticket_mensagem, 
                    arquivo_nome: file.filename, 
                    arquivo_original: file.originalname
                });

                await this.mensagemAnexoRepository.create(mensagemAnexo);
            }

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