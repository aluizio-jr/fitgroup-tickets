import { MysqlTicketMensagensRepository } from "../../repositories/implementations/MysqlTicketMensagensRepository";
import { ListTicketMensagensUseCase } from "./ListTicketMensagensUseCase";
import { ListTicketMensagensController } from "./ListTicketMensagensController";

const mysqlTicketMensagensRepository = new MysqlTicketMensagensRepository()
const listTicketMensagensUseCase = new ListTicketMensagensUseCase(mysqlTicketMensagensRepository)
const listTicketMensagensController = new ListTicketMensagensController(listTicketMensagensUseCase)

export { listTicketMensagensController }