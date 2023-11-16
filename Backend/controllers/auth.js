import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from '../models/admin.js';

export const adminLogin = async (req, res) => {
    try {
        const { user, password } = req.body;
        
        const admin = await Admin.findOne({ user });
     
        if (!admin || !(await bcrypt.compare(password, admin.password))) {
            return res.status(401).json({ msg: "Invalid username or password." });
        }

        const token = jwt.sign({ id: admin.user }, process.env.JWT_SECRET);

        res.status(200).json({ token});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
