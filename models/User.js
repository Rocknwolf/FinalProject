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
    emailVerificationCode: {
        type: String
    },
    isEmailVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    password: {
        type: String,
        required: true,
    },
    birthDate: {
        type: Date,
        required: true,
    },
    bio: {
        type: String,
        default: "",
    },
    avatarEndpoint: {
        type: String,
        default: "",
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    deactivatedAt:{
        type: Date,
        default: Date.now(),
    },
    status: {
        type: String, 
        enum: ['Pending', 'Active'],
        default: 'Pending'
    },
    confirmationCode: { 
        type: String
    },
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }
    ]
}, { versionKey: false, timestamps: true });


const User = mongoose.model('User', UserSchema,"users");

const register = async ( username, email, password, birthDate, uuid, firstName, lastName) =>
{
    return await User.create({
        username: username,
        email: email,
        password: password,
        birthDate: birthDate,
        emailVerificationCode: uuid,
        firstName: firstName,
        lastName: lastName
    });
}

const findByEmail = async (email) =>
{
    return await User.findOne({ email: email });
}

const findByUsername = async (username) =>
{
    return await User.findOne({ username: username });
}

const reactivate = () =>
{
    return null;
}

const saveResettedPassword = () =>
{
    return null;
}

const setAvatar = async (email, endpoint) =>
{
    const updates = {
        avatarEndpoint: endpoint
    }
    const options = {
        new: false
    }
    return await User.findOneAndUpdate({ email: email }, updates, options);
}

const suspend = () =>
{
    return null;
}

const deleteUser = async(email) =>
{
    return await User.findOneAndRemove({"email":email})
}

const updateUserByEmail = async (email, updates) => {
    const options = {
        new: true
    }
    return await User.findOneAndUpdate({ email: email }, updates, options);
}

export default {
    register,
    findByEmail,
    findByUsername,
    reactivate,
    saveResettedPassword,
    setAvatar,
    suspend,
    deleteUser,
    updateUserByEmail
};
