import { IFile } from "../../@types/file";

// import { IFile } from "../../middlewares/fileUpload/dtos";
import { IUserTypes } from "../../@types/userTypes"

export interface ICreateTicketMensagemRequestDTO {
    id_ticket: string;
    id_responsavel: number;
    tipo_usuario: IUserTypes;
    responsavel_cliente: string | null;
    mensagem: string;
    interna: 0 | 1;
    file?: IFile;
}
