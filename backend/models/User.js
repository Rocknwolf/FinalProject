import e from 'express';
import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    userName: {
        type:String,
        required: true,
        unique: true,
    },
    birthDate: {
        type: Date,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    bio: {
        type: String,
        default: "",
    },
    avatarUri: {
        type: String,
        default: "",
    },
    password: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true,
    },
    deactivatedAt:{
        type: Date,
        default: Date.now(),

    }
}, { versionKey: false, timestamps: true });


const User = mongoose.model('User', UserSchema,"users");

const register = async (userName, email, password, birthDate, firstName, lastName) =>
{
    
    return await User.register({"userName":userName, "email":email, "password":password, "birthDate":birthDate, "firstName":firstName, "lastName":lastName})
}

const findByEmail = async (email) =>
{
    return await User.findOne({"email":email})
}

const findByUsername = async (firstname) =>
{
    return await User.find({"firstName":firstname})
    // return await User.find({"firstName":firstname.toLowerCase()})
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

const deleteUser = async(email) =>
{
    return await User.findOneAndRemove({"email":email})
}

export default {
    register,
    findByEmail,
    findByUsername,
    saveResettedPassword,
    suspend,
    reactivate,
    deleteUser,
};