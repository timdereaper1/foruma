import PostModel from 'server/models/post';
import { IAddNewDBPost, IPostsDataSource } from './types';

export default class PostsDataSource implements IPostsDataSource {
	public async getPosts(ids?: readonly string[]) {
		const options = ids ? { _id: { $in: ids } } : {};
		return PostModel.find(options);
	}

	public async getPostById(postId: string) {
		return PostModel.findById(postId);
	}

	public async addPost(args: IAddNewDBPost) {
		const post = new PostModel({ ...args, totalComments: 0 });
		return post.save();
	}
}
