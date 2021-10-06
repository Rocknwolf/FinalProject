import express from 'express';
import multer from 'multer';
import {v4 as uuidv4} from 'uuid';
import path from 'path';
import User from '../models/User.js';

const router = express.Router();

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

router.route("/").post(upload.single("avatar"), (req, res, next) => {
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

export default router;