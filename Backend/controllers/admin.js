// Importa el modelo 'Admin' que representa la estructura de datos para los clientes.
import Admin from '../models/admin.js';

/**
 * Obtiene el admin almacenado en la base de datos.
 * @async
 * @function getAdmins
 * @param {object} req - Objeto de solicitud (request).
 * @param {object} res - Objeto de respuesta (response).
 * @returns {Promise<void>} - Promesa que representa la respuesta de la solicitud.
 * @throws {object} - Objeto que indica un error si la operación no tiene éxito.
 */
export const getAdmins = async (req, res) => {

    try {
        // Realiza una consulta para obtener el admin de la base de datos.
        const admins = await Admin.find({}, { password: 0 });
        // Envía una respuesta con el array de admin obtenido.
        res.status(200).send(admins);
    } catch (error) {
        // Envía una respuesta de error si ocurre algún problema durante la operación.
        res.status(404).json({ message: error.message });
    }
}