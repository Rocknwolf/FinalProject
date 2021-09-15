import mongoose from 'mongoose';

const HOST = 'localhost';
const PORT = '27017';
const USER = 'root';
const PASS = 'example';

const DATABASE = 'test';
const COLLECTION = 'collection_a';

const log = console.log;

function logError(e) {
	console.error(e);
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'error:'));
db.once('close', () => console.log('database-connection closed'));

// https://mongoosejs.com/docs/api/mongoose.html#mongoose_Mongoose-connect
mongoose.connect(
	//`mongodb://${USER}:${PASS}@${HOST}:${PORT}`, 
	`mongodb://${USER}:${PASS}@${HOST}:${PORT}/${DATABASE}`, 
	{
		useNewUrlParser: true, 
		useUnifiedTopology: true,
		auth: { authSource: "admin" } /* fix for Authentication Error: https://stackoverflow.com/questions/45576367/mongoose-connection-authentication-failed */
	}
);

await db.once('open', async () => {
	console.log('database-connection opened');

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  bio: String,
  Avatar: String,
  hash: String,
  salt: String
}, {timestamps: true});

UserSchema.methods.getName = function() {
    return this.name? this.name : 'NOT SET';
}

// aus dem Schema wird ein Model abgeleitet:
const User = mongoose.model('User', UserSchema);

const user = new User({
    name: "Thomas", 
    email: "thomas.hofmann@digitalcareerinstitute.org"
});

log("instance' name:", user.getName());
// up to now only available inside of running program

log('saving to database');
await user.save((err, instance) => {
    if (err) return console.error('error saving instance:', err);
    console.log("instance saved");
});

await User.find((err, instances) =>{
    if (err) return console.error('error in Model.find', err);
    console.log('instances:', instances);
});

db.close();
});

export default UserSchema;