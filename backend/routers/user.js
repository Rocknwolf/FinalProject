import express from 'express';
import expressUnless from 'express-unless'

import userController from '../controllers/user.js';
import authController from '../controllers/auth.js';
import token from '../middlewares/token.js';
import { validateBody } from '../middlewares/validation.js';
import regexValidator from '../middlewares/regexValidation.js'
import userRegister from '../validations/userRegister.js';
token.verifyToken.unless = expressUnless
const router = express.Router();

// Beispiel - middleware nur in Pfad mit Methode POST ausgeschlossen
router.use(
    token.verifyToken.unless(
        { 
            path: [ { url: '/', method: 'POST' } ],
            useOriginalUrl: false 
        }
    )
);

router.post(
    '/',
    validateBody(userRegister),
    regexValidator(/^((?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[ °^!§$%&\/()=?<>|\'\"`´µ€@²³#+*~_-]).+)$/, 'body', 'password'),
    userController.register,
    authController.login,
    token.signToken(+process.env.TOKEN_DURATION * 60)
);
router.delete('/:username', userController.deleteUser);
router.patch('/suspended/:username', userController.reactivate);
router.patch('/suspend/:username', userController.suspend);
router.patch('/reset/:username', userController.resetPassword);

export default router;