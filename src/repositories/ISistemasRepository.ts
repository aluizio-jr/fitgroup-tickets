import { Sistema } from "../entities/Sistemas"

export interface ISistemasRepository {
    getAll(): Promise<Sistema>
}
