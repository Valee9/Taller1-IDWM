import Client from '../models/client.js';

// Get all clients
export const getClients = async (req, res) => {

    try {
        const clients = await Client.find({ status: 1 });

        res.status(200).send(clients);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Create a new client
export const createClient = async (req, res) => {
    const client = req.body;

    const existingClient = await Client.findOne({
        $or: [
            { rut: client.rut },
            { email: client.email }
        ]
    });

    if (existingClient) {
        return res.status(400).json({ message: "El Rut o el correo electrónico ya existe" });
    }

    try {
        const newClient = await Client.create(client);
        res.status(201).json({ created: true, client: newClient });
    } catch (error) {
        res.status(400).json({ created: false, message: error.message });
    }
};

// Update a client by ID
export const updateClient = async (req, res) => {
    const { nid } = req.params;
    const updates = req.body;

    delete updates.nid;

    try {
        const updatedClient = await Client.findOneAndUpdate({ nid: nid,  status: { $ne: 0 }}, updates, { new: true });
        if (!updatedClient) {
            return res.status(404).json({ message: "Client not update" });
        }
        res.status(200).json(updatedClient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

