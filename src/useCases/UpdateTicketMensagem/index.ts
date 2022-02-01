import { MysqlMensagensRepository } from "../../repositories/implementations/MysqlMensagensRepository";
import { UpdateTicketMensagemController } from "./UpdateTicketMensagemController";
import { UpdateTicketMensagemUseCase } from "./UpdateTicketMensagemUseCase";

const ticketMensagemRepository = new MysqlMensagensRepository()
const updateTicketMensagemUseCase = new UpdateTicketMensagemUseCase(ticketMensagemRepository)
const updateTicketMensagemController = new UpdateTicketMensagemController(updateTicketMensagemUseCase)

export { updateTicketMensagemController }