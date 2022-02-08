import { IAtendentesRepository } from "../../repositories/IAtendentesRepository";
import { IListAtendentesDTO } from "./ListAtendentesDTO";

export class ListAtendentesUseCase {
    constructor(
        private atendentesRepository: IAtendentesRepository
    ) {}

    async execute(): Promise<IListAtendentesDTO> {
        try {
            const atendentes = await this.atendentesRepository.getAll()
            return atendentes

        } catch (error: any) {
            throw error
        }
    }
}