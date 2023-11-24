/**
 * Importa la biblioteca express,
 * los controladores del cliente.
 */
import express from 'express';
import { getClients, createClient, updateClient, deleteClient } from '../controllers/client.js';
// El enrutador para las rutas
const router = express.Router();

// Ruta para obtener los clientes
router.get('/', getClients);

// Ruta para crear un nuevo cliente
router.post('/', createClient);

// Ruta para actualizar la información de un cliente por su nid
router.put("/:nid", updateClient);

// Ruta para eliminar un cliente por su nid
router.delete("/:nid", deleteClient);

// Exporta el enrutador de clientes.
export default router;