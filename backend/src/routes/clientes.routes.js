import { Router } from "express";
import { methodHTTP as clienteController } from "../controllers/cliente.controller.js";

const router = Router();

router.post("/", clienteController.postCliente); // CREATE

export default router;