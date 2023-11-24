/**
 * Importa la biblioteca express,
 * el controlador para obtener el admin
 * y el mmiddleware.
 */
import express from 'express';
import { getAdmins} from '../controllers/admin.js';
import { verifyToken } from '../middleware/auth.js';
// El enrutador para las rutas
const router = express.Router();

// Middleware de verificación de token se aplica a todas las rutas de este router
router.use(verifyToken);
// Ruta para obtener el administrador
router.get('/', getAdmins);

// Exporta el enrutador del administrador.
export default router;