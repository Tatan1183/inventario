import {Router} from "express";
import { methodHTTP as categoriaController} from "../controllers/categoria.controller.js";
// creacion de enrutador
const router = Router();

//config respuest from server metod http get

router.get("/", categoriaController.getCategorias); //READ
router.post("/", categoriaController.postCategorias); //CREAT

//ruta que recibe un parametro
router.get("/:id", categoriaController.getCategory); //CREAT

//Ruta que recibe parametro id de categoria a borrar
router.delete("/:id", categoriaController.deleteCategory); //DELET

//ruta que recibe parametro tanto el cuerpo como el id a actualizar
router.put("/:id", categoriaController.updateCategorias); //UPDATE (actualización parcial)


//se hace disponible el server app para toda la app
export default router;