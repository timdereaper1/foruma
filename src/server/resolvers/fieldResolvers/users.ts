import { IDBUser } from 'src/base/node/db/models/user';
import { IGraphQLContext } from 'src/base/node/types';

class UserResolver {
	public posts(parent: IDBUser, _args: unknown, context: IGraphQLContext) {
		return context.loaders.posts.getUserPosts.load(parent.id);
	}

	public comments(parent: IDBUser, _args: unknown, context: IGraphQLContext) {
		return context.loaders.comments.getUserComments.load(parent.id);
	}
}

export default new UserResolver();
