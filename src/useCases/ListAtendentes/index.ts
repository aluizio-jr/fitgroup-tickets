import { MysqlTicketAtendentesRepository } from "../../repositories/implementations/MysqlTicketAtendentesRepository";
import { ListAtendentesController } from "./ListAtendentesController";
import { ListAtendentesUseCase} from "./ListAtendentesUseCase";

const mysqlSistemasRepository = new MysqlTicketAtendentesRepository()
const listAtendentesUseCase = new ListAtendentesUseCase(mysqlSistemasRepository)
const listAtendentesController = new ListAtendentesController(listAtendentesUseCase)

export { listAtendentesController }