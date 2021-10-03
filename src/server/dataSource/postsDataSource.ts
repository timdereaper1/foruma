import { Document } from 'mongoose';
import PostModel from 'src/base/node/db/models/post';
import UserModel from 'src/base/node/db/models/user';
import { IDBPost } from 'src/base/node/db/models/post';

export interface IAddNewDBPost {
	body: string;
	userId: string;
}

export interface IPostsDataSource {
	getPosts(ids?: readonly string[]): Promise<(IDBPost & Document<any, any, IDBPost>)[]>;
	getPostById(postId: string): Promise<(IDBPost & Document<any, any, IDBPost>) | null>;
	addPost(args: IAddNewDBPost): Promise<IDBPost & Document<any, any, IDBPost>>;
	getPostsByUser(userIds: readonly string[]): Promise<(IDBPost & Document<any, any, IDBPost>)[]>;
}

export default class PostsDataSource implements IPostsDataSource {
	public async getPosts(ids?: readonly string[]) {
		const options = ids ? { _id: { $in: ids } } : {};
		return PostModel.find(options).sort({ createdAt: 'desc' });
	}

	public async getPostById(postId: string) {
		return PostModel.findById(postId);
	}

	public async addPost(args: IAddNewDBPost) {
		const post = new PostModel({ ...args, totalComments: 0 });
		await post.save();
		await UserModel.updateTotalPosts(args.userId);
		return post;
	}

	public async getPostsByUser(userIds: readonly string[]) {
		return PostModel.find({ userId: { $in: userIds } });
	}
}
