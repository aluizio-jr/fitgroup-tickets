import { NodeMailerMailProvider } from "../../providers/implementations/NodeMailerMailProvider";
import { MysqlTicketMensagensRepository } from "../../repositories/implementations/MysqlTicketMensagensRepository";
import { CreateTicketMensagemController } from "./CreateTicketMensagemController";
import { CreateTicketMensagemUseCase } from "./CreateTicketMensagemUseCase";

const nodeMailerMailProvider = new NodeMailerMailProvider()
const ticketMensagemRepository = new MysqlTicketMensagensRepository()
const createTicketMensagemUseCase = new CreateTicketMensagemUseCase(ticketMensagemRepository, nodeMailerMailProvider)
const createTicketMensagemController = new CreateTicketMensagemController(createTicketMensagemUseCase)

export { createTicketMensagemController }