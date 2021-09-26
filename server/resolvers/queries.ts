import { IGraphQLContext } from 'server/types';

class Queries {
	public getTrendingPosts(_parent: unknown, _args: unknown, context: IGraphQLContext) {
		return context.dataSources.posts.getPosts();
	}
}

export default new Queries();
