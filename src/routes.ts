import { Router } from "express";
import { listCustumerController } from "./useCases/ListCustomer";
import { createTicketController } from "./useCases/CreateTicket";
import { listTicketController } from "./useCases/ListTickets";
import { listTicketMensagensController } from "./useCases/ListTicketMensagens";

const router = Router()

router.get('/customer/:id?', (request, response) => listCustumerController.handle(request, response))

router.get('/ticket/:id?', (request,response) => listTicketController.handle(request, response))
router.post('/ticket', (request, response) => createTicketController.handle(request, response))

router.get('/ticket/:id/mensagens', (request, response) => listTicketMensagensController.handle(request, response))

export { router }