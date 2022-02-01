import { MysqlMensagensRepository } from "../../repositories/implementations/MysqlMensagensRepository";
import { ListMensagensUseCase } from "./ListMensagensUseCase";
import { ListMensagensController } from "./ListMensagensController";

const mysqlMensagensRepository = new MysqlMensagensRepository()
const listMensagensUseCase = new ListMensagensUseCase(mysqlMensagensRepository)
const listMensagensController = new ListMensagensController(listMensagensUseCase)

export { listMensagensController }