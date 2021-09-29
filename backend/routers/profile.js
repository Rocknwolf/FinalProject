import express from 'express';

import profileController from '../controllers/profile.js';

const router = express.Router();
router.get("/:username", profileController.readProfiles);

export default router;