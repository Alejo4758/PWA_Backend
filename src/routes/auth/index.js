import { Router } from 'express';
import { getMe, login, logout, register } from '../../controllers/auth/index.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';

const router = Router();

router.post('/login', login);
router.post('/logout', logout);
router.post('/register', register);
router.get('/me', authMiddleware, getMe);

export default router;