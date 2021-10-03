import CommentModel from 'src/base/node/db/models/comment';
import { Document } from 'mongoose';
import { IDBComment } from 'src/base/node/db/models/comment';
import PostModel from 'src/base/node/db/models/post';
import UserModel from 'src/base/node/db/models/user';

export interface IAddNewDBComment {
	body: string;
	userId: string;
	postId: string;
}

export interface ICommentsDataSource {
	addComment(args: IAddNewDBComment): Promise<IDBComment & Document<any, any, IDBComment>>;
	getPostComments(id: string): Promise<(IDBComment & Document<any, any, IDBComment>)[]>;
	getComments(ids: readonly string[]): Promise<(IDBComment & Document<any, any, IDBComment>)[]>;
	getUsersComments(
		ids: readonly string[]
	): Promise<(IDBComment & Document<any, any, IDBComment>)[]>;
}

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
