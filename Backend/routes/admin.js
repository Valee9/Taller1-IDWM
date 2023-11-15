import express from 'express';
import { getAdmins} from '../controllers/admin.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.use(verifyToken);

router.get('/', getAdmins);

export default router;