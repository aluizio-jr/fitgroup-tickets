import { Ticket } from "../../entities/Ticket";
import { IListTicketDTO } from "./ListTicketDTO";
import { ITicketsRepository } from "../../repositories/ITicketsRepository";
import { TicketInfo } from "../../@types/ticket"
import { ICustomerRepository } from "../../repositories/ICustomerRepository";


export class ListTicketUseCase {
    constructor(
        private customerRepository: ICustomerRepository, 
        private ticketRepository: ITicketsRepository, 

    ) {}

    async execute(ticketParams: IListTicketDTO) { 
        const{ id_responsavel, tipo_usuario, ...ticketFilters } = ticketParams

        try {
            const idCliente = tipo_usuario === "cliente" ? id_responsavel : ticketFilters.id_cliente
            
            const tickets = await this.ticketRepository.getTicket({
                ...ticketFilters,
                id_cliente: idCliente
            })

            const ticketInfo: TicketInfo[] = await Promise.all(tickets.map(async ticket => {
                const customer = await this.customerRepository.findById(ticket.id_cliente)
                const status = await this.ticketRepository.getStatus(ticket.id_ticket)
                const tipo = await this.ticketRepository.getTipo(ticket.id_ticket)
                const sistema = await this.ticketRepository.getSistema(ticket.id_ticket)
                const atendente = await this.ticketRepository.getAtendente(ticket.id_ticket)

                return {
                    ...ticket, 
                    statusDescricao:status, 
                    tipoDescricao: tipo,
                    nomeFantasia: customer.nome_fantasia,
                    sistemaNome: sistema,
                    atendenteNome: atendente                    
                }
            }))

            return ticketInfo

        } catch (error) {
            return {erro: error.message }
        }
    }
}