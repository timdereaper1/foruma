import { Schema, model } from 'mongoose';
import { IDBUser, IUserModel } from './types';

const userSchema = new Schema<IDBUser>(
	{
		alias: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		totalPosts: { type: Number, default: 0 },
		totalComments: { type: Number, default: 0 },
	},
	{
		timestamps: true,
	}
);

userSchema.statics.updateTotalComments = async function (userId: string) {
	const user = await this.findById(userId);
	return this.updateOne({ _id: userId }, { $set: { totalComments: user.totalComments + 1 } });
};

userSchema.statics.updateTotalPosts = async function (userId: string) {
	const user = await this.findById(userId);
	return this.updateOne({ _id: userId }, { $set: { totalPosts: user.totalPosts + 1 } });
};

const UserModel = model<IDBUser, IUserModel>('User', userSchema);

export default UserModel;
