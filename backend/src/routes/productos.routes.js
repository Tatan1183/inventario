import { Router } from "express";
import { methodHTTP as productoController } from "../controllers/producto.controller.js";

const router = Router();

router.put("/:id", productoController.updateProducto); // UPDATE

export default router;