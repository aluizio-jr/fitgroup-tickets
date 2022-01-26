import { MysqlTicketTiposRepository } from "../../repositories/implementations/MysqlTicketTiposRepository";
import { ListTicketTiposController } from "./ListTicketTiposController";
import { ListTicketTiposUseCase } from "./ListTicketTiposUseCase";

const mysqlTicketTiposRepository = new MysqlTicketTiposRepository()
const listTicketTiposUseCase = new ListTicketTiposUseCase(mysqlTicketTiposRepository)
const listTicketTipoController = new ListTicketTiposController(listTicketTiposUseCase)

export { listTicketTipoController }