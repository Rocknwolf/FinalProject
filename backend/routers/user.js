import express from 'express';

import userController from '../controllers/user.js';

const router = express.Router();

router.post('/', userController.register);
router.delete('/:username', userController.deleteUser);
router.patch('/suspended/:username', userController.reactivate);
router.patch('/suspend/:username', userController.suspend);
router.patch('/reset/:username', userController.resetPassword);

export default router;