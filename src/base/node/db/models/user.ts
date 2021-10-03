import { Schema, Model, model } from 'mongoose';

export interface IDBUser {
	alias: string;
	email: string;
	password: string; // Always hash password before storing in database
	totalPosts: number;
	totalComments: number;
	id: string;

	/**
	 * @property
	 * the token provided by the third party authentication service
	 * such as google, facebook and twitter
	 */
	token?: string;

	/**
	 * @property
	 * the auth provider used to authenticate the user to access foruma
	 */
	provider?: 'google' | 'facebook' | 'twitter';

	imageUrl: string;
}

export interface IUserModel extends Model<IDBUser> {
	updateTotalComments(userId: string): Promise<void>;
	updateTotalPosts(userId: string): Promise<void>;
}

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
