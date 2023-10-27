import Admin from '../models/admin.js';

export const getAdmins = async (req, res) => {

    try {
        const admins = await Admin.find();

        res.status(200).send(admins);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}