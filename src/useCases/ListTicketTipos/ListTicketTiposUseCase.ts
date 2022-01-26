import { ITicketTipoRepository } from "../../repositories/ITicketTiposRepository";
import { ITicketTiposDTO } from "./ListTicketTiposDTO";

export class ListTicketTiposUseCase {
    constructor(
        private ticketTiposRepository: ITicketTipoRepository
    ) {}

    async execute(): Promise<ITicketTiposDTO> {
        try {
            const sistemas = await this.ticketTiposRepository.getAll()
            return sistemas

        } catch (error) {
            throw error
        }
    }
}