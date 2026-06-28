import { Router } from 'express';
import { addFavorite, getFavorites, removeFavorite } from '../../controllers/favorites/index.js';

const router = Router();

router.get('/', getFavorites);
router.post('/', addFavorite);
router.delete('/:id', removeFavorite);

export default router;
