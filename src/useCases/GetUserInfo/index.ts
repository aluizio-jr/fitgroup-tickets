import { MysqlCustomerRepository } from "../../repositories/implementations/MysqlCustomerRepository";
import { MysqlAtendentesRepository } from "../../repositories/implementations/MysqlAtendentesRepository"
import { GetUserInfoController } from "./GetUserInfoController";
import { GetUserInfoUseCase } from "./GetUserInfoUseCase";

const mysqlCustomerRepository = new MysqlCustomerRepository()
const mysqlAtendentesRepository = new MysqlAtendentesRepository()
const getUserInfoUseCase = new GetUserInfoUseCase(mysqlCustomerRepository, mysqlAtendentesRepository)
const getUserInfoController = new GetUserInfoController(getUserInfoUseCase)

export { getUserInfoController }