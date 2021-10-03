import mongoose from 'mongoose';
import { MONGODB_URL } from 'src/base/node/lib/constants';

export async function getMongoDBConnection() {
	if (!MONGODB_URL) throw new Error('mongodb connection url not found');
	return mongoose.connect(MONGODB_URL, {
		maxPoolSize: 10,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
}
