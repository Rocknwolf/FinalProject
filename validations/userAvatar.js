const schema = {
    $id: 'userAvatar',
    type: 'object',
    additionalProperties: false,
    properties: {
        email: {
            type: 'string',
            format: 'email'
        }
    }
};

export default schema;