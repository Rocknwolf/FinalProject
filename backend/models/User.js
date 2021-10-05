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
    avatarUri: {
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
        type: String, 
        unique: true },
      roles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Role"
        }
      ]
}, { versionKey: false, timestamps: true });


const User = mongoose.model('User', UserSchema,"users");

const register = async (usernameP, emailP, passwordP, birthDateP, firstNameP, lastNameP) =>
{
    return await User.create({
        username: usernameP,
        email: emailP,
        password: passwordP,
        birthDate: birthDateP,
        firstName: firstNameP,
        lastName: lastNameP
    });
}

const findByEmail = async (emailP) =>
{
    return await User.findOne({ email: emailP });
}

const findByUsername = async (usernameP) =>
{
    return await User.findOne({ username: usernameP });
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