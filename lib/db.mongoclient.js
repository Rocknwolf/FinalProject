import dotenv from 'dotenv';
import mongodb from 'mongodb';
dotenv.config();

const { MongoClient } = mongodb;

//https://mongodb.github.io/node-mongodb-native/4.0/classes/mongoclient.html
//https://mongodb.github.io/node-mongodb-native/4.1/interfaces/MongoClientOptions.html
const client = await new MongoClient(process.env.MONGODB_URI + process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: 'admin',
    // auth: {
    //     username: 'root',
    //     password: 'example'
    // }
}).connect();

const db = client.db();
export default db;
