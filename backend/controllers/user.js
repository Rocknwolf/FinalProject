import { errorOptions } from '../lib/errors.js';

const deleteUser = async (req, res, next) => {
    try {
        
    } catch (e) {
        next(errorOptions(e));
    }
}

const register = async (req, res, next) => {
    try {
        
    } catch (e) {
        next(errorOptions(e));
    }
}

const resetPassword = async (req, res, next) => {
    try {
        
    } catch (e) {
        next(errorOptions(e));
    }
}

const reactivate = async (req, res, next) => {
    try {
        
    } catch (e) {
        next(errorOptions(e));
    }
}

const suspend = async (req, res, next) => {
    try {
        
    } catch (e) {
        next(errorOptions(e));
    }
}

export default {
    deleteUser,
    register,
    resetPassword,
    reactivate,
    suspend
}