import { TicketMensagens } from "../../entities/TicketMensagens";
import { IListTicketMensagensDTO } from "./ListTicketMensagensDTO";
import { ITicketMensagensRepository } from "../../repositories/ITicketMensagensRepository";
import { TicketMensagensInfo } from "../../@types/ticketMensages"


export class ListTicketMensagensUseCase {
    constructor(
        private ticketMensagensRepository: ITicketMensagensRepository, 
    ) {}

    async execute({id_ticket_mensagem}: IListTicketMensagensDTO) {
        try {
            const ticketMensagens = await this.ticketMensagensRepository.getTicketMensagens(id_ticket_mensagem)
            const ticketInfo: TicketMensagensInfo[] = await Promise.all(ticketMensagens.map(async ticket => {
                const atendente = await this.ticketMensagensRepository.getAtendente(ticket.id_ticket_mensagem)

                return {
                    ...ticket, 
                    atendenteNome: atendente                    
                }
            }))
       
        } catch (error) {
            throw error
        }
    }
}