import { Schema, model } from 'mongoose';
import { ICommentModel, IDBComment } from './types';

const commentSchema = new Schema(
	{
		body: { type: String, required: true },
		userId: { type: String, required: true },
		postId: { type: String, required: true },
	},
	{ timestamps: true }
);

const CommentModel = model<IDBComment, ICommentModel>('Comment', commentSchema);

export default CommentModel;
