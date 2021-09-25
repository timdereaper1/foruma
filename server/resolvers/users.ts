import { IDBUser } from 'server/models/user/types';
import { IGraphQLContext } from 'server/types';

class UserResolver {
	public posts(parent: IDBUser, _args: unknown, context: IGraphQLContext) {
		return context.loaders.posts.getUserPosts.load(parent.id);
	}

	public comments(parent: IDBUser, _args: unknown, context: IGraphQLContext) {
		return context.loaders.comments.getUserComments.load(parent.id);
	}
}

export default new UserResolver();
