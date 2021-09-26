import PostModel from 'server/models/post';
import UserModel from 'server/models/user';
import { IAddNewDBPost, IPostsDataSource } from './types';

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
