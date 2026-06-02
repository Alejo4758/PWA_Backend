import { Router } from 'express';
import { obtenerRelojes, crearReloj } from '../controllers/RelojController.js';

const router = Router();

router.get('/', obtenerRelojes);
router.post('/', crearReloj);

export default router;