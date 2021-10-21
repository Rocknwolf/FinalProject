import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

console.log(process.env.MONGODB_URI);
mongoose.connect(
	process.env.MONGODB_URI + process.env.DATABASE
	,
	{
		// mongoose ver 6.x
		// defaults to connection uri
		// auth: { username: 'root', password: 'example' },
		authSource: 'admin',

		// mongoose ver 5.x
		auth: {
			username: 'root', password: 'example',
			authSource: 'admin'
		},
		// user: 'root',
		// pass: 'example'
		useNewUrlParser: true,
		useUnifiedTopology: true,
		// useFindAndModify: false,
		// useCreateIndex: true,

		// buffering
		// autoCreate: false // prevent automatic creation of collections
	}
);
	
const init = async function () {
	const db = mongoose.connection;
	db.on('error', console.error);
	db.once('open', () => console.log('mongo service is running'));
}
	
export default { init };

