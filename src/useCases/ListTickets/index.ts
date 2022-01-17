import { MysqlCustomerRepository } from "../../repositories/implementations/MysqlCustomerRepository";
import { MysqlTicketRepository } from "../../repositories/implementations/MysqlTicketRepository";
import { ListTicketController } from "./ListTicketController";
import { ListTicketUseCase } from "./ListTicketsUseCase";

const mysqlCustomerRepository = new MysqlCustomerRepository()
const mysqlTicketRepository = new MysqlTicketRepository()
const listTicketUseCase = new ListTicketUseCase(mysqlCustomerRepository, mysqlTicketRepository)
const listTicketController = new ListTicketController(listTicketUseCase)

export { listTicketController }