import { MysqlCustomerRepository } from "../../repositories/implementations/MysqlCustomerRepository"
import { MysqlAtendentesRepository } from "../../repositories/implementations/MysqlAtendentesRepository"
import { LoginUseCase } from "./LoginUseCase"
import { LoginController } from "./LoginController"

const mysqlCustomerRepository = new MysqlCustomerRepository()
const mysqlTicketAtendentesRepository = new MysqlAtendentesRepository()
const loginUseCase = new LoginUseCase(mysqlCustomerRepository, mysqlTicketAtendentesRepository)
const loginController = new LoginController(loginUseCase)

export {loginController}