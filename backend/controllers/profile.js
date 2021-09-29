import UserSchema from '../models/User.js';

    const readProfiles = async (req, res) => {
        try {
            const response = req.params.username ? await UserSchema.findByUsername(req.params.username) : await UserSchema.readUser; /*"Hallo Welt!"*/
            console.log(req.params.username);
            if (!response) return res.status(404).send("nönönö");
            
            res.json(response);

        } catch (error) {
            res.error;
        }
    };

    export default {readProfiles}