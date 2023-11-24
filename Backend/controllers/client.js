// Importa el modelo 'Client' que representa la estructura de datos para los clientes.
import Client from '../models/client.js';

/**
 * Obtiene todos los clientes almacenados en la base de datos.
 * @async
 * @function getClients
 * @param {object} req - Objeto de solicitud (request).
 * @param {object} res - Objeto de respuesta (response).
 * @returns {Promise<void>} - Promesa que representa la respuesta de la solicitud.
 */
export const getClients = async (req, res) => {

    try {
        // Realiza una consulta para obtener todos los clientes en la base de datos.
        const clients = await Client.find();
        // Envía una respuesta con el array de clientes obtenido.
        res.status(200).send(clients);
    } catch (error) {
        // Envía una respuesta de error si ocurre algún problema durante la operación.
        res.status(404).json({ message: error.message });
    }

};

/**
 * Crea un nuevo cliente en la base de datos.
 * @async
 * @function createClient
 * @param {object} req - Objeto de solicitud (request).
 * @param {object} res - Objeto de respuesta (response).
 * @returns {Promise<void>} - Promesa que representa la respuesta de la solicitud.
 */
export const createClient = async (req, res) => {
    // Obtiene los datos del nuevo cliente del cuerpo de la solicitud.
    const client = req.body;

    try {
        // Crea un nuevo cliente en la base de datos utilizando el modelo 'Client'.
        const newClient = await Client.create(client);
        // Envía una respuesta indicando que el cliente se creó con éxito.
        res.status(201).json({ created: true, client: newClient });
    } catch (error) {
        // Envía una respuesta de error si ocurre algún problema durante la creación del cliente.
        res.status(400).json({ created: false, message: error.message });
    }
};

/**
 * Actualiza un cliente por su nid en la base de datos.
 * @async
 * @function updateClient
 * @param {object} req - Objeto de solicitud (request) de Express que contiene el nid del cliente y los datos de actualización.
 * @param {object} res - Objeto de respuesta (response) de Express.
 * @returns {Promise<void>} - Promesa que representa la respuesta de la solicitud.
 */
export const updateClient = async (req, res) => {
    // Extrae el nid del cliente de los parámetros de la solicitud.
    const { nid } = req.params;

    // Extrae los datos de actualización del cuerpo de la solicitud.
    const updates = req.body;

    // Elimina el campo 'nid' de los datos de actualización para evitar problemas al actualizar.
    delete updates.nid;

    try {
        // Busca y actualiza el cliente en la base de datos.
        const updatedClient = await Client.findOneAndUpdate({ nid: nid }, updates, { new: true });
        // Verifica si el cliente fue encontrado y actualizado con éxito.
        if (!updatedClient) {
            return res.status(404).json({ message: "Client not update" });
        }
        // Envía una respuesta indicando que el cliente se actualizó con éxito.
        res.status(200).json(updatedClient);
    } catch (error) {
        // Envía una respuesta de error si ocurre algún problema durante la actualización del cliente.
        res.status(400).json({ message: error.message });
    }
};

/**
 * Elimina un cliente por su nid de la base de datos.
 * @async
 * @function deleteClient
 * @param {object} req - Objeto de solicitud (request) de Express que contiene el nid del cliente.
 * @param {object} res - Objeto de respuesta (response) de Express.
 * @returns {Promise<void>} - Promesa que representa la respuesta de la solicitud.
 */
export const deleteClient = async (req, res) => {
    // Extrae el nid del cliente de los parámetros de la solicitud.
    const { nid } = req.params;

    try {
        // Busca y elimina el cliente de la base de datos.
        const deletedClient = await Client.findOneAndDelete({ nid: nid });
        // Verifica si el cliente fue encontrado y eliminado con éxito.
        if (!deletedClient) {
            return res.status(404).json({ message: "Client not found" });
        }
        // Envía una respuesta indicando que el cliente se eliminó con éxito.
        res.status(200).json({ message: "Client deleted successfully" });
    } catch (error) {
        // Envía una respuesta de error si ocurre algún problema durante la eliminación del cliente.
        res.status(500).json({ message: error.message });
    }
};
