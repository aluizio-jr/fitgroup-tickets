
import { MensagemAnexo } from "../entities/MensagemAnexo";

export interface IMensagemAnexoRepository {
    create(mensagemAnexo: MensagemAnexo): Promise<MensagemAnexo>
}