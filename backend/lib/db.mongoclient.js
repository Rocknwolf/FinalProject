import dotenv from "dotenv";
import mongodb from "mongodb";
dotenv.config();

const { MongoClient } = mongodb;

const client = await MongoClient.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    auth: { authSource: "admin" }
});

const db = client.db();
export default db;
