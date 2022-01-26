import { MysqlTicketMensagensRepository } from "../../repositories/implementations/MysqlTicketMensagensRepository";
import { UpdateTicketMensagemController } from "./UpdateTicketMensagemController";
import { UpdateTicketMensagemUseCase } from "./UpdateTicketMensagemUseCase";

const ticketMensagemRepository = new MysqlTicketMensagensRepository()
const updateTicketMensagemUseCase = new UpdateTicketMensagemUseCase(ticketMensagemRepository)
const updateTicketMensagemController = new UpdateTicketMensagemController(updateTicketMensagemUseCase)

export { updateTicketMensagemController }