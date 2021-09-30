import UserSchema from '../models/User.js';

    const readProfiles = async (req, res) => {
        try {
            const response = req.params.username ? await UserSchema.findByUsername(req.params.username) : await UserSchema.readUser; /*"Hallo Welt!"*/
            if (!response) return res.status(404).send("nönönö");
            
            const result = {
                username:response.username,
                email:response.email,
                firstname:response.firstName,
                lastname:response.lastName,
                birthdate:response.birthDate,
            };

            res.json(result);
            console.log(result);

        } catch (error) {
            res.error;
        }
    };

    export default {readProfiles}