import { ISistemasRepository } from "../../repositories/ISistemasRepository";
import { IListSistemasDTO } from "./ListSistemasDTO";

export class ListSistemasUseCase {
    constructor(
        private sistemasRepository: ISistemasRepository
    ) {}

    async execute(): Promise<IListSistemasDTO> {
        try {
            const sistemas = await this.sistemasRepository.getAll()
            return sistemas

        } catch (error: any) {
            throw error
        }
    }
}