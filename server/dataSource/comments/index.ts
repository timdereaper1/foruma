import { IAddNewDBComment, ICommentsDataSource } from './types';
import CommentModel from 'server/models/comment';
import PostModel from 'server/models/post';

export default class CommentsDataSource implements ICommentsDataSource {
	public async addComment(args: IAddNewDBComment) {
		const comment = new CommentModel(args);
		await comment.save();
		await PostModel.updateComments(args.postId);
		return comment;
	}

	public async getPostComments(id: string) {
		return CommentModel.find({ postId: id });
	}

	public async getComments(ids: readonly string[]) {
		return CommentModel.find({ postId: { $in: ids } });
	}
}
