import { AuthenticationError } from 'apollo-server-express';
import { Document } from 'mongoose';
import UserModel from 'src/base/node/db/models/user';
import argon2 from 'argon2';
import Errors from 'src/base/node/lib/errors';
import { IDBUser } from 'src/base/node/db/models/user';

export interface IAddDBUser {
	alias: string;
	email: string;
	password: string;
}

export interface IUsersDataSource {
	addUser(args: IAddDBUser): Promise<IDBUser & Document<any, any, IDBUser>>;
	verify(args: IAddDBUser): Promise<(IDBUser & Document<any, any, IDBUser>) | null>;
	getUsers(id: readonly string[]): Promise<(IDBUser & Document<any, any, IDBUser>)[]>;
}

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
