import { NodeMailerMailProvider } from "../../providers/implementations/NodeMailerMailProvider";
import { MysqlCustomerRepository } from "../../repositories/implementations/MysqlCustomerRepository";
import { MysqlTicketRepository } from "../../repositories/implementations/MysqlTicketRepository";
import { CreateTicketController } from "./CreateTicketController";
import { CreateTicketUseCase } from "./CreateTicketUseCase";
import { MysqlMensagensRepository } from "../../repositories/implementations/MysqlMensagensRepository"

const ticketRepository = new MysqlTicketRepository()
const ticketMensagensRepository = new MysqlMensagensRepository()

const nodeMailerMailProvider = new NodeMailerMailProvider()
const mysqlCustomerRepository = new MysqlCustomerRepository()
const createTicketUseCase = new CreateTicketUseCase(ticketRepository, nodeMailerMailProvider, mysqlCustomerRepository, ticketMensagensRepository)
const createTicketController = new CreateTicketController(createTicketUseCase)


export { createTicketController }