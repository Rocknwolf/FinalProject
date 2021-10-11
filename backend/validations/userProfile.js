const schema = {
    $id: 'userProfile',
    type: 'object',
    additionalProperties: false,
    properties: {
        updates: {
            type: 'object',
            additionalProperties: false,
            properties: {
                username: {
                    type: 'string'
                },
                email: {
                    type: 'string',
                    format: 'email'
                },
                password: {
                    type: 'string',
                    minLength: 8
                    //pattern: '^((?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[ °^!§$%&\/()=?<>|\'\"`´µ€@²³#+*~_-]).+)$' // doesn't work in ajv
                },
                firstName: {
                    type: 'string'
                },
                lastName: {
                    type: 'string'
                }
            }
        },
        email: {
            type: 'string',
            format: 'email'
        }
    }
};

export default schema;