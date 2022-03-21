import { MysqlMensagemAnexoRepository } from "../../repositories/implementations/MysqlMensagemAnexoRepository";
import { NodeMailerMailProvider } from "../../providers/implementations/NodeMailerMailProvider";
import { MysqlMensagensRepository } from "../../repositories/implementations/MysqlMensagensRepository";
import { CreateTicketMensagemController } from "./CreateMensagemController";
import { CreateTicketMensagemUseCase } from "./CreateMensagemUseCase";

const nodeMailerMailProvider = new NodeMailerMailProvider()
const ticketMensagemRepository = new MysqlMensagensRepository()
const mensagemAnexoRepository = new MysqlMensagemAnexoRepository()
const createTicketMensagemUseCase = new CreateTicketMensagemUseCase(ticketMensagemRepository, mensagemAnexoRepository)
const createTicketMensagemController = new CreateTicketMensagemController(createTicketMensagemUseCase)

export { createTicketMensagemController }