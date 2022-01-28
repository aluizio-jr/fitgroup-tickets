import { ITicketAtendentesRepository } from "../../repositories/ITicketAtendentesRepository";
import { IListAtendentesDTO } from "./ListAtendentesDTO";

export class ListAtendentesUseCase {
    constructor(
        private atendentesRepository: ITicketAtendentesRepository
    ) {}

    async execute(): Promise<IListAtendentesDTO> {
        try {
            const atendentes = await this.atendentesRepository.getAll()
            return atendentes

        } catch (error) {
            throw error
        }
    }
}