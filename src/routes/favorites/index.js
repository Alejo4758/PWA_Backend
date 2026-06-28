import { Router } from 'express';
import { addFavorite, getFavorites, removeFavorite } from '../../controllers/favorites/index.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);
router.get('/', getFavorites);
router.post('/:id', addFavorite);
router.delete('/:id', removeFavorite);

export default router;
