import { Router } from 'express';
import { signUp, signIn, verifyOtp, getCurrentUser, logout, refreshToken } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/verify-otp', verifyOtp);
router.get('/me', authMiddleware, getCurrentUser);
router.post('/logout', authMiddleware, logout);
router.post('/refresh-token', refreshToken);

export default router;
