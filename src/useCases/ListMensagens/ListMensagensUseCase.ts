import { IListMensagensDTO } from "./ListMensagensDTO";
import { ITicketMensagensRepository } from "../../repositories/IMensagensRepository";
import { TicketMensagensInfo } from "../../@types/ticketMensages"
import { IMensagemAnexoRepository } from "../../repositories/IMensagemAnexoRepository"


export class ListMensagensUseCase {
    constructor(
        private ticketMensagensRepository: ITicketMensagensRepository, 
        private mensagemAnexosRepository: IMensagemAnexoRepository,
    ) {}

    async execute({id_ticket}: IListMensagensDTO) {
        try {
            const ticketMensagens = await this.ticketMensagensRepository.getTicketMensagens(id_ticket)
console.log({ticketMensagens});
            
            const ticketInfo: TicketMensagensInfo[] = await Promise.all(ticketMensagens.map(async mensagem => {
                const mensagemUsuario = await this.ticketMensagensRepository.getResponsavel(mensagem.id_ticket_mensagem)
console.log({mensagemUsuario});                
                const mensagemAnexos = await this.mensagemAnexosRepository.getMensagemAnexosById(mensagem.id_ticket_mensagem)
console.log({mensagemAnexos});
                return {
                    ...mensagem, 
                    userType: mensagemUsuario?.userType,
                    userName: mensagemUsuario?.userName,
                    lida: !!mensagem.lida,
                    interna: !!mensagem.interna,
                    mensagemAnexos
                }
            }))
console.log({ticketInfo});

            return ticketInfo

        } catch (error: any) {
            throw error
        }
    }
}