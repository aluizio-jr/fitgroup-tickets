import { NodeMailerMailProvider } from "../../providers/implementations/NodeMailerMailProvider";
import { MysqlMensagensRepository } from "../../repositories/implementations/MysqlMensagensRepository";
import { CreateTicketMensagemController } from "./CreateMensagemController";
import { CreateTicketMensagemUseCase } from "./CreateMensagemUseCase";

const nodeMailerMailProvider = new NodeMailerMailProvider()
const ticketMensagemRepository = new MysqlMensagensRepository()
const createTicketMensagemUseCase = new CreateTicketMensagemUseCase(ticketMensagemRepository, nodeMailerMailProvider)
const createTicketMensagemController = new CreateTicketMensagemController(createTicketMensagemUseCase)

export { createTicketMensagemController }