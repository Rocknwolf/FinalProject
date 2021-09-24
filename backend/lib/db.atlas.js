import dotenv from "dotenv";
dotenv.config();

import mongodb from "mongodb";
const { MongoClient } = mongodb;

const client = await MongoClient.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = client.db('SoMo');

export default db;
