import { MysqlMensagensRepository } from "../../repositories/implementations/MysqlMensagensRepository";
import { ListMensagensUseCase } from "./ListMensagensUseCase";
import { ListMensagensController } from "./ListMensagensController";
import { MysqlMensagemAnexoRepository } from "../../repositories/implementations/MysqlMensagemAnexoRepository";

const mysqlMensagensRepository = new MysqlMensagensRepository()
const mysqlMensagemAnexoRepository = new MysqlMensagemAnexoRepository()
const listMensagensUseCase = new ListMensagensUseCase(mysqlMensagensRepository, mysqlMensagemAnexoRepository)
const listMensagensController = new ListMensagensController(listMensagensUseCase)

export { listMensagensController }