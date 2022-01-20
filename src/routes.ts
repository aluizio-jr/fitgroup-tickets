import bcrypt from "bcrypt"
import { Router } from "express";

import { listCustumerController } from "./useCases/ListCustomer";
import { createTicketController } from "./useCases/CreateTicket";
import { listTicketController } from "./useCases/ListTickets";
import { listTicketMensagensController } from "./useCases/ListTicketMensagens";
import { createTicketMensagemController } from "./useCases/CreateTicketMensagem";
import { updateTicketMensagemController } from "./useCases/UpdateTicketMensagem";
import { listCustumerResponsaveisController } from "./useCases/ListCustomerResponsaveis";
import { listSistemasController } from "./useCases/ListSistemas";
import { loginController } from "./useCases/Login";

const router = Router()

router.post('/login', (request, response) => loginController.handle(request, response))

router.get('/customer/:id?', (request, response) => listCustumerController.handle(request, response))
router.get('/customer/:id?/responsaveis', (request, response) => listCustumerResponsaveisController.handle(request, response))

router.get('/sistemas', (request, response) => listSistemasController.handle(request, response))

router.get('/ticket', (request,response) => listTicketController.handle(request, response))
router.post('/ticket/create', (request, response) => createTicketController.handle(request, response))

router.get('/ticket/:id/mensagens', (request, response) => listTicketMensagensController.handle(request, response))
router.post('/ticket/mensagem/create', (request, response) => createTicketMensagemController.handle(request, response))
router.post('/ticket/mensagem/update', (request, response) => updateTicketMensagemController.handle(request, response))

//router.get('/jwt', async (request, response) => response.send(await bcrypt.hash('suporte',10)) )
export { router }