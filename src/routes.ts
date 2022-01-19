import { Router } from "express";
import { listCustumerController } from "./useCases/ListCustomer";
import { createTicketController } from "./useCases/CreateTicket";
import { listTicketController } from "./useCases/ListTickets";
import { listTicketMensagensController } from "./useCases/ListTicketMensagens";
import { createTicketMensagemController } from "./useCases/CreateTicketMensagem";
import { updateTicketMensagemController } from "./useCases/UpdateTicketMensagem";
import { listCustumerResponsaveisController } from "./useCases/ListCustomerResponsaveis";
import { listSistemasController } from "./useCases/ListSistemas";

const router = Router()

router.get('/customer/:id?', (request, response) => listCustumerController.handle(request, response))
router.get('/customer/:id?/responsaveis', (request, response) => listCustumerResponsaveisController.handle(request, response))

router.get('/sistemas', (request, response) => listSistemasController.handle(request, response))

router.get('/ticket/:id?', (request,response) => listTicketController.handle(request, response))
router.post('/ticket/create', (request, response) => createTicketController.handle(request, response))

router.get('/ticket/:id/mensagens', (request, response) => listTicketMensagensController.handle(request, response))
router.post('/ticket/mensagem/create', (request, response) => createTicketMensagemController.handle(request, response))
router.post('/ticket/mensagem/update', (request, response) => updateTicketMensagemController.handle(request, response))

export { router }