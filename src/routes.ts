import bcrypt from "bcrypt"
import { Router } from "express";

import { listCustumerController } from "./useCases/ListCustomer";
import { createTicketController } from "./useCases/CreateTicket";
import { listTicketController } from "./useCases/ListTickets";
import { listMensagensController } from "./useCases/ListMensagens";
import { createTicketMensagemController } from "./useCases/CreateMensagem";
import { updateTicketMensagemController } from "./useCases/UpdateTicketMensagem";
import { listCustumerResponsaveisController } from "./useCases/ListCustomerResponsaveis";
import { listSistemasController } from "./useCases/ListSistemas";
import { loginController } from "./useCases/Login";

import auth from "./middlewares/auth"
import { listTicketTipoController } from "./useCases/ListTicketTipos";
import { listAtendentesController } from "./useCases/ListAtendentes";
import { getUserInfoController } from "./useCases/GetUserInfo";

const router = Router()

router.post('/login', (request, response) => loginController.handle(request, response))

router.get('/customer/:id?', auth, (request, response) => listCustumerController.handle(request, response))
router.get('/customer/:id?/responsaveis', auth, (request, response) => listCustumerResponsaveisController.handle(request, response))

router.get('/ticket_tipos',auth, (request,response) => listTicketTipoController.handle(request, response) )
router.get('/sistemas', auth, (request, response) => listSistemasController.handle(request, response))

//router.get('/ticket', auth, (request,response) => listTicketController.handle(request, response))
router.get('/tickets/:filter', auth, (request,response) => listTicketController.handle(request, response))
router.post('/ticket/create', auth, (request, response) => createTicketController.handle(request, response))

router.get('/mensagens/:id_ticket', auth, (request, response) => listMensagensController.handle(request, response))
router.post('/mensagem/:id_ticket/create', auth, (request, response) => createTicketMensagemController.handle(request, response))
router.post('/ticket/mensagem/update', auth, (request, response) => updateTicketMensagemController.handle(request, response))

router.get('/atendentes', auth, (request, response) => listAtendentesController.handle(request, response))

router.get('/userInfo', auth, (request, response) => getUserInfoController.handle(request, response))

export { router }