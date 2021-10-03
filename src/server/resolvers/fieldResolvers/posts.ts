import { IDBPost } from 'src/base/node/db/models/post';
import { IGraphQLContext } from 'src/base/node/types';

class PostFieldResolver {
	public comments(parent: IDBPost, _args: unknown, context: IGraphQLContext) {
		return context.loaders.comments.getComments.load(parent.id);
	}

	public user(parent: IDBPost, _args: unknown, context: IGraphQLContext) {
		return context.loaders.users.getUser.load(parent.userId);
	}
}

export default new PostFieldResolver();
