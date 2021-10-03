import { Schema, model, Model } from 'mongoose';

export interface IDBComment {
	body: string;
	createdAt: Date;
	userId: string;
	postId: string;
	updatedAt: Date;
	id: string;
}

export interface ICommentModel extends Model<IDBComment> {}

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
