import { MysqlCustomerRepository } from "../../repositories/implementations/MysqlCustomerRepository";
import { ListCustomerController } from "./ListCustomerController";
import { ListCustomerUseCase } from "./ListCustomerUseCase";

const mysqlCustomerRepository = new MysqlCustomerRepository()
const listCustomerUseCase = new ListCustomerUseCase(mysqlCustomerRepository)
const listCustumerController = new ListCustomerController(listCustomerUseCase)

export { listCustumerController }