import { IAddNewDBComment } from 'server/dataSource/comments/types';
import { IAddNewDBPost } from 'server/dataSource/posts/types';
import { IGraphQLContext } from 'server/types';

class Mutations {
	public createNewPost(
		_parent: unknown,
		args: Record<'data', IAddNewDBPost>,
		context: IGraphQLContext
	) {
		return context.dataSources.posts.addPost(args.data);
	}

	public commentOnPost(
		_parent: unknown,
		args: Record<'data', IAddNewDBComment>,
		context: IGraphQLContext
	) {
		return context.dataSources.comments.addComment(args.data);
	}
}

export default new Mutations();
