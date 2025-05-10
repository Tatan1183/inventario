import getConnection from "../db/database.js";

const postCliente = async (req, res) => {
  try {
    // Extrae los campos esperados del body. Asegúrate que coincidan con tu tabla 'clientes'
    // ¡Importante! ClienteID es CHAR(5) y PK. Debe ser proporcionado en el request.
    const { ClienteID, Compania, Contacto, Titulo, Direccion, Ciudad, Regiones, CodigoPostal, Pais, Telefono, Fax } = req.body;

    // Validación básica (puedes añadir más)
    if (!ClienteID || !Compania) {
        return res.status(400).json({ message: "ClienteID y Compania son requeridos." });
    }
     if (ClienteID.length > 5) {
         return res.status(400).json({ message: "ClienteID no puede exceder los 5 caracteres." });
     }

    const newClient = {
        ClienteID, // Asegúrate que el frontend/cliente envíe este ID único
        Compania,
        Contacto,
        Titulo,
        Direccion,
        Ciudad,
        Regiones,
        CodigoPostal,
        Pais,
        Telefono,
        Fax
    };

    const connection = await getConnection();
    const [result] = await connection.query("INSERT INTO clientes SET ?", newClient);

    // Devolver el cliente creado (o al menos el ID) y un status 201 (Created)
    res.status(201).json({ ClienteID: newClient.ClienteID, ...newClient, insertId: result.insertId });

  } catch (error) {
    console.error("Error creating cliente:", error);
     // Manejar error de clave duplicada (ER_DUP_ENTRY)
    if (error.code === 'ER_DUP_ENTRY') {
         return res.status(409).json({ message: `El ClienteID '${req.body.ClienteID}' ya existe.` }); // 409 Conflict
     }
    res.status(500).json({ message: "Error interno del servidor al crear cliente." });
  }
};

export const methodHTTP = {
    postCliente
};