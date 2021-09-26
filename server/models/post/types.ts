import { Model } from 'mongoose';

export interface IDBPost {
	userId: string;
	body: string;
	createdAt: Date;
	totalComments: number;
	updatedAt: Date;
	id: string;
}

export interface IPostModel extends Model<IDBPost> {
	updateComments(postId: string): Promise<void>;
}
