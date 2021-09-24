import express from 'express';

import authController from '../controllers/auth.js';
import token from '../middlewares/token.js';

const router = express.Router();

router.post('/', authController.login, token.signToken(+process.env.TOKEN_DURATION * 60));
router.delete('/', token.verifyToken, authController.logout, token.signToken());

export default router;