import express from 'express';
import expressUnless from 'express-unless';

import userController from '../controllers/user.js';
import authController from '../controllers/auth.js';

import token from '../middlewares/token.js';
import { validateBody } from '../middlewares/validation.js';
import regexValidator from '../middlewares/regexValidation.js';
import xssSanitize from '../middlewares/xssSanitizer.js';
import multer from '../middlewares/multer.js';
import cloudinary from '../middlewares/cloudinary.js';

import userRegister from '../validations/userRegister.js';
import userProfile from '../validations/userProfile.js';
import userAvatar from '../validations/userAvatar.js';

token.verifyToken.unless = expressUnless;
const router = express.Router();

const cloudynaryOptions = {
    folder: 'fp',
    use_filename: true,
    width: 150,
    height: 150,
    crop: 'fit'
};

// Beispiel - middleware nur in Pfad mit Methode POST ausgeschlossen
router.use(
    token.verifyToken.unless(
        { 
            path: [
                { url: '/', method: 'POST' },
                { url: '/profile/:username', method: 'GET' }
            ],
            useOriginalUrl: false
        }
    )
);

router.get('/profile/:username', userController.readProfiles);

router.patch(
    '/profile/avatar',
    validateBody(userAvatar),
    multer.single('avatar'),
    cloudinary.upload(cloudynaryOptions),
    userController.updateAvatar,
    cloudinary.destroy()
);

router.patch('/profile',
    validateBody(userProfile),
    xssSanitize('body', 'username firstName lastName'),
    userController.updateProfilePatch
);

router.post(
    '/',
    validateBody(userRegister),
    regexValidator(/^((?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[ °^!§$%&\/()=?<>|\'\"`´µ€@²³#+*~_-]).+)$/, 'body', 'password'),
    xssSanitize('body', [ 'username', 'firstName', 'lastName' ]), // same as 'username firstName lastName'
    userController.register,
    authController.login,
    token.signToken(+process.env.TOKEN_DURATION * 60)
);
router.delete('/:username', userController.deleteUser);
router.patch('/suspended/:username', userController.reactivate);
router.patch('/suspend/:username', userController.suspend);
router.patch('/reset/:username', userController.resetPassword);

export default router;
