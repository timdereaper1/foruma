import { AuthenticationError } from 'apollo-server-express';
import UserModel from 'server/models/user';
import { IAddDBUser, IUsersDataSource } from './types';
import argon2 from 'argon2';
import Errors from 'server/utils/errors';

export default class UsersDataSource implements IUsersDataSource {
	public async addUser(args: IAddDBUser) {
		const hashedPassword = await argon2.hash(args.password);
		const user = new UserModel({ ...args, password: hashedPassword });
		return user.save();
	}

	public async verify(args: IAddDBUser) {
		const user = await UserModel.findOne({ email: args.email });
		if (!user) return null;
		const isValidPassword = await argon2.verify(user.password, args.password);
		if (!isValidPassword) throw new AuthenticationError(Errors.Authentication);
		return user;
	}

	public async getUsers(ids: readonly string[]) {
		return UserModel.find({ _id: { $in: ids } });
	}
}
