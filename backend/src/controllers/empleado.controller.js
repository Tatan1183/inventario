import getConnection from "../db/database.js";

const getEmpleados = async (req, res) => {
  try {
    const connection = await getConnection();
    const [result] = await connection.query( // Destructure para obtener solo las filas
      "SELECT EmpleadoID, Apellido, Nombre, Titulo, Ciudad, Pais FROM empleados"
    );
    res.json(result);
  } catch (error) {
    console.error("Error fetching empleados:", error);
    res.status(500).json({ message: "Error interno del servidor al obtener empleados." });
  }
};

export const methodHTTP = {
    getEmpleados
};