import { MysqlSistemasRepository } from "../../repositories/implementations/MysqlSistemasRepository";
import { ListSistemasController } from "./ListSistemasController";
import { ListSistemasUseCase} from "./ListSistemasUseCase";

const mysqlSistemasRepository = new MysqlSistemasRepository()
const listSistemasUseCase = new ListSistemasUseCase(mysqlSistemasRepository)
const listSistemasController = new ListSistemasController(listSistemasUseCase)

export { listSistemasController }