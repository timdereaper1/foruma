import { IDBPost } from 'server/models/post/types';
import { IGraphQLContext } from 'server/types';

class PostFieldResolver {
	public comments(parent: IDBPost, _args: unknown, context: IGraphQLContext) {
		return context.loaders.comments.getComments.load(parent.id);
	}
}

export default new PostFieldResolver();
