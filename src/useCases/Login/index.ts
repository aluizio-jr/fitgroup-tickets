import { MysqlCustomerRepository } from "../../repositories/implementations/MysqlCustomerRepository"
import { MysqlTicketAtendentesRepository } from "../../repositories/implementations/MysqlTicketAtendentesRepository"
import { LoginUseCase } from "./LoginUseCase"
import { LoginController } from "./LoginController"

const mysqlCustomerRepository = new MysqlCustomerRepository()
const mysqlTicketAtendentesRepository = new MysqlTicketAtendentesRepository()
const loginUseCase = new LoginUseCase(mysqlCustomerRepository, mysqlTicketAtendentesRepository)
const loginController = new LoginController(loginUseCase)

export {loginController}