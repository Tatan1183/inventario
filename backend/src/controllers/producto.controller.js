import getConnection from "../db/database.js";

const updateProducto = async (req, res) => {
  try {
    const { id } = req.params;
    // Solo permite actualizar nombre y precio según el requerimiento
    const { ProductoNombre, PrecioUnitario } = req.body;

    // Validación: Asegurarse que al menos uno de los campos venga
    if (ProductoNombre === undefined && PrecioUnitario === undefined) {
        return res.status(400).json({ message: "Debe proporcionar ProductoNombre o PrecioUnitario para actualizar." });
    }

    // Construir objeto solo con los campos que se van a actualizar
    const fieldsToUpdate = {};
    if (ProductoNombre !== undefined) {
         // Puedes añadir validación de longitud o tipo si es necesario
        fieldsToUpdate.ProductoNombre = ProductoNombre;
    }
    if (PrecioUnitario !== undefined) {
         // Validar que sea un número
         if (isNaN(parseFloat(PrecioUnitario))) {
             return res.status(400).json({ message: "PrecioUnitario debe ser un número." });
         }
        fieldsToUpdate.PrecioUnitario = parseFloat(PrecioUnitario);
    }


    const connection = await getConnection();
    const [result] = await connection.query("UPDATE productos SET ? WHERE ProductoID = ?", [fieldsToUpdate, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: `Producto con ID ${id} no encontrado.` });
    }

     // Opcional: Devolver el producto actualizado
     const [updatedProductRows] = await connection.query("SELECT ProductoID, ProductoNombre, PrecioUnitario FROM productos WHERE ProductoID = ?", id);


    res.json({ message: `Producto ${id} actualizado.`, producto: updatedProductRows[0] });

  } catch (error) {
    console.error(`Error updating producto ${req.params.id}:`, error);
    res.status(500).json({ message: "Error interno del servidor al actualizar producto." });
  }
};

export const methodHTTP = {
    updateProducto
};