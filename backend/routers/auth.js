import express from 'express';

import authController from '../controllers/auth.js';

const router = express.Router();

router.post('/', authController.login);
router.delete('/', authController.logout);

export default router;