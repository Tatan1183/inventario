// importal framework express
import express from "express";
import cors from "cors"
import categoriaRoutes from "./routes/categorias.routes.js"
import empleadoRoutes from "./routes/empleados.routes.js"
import clienteRoutes from "./routes/clientes.routes.js"
import productoRoutes from "./routes/productos.routes.js";


//asignamos a app toda la funcionalidad para mi server web
const app = express();

//setear un puerto a mi web server
app.set("port",5000);

//Middleware
app.use(express.json());

app.use(cors());

//routes
app.use("/api/categorias",categoriaRoutes);
app.use("/api/empleados", empleadoRoutes);
app.use("/api/clientes", clienteRoutes);
app.use("/api/productos", productoRoutes); 


//se pone disponible el server app para toda la app
export default app;


