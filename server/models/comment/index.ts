import { Schema, model } from 'mongoose';
import { ICommentModel, IDBComment } from './types';

const commentSchema = new Schema(
	{
		body: String,
		userId: String,
		postId: String,
	},
	{
		timestamps: true,
	}
);

const CommentModel = model<IDBComment, ICommentModel>('Comment', commentSchema);

export default CommentModel;
