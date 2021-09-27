import { IGraphQLContext } from 'server/types';

class Queries {
	public getTrendingPosts(_parent: unknown, _args: unknown, context: IGraphQLContext) {
		return context.dataSources.posts.getPosts();
	}

	public getPost(
		_parent: unknown,
		args: Record<'data', { postId: string }>,
		context: IGraphQLContext
	) {
		return context.loaders.posts.getPostById.load(args.data.postId);
	}
}

export default new Queries();
