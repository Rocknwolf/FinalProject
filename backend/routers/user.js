import express from 'express';
import expressUnless from 'express-unless'
import multer from 'multer';
import {v4 as uuidv4} from 'uuid';
import path from 'path';

import userController from '../controllers/user.js';
import authController from '../controllers/auth.js';

import token from '../middlewares/token.js';
import { validateBody } from '../middlewares/validation.js';
import regexValidator from '../middlewares/regexValidation.js';
import xssSanitize from '../middlewares/xssSanitizer.js';

import userRegister from '../validations/userRegister.js';
import userProfile from '../validations/userProfile.js';


token.verifyToken.unless = expressUnless;
const router = express.Router();

import User from '../models/User.js';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "images");
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
    },
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({ storage, fileFilter });

// Beispiel - middleware nur in Pfad mit Methode POST ausgeschlossen
router.use(
    token.verifyToken.unless(
        { 
            path: [
                { url: '/', method: 'POST' },
                { url: '/profile/:username', method: 'GET' },
                { url: '/profile', method: 'PATCH' }
            ],
            useOriginalUrl: false
        }
    )
);

router.get('/profile/:username', userController.readProfiles);

router.post('/profile/avatar', upload.single("avatar"), (req, res, next) => {
    try {
        console.log("____________________________________--------------------------________________");
        const avatarUri = req.file.filename;
        return res.status(200).json({});
    
        const newUserData = {
            avatarUri,
        };
    
        const newUser = new User(newUserData);
    
        newUser
            .save()
            .then(() => res.json("User Added"))
            .catch((err) => res.status(400).json("Manual Error: " + err));
    } catch (err) {
        next(err);
    }
});

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