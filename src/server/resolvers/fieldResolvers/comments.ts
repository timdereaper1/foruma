import { IDBComment } from 'src/base/node/db/models/comment';
import { IGraphQLContext } from 'src/base/node/types';

class CommentFieldResolver {
	public post(parent: IDBComment, _args: unknown, context: IGraphQLContext) {
		return context.loaders.posts.getPostById.load(parent.postId);
	}

	public user(parent: IDBComment, _args: unknown, context: IGraphQLContext) {
		return context.loaders.users.getUser.load(parent.userId);
	}
}

export default new CommentFieldResolver();
