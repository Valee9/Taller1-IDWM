import express from 'express';
import { getAdmins} from '../controllers/admin.js';

const router = express.Router();

router.get('/', getAdmins);

export default router;