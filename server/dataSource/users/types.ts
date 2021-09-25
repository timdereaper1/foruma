import { Document } from 'mongoose';
import { IDBUser } from 'server/models/user/types';

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
