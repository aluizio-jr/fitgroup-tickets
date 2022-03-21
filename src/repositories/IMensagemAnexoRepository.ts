
import { MensagemAnexo } from "../entities/MensagemAnexo";

export interface IMensagemAnexoRepository {
    create(mensagemAnexo: MensagemAnexo): Promise<MensagemAnexo>
    getMensagemAnexosById(id_ticket_mensagem: string): Promise<MensagemAnexo[]>
}