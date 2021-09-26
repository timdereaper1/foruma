import { Model } from 'mongoose';

export interface IDBUser {
	alias: string;
	email: string;
	password: string; // Always hash password before storing in database
	totalPosts: number;
	totalComments: number;
	id: string;
}

export interface IUserModel extends Model<IDBUser> {
	updateTotalComments(userId: string): Promise<void>;
	updateTotalPosts(userId: string): Promise<void>;
}
