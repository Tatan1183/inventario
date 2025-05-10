import { Router } from "express";
import { methodHTTP as empleadoController } from "../controllers/empleado.controller.js";

const router = Router();

router.get("/", empleadoController.getEmpleados); // READ ALL

export default router;

