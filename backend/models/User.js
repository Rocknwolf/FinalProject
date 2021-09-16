import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    bio: {
        type: String,
    },
    Avatar: {
        type: String,
    },
    hashedPw: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true,
    },
}, { versionKey: false, timestamps: true });


const User = mongoose.model('User', UserSchema);

const register = () =>
{
    return null;
}

const login = () =>
{
    return null;
}

const logout = () =>
{
    return null;
}

const findByEmail = () =>
{
    return null;
}

const findByUsername = () =>
{
    return null;
}

const saveResettedPassword = () =>
{
    return null;
}

const suspend = () =>
{
    return null;
}

const reactivate = () =>
{
    return null;
}

const deleteUser = () =>
{
    return null;
}

export default {
    register,
    login,
    logout,
    findByEmail,
    findByUsername,
    saveResettedPassword,
    suspend,
    reactivate,
    deleteUser,
};