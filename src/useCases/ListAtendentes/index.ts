import { MysqlAtendentesRepository } from "../../repositories/implementations/MysqlAtendentesRepository";
import { ListAtendentesController } from "./ListAtendentesController";
import { ListAtendentesUseCase} from "./ListAtendentesUseCase";

const mysqlAtendentesRepository = new MysqlAtendentesRepository()
const listAtendentesUseCase = new ListAtendentesUseCase(mysqlAtendentesRepository)
const listAtendentesController = new ListAtendentesController(listAtendentesUseCase)

export { listAtendentesController }