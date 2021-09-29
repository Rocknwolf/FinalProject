import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    username: {
        type:String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    birthDate: {
        type: Date,
        required: true,
    },
    bio: {
        type: String,
        default: "",
    },
    avatarUri: {
        type: String,
        default: "",
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
}, { versionKey: false, timestamps: true });


const User = mongoose.model('User', UserSchema,"users");

const readUser = async (usernameP, emailP, birthDateP, firstNameP, lastNameP) =>
{
    return await User.get({
        username: usernameP,
        email: emailP,
        birthDate: birthDateP,
        firstName: firstNameP,
        lastName: lastNameP
    });
}

const findByUsername = async (usernameP) =>
{
    return await User.findOne({ username: usernameP });
}

export default {
    findByUsername,
    readUser,
};