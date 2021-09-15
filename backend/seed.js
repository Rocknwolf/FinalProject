import faker from 'faker';
import mongoose from 'mongoose';
import db from './lib/db.mongoclient.js';

faker.seed(42);

(async () => {
    await db.collection('users').deleteMany();

    const users = [];

    for (let i = 0; i < 5; i++) {
        const hexID = faker.datatype.hexaDecimal(24).substring(2);
        const id = mongoose.Types.ObjectId(hexID);
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
    
        users.push({
            _id: id,
            name: firstName + ' ' + lastName,
            email: faker.internet.email(firstName, lastName),
            password: faker.internet.password(10, false, /[0-9a-zA-Z]/)
        });
    }

    await db.collection('users').insertMany(users);
    process.exit(0);
})();
