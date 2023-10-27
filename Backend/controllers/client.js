import Client from '../models/client.js';

export const getClients = async (req, res) => {

    try {
        const clients = await Client.find();

        res.status(200).send(clients);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}