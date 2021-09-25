import { model, Schema } from 'mongoose';
import { IDBPost, IPostModel } from './types';

const postSchema = new Schema<IDBPost>(
	{
		userId: { type: String, required: true },
		body: { type: String, required: true },
		totalComments: Number,
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
