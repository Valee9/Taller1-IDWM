import express from 'express';
import { getClients, createClient, updateClient, deleteClient } from '../controllers/client.js';

const router = express.Router();

// Get all clients
router.get('/', getClients);

// Create a new client
router.post('/', createClient);

// Update a client by nid
router.put("/:nid", updateClient);

// Delete a client by nid
router.delete("/:nid", deleteClient);

export default router;