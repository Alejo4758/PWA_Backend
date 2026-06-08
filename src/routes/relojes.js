import { Router } from 'express';
import { 
  obtenerRelojes, 
  obtenerRelojPorId, 
  crearReloj, 
  actualizarReloj, 
  eliminarReloj 
} from '../controllers/RelojController.js';

const router = Router();

// Rutas Generales
router.get('/', obtenerRelojes);
router.post('/', crearReloj);

// Rutas Dinámicas
router.get('/:id', obtenerRelojPorId);
router.put('/:id', actualizarReloj);
router.delete('/:id', eliminarReloj);

export default router;