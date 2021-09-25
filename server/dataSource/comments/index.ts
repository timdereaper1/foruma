import { IAddNewDBComment, ICommentsDataSource } from './types';
import CommentModel from 'server/models/comment';
import PostModel from 'server/models/post';
import UserModel from 'server/models/user';

export default class CommentsDataSource implements ICommentsDataSource {
	public async addComment(args: IAddNewDBComment) {
		const comment = new CommentModel(args);
		await comment.save();
		await PostModel.updateComments(args.postId);
		await UserModel.updateTotalComments(args.userId);
		return comment;
	}

	public async getPostComments(id: string) {
		return CommentModel.find({ postId: id }).sort({ createdAt: 'desc' });
	}

	public async getComments(ids: readonly string[]) {
		return CommentModel.find({ postId: { $in: ids } }).sort({ createdAt: 'desc' });
	}

	public async getUsersComments(ids: readonly string[]) {
		return CommentModel.find({ userId: { $in: ids } }).sort({ createdAt: 'desc' });
	}
}
