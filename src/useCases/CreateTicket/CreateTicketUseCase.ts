import { Ticket } from "../../entities/Ticket";
import { IMailProvider } from "../../providers/IMailProvider";
import { ICustomerRepository } from "../../repositories/ICustomerRepository";
import { ITicketsRepository } from "../../repositories/ITicketsRepository";
import { ICreateTicketRequestDTO } from "./CreateTicketDTO";

export class CreateTicketUseCase {
    constructor(
        private ticketRepository: ITicketsRepository,
        private mailProvider: IMailProvider,
        private customerRepository: ICustomerRepository
    ) {}

    async execute(data: ICreateTicketRequestDTO) {
        const customer = await this.customerRepository.findById(data.id_cliente)
        const ticket = new Ticket(data);

        //await this.ticketRepository.save(ticket);

        this.mailProvider.sendMail({
            to: {
                name: customer.nome_fantasia,
                email: customer.email_geral
            },
            from: {
                name: 'Suporte Fitgroup',
                email: 'suporte@fitgroup.com.br'
            },
            subject: 'Essa é uma mensagem de confirmacao',
            body: '<p>Nova interação no seu Ticket</p>'
        })
    }
}