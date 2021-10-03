import { model, Model, Schema } from 'mongoose';

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

const postSchema = new Schema<IDBPost>(
	{
		userId: { type: String, required: true },
		body: { type: String, required: true },
		totalComments: { type: Number, default: 0 },
	},
	{
		timestamps: true,
	}
);

postSchema.static('updateComments', async function (postId: string) {
	const post = await this.findOne({ _id: postId });
	return this.updateOne(
		{ _id: postId },
		{
			$set: { totalComments: post.totalComments + 1 },
		}
	);
});

const PostModel = model<IDBPost, IPostModel>('Post', postSchema);

export default PostModel;
