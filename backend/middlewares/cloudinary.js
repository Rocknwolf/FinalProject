import cloudinary from 'cloudinary';

import { errorOptions } from '../lib/errors.js';

cloudinary.config({
    cloud_name: process.env.CLOUDYNARY_CLOUD_NAME, 
    api_key: process.env.CLOUDYNARY_API_KEY, 
    api_secret: process.env.CLOUDYNARY_API_SECRET,
    secure: true 
});

const upload = (options) => {
    return async (req, res, next) => {
        try {
            res.cloudinaryNew = await cloudinary.v2.uploader.upload(
                req.file.path,
                options
            );
            next();
        } catch (e) {
            next(errorOptions(e, 'cloudinary upload', 500, true));
        }
    }
}

const destroy = (options) => {
    return async (req, res, next) => {
        try {
            res.cloudinary = await cloudinary.v2.uploader.destroy(
                res.cloudinaryOld.publicID,
                options
            );
        } catch (e) {
            next(errorOptions(e, 'cloudinary destroy'));
        }
    }
}

export default {
    upload,
    destroy
};
