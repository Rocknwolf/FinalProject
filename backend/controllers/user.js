import bcrypt from 'bcrypt';
import fs from 'fs';

import { errorOptions, notFoundError} from '../lib/errors.js';
import User from '../models/User.js';

const hashPassword = async (password) => {
    try {
        const hashedPw = await bcrypt.hash(
            password + process.env.PEPPER,
            +process.env.SALT_ROUNDS
        );
        return hashedPw;
    } catch (e) {
        next(errorOptions(e, 'hashPassword', 500));
    }
    
}

const deleteUser = async (req, res, next) => {
    try {
        const temp = await User.deleteUser(req.body.email);
        res.status(200).json(temp);
    } catch (e) {
        next(errorOptions(e));
    }
}

const register = async (req, res, next) => {
    try {
        const hashedPw = await hashPassword(req.body.password);

        await User.register(
            req.body.username.toLowerCase(),
            req.body.email,
            hashedPw,
            req.body.birthDate,
            req.body.firstName || '',
            req.body.lastName || ''
        );

        next(); //login
    } catch (e) {
        next(errorOptions(e, 'register'));
    }
}

const resetPassword = async (req, res, next) => {
    try {
        const temp = await User.saveResettedPassword();
        res.status(200).json(temp);
    } catch (e) {
        next(errorOptions(e));
    }
}

const reactivate = async (req, res, next) => {
    try {
        const temp = await User.reactivate();
        res.status(200).json(temp);
    } catch (e) {
        next(errorOptions(e));
    }
}

const suspend = async (req, res, next) => {
    try {
        const temp = await User.suspend();
        res.status(200).json(temp);
    } catch (e) {
        next(errorOptions(e));
    }
}

const readProfiles = async (req, res, next) => {
    try {
        const response = req.params.username ? await User.findByUsername(req.params.username) : await User.findByEmail(req.params.email); /*"Hallo Welt!"*/
        if (!response) throw notFoundError('user', 'readProfiles');
        
        const result = {
            username: response.username,
            email: response.email,
            firstName: response.firstName,
            lastName: response.lastName,
            birthDate: response.birthDate,
            avatarURI: response.avatarEndpoint ? `${req.protocol}://${process.env.CLOUDINARY_PATH + response.avatarEndpoint}` : ''
        };

        res.status(200).json(result);
    } catch (e) {
        next(errorOptions(e, 'readProfiles'));
    }
};

const updateProfilePatch = async (req, res, next) => {
    try {
        let hashedPw;
        const updates = {}
        if (req.body.updates.username) updates.username = req.body.updates.username;
        if (req.body.updates.email) updates.email = req.body.updates.email;
        if (req.body.updates.hasOwnProperty('firstName')) updates.firstName = req.body.updates.firstName;
        if (req.body.updates.hasOwnProperty('lastName')) updates.lastName = req.body.updates.lastName;
    
        if (req.body.updates.password) {
            hashedPw = await hashPassword(req.body.updates.password);
            updates.password = hashedPw;
        }

        const found = await User.findByEmail(req.body.email);
        if(!found) throw notFoundError('user', 'not in db');

        const updated = await User.updateUserByEmail(req.body.email, updates);
        
        return res.status(201).json(updated);
    } catch (e) {
        next(errorOptions(e, 'updateProfilePatch', 500, true, `user by ${req.body.email} not updated`));
    }
}

const updateAvatar = async (req, res, next) => {
    try {
        const endpoint = `${res.cloudinaryNew.public_id}.${res.cloudinaryNew.format}`;
        const returnPath = `${req.protocol}://${process.env.CLOUDINARY_PATH + endpoint}`;
        
        const old = await User.setAvatar(req.body.email, endpoint);
        if(old) {
            res.cloudinaryOld = {
                publicID: old.avatarEndpoint.split('.')[0]
            };
        }
        res.status(202).json({ src: returnPath });

        fs.rm((req.file.path), (error) => { if(error) throw error });

        next();
    } catch (e) {
        next(errorOptions(e, 'updateAvatar', 500, true, `user avatar by ${req.body.email} not updated`));
    }
}

export default {
    deleteUser,
    register,
    resetPassword,
    reactivate,
    suspend,
    readProfiles,
    updateProfilePatch,
    updateAvatar
};
