const schema = {
    $id: 'userRegister',
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
            minLength: 4
            //pattern: '^((?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[ °^!§$%&\/()=?<>|\'\"`´µ€@²³#+*~_-]).+)$' // doesn't work in ajv
        },
        birthDate: {
            type: 'string',
            format: 'date'
        },
        firstName: {
            type: 'string'
        },
        lastName: {
            type: 'string'
        }
    },
    required: [ 'username', 'email', 'password', 'birthDate']
};

export default schema;