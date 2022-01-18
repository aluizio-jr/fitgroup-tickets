import { MysqlCustomerRepository } from "../../repositories/implementations/MysqlCustomerRepository";
import { ListCustomerResponsaveisController } from "./ListCustomerResponsaveisController";
import { ListCustomerResponsaveisUseCase } from "./ListCustomerResponsaveisUseCase";

const mysqlCustomerRepository = new MysqlCustomerRepository()
const listCustomerResponsaveisUseCase = new ListCustomerResponsaveisUseCase(mysqlCustomerRepository)
const listCustumerResponsaveisController = new ListCustomerResponsaveisController(listCustomerResponsaveisUseCase)

export { listCustumerResponsaveisController }