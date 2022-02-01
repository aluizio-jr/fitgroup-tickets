import { IListMensagensDTO } from "./ListMensagensDTO";
import { ITicketMensagensRepository } from "../../repositories/IMensagensRepository";
import { TicketMensagensInfo } from "../../@types/ticketMensages"


export class ListMensagensUseCase {
    constructor(
        private ticketMensagensRepository: ITicketMensagensRepository, 
    ) {}

    async execute({id_ticket}: IListMensagensDTO) {
        try {
            const ticketMensagens = await this.ticketMensagensRepository.getTicketMensagens(id_ticket)
            const ticketInfo: TicketMensagensInfo[] = await Promise.all(ticketMensagens.map(async ticket => {
                const atendente = await this.ticketMensagensRepository.getAtendente(ticket.id_ticket_mensagem)

                return {
                    ...ticket, 
                    atendenteNome: atendente?atendente:null                   
                }
            }))
       
            return ticketInfo

        } catch (error) {
            throw error
        }
    }
}