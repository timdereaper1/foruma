import { Model } from 'mongoose';

export interface IDBComment {
	body: string;
	createdAt: Date;
	userId: string;
	postId: string;
	updatedAt: Date;
	id: string;
}

export interface ICommentModel extends Model<IDBComment> {}
